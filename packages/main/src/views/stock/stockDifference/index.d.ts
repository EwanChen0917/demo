export interface StockDifferenceSnapDetailItem {
  dimensionDesc: string;
  erpAvailableStock: number;
  erpDefectiveStock: number;
  erpGoodStock: number;
  erpPhysicalStock: number;
  erpReservedStock: number;
  jijiaAvailableStock: number;
  jijiaDefectiveStock: number;
  jijiaGoodStock: number;
  jijiaPhysicalStock: number;
  jijiaReservedStock: number;
  warehouseName: string;
}

export interface StockDifferenceSnapItem {
  fluxAvailableStock: number;
  fluxDefectiveStock: number;
  fluxGoodStock: number;
  fluxPhysicalStock: number;
  fluxReservedStock: number;
  id: number;
  productName: string;
  snapDate: string;
  snapDetailBeans: StockDifferenceSnapDetailItem[];
  snapTime: string;
  supplySku: string;
  version: string;
}

export interface StockDifferenceSnapResponse {
  total: number;
  pageNo: number;
  pageSize: number;
  list: StockDifferenceSnapItem[];
}

export declare const stockDifferenceSnapMockList: StockDifferenceSnapItem[];
export declare const stockDifferenceSnapMockResponse: StockDifferenceSnapResponse;
