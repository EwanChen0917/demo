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

/** ChannelProductDeleteReq */
export interface ChannelProductDeleteReq {
  /** 料号/供应链编码 */
  productSku: string;
}

/** ChannelProductListQueryReq */
export interface ChannelProductListQueryReq {
  /** 关键词 */
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
  /** 料号/SKU集合 唯一编码 */
  productSkuList?: string[];
  /** 用于导出时, 前端传递用户查询条件 */
  queryParam?: Record<string, string>;
}

/** ChannelProductListQueryResp */
export interface ChannelProductListQueryResp {
  code?: string;
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /** 商品信息 */
  productList?: ChannelProductQueryBean[];
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** ChannelProductQueryBean */
export interface ChannelProductQueryBean {
  /** 彩盒内的所有产品以及配件 */
  accessories?: string;
  /** 电池数量 */
  batteriesNum?: string;
  /** 电池是否内置 */
  batteryContained?: string;
  /** 电池尺寸 */
  batterySizes?: string;
  /** 电池类型 */
  batteryTypes?: string;
  /** 品牌 */
  brand?: string;
  /** 认证地址 */
  certificationAddress?: string;
  /** 认证类型 */
  certificationName?: string;
  /** 认证产品名称（英文） */
  certifiedProductName?: string;
  /** 海关编码 */
  commodityCode?: string;
  /** 产品是否含有电池 */
  containsBattery?: string;
  /** 从订单日期起的英国交货提前期 */
  deliveryLeadTime?: string;
  /** EAN码/新料号 */
  eanCode?: string;
  /** EAN 14 */
  eanCode14?: string;
  /** 续航（年） */
  endurance?: string;
  /** 从订单日期起的 FOB 交货提前期 */
  fobDeliveryLeadTime?: string;
  /** 每个 Sku 的 FOB 最小起订量，即订单数量或 $ 价值 */
  fobSkuOrderMin?: string;
  /** 求助热线联系方式（电话和电子邮件） */
  helplineContact?: string;
  /** 输入 */
  input?: string;
  /** 高(cm) */
  masterCartonHeight?: string;
  /** 长(cm) */
  masterCartonLength?: string;
  /** 重量（净重） */
  masterCartonNetWeight?: string;
  /** 重量(毛重) */
  masterCartonWeight?: string;
  /** 宽(cm) */
  masterCartonWide?: string;
  /** 材质 */
  material?: string;
  /** 物料描述 */
  materialDesc?: string;
  /** 最大负载电流 */
  maxLoadCurrent?: string;
  /** 最大负载功率 */
  maximumLoadPower?: string;
  /** 产品型号 */
  modelReference?: string;
  /** 在线完整产品规格 */
  onlineFullProductSpecs?: string;
  /** 线上产品全称 */
  onlineProductFullName?: string;
  /** 最小起订箱数 */
  orderMinBoxNum?: string;
  /** 最小起订类型 */
  orderMinBoxType?: string;
  /** 输出 */
  output?: string;
  /** 托盘高度/类型 */
  palletHeightOrType?: string;
  /** 托盘摆几层（高） */
  palletHi?: string;
  /** 托盘每层摆多少箱（长*宽） */
  palletTi?: string;
  /** 托盘重量 */
  palletWeight?: string;
  /** 尺寸（高）含包装 */
  productHeight?: string;
  /** 尺寸（长）含包装 */
  productLength?: string;
  /** 尺寸（高mm）不含包装 */
  productNetHeight?: string;
  /** 尺寸（长mm）不含包装 */
  productNetLength?: string;
  /** 产品净重 */
  productNetWeight?: string;
  /** 尺寸（宽mm）不含包装 */
  productNetWide?: string;
  /** 供应链sku/料号 唯一编码 */
  productSku?: string;
  /** 商品SPU代码 */
  productSpu?: string;
  /** 产品状态 */
  productStatus?: string;
  /** 图片 */
  productUrl?: string;
  /** 产品毛重 */
  productWeight?: string;
  /** 尺寸（宽）含包装 */
  productWide?: string;
  /** 采购价格 */
  purchasePrice?: string;
  /** 数量 */
  quantity?: string;
  /** 回收总包装（产品包装+外包装）重量（克） */
  recyclePackagingWeight?: string;
  /** 回收单位（产品）：纸板重量（克） */
  recycleUnitsCardboardWeight?: string;
  /** 回收单位：外包装纸板重量（克） */
  recycleUnitsOuterCardboardWeight?: string;
  /** recycle_units_outer_plastic_weight */
  recycleUnitsOuterPlasticWeight?: string;
  /** 回收单位（产品）：塑料重量（克） */
  recycleUnitsPlasticWeight?: string;
  /** 卖点 */
  sellingPoint?: string;
  /** 商品SKU代码 */
  skuCode?: string;
  /** SKU名称 */
  skuName?: string;
  /** 每个 Sku 的最小起订或 £ 价值 */
  skuOrderMin?: string;
  /** 建议零售价（美元） */
  suggestPrice?: string;
  /** 英国消费者保修（以月为单位） */
  ukConsumerWarranty?: string;
  /** 英国制造商保修（以月为单位） */
  ukManufacturerWarranty?: string;
  /** 一个电池的重量（克） */
  unitBatteryWeight?: string;
  /** 电压 */
  voltage?: string;
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

/** ImportDataReq */
export interface ImportDataReq {
  /** 文件名称 */
  fileName?: string;
  /** 导入场景 例如线下渠道商品：channel_product */
  importScene?: string;
  /** 上传文件的key或者完整路径 */
  key?: string;
  /** 产品运营项目编码  导入产品运营项目周期数据时，必传 */
  projectCode?: string;
}

/** ImportDataResp */
export interface ImportDataResp {
  /**
   * 失败数量
   * @format int32
   */
  failedCount?: number;
  /** 导入记录code */
  recordCode?: string;
  /**
   * 成功数量
   * @format int32
   */
  succeededCount?: number;
  /** 提示内容 */
  tip?: string;
}
