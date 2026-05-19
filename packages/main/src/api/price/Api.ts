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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 调价ASIN商品模块
   * @name LuteosPriceAsinQueryAsinSpuList
   * @summary Asin/productId/itemId商品列表查询
   * @request POST:/api/luteos/price/asin/queryAsinSpuList
   * @response `200` `AsinSpuListQueryResp` OK
   */
  luteosPriceAsinQueryAsinSpuList = (req: AsinSpuListQueryReq, params: RequestParams = {}) =>
    this.request<AsinSpuListQueryResp, any>({
      path: `/api/luteos/price/asin/queryAsinSpuList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价子asin模块
   * @name LuteosPriceDetailExportSubPriceInfoList
   * @summary 调价列表导出功能-子ASIN
   * @request GET:/api/luteos/price/detail/exportSubPriceInfoList
   * @response `200` `CommonExportResp` OK
   */
  luteosPriceDetailExportSubPriceInfoList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/price/detail/exportSubPriceInfoList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价子asin模块
   * @name LuteosPriceDetailQuerySubPriceInfo
   * @summary 调价详情-子ASIN
   * @request GET:/api/luteos/price/detail/querySubPriceInfo
   * @response `200` `QuerySubPriceInfoResp` OK
   */
  luteosPriceDetailQuerySubPriceInfo = (
    query: {
      /** 调价活动编码 */
      paCode: string;
      /** 调价详情编码 */
      paDetailCode: string;
      /**
       * 平台 1-亚马逊 2-独立站 3-新平台
       * @format int32
       */
      platform: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuerySubPriceInfoResp, any>({
      path: `/api/luteos/price/detail/querySubPriceInfo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价子asin模块
   * @name LuteosPriceDetailQuerySubPriceInfoList
   * @summary 调价列表查询-子ASIN
   * @request GET:/api/luteos/price/detail/querySubPriceInfoList
   * @response `200` `QueryPriceInfoListResp` OK
   */
  luteosPriceDetailQuerySubPriceInfoList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<QueryPriceInfoListResp, any>({
      path: `/api/luteos/price/detail/querySubPriceInfoList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价子asin模块
   * @name LuteosPriceDetailUpdateSubPriceInfo
   * @summary 调价详情编辑-子ASIN
   * @request POST:/api/luteos/price/detail/updateSubPriceInfo
   * @response `200` `void` OK
   */
  luteosPriceDetailUpdateSubPriceInfo = (req: PriceInfoSubSaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/price/detail/updateSubPriceInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价模块
   * @name LuteosPriceExportPriceInfoList
   * @summary 调价列表导出功能
   * @request GET:/api/luteos/price/exportPriceInfoList
   * @response `200` `CommonExportResp` OK
   */
  luteosPriceExportPriceInfoList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/price/exportPriceInfoList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价模块
   * @name LuteosPriceExportSubPriceInfoList
   * @summary 调价列表sub导出功能
   * @request POST:/api/luteos/price/exportSubPriceInfoList
   * @response `200` `CommonExportResp` OK
   */
  luteosPriceExportSubPriceInfoList = (req: ChildPriceExportReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/price/exportSubPriceInfoList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价模块
   * @name LuteosPriceImportSubPriceInfoList
   * @summary 调价列表sub导入功能
   * @request POST:/api/luteos/price/importSubPriceInfoList
   * @response `200` `ChildPriceImportResp` OK
   */
  luteosPriceImportSubPriceInfoList = (req: ChildPriceImportReq, params: RequestParams = {}) =>
    this.request<ChildPriceImportResp, any>({
      path: `/api/luteos/price/importSubPriceInfoList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceMonitorJob
   * @summary 监控脚本(新)
   * @request POST:/api/luteos/price/monitorJob
   * @response `200` `void` OK
   */
  luteosPriceMonitorJob = (
    query: {
      /** codeList */
      codeList: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/price/monitorJob`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价模块
   * @name LuteosPriceOperatePriceInfo
   * @summary 调价操作
   * @request POST:/api/luteos/price/operatePriceInfo
   * @response `200` `void` OK
   */
  luteosPriceOperatePriceInfo = (req: PriceOperateReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/price/operatePriceInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceOperateSellerMonitor
   * @summary 操作售价监控(新)
   * @request POST:/api/luteos/price/operateSellerMonitor
   * @response `200` `SellerSkuCommonResp` OK
   */
  luteosPriceOperateSellerMonitor = (req: SellerMonitorOperateReq, params: RequestParams = {}) =>
    this.request<SellerSkuCommonResp, any>({
      path: `/api/luteos/price/operateSellerMonitor`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceQueryAllMskuMonitorDetail
   * @summary 查询全量MSKU售价监控明细(新)
   * @request POST:/api/luteos/price/queryAllMskuMonitorDetail
   * @response `200` `SellerSkuAllMskuDetailResp` OK
   */
  luteosPriceQueryAllMskuMonitorDetail = (req: SellerSkuDetailReq, params: RequestParams = {}) =>
    this.request<SellerSkuAllMskuDetailResp, any>({
      path: `/api/luteos/price/queryAllMskuMonitorDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceQueryAllMskuMonitorList
   * @summary 查询全量msku售价监控列表(新)
   * @request POST:/api/luteos/price/queryAllMskuMonitorList
   * @response `200` `SellerSkuAllMskuQueryResp` OK
   */
  luteosPriceQueryAllMskuMonitorList = (
    req: SellerSkuAllMskuQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SellerSkuAllMskuQueryResp, any>({
      path: `/api/luteos/price/queryAllMskuMonitorList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceQueryMonitorDetail
   * @summary 查询MSKU售价监控明细(旧)
   * @request GET:/api/luteos/price/queryMonitorDetail
   * @response `200` `SellerMskuDetailResp` OK
   */
  luteosPriceQueryMonitorDetail = (
    query: {
      /** 唯一编码 */
      rpaCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SellerMskuDetailResp, any>({
      path: `/api/luteos/price/queryMonitorDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceQueryMonitorList
   * @summary 查询MSKU售价监控列表(旧)
   * @request GET:/api/luteos/price/queryMonitorList
   * @response `200` `SellerMskuQueryResp` OK
   */
  luteosPriceQueryMonitorList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<SellerMskuQueryResp, any>({
      path: `/api/luteos/price/queryMonitorList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价模块
   * @name LuteosPriceQueryPriceInfo
   * @summary 调价详情
   * @request GET:/api/luteos/price/queryPriceInfo
   * @response `200` `QueryPriceInfoResp` OK
   */
  luteosPriceQueryPriceInfo = (
    query: {
      /** 调价活动编码 */
      paCode: string;
      /** 调价详情编码 */
      paDetailCode: string;
      /**
       * 平台 1-亚马逊 2-独立站 3-新平台
       * @format int32
       */
      platform: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QueryPriceInfoResp, any>({
      path: `/api/luteos/price/queryPriceInfo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价模块
   * @name LuteosPriceQueryPriceInfoList
   * @summary 调价列表查询
   * @request GET:/api/luteos/price/queryPriceInfoList
   * @response `200` `QueryPriceInfoListResp` OK
   */
  luteosPriceQueryPriceInfoList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<QueryPriceInfoListResp, any>({
      path: `/api/luteos/price/queryPriceInfoList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价模块
   * @name LuteosPriceQueryPriceRule
   * @summary 风控规则查询
   * @request GET:/api/luteos/price/queryPriceRule
   * @response `200` `PriceRuleResp` OK
   */
  luteosPriceQueryPriceRule = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<PriceRuleResp, any>({
      path: `/api/luteos/price/queryPriceRule`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价模块
   * @name LuteosPriceQueryPriceRuleOperationLogs
   * @summary 风控操作日志查询
   * @request GET:/api/luteos/price/queryPriceRuleOperationLogs
   * @response `200` `PriceRuleOperationLogQueryListResp` OK
   */
  luteosPriceQueryPriceRuleOperationLogs = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<PriceRuleOperationLogQueryListResp, any>({
      path: `/api/luteos/price/queryPriceRuleOperationLogs`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceQueryRecordList
   * @summary 查询售价监控记录列表
   * @request GET:/api/luteos/price/queryRecordList
   * @response `200` `SellerSkuRecordResp` OK
   */
  luteosPriceQueryRecordList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<SellerSkuRecordResp, any>({
      path: `/api/luteos/price/queryRecordList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceQueryRecordListExport
   * @summary 导出售价监控记录列表
   * @request GET:/api/luteos/price/queryRecordList/export
   * @response `200` `CommonExportResp` OK
   */
  luteosPriceQueryRecordListExport = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/price/queryRecordList/export`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceQuerySellerSkuMonitorList
   * @summary 查询SKU售价监控列表(旧)
   * @request GET:/api/luteos/price/querySellerSkuMonitorList
   * @response `200` `SellerSkuQueryResp` OK
   */
  luteosPriceQuerySellerSkuMonitorList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<SellerSkuQueryResp, any>({
      path: `/api/luteos/price/querySellerSkuMonitorList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceQuerySkuMonitorDetail
   * @summary 查询SKU售价监控明细(旧)
   * @request GET:/api/luteos/price/querySkuMonitorDetail
   * @response `200` `SellerSkuDetailResp` OK
   */
  luteosPriceQuerySkuMonitorDetail = (
    query: {
      /** 唯一编码 */
      rpaCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SellerSkuDetailResp, any>({
      path: `/api/luteos/price/querySkuMonitorDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价模块
   * @name LuteosPriceQuerySubPriceStatisticsList
   * @summary 调价统计
   * @request GET:/api/luteos/price/querySubPriceStatisticsList
   * @response `200` `QuerySubPriceStatisticsListResp` OK
   */
  luteosPriceQuerySubPriceStatisticsList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<QuerySubPriceStatisticsListResp, any>({
      path: `/api/luteos/price/querySubPriceStatisticsList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceSaveMonitorRole
   * @summary 保存监控设置(新)
   * @request POST:/api/luteos/price/saveMonitorRole
   * @response `200` `CommonRespObject` OK
   */
  luteosPriceSaveMonitorRole = (req: MonitorSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/price/saveMonitorRole`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价模块
   * @name LuteosPriceSaveOrUpdatePriceInfo
   * @summary 调价新增/提交
   * @request POST:/api/luteos/price/saveOrUpdatePriceInfo
   * @response `200` `PriceInfoSaveResp` OK
   */
  luteosPriceSaveOrUpdatePriceInfo = (req: PriceInfoSaveReq, params: RequestParams = {}) =>
    this.request<PriceInfoSaveResp, any>({
      path: `/api/luteos/price/saveOrUpdatePriceInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价模块
   * @name LuteosPriceSavePriceRule
   * @summary 风控规则保存
   * @request POST:/api/luteos/price/savePriceRule
   * @response `200` `void` OK
   */
  luteosPriceSavePriceRule = (req: PriceRuleSaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/price/savePriceRule`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售价监控模块
   * @name LuteosPriceSaveSellerSku
   * @summary 新增在售商品监控信息(新)
   * @request POST:/api/luteos/price/saveSellerSku
   * @response `200` `CommonRespObject` OK
   */
  luteosPriceSaveSellerSku = (req: SellerSkuRpaSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/price/saveSellerSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价ASIN店铺模块
   * @name LuteosPriceShopQueryAsinShopList
   * @summary ASIN店铺查询
   * @request GET:/api/luteos/price/shop/queryAsinShopList
   * @response `200` `AmazonCapitalShopResp` OK
   */
  luteosPriceShopQueryAsinShopList = (params: RequestParams = {}) =>
    this.request<AmazonCapitalShopResp, any>({
      path: `/api/luteos/price/shop/queryAsinShopList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 调价ASIN站点模块
   * @name LuteosPriceSiteQueryAsinSiteList
   * @summary ASIN站点查询
   * @request GET:/api/luteos/price/site/queryAsinSiteList
   * @response `200` `AmazonCapitalSiteResp` OK
   */
  luteosPriceSiteQueryAsinSiteList = (params: RequestParams = {}) =>
    this.request<AmazonCapitalSiteResp, any>({
      path: `/api/luteos/price/site/queryAsinSiteList`,
      method: 'GET',
      ...params,
    });
}
