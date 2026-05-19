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

/** CountryBean */
export interface CountryBean {
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
  /** 币种 */
  currency?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** CountryQueryResp */
export interface CountryQueryResp {
  code?: string;
  /** 国家列表 */
  countryList?: CountryBean[];
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

/** CurrencyBean */
export interface CurrencyBean {
  /** 币种编码 */
  currencyCode?: string;
  /** 币种名称 */
  currencyName?: string;
  /** 币种英文名称 */
  currencyNameEn?: string;
  /** 汇率 */
  currencyRate?: number;
  /** 币种符号 */
  currencySymbol?: string;
  /**
   * 记录创建时间
   * @format date-time
   */
  recordCreateTime?: string;
  /**
   * 记录修改时间
   * @format date-time
   */
  recordUpdateTime?: string;
  /** 店铺 */
  store?: string;
}

/** CurrencyQueryResp */
export interface CurrencyQueryResp {
  /** 货币列表 */
  currencyList?: CurrencyBean[];
}

/** DwdProductSkuHeadPriceBean */
export interface DwdProductSkuHeadPriceBean {
  /** 头程单价币种 */
  currencyCode?: string;
  /**
   * 是否有效 0-无效 1-有效
   * @format int32
   */
  isValid?: number;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorName?: string;
  /** 平台 */
  platform?: string;
  /** 头程单价 */
  price?: number;
  /** 头程单价取数日期 */
  priceDate?: string;
  /** 商品名称 */
  productName?: string;
  /** 供应链sku */
  productSku?: string;
  /** 新供应链sku */
  productSkuNew?: string;
  /**
   * 商品类型 1-产品 2-物料
   * @format int32
   */
  productType?: number;
  /** 备注 */
  remark?: string;
  /** 站点 */
  site?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** DwdProductSkuPurchasePriceBean */
export interface DwdProductSkuPurchasePriceBean {
  /** 采购单价币种 */
  currencyCode?: string;
  /**
   * 是否有效 0-无效 1-有效
   * @format int32
   */
  isValid?: number;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorName?: string;
  /**
   * 是否有采购单 0-否 1-是
   * @format int32
   */
  orderFlag?: number;
  /** 采购单价 */
  price?: number;
  /** 采购单价取数日期 */
  priceDate?: string;
  /** 商品名称 */
  productName?: string;
  /** 供应链sku */
  productSku?: string;
  /** 新供应链sku */
  productSkuNew?: string;
  /**
   * 商品类型 1-产品 2-物料
   * @format int32
   */
  productType?: number;
  /** 备注 */
  remark?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
}

/** DwdSkuHeadPriceQueryReq */
export interface DwdSkuHeadPriceQueryReq {
  /**
   * 是否有效 0-无效 1-有效
   * @format int32
   */
  isValid?: number;
  /** 关键字 供应链sku编码、sku名称 */
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

/** DwdSkuHeadPriceQueryResp */
export interface DwdSkuHeadPriceQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 头程单价列表 */
  skuHeadPriceList?: DwdProductSkuHeadPriceBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DwdSkuHeadPriceUpdateReq */
export interface DwdSkuHeadPriceUpdateReq {
  /** 平台 */
  platform?: string;
  /** 头程单价 */
  price?: number;
  /** 供应链sku */
  productSku?: string;
  /** 站点 */
  site?: string;
}

/** DwdSkuPurchasePriceQueryReq */
export interface DwdSkuPurchasePriceQueryReq {
  /**
   * 是否有效 0-无效 1-有效
   * @format int32
   */
  isValid?: number;
  /** 关键字 供应链sku编码、sku名称 */
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

/** DwdSkuPurchasePriceQueryResp */
export interface DwdSkuPurchasePriceQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 采购单价列表 */
  skuPurchasePriceList?: DwdProductSkuPurchasePriceBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** DwdSkuPurchasePriceUpdateReq */
export interface DwdSkuPurchasePriceUpdateReq {
  /** 采购单价 */
  price?: number;
  /** 供应链sku */
  productSku?: string;
}

/** FinanceCurrencyRateBean */
export interface FinanceCurrencyRateBean {
  /** 数据状态 */
  dataStatus?: string;
  /** 直接汇率 */
  directRate?: number;
  /** 禁用状态 */
  disableStatus?: string;
  /** 汇率日期 */
  exchangeRateDate?: string;
  /** 汇率使用月份 */
  exchangeRateUsageMonth?: string;
  /** 原币种 */
  originalCurrency?: string;
  /** 原币种编码 */
  originalCurrencyCode?: string;
  /** 人民币汇率 */
  rateCny?: number;
  /** 美元汇率 */
  rateUsd?: number;
  /** 报表月份 */
  reportMonth?: string;
  /** 系统预置 */
  systemPreset?: string;
}

/** FinanceCurrencyRateQueryReq */
export interface FinanceCurrencyRateQueryReq {
  /** 关键字 原币种、原币种编码 */
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
  /** 报表月份 */
  reportMonth?: string;
}

/** FinanceCurrencyRateQueryResp */
export interface FinanceCurrencyRateQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 汇率列表 */
  rateList?: FinanceCurrencyRateBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** FinanceSkuHeadPriceBean */
export interface FinanceSkuHeadPriceBean {
  /** 亚马逊头程 */
  amazon?: number;
  /**
   * 月份
   * @format int32
   */
  month?: number;
  /** 供应链sku */
  productSku?: string;
  /** 产品名称 */
  productTitle?: string;
  /** shopify头程 */
  shopify?: number;
  /** 站点 */
  site?: string;
  /** walmart头程 */
  walmart?: number;
  /**
   * 年份
   * @format int32
   */
  year?: number;
}

/** FinanceSkuHeadPriceQueryResp */
export interface FinanceSkuHeadPriceQueryResp {
  code?: string;
  /** 头程单价列表 */
  list?: FinanceSkuHeadPriceBean[];
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

/** FinanceSkuPurchasePriceBean */
export interface FinanceSkuPurchasePriceBean {
  /**
   * 月份
   * @format int32
   */
  month?: number;
  /** 操作人 */
  operator?: string;
  /** 操作人 */
  operatorName?: string;
  /** 产品分类 */
  productCategory?: string;
  /** 供应链sku */
  productSku?: string;
  /** 产品名称 */
  productTitle?: string;
  /** 采购价 */
  purchasePrice?: number;
  /**
   * 年份
   * @format int32
   */
  year?: number;
}

/** FinanceSkuPurchasePriceQueryResp */
export interface FinanceSkuPurchasePriceQueryResp {
  code?: string;
  /** 采购单价列表 */
  list?: FinanceSkuPurchasePriceBean[];
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

/** LuteWarehouseBean */
export interface LuteWarehouseBean {
  /** 公司名称 */
  company?: string;
  /** 公司编码 */
  companyCode?: string;
  /** 联系人 */
  contacter?: string;
  /** 国家二字码 */
  countryCode?: string;
  /**
   * 创建时间(系统)
   * @format date-time
   */
  createTime?: string;
  /** 是否组合品出库扣减包材 */
  isGroupProduct?: string;
  /**
   * 是否成品出库扣减包材
   * @format int32
   */
  isProduct?: number;
  /** 是否中转仓 */
  isTransitWarehouse?: string;
  /**
   * 是否虚拟仓
   * @format int32
   */
  isVirtual?: number;
  /** 联系电话 */
  phone?: string;
  /** 邮编 */
  postCode?: string;
  /** 省份 */
  province?: string;
  /** 物流服务商编码 */
  serviceProviderCode?: string;
  /** 物流服务商名称 */
  serviceProviderName?: string;
  /**
   * 来源系统创建时间
   * @format date-time
   */
  sourceCreateTime?: string;
  /**
   * 来源 1-易仓 2-积加
   * @format int32
   */
  sourceType?: number;
  /** 仓库服务商编码 */
  spCode?: string;
  /** 三方仓仓库编码(物理)-谷仓特有 */
  spaCode?: string;
  /** 三方仓仓库编码 */
  spwCode?: string;
  /**
   * 仓库状态：0-不可用，1-可用，-1-停用
   * @format int32
   */
  status?: number;
  /** 联系地址1 */
  streetAddress1?: string;
  /** 联系地址2 */
  streetAddress2?: string;
  /**
   * 更新时间(系统)
   * @format date-time
   */
  updateTime?: string;
  /**
   * 仓库类别 1-实体仓 2-虚拟仓
   * @format byte
   */
  warehouseCategory?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库描述 */
  warehouseDesc?: string;
  /** 仓库类型 1-SELF-自营仓 3-THIRD-三方仓 4-PLATFORM-平台仓 */
  warehouseType?: string;
  /** 实体仓编码 */
  wpCode?: string;
}

/** LuteWarehouseQueryResp */
export interface LuteWarehouseQueryResp {
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
  /** 仓库列表 */
  warehouseList?: LuteWarehouseBean[];
}

/** ProductInfoBean */
export interface ProductInfoBean {
  /** 商品编码 */
  productCode?: string;
  /** 商品名称 */
  productName?: string;
  /**
   * 商品类型
   * @format int32
   */
  productType?: number;
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
  /** 合作产品 */
  productInfoList?: ProductInfoBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ProductSkuBean */
export interface ProductSkuBean {
  /** 品牌代码 */
  brandCode?: string;
  /** 品牌名称 */
  brandName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 默认采购仓库
   * @format int32
   */
  defaulBuyWarehouseId?: number;
  /** 默认供应商代码 */
  defaultSupplierCode?: string;
  /**
   * 默认发货仓库ID
   * @format int32
   */
  defaultWarehouseId?: number;
  /** 产品经理ID */
  developLuteId?: string;
  /**
   * 保质期（天数）⾮必填
   * @format int32
   */
  expDay?: number;
  /**
   * 海关编码
   * @format double
   */
  hscode?: number;
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
  /** 产品物流属性 */
  logisticAttribute?: string;
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
  /** 申报币种 */
  pdDeclareCurrencyCode?: string;
  /** 申报品名CN */
  pdOiverseaTypeCn?: string;
  /** 申报品名EN */
  pdOiverseaTypeEn?: string;
  /** 开发负责人Id */
  personDevelopId?: string;
  /** 采购负责人Id */
  personOpraterId?: string;
  /** 销售负责人Id */
  personSellerId?: string;
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
  productImages?: string;
  /**
   * 产品长度
   * @format double
   */
  productLength?: number;
  /**
   * 净重（单位g）
   * @format double
   */
  productNetWeight?: number;
  /** 商品SKU代码 */
  productSku?: string;
  /** 产品款式代码 */
  productSpu?: string;
  /** 产品状态: 0:不可用,1:可用,2:开发产品 */
  productStatus?: string;
  /** 名称CN */
  productTitle?: string;
  /** 名称EN */
  productTitleEn?: string;
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
  /**
   * 产品销售状态Id
   * @format int32
   */
  saleStatus?: number;
  /** 建议售价 */
  suggestPrice?: string;
  /** 建议售价币种 */
  suggestPriceCurrencyCode?: string;
  /** 供应商品号 */
  supplierSku?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 仓库条码 */
  warehouseBarcode?: string;
}

/** ShippingSupplierBean */
export interface ShippingSupplierBean {
  /** 物流服务商Code */
  supplierCode?: string;
  /** 物流服务商名称 */
  supplierName?: string;
}

/** ShippingSupplierQueryResp */
export interface ShippingSupplierQueryResp {
  /** 物流服务商列表 */
  shippingSupplierList?: ShippingSupplierBean[];
}

/** ShopifyOnlineProductQueryResp */
export interface ShopifyOnlineProductQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  productList?: ShopifyProductBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ShopifyProductBean */
export interface ShopifyProductBean {
  /** 图片 */
  image?: string;
  /** 商品价格 */
  price?: string;
  /** product_id */
  productId?: string;
  /** 店铺sku */
  sku?: string;
  /** 商品标题 */
  title?: string;
  /** variants_id */
  variantsId?: string;
}

/** SkuListQueryResp */
export interface SkuListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 商品SKU列表 */
  productSkuList?: ProductSkuBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** SupplierBaseBean */
export interface SupplierBaseBean {
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** SupplierBaseQueryResp */
export interface SupplierBaseQueryResp {
  /** 供应商信息 */
  supplierList?: SupplierBaseBean[];
}

/** SupplierBean */
export interface SupplierBean {
  /** 比例值 */
  accountProportion?: object;
  /** 结算方式：1货到付款、2款到发货、3帐期 */
  accountType?: boolean;
  /**
   * 默认采购员id
   * @format int64
   */
  buyerId?: number;
  /** 联系方式数据 */
  contactList?: string;
  /**
   * 记录创建时间
   * @format date-time
   */
  createTime?: string;
  /** 等级 */
  level?: string;
  /** 默认支付方式：1现金、2在线、3银行卡 */
  payType?: boolean;
  /** 支付账户数据 */
  paymentAccountList?: string;
  /** 支付周期类型：1月结、2隔月结、3日结、4周结、5半月结 */
  pcId?: boolean;
  /**
   * 默认运输方式承运商Id
   * @format int64
   */
  psId?: number;
  /** 合同采购金额 */
  purchaseContractAmount?: number;
  /**
   * 默认运输方式：1自提、2快递、3物流、4送货
   * @format int32
   */
  shippingMethodIdHead?: number;
  /**
   * 运输承担方：1供应商、2采购方
   * @format byte
   */
  supplierCarrier?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商佣金比例：例如0.03 */
  supplierCommissionRatio?: object;
  /**
   * 供应商id
   * @format int64
   */
  supplierId?: number;
  /** 附属图片URL数据 */
  supplierImagesList?: string;
  /**
   * 主营品类id
   * @format int64
   */
  supplierMainCategoryId?: number;
  /** 供应商名称 */
  supplierName?: string;
  /** 名称EN */
  supplierNameen?: string;
  /**
   * QC不良品处理：1退货、2换货、3采购方承担
   * @format int32
   */
  supplierQcException?: number;
  /**
   * 运输支付方式： 1预付、2到付
   * @format int32
   */
  supplierShipPayType?: number;
  /**
   * 状态：0可用、1作废
   * @format int32
   */
  supplierStatus?: number;
  /**
   * 合作类型
   * @format int32
   */
  supplierTeamworkType?: number;
  /** 合同注意事项 */
  supplierTreaty?: string;
  /**
   * 供应商类型：1零售、2批发、3生产商、4通用虚拟、5显示、6市场 (0：表示为填写)
   * @format int32
   */
  supplierType?: number;
  /**
   * 默认跟单员id
   * @format int64
   */
  trackId?: number;
  /**
   * 记录修改时间
   * @format date-time
   */
  updateTime?: string;
}

/** SupplierQueryResp */
export interface SupplierQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 供应商列表 */
  supplierList?: SupplierBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** WarehouseBean */
export interface WarehouseBean {
  /** 城市 */
  city?: string;
  /** 公司名称 */
  company?: string;
  /** 联系人 */
  contacter?: string;
  /** 国家二字码 */
  countryCode?: string;
  /**
   * 国家ID
   * @format int64
   */
  countryId?: number;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 删除状态 0-未删除 1-已删除
   * @format int32
   */
  deleted?: number;
  /**
   * 有无头程：1 是，0 否
   * @format byte
   */
  isTransfer?: string;
  /** 电话号码 */
  phoneNo?: string;
  /** 邮编 */
  postCode?: string;
  /** 省 */
  state?: string;
  /** 联系地址1 */
  streetAddress1?: string;
  /** 联系地址2 */
  streetAddress2?: string;
  /** 创建日期 */
  warehouseAddTime?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库描述 */
  warehouseDesc?: string;
  /**
   * 仓库ID
   * @format int64
   */
  warehouseId?: number;
  /**
   * 仓库状态：0-不可用，1-可用，-1-停用
   * @format byte
   */
  warehouseStatus?: string;
  /**
   * 仓库类型：0-标准，1-中转
   * @format byte
   */
  warehouseType?: string;
  /** 最后更新日期 */
  warehouseUpdateTime?: string;
  /**
   * 仓库运营方式：0-自营 1-虚拟(第三方)
   * @format byte
   */
  warehouseVirtual?: string;
}

/** WarehouseQueryResp */
export interface WarehouseQueryResp {
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
  /** 仓库列表 */
  warehouseList?: WarehouseBean[];
}
