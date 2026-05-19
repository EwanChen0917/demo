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
  AmazonCapitalShopResp,
  AmazonCapitalSiteResp,
  AsinSpuListQueryReq,
  AsinSpuListQueryResp,
  ChildPriceExportReq,
  ChildPriceImportReq,
  ChildPriceImportResp,
  CommonExportResp,
  CommonRespObject,
  MonitorSaveReq,
  PriceInfoSaveReq,
  PriceInfoSaveResp,
  PriceInfoSubSaveReq,
  PriceOperateReq,
  PriceRuleOperationLogQueryListResp,
  PriceRuleResp,
  PriceRuleSaveReq,
  QueryPriceInfoListResp,
  QueryPriceInfoResp,
  QuerySubPriceInfoResp,
  QuerySubPriceStatisticsListResp,
  SellerMonitorOperateReq,
  SellerMskuDetailResp,
  SellerMskuQueryResp,
  SellerSkuAllMskuDetailResp,
  SellerSkuAllMskuQueryReq,
  SellerSkuAllMskuQueryResp,
  SellerSkuCommonResp,
  SellerSkuDetailReq,
  SellerSkuDetailResp,
  SellerSkuQueryResp,
  SellerSkuRecordResp,
  SellerSkuRpaSaveReq,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 调价ASIN商品模块
   * @name LuteosPriceAsinQueryAsinSpuList
   * @summary Asin/productId/itemId商品列表查询
   * @request POST:/api/luteos/price/asin/queryAsinSpuList
   * @response `200` `AsinSpuListQueryResp` OK
   */
  export namespace LuteosPriceAsinQueryAsinSpuList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AsinSpuListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AsinSpuListQueryResp;
  }

  /**
   * No description
   * @tags 调价子asin模块
   * @name LuteosPriceDetailExportSubPriceInfoList
   * @summary 调价列表导出功能-子ASIN
   * @request GET:/api/luteos/price/detail/exportSubPriceInfoList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosPriceDetailExportSubPriceInfoList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 调价类型 1-涨价 2-降价 3-秒杀 4-coupon
       * @format int32
       */
      adjustType?: number;
      /** 审批人 */
      approver?: string;
      /**
       * 审批状态 1-待审批 2-审批通过 3-审批拒绝 4-已撤回
       * @format int32
       */
      approveStatus?: number;
      /** 渠道集合 */
      channelList?: string[];
      /** 创建人 */
      creator?: string;
      /**
       * 调价周期结束时间
       * @format date
       */
      endTime?: string;
      /** 父ASIN/商品名称/SPU/Item ID/Seller SKU/子ASIN/SKU */
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
      /**
       * 平台 1-亚马逊 2-独立站 3-新平台 4-tiktok
       * @format int32
       */
      platform: number;
      /** 站点 */
      shopSiteList?: string[];
      /**
       * 调价周期开始时间
       * @format date
       */
      startTime?: string;
      /**
       * 活动状态 1-待开始 2-进行中 3-已结束 4-已取消
       * @format int32
       */
      status?: number;
    };
    export type RequestBody = never;
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
   * @tags 调价子asin模块
   * @name LuteosPriceDetailQuerySubPriceInfo
   * @summary 调价详情-子ASIN
   * @request GET:/api/luteos/price/detail/querySubPriceInfo
   * @response `200` `QuerySubPriceInfoResp` OK
   */
  export namespace LuteosPriceDetailQuerySubPriceInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 调价活动编码 */
      paCode: string;
      /** 调价详情编码 */
      paDetailCode: string;
      /**
       * 平台 1-亚马逊 2-独立站 3-新平台
       * @format int32
       */
      platform: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = QuerySubPriceInfoResp;
  }

  /**
   * No description
   * @tags 调价子asin模块
   * @name LuteosPriceDetailQuerySubPriceInfoList
   * @summary 调价列表查询-子ASIN
   * @request GET:/api/luteos/price/detail/querySubPriceInfoList
   * @response `200` `QueryPriceInfoListResp` OK
   */
  export namespace LuteosPriceDetailQuerySubPriceInfoList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 调价类型 1-涨价 2-降价 3-秒杀 4-coupon
       * @format int32
       */
      adjustType?: number;
      /** 审批人 */
      approver?: string;
      /**
       * 审批状态 1-待审批 2-审批通过 3-审批拒绝 4-已撤回
       * @format int32
       */
      approveStatus?: number;
      /** 渠道集合 */
      channelList?: string[];
      /** 创建人 */
      creator?: string;
      /**
       * 调价周期结束时间
       * @format date
       */
      endTime?: string;
      /** 父ASIN/商品名称/SPU/Item ID/Seller SKU/子ASIN/SKU */
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
      /**
       * 平台 1-亚马逊 2-独立站 3-新平台 4-tiktok
       * @format int32
       */
      platform: number;
      /** 站点 */
      shopSiteList?: string[];
      /**
       * 调价周期开始时间
       * @format date
       */
      startTime?: string;
      /**
       * 活动状态 1-待开始 2-进行中 3-已结束 4-已取消
       * @format int32
       */
      status?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = QueryPriceInfoListResp;
  }

  /**
   * No description
   * @tags 调价子asin模块
   * @name LuteosPriceDetailUpdateSubPriceInfo
   * @summary 调价详情编辑-子ASIN
   * @request POST:/api/luteos/price/detail/updateSubPriceInfo
   * @response `200` `void` OK
   */
  export namespace LuteosPriceDetailUpdateSubPriceInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PriceInfoSubSaveReq;
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
   * @tags 调价模块
   * @name LuteosPriceExportPriceInfoList
   * @summary 调价列表导出功能
   * @request GET:/api/luteos/price/exportPriceInfoList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosPriceExportPriceInfoList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 调价类型 1-涨价 2-降价 3-秒杀 4-coupon
       * @format int32
       */
      adjustType?: number;
      /** 审批人 */
      approver?: string;
      /**
       * 审批状态 1-待审批 2-审批通过 3-审批拒绝 4-已撤回
       * @format int32
       */
      approveStatus?: number;
      /** 渠道集合 */
      channelList?: string[];
      /** 创建人 */
      creator?: string;
      /**
       * 调价周期结束时间
       * @format date
       */
      endTime?: string;
      /** 父ASIN/商品名称/SPU/Item ID/Seller SKU/子ASIN/SKU */
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
      /**
       * 平台 1-亚马逊 2-独立站 3-新平台 4-tiktok
       * @format int32
       */
      platform: number;
      /** 站点 */
      shopSiteList?: string[];
      /**
       * 调价周期开始时间
       * @format date
       */
      startTime?: string;
      /**
       * 活动状态 1-待开始 2-进行中 3-已结束 4-已取消
       * @format int32
       */
      status?: number;
    };
    export type RequestBody = never;
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
   * @tags 调价模块
   * @name LuteosPriceExportSubPriceInfoList
   * @summary 调价列表sub导出功能
   * @request POST:/api/luteos/price/exportSubPriceInfoList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosPriceExportSubPriceInfoList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChildPriceExportReq;
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
   * @tags 调价模块
   * @name LuteosPriceImportSubPriceInfoList
   * @summary 调价列表sub导入功能
   * @request POST:/api/luteos/price/importSubPriceInfoList
   * @response `200` `ChildPriceImportResp` OK
   */
  export namespace LuteosPriceImportSubPriceInfoList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChildPriceImportReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ChildPriceImportResp;
  }

  /**
   * No description
   * @tags 售价监控模块
   * @name LuteosPriceMonitorJob
   * @summary 监控脚本(新)
   * @request POST:/api/luteos/price/monitorJob
   * @response `200` `void` OK
   */
  export namespace LuteosPriceMonitorJob {
    export type RequestParams = {};
    export type RequestQuery = {
      /** codeList */
      codeList: string[];
    };
    export type RequestBody = never;
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
   * @tags 调价模块
   * @name LuteosPriceOperatePriceInfo
   * @summary 调价操作
   * @request POST:/api/luteos/price/operatePriceInfo
   * @response `200` `void` OK
   */
  export namespace LuteosPriceOperatePriceInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PriceOperateReq;
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
   * @tags 售价监控模块
   * @name LuteosPriceOperateSellerMonitor
   * @summary 操作售价监控(新)
   * @request POST:/api/luteos/price/operateSellerMonitor
   * @response `200` `SellerSkuCommonResp` OK
   */
  export namespace LuteosPriceOperateSellerMonitor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SellerMonitorOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SellerSkuCommonResp;
  }

  /**
   * No description
   * @tags 售价监控模块
   * @name LuteosPriceQueryAllMskuMonitorDetail
   * @summary 查询全量MSKU售价监控明细(新)
   * @request POST:/api/luteos/price/queryAllMskuMonitorDetail
   * @response `200` `SellerSkuAllMskuDetailResp` OK
   */
  export namespace LuteosPriceQueryAllMskuMonitorDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SellerSkuDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SellerSkuAllMskuDetailResp;
  }

  /**
   * No description
   * @tags 售价监控模块
   * @name LuteosPriceQueryAllMskuMonitorList
   * @summary 查询全量msku售价监控列表(新)
   * @request POST:/api/luteos/price/queryAllMskuMonitorList
   * @response `200` `SellerSkuAllMskuQueryResp` OK
   */
  export namespace LuteosPriceQueryAllMskuMonitorList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SellerSkuAllMskuQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SellerSkuAllMskuQueryResp;
  }

  /**
   * No description
   * @tags 售价监控模块
   * @name LuteosPriceQueryMonitorDetail
   * @summary 查询MSKU售价监控明细(旧)
   * @request GET:/api/luteos/price/queryMonitorDetail
   * @response `200` `SellerMskuDetailResp` OK
   */
  export namespace LuteosPriceQueryMonitorDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 唯一编码 */
      rpaCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SellerMskuDetailResp;
  }

  /**
   * No description
   * @tags 售价监控模块
   * @name LuteosPriceQueryMonitorList
   * @summary 查询MSKU售价监控列表(旧)
   * @request GET:/api/luteos/price/queryMonitorList
   * @response `200` `SellerMskuQueryResp` OK
   */
  export namespace LuteosPriceQueryMonitorList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道 */
      channel?: string;
      /** 产品sku/产品名称 */
      keyword?: string;
      /** 店铺sku */
      msku?: string;
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
      /** 店铺 */
      shop?: string;
      /** 站点 */
      site?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SellerMskuQueryResp;
  }

  /**
   * No description
   * @tags 调价模块
   * @name LuteosPriceQueryPriceInfo
   * @summary 调价详情
   * @request GET:/api/luteos/price/queryPriceInfo
   * @response `200` `QueryPriceInfoResp` OK
   */
  export namespace LuteosPriceQueryPriceInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 调价活动编码 */
      paCode: string;
      /** 调价详情编码 */
      paDetailCode: string;
      /**
       * 平台 1-亚马逊 2-独立站 3-新平台
       * @format int32
       */
      platform: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = QueryPriceInfoResp;
  }

  /**
   * No description
   * @tags 调价模块
   * @name LuteosPriceQueryPriceInfoList
   * @summary 调价列表查询
   * @request GET:/api/luteos/price/queryPriceInfoList
   * @response `200` `QueryPriceInfoListResp` OK
   */
  export namespace LuteosPriceQueryPriceInfoList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 调价类型 1-涨价 2-降价 3-秒杀 4-coupon
       * @format int32
       */
      adjustType?: number;
      /** 审批人 */
      approver?: string;
      /**
       * 审批状态 1-待审批 2-审批通过 3-审批拒绝 4-已撤回
       * @format int32
       */
      approveStatus?: number;
      /** 渠道集合 */
      channelList?: string[];
      /** 创建人 */
      creator?: string;
      /**
       * 调价周期结束时间
       * @format date
       */
      endTime?: string;
      /** 父ASIN/商品名称/SPU/Item ID/Seller SKU/子ASIN/SKU */
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
      /**
       * 平台 1-亚马逊 2-独立站 3-新平台 4-tiktok
       * @format int32
       */
      platform: number;
      /** 站点 */
      shopSiteList?: string[];
      /**
       * 调价周期开始时间
       * @format date
       */
      startTime?: string;
      /**
       * 活动状态 1-待开始 2-进行中 3-已结束 4-已取消
       * @format int32
       */
      status?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = QueryPriceInfoListResp;
  }

  /**
   * No description
   * @tags 调价模块
   * @name LuteosPriceQueryPriceRule
   * @summary 风控规则查询
   * @request GET:/api/luteos/price/queryPriceRule
   * @response `200` `PriceRuleResp` OK
   */
  export namespace LuteosPriceQueryPriceRule {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 调价活动编码  调价列表查询必填 */
      paCode?: string;
      /**
       * 平台 1-亚马逊 2-独立站 3-新平台
       * @format int32
       */
      platform: number;
      /**
       * 查询类型 1-调价列表 2-风控列表
       * @format int32
       */
      selectType: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PriceRuleResp;
  }

  /**
   * No description
   * @tags 调价模块
   * @name LuteosPriceQueryPriceRuleOperationLogs
   * @summary 风控操作日志查询
   * @request GET:/api/luteos/price/queryPriceRuleOperationLogs
   * @response `200` `PriceRuleOperationLogQueryListResp` OK
   */
  export namespace LuteosPriceQueryPriceRuleOperationLogs {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 调价活动编码  调价列表查询必填 */
      paCode?: string;
      /**
       * 平台 1-亚马逊 2-独立站 3-新平台
       * @format int32
       */
      platform: number;
      /**
       * 查询类型 1-调价列表 2-风控列表
       * @format int32
       */
      selectType: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PriceRuleOperationLogQueryListResp;
  }

  /**
   * No description
   * @tags 售价监控模块
   * @name LuteosPriceQueryRecordList
   * @summary 查询售价监控记录列表
   * @request GET:/api/luteos/price/queryRecordList
   * @response `200` `SellerSkuRecordResp` OK
   */
  export namespace LuteosPriceQueryRecordList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道（与销售映射渠道一致） */
      channel?: string;
      /**
       * 异常类型，传枚举 type：error/violation/msrp_error
       * @example "error"
       */
      errorType?: string;
      /** 产品sku/产品名称（兼容） */
      keyword?: string;
      /** 店铺sku（msku） */
      msku?: string;
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
      /** 产品sku */
      productSku?: string;
      /**
       * 监控日期
       * @format date
       * @example "2024-01-01"
       */
      recordDate?: string;
      /**
       * 监控类型，传枚举 1：售价监控
       * @format int32
       * @example "msrp"
       */
      recordMonitorType?: number;
      /** 店铺（与销售映射店铺一致） */
      shop?: string;
      /** 站点（与销售映射站点一致） */
      site?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SellerSkuRecordResp;
  }

  /**
   * No description
   * @tags 售价监控模块
   * @name LuteosPriceQueryRecordListExport
   * @summary 导出售价监控记录列表
   * @request GET:/api/luteos/price/queryRecordList/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosPriceQueryRecordListExport {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道（与销售映射渠道一致） */
      channel?: string;
      /**
       * 异常类型，传枚举 type：error/violation/msrp_error
       * @example "error"
       */
      errorType?: string;
      /** 产品sku/产品名称（兼容） */
      keyword?: string;
      /** 店铺sku（msku） */
      msku?: string;
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
      /** 产品sku */
      productSku?: string;
      /**
       * 监控日期
       * @format date
       * @example "2024-01-01"
       */
      recordDate?: string;
      /**
       * 监控类型，传枚举 1：售价监控
       * @format int32
       * @example "msrp"
       */
      recordMonitorType?: number;
      /** 店铺（与销售映射店铺一致） */
      shop?: string;
      /** 站点（与销售映射站点一致） */
      site?: string;
    };
    export type RequestBody = never;
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
   * @tags 售价监控模块
   * @name LuteosPriceQuerySellerSkuMonitorList
   * @summary 查询SKU售价监控列表(旧)
   * @request GET:/api/luteos/price/querySellerSkuMonitorList
   * @response `200` `SellerSkuQueryResp` OK
   */
  export namespace LuteosPriceQuerySellerSkuMonitorList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 产品sku/产品名称 */
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
      /** 产品品线 */
      productLine?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SellerSkuQueryResp;
  }

  /**
   * No description
   * @tags 售价监控模块
   * @name LuteosPriceQuerySkuMonitorDetail
   * @summary 查询SKU售价监控明细(旧)
   * @request GET:/api/luteos/price/querySkuMonitorDetail
   * @response `200` `SellerSkuDetailResp` OK
   */
  export namespace LuteosPriceQuerySkuMonitorDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 唯一编码 */
      rpaCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SellerSkuDetailResp;
  }

  /**
   * No description
   * @tags 调价模块
   * @name LuteosPriceQuerySubPriceStatisticsList
   * @summary 调价统计
   * @request GET:/api/luteos/price/querySubPriceStatisticsList
   * @response `200` `QuerySubPriceStatisticsListResp` OK
   */
  export namespace LuteosPriceQuerySubPriceStatisticsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 调价活动编码 */
      paCode: string;
      /** 调价活动详情编码 详情的时候必传 */
      paDetailCode?: string;
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
       * 平台 1-亚马逊 2-独立站 3-新平台
       * @format int32
       */
      platform: number;
      /** 子asin/子productId/子itemId编码 */
      subCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = QuerySubPriceStatisticsListResp;
  }

  /**
   * No description
   * @tags 售价监控模块
   * @name LuteosPriceSaveMonitorRole
   * @summary 保存监控设置(新)
   * @request POST:/api/luteos/price/saveMonitorRole
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosPriceSaveMonitorRole {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MonitorSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 调价模块
   * @name LuteosPriceSaveOrUpdatePriceInfo
   * @summary 调价新增/提交
   * @request POST:/api/luteos/price/saveOrUpdatePriceInfo
   * @response `200` `PriceInfoSaveResp` OK
   */
  export namespace LuteosPriceSaveOrUpdatePriceInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PriceInfoSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PriceInfoSaveResp;
  }

  /**
   * No description
   * @tags 调价模块
   * @name LuteosPriceSavePriceRule
   * @summary 风控规则保存
   * @request POST:/api/luteos/price/savePriceRule
   * @response `200` `void` OK
   */
  export namespace LuteosPriceSavePriceRule {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PriceRuleSaveReq;
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
   * @tags 售价监控模块
   * @name LuteosPriceSaveSellerSku
   * @summary 新增在售商品监控信息(新)
   * @request POST:/api/luteos/price/saveSellerSku
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosPriceSaveSellerSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SellerSkuRpaSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }

  /**
   * No description
   * @tags 调价ASIN店铺模块
   * @name LuteosPriceShopQueryAsinShopList
   * @summary ASIN店铺查询
   * @request GET:/api/luteos/price/shop/queryAsinShopList
   * @response `200` `AmazonCapitalShopResp` OK
   */
  export namespace LuteosPriceShopQueryAsinShopList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AmazonCapitalShopResp;
  }

  /**
   * No description
   * @tags 调价ASIN站点模块
   * @name LuteosPriceSiteQueryAsinSiteList
   * @summary ASIN站点查询
   * @request GET:/api/luteos/price/site/queryAsinSiteList
   * @response `200` `AmazonCapitalSiteResp` OK
   */
  export namespace LuteosPriceSiteQueryAsinSiteList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AmazonCapitalSiteResp;
  }
}
