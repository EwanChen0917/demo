import {
  StockItem,
  OtherInboundOrderItemAddReq,
  OtherOutboundOrderItemAddReq,
  SupplySkuListBean,
} from '@/api/oms/data-contracts';
export interface columnsConfig {
  availableInventory?:boolean;
  poolCodeName?:boolean;
  warehouseMapName?:boolean;
}
/**
 * 从弹框拿到的基本sku对象，包含有良品库存信息和次品库存信息
 */
export interface baseSkuStockType extends StockItem {
  /** 产品图片URL */
  id: string | number;
  productImage?: string;
}
/**
 * 从弹框拿到的基本sku对象，不同的是另一个接口。用于库存分配单
 */
export interface baseSkuInventoryType extends SupplySkuListBean {
  availableQuantity:number
}

/**
 * 转换对象，提交用的基本sku信息，包含有编辑后的良品库存信息和次品库存信息
 */
export interface baseAddInboundType extends OtherInboundOrderItemAddReq {
  id: string | number;
  /** 产品图片URL */
  productImage?: string;
  goodQuantity?: number | string;
  productImage?: string;
}
/**
 * 转换提交对象，用于出库单，不同的是多了一个次品量
 */
export interface baseAddOutboundType extends OtherOutboundOrderItemAddReq {
  unsellableQuantity: number;
  /** 产品图片URL */
  id?: string | number;
  productImage?: string;
  goodQuantity?: number | string;
  productImage?: string;
}
/**
 * 用于编辑的库存分配单商品单项
 */
export interface baseEditItemStockAllocation extends SupplySkuListBean {
  allotQty: number | undefined;
  remark: string;
  productName: any;
  availableQuantity:any
}
/**
 * 详情和提交公用的库存分配单表单模型
 */
export interface baseAddStockAllocationInfoType {
  inventoryAllot: {
    inPoolCode: string | number;
    inPoolName: string;
    outPoolCode: string;
    outPoolName: string;
    remark: string;
    warehouseCode: string;
  };
  itemList: baseEditItemStockAllocation[] | InventoryAllotItemAddBean[];
}
