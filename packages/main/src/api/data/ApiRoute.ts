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

import {
  CommonExportResp,
  CountryQueryResp,
  CurrencyQueryResp,
  DwdSkuHeadPriceQueryReq,
  DwdSkuHeadPriceQueryResp,
  DwdSkuHeadPriceUpdateReq,
  DwdSkuPurchasePriceQueryReq,
  DwdSkuPurchasePriceQueryResp,
  DwdSkuPurchasePriceUpdateReq,
  FinanceCurrencyRateQueryReq,
  FinanceCurrencyRateQueryResp,
  FinanceSkuHeadPriceQueryResp,
  FinanceSkuPurchasePriceQueryResp,
  LuteWarehouseQueryResp,
  ProductListQueryResp,
  ShippingSupplierQueryResp,
  ShopifyOnlineProductQueryResp,
  SkuListQueryResp,
  SupplierBaseQueryResp,
  SupplierQueryResp,
  WarehouseQueryResp,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 基础数据
   * @name LuteosDataExportDwdSkuHeadPriceList
   * @summary 最新SKU头程单价导出
   * @request POST:/api/luteos/data/exportDwdSkuHeadPriceList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosDataExportDwdSkuHeadPriceList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DwdSkuHeadPriceQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosDataExportDwdSkuPurchasePriceList
   * @summary 最新SKU采购单价导出
   * @request POST:/api/luteos/data/exportDwdSkuPurchasePriceList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosDataExportDwdSkuPurchasePriceList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DwdSkuPurchasePriceQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosDataExportFinanceCurrencyRate
   * @summary 财务汇率导出
   * @request POST:/api/luteos/data/exportFinanceCurrencyRate
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosDataExportFinanceCurrencyRate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FinanceCurrencyRateQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonExportResp;
  }

  /**
   * No description
   * @tags 基础字典
   * @name LuteosDataQueryCountryList
   * @summary 国家列表查询
   * @request GET:/api/luteos/data/queryCountryList
   * @response `200` `CountryQueryResp` OK
   */
  export namespace LuteosDataQueryCountryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 国家名称 中文或英文 */
      countryName?: string;
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
       * 场景 1-调价  如果传1则调价使用，否则忽略
       * @format int32
       */
      scene?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CountryQueryResp;
  }

  /**
   * No description
   * @tags 基础字典
   * @name LuteosDataQueryCountryListV2
   * @summary 国家列表查询-V2
   * @request GET:/api/luteos/data/queryCountryListV2
   * @response `200` `CountryQueryResp` OK
   */
  export namespace LuteosDataQueryCountryListV2 {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 国家名称 中文或英文 */
      countryName?: string;
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
       * 场景 1-调价  如果传1则调价使用，否则忽略
       * @format int32
       */
      scene?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CountryQueryResp;
  }

  /**
   * No description
   * @tags 基础字典
   * @name LuteosDataQueryCurrencyList
   * @summary 货币列表查询
   * @request GET:/api/luteos/data/queryCurrencyList
   * @response `200` `CurrencyQueryResp` OK
   */
  export namespace LuteosDataQueryCurrencyList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 货币名称 */
      currencyName?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CurrencyQueryResp;
  }

  /**
   * No description
   * @tags 基础字典
   * @name LuteosDataQueryCurrencyListV2
   * @summary 货币列表查询-V2
   * @request GET:/api/luteos/data/queryCurrencyListV2
   * @response `200` `CurrencyQueryResp` OK
   */
  export namespace LuteosDataQueryCurrencyListV2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CurrencyQueryResp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosDataQueryDwdSkuHeadPriceList
   * @summary 最新SKU头程单价查询
   * @request GET:/api/luteos/data/queryDwdSkuHeadPriceList
   * @response `200` `DwdSkuHeadPriceQueryResp` OK
   */
  export namespace LuteosDataQueryDwdSkuHeadPriceList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DwdSkuHeadPriceQueryResp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosDataQueryDwdSkuPurchasePriceList
   * @summary 最新SKU采购单价查询
   * @request GET:/api/luteos/data/queryDwdSkuPurchasePriceList
   * @response `200` `DwdSkuPurchasePriceQueryResp` OK
   */
  export namespace LuteosDataQueryDwdSkuPurchasePriceList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = DwdSkuPurchasePriceQueryResp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosDataQueryFinanceCurrencyRate
   * @summary 财务汇率查询
   * @request GET:/api/luteos/data/queryFinanceCurrencyRate
   * @response `200` `FinanceCurrencyRateQueryResp` OK
   */
  export namespace LuteosDataQueryFinanceCurrencyRate {
    export type RequestParams = {};
    export type RequestQuery = {
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
      /** 报表月份 */
      reportMonth?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FinanceCurrencyRateQueryResp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosDataQueryFinanceSkuHeadPriceList
   * @summary 财务SKU头程单价查询
   * @request GET:/api/luteos/data/queryFinanceSkuHeadPriceList
   * @response `200` `FinanceSkuHeadPriceQueryResp` OK
   */
  export namespace LuteosDataQueryFinanceSkuHeadPriceList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关键字 供应链sku编码、sku名称 */
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
       * 年份
       * @format int32
       */
      year?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FinanceSkuHeadPriceQueryResp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosDataQueryFinanceSkuPurchasePriceList
   * @summary 财务SKU采购单价查询
   * @request GET:/api/luteos/data/queryFinanceSkuPurchasePriceList
   * @response `200` `FinanceSkuPurchasePriceQueryResp` OK
   */
  export namespace LuteosDataQueryFinanceSkuPurchasePriceList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关键字 供应链sku编码、sku名称 */
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
       * 年份
       * @format int32
       */
      year?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = FinanceSkuPurchasePriceQueryResp;
  }

  /**
   * No description
   * @tags 仓库管理
   * @name LuteosDataQueryLuteWarehouse
   * @summary 仓库列表查询（新）
   * @request GET:/api/luteos/data/queryLuteWarehouse
   * @response `200` `LuteWarehouseQueryResp` OK
   */
  export namespace LuteosDataQueryLuteWarehouse {
    export type RequestParams = {};
    export type RequestQuery = {
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
       * 启用禁用
       * @format int32
       */
      status?: number;
      /** 仓库描述 */
      warehouseDesc?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LuteWarehouseQueryResp;
  }

  /**
   * No description
   * @tags 独立站接口
   * @name LuteosDataQueryOnlineProductList
   * @summary 在线商品查询
   * @request GET:/api/luteos/data/queryOnlineProductList
   * @response `200` `ShopifyOnlineProductQueryResp` OK
   */
  export namespace LuteosDataQueryOnlineProductList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** keyword, 名称/productId/variantId */
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShopifyOnlineProductQueryResp;
  }

  /**
   * No description
   * @tags 商品中心
   * @name LuteosDataQueryProductList
   * @summary 商品spu/sku列表查询
   * @request GET:/api/luteos/data/queryProductList
   * @response `200` `ProductListQueryResp` OK
   */
  export namespace LuteosDataQueryProductList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductListQueryResp;
  }

  /**
   * No description
   * @tags 物流管理
   * @name LuteosDataQueryShippingSupplierList
   * @summary 物流服务商列表查询
   * @request GET:/api/luteos/data/queryShippingSupplierList
   * @response `200` `ShippingSupplierQueryResp` OK
   */
  export namespace LuteosDataQueryShippingSupplierList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 物流服务商名称 */
      supplierName?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ShippingSupplierQueryResp;
  }

  /**
   * No description
   * @tags 商品中心
   * @name LuteosDataQuerySkuList
   * @summary 商品sku列表查询
   * @request GET:/api/luteos/data/querySkuList
   * @response `200` `SkuListQueryResp` OK
   */
  export namespace LuteosDataQuerySkuList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关键字 中英文标题查询 */
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
      /** sku code */
      productSku?: string;
      /** spu code */
      productSpu?: string;
      /** spu/sku 标题 */
      productTitle?: string;
      /** spu/sku 英文标题 */
      productTitleEn?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SkuListQueryResp;
  }

  /**
   * No description
   * @tags 供应商管理
   * @name LuteosDataQuerySupplierBaseList
   * @summary 供应商下拉列表查询
   * @request GET:/api/luteos/data/querySupplierBaseList
   * @response `200` `SupplierBaseQueryResp` OK
   */
  export namespace LuteosDataQuerySupplierBaseList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplierBaseQueryResp;
  }

  /**
   * No description
   * @tags 供应商管理
   * @name LuteosDataQuerySupplierList
   * @summary 供应商列表查询
   * @request GET:/api/luteos/data/querySupplierList
   * @response `200` `SupplierQueryResp` OK
   */
  export namespace LuteosDataQuerySupplierList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 采购员编码
       * @format int64
       */
      buyerCode?: number;
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
      /** 供应商名称 */
      supplierName?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SupplierQueryResp;
  }

  /**
   * No description
   * @tags 仓库管理
   * @name LuteosDataQueryWarehouseList
   * @summary 仓库列表查询(旧) 遗留接口，不要再使用
   * @request GET:/api/luteos/data/queryWarehouseList
   * @deprecated
   * @response `200` `WarehouseQueryResp` OK
   */
  export namespace LuteosDataQueryWarehouseList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 是否过滤FBA仓库 */
      filterFBA?: boolean;
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
      /** 仓库描述 */
      warehouseDesc?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WarehouseQueryResp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosDataUpdateDwdSkuHeadPrice
   * @summary 最新SKU头程单价更新
   * @request POST:/api/luteos/data/updateDwdSkuHeadPrice
   * @response `200` `void` OK
   */
  export namespace LuteosDataUpdateDwdSkuHeadPrice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DwdSkuHeadPriceUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosDataUpdateDwdSkuPurchasePrice
   * @summary 最新SKU采购单价更新
   * @request POST:/api/luteos/data/updateDwdSkuPurchasePrice
   * @response `200` `void` OK
   */
  export namespace LuteosDataUpdateDwdSkuPurchasePrice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DwdSkuPurchasePriceUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }
}
