export interface SearchParams {
  pageSize: number;
  pageNum: number;
  keyword?: string;
  warehouseCodeList?: string[];
  arrivalWarehouseCodeList?: string[];
  logisticsTransport?: string;
  outboundOrderNo?: string;
  trackingNo?: string;
  inboundOrderNo?: string;
  creatorList?: string[];
  createTimeStart?: string;
  createTimeEnd?: string;
}

export interface ApiResponse {
  recordList: Array<{
    id: number;
    name: string;
    description: string;
    status: number;
    createTime: string;
    updateTime: string;
  }>;
  totalCount: number;
  total: number;
}
/**
 * 添加产品弹窗的信息
 */
export interface transferProductDetail {
  productImage?: string | null;
  productImageList?: string | null;
  productSku?: string;
  productSkuNew?: string;
  productSpu?: string | null;
  skuCode?: string;
  productTitle?: string;
  productUrl?: string | null;
  planner?: string | null;
  plannerName?: string | null;
  productTitleEn?: string;
  productType?: number;
  productStatus?: number;
  saleStatus?: number;
  creator?: string;
  creatorName?: string;
  operator?: string;
  operatorName?: string;
  createTime?: string;
  updateTime?: string;
  purchasePrice?: number | null;
  purchaseCurrencyCode?: string | null;
  purchaser?: string;
  purchaserName?: string;
  defaultPurchase?: string | null;
  minQuantity?: number | null;
  standardLT?: number | null;
  supplierCode?: string;
  supplierName?: string;
  productNetLength?: number | null;
  productNetWidth?: number | null;
  productNetHeight?: number | null;
  productWeight?: number | null;
  productNetWeight?: number | null;
  cartonWeight?: number | null;
  productLength?: number | null;
  productWidth?: number | null;
  productHeight?: number | null;
  logisticAttribute?: string | null;
  cartonLength?: number | null;
  cartonWidth?: number | null;
  cartonHeight?: number | null;
  cartonNum?: number | null;
  declareName?: string;
  declareNameEn?: string;
  hsImportPrice?: number | null;
  hsImportCurrency?: string;
  hsCode?: string;
  transactionUnit?: string;
  declareElement?: string | null;
  territoryGoods?: string | null;
  taxExemption?: string;
  declareExplain?: string | null;
  hsAttr?: string | null;
  declarePrice?: number | null;
  declareCurrency?: string;
  hsTariffRate?: number | null;
  hsImportCode?: string | null;
  productMaterialIngredient?: string;
  productMaterialIngredientEn?: string;
  useCn?: string;
  useEn?: string;
  inventory?: number | null;
  centerInventory?: number | null;
  overseasInventory?: number | null; // 暂定字段
}
/**
 *
 */
export interface unBoxProduct {
  availableQuantity?: number;
  cartonHeight?: number;
  cartonLength?: number;
  cartonNum?: number;
  cartonWidth?: number;
  declareNameEn?: string;
  id?: number;
  productHeight?: number;
  productImageUrl?: string;
  productLength?: number;
  productName?: string;
  productWeight?: number;
  productWidth?: number;
  quantity?: number;
  remark?: string;
  skuCode?: string;
  supplySku?: string;
  cartonList?: baseBox[] | boxOptions[];
}
// 基础箱子配置信息，配置用
export interface baseBox {
  boxNo?: string | undefined;
  id?: number | null;
  perProductBoxCount?: number | null; // 仅再single模式下有用，该箱子在该商品下有多少个箱子
  boxNum?: number | null;
  roughWeight?: number | null;
  length?: number | null;
  wide?: number | null;
  high?: number | null;
}
/** 基础箱子配置信息,提交用 */
export interface boxOptions {
  perProductBoxCount?: number;
  id?: number | null;
  boxIndex?: number | null;
  boxNo?: number | null;
  boxNum?: number | null;
  cartonNum?: number | null;
  roughWeight?: number | null;
  length?: number | null;
  wide?: number | null;
  high?: number | null;
  skuCode?: string | null; // 产品sku
  supplySku?: string | null; // 供应链SKU
  productList?: transferProductDetail[];
}
/**
 * 基础箱子配置信息，当选中的如果是mix模式，回显用
 */
export interface mixRecallOptions {
  box: mixBoxRecallOptions[];
  templateBox: mixTemplateRecallOptions[];
}
/**
 * mix模式下的箱子重量信息，需与尺寸对应
 */
export type mixBoxRecallOptions = {
  index: number;
  weight: number | null;
  selectedSizeTemplateId: string | null;
};
/**
 * mix模式下的箱子尺寸信息，有id
 */
export type mixTemplateRecallOptions = {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
};
/**
 * 箱子列配置，用于展示用，无关其他逻辑单纯展示
 */
export interface BoxColumnConfig {
  boxNo: number;
  label: string;
  perProductBoxCount: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  products: Record<string, number>;
}
/**
 * 箱子提交信息
 */
export interface boxSubmitOptions extends Omit<OmsApi.OmsTransferSubmit.RequestBody, 'cartonList'> {
  cartonList: boxOptions[];
}
