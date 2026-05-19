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
  CommonRespReplacementShopQueryResp,
  CommonRespString,
  RefundAuditReq,
  RefundBatchDeletedReq,
  RefundBatchRePushReq,
  RefundEditRemarkReq,
  RefundQueryListReq,
  RefundQueryListResp,
  ReplacemenetShopQueryReq,
  ReplacementBatchDeletedReq,
  ReplacementEditAddressReq,
  ReplacementEditRemarkReq,
  ReplacementQueryListReq,
  ReplacementQueryListResp,
  ReplacementShopReq,
  ReplacementSkuReq,
  ServiceLabelQueryDetailReq,
  ServiceLabelQueryDetailResp,
  ServiceLabelQueryListReq,
  ServiceLabelQueryListResp,
  ServiceLabelQueryOptionReq,
  ServiceLabelQueryOptionResp,
  ServiceLabelSaveReq,
  ServiceLabelSaveResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 售后订单-退款, 批量审核
   * @name LuteosAfterSaleRefundBatchAudit
   * @summary 批量审核
   * @request POST:/api/luteos/after/sale/refund/batchAudit
   * @response `200` `CommonRespString` OK
   */
  luteosAfterSaleRefundBatchAudit = (req: RefundAuditReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/after/sale/refund/batchAudit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-退款, 批量删除
   * @name LuteosAfterSaleRefundBatchDeleted
   * @summary 批量删除
   * @request POST:/api/luteos/after/sale/refund/batchDeleted
   * @response `200` `CommonRespString` OK
   */
  luteosAfterSaleRefundBatchDeleted = (req: RefundBatchDeletedReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/after/sale/refund/batchDeleted`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-退款, 批量重推
   * @name LuteosAfterSaleRefundBatchRePush
   * @summary 批量重推
   * @request POST:/api/luteos/after/sale/refund/batchRePush
   * @response `200` `CommonRespString` OK
   */
  luteosAfterSaleRefundBatchRePush = (req: RefundBatchRePushReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/after/sale/refund/batchRePush`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-退款, 编辑备注
   * @name LuteosAfterSaleRefundEditRemark
   * @summary 编辑备注
   * @request POST:/api/luteos/after/sale/refund/editRemark
   * @response `200` `CommonRespString` OK
   */
  luteosAfterSaleRefundEditRemark = (req: RefundEditRemarkReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/after/sale/refund/editRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-退款
   * @name LuteosAfterSaleRefundExport
   * @summary 导出
   * @request POST:/api/luteos/after/sale/refund/export
   * @response `200` `CommonExportResp` OK
   */
  luteosAfterSaleRefundExport = (req: RefundQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/after/sale/refund/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-退款, 退款列表
   * @name LuteosAfterSaleRefundQueryList
   * @summary 退款列表
   * @request POST:/api/luteos/after/sale/refund/queryList
   * @response `200` `RefundQueryListResp` OK
   */
  luteosAfterSaleRefundQueryList = (req: RefundQueryListReq, params: RequestParams = {}) =>
    this.request<RefundQueryListResp, any>({
      path: `/api/luteos/after/sale/refund/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-补发, 批量删除
   * @name LuteosAfterSaleReplacementBatchDeleted
   * @summary 批量删除
   * @request POST:/api/luteos/after/sale/replacement/batchDeleted
   * @response `200` `CommonRespString` OK
   */
  luteosAfterSaleReplacementBatchDeleted = (
    req: ReplacementBatchDeletedReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/after/sale/replacement/batchDeleted`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-补发, 批量重推
   * @name LuteosAfterSaleReplacementBatchRePush
   * @summary 批量重推
   * @request POST:/api/luteos/after/sale/replacement/batchRePush
   * @response `200` `CommonRespString` OK
   */
  luteosAfterSaleReplacementBatchRePush = (
    req: ReplacementBatchDeletedReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/after/sale/replacement/batchRePush`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-补发, 编辑地址
   * @name LuteosAfterSaleReplacementEditAddress
   * @summary 编辑地址
   * @request POST:/api/luteos/after/sale/replacement/editAddress
   * @response `200` `CommonRespString` OK
   */
  luteosAfterSaleReplacementEditAddress = (
    req: ReplacementEditAddressReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/after/sale/replacement/editAddress`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-补发, 编辑备注
   * @name LuteosAfterSaleReplacementEditRemark
   * @summary 编辑备注
   * @request POST:/api/luteos/after/sale/replacement/editRemark
   * @response `200` `CommonRespString` OK
   */
  luteosAfterSaleReplacementEditRemark = (
    req: ReplacementEditRemarkReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/after/sale/replacement/editRemark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-补发
   * @name LuteosAfterSaleReplacementExport
   * @summary 导出
   * @request POST:/api/luteos/after/sale/replacement/export
   * @response `200` `CommonExportResp` OK
   */
  luteosAfterSaleReplacementExport = (req: ReplacementQueryListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/after/sale/replacement/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 列表查询, 售后订单-补发
   * @name LuteosAfterSaleReplacementQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/after/sale/replacement/queryList
   * @response `200` `ReplacementQueryListResp` OK
   */
  luteosAfterSaleReplacementQueryList = (
    req: ReplacementQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<ReplacementQueryListResp, any>({
      path: `/api/luteos/after/sale/replacement/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-补发
   * @name LuteosAfterSaleReplacementQueryShop
   * @summary 获取店铺
   * @request POST:/api/luteos/after/sale/replacement/queryShop
   * @response `200` `CommonRespReplacementShopQueryResp` OK
   */
  luteosAfterSaleReplacementQueryShop = (
    req: ReplacemenetShopQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespReplacementShopQueryResp, any>({
      path: `/api/luteos/after/sale/replacement/queryShop`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-补发, 更换店铺/站点
   * @name LuteosAfterSaleReplacementReplacementShop
   * @summary 更换店铺/站点
   * @request POST:/api/luteos/after/sale/replacement/replacementShop
   * @response `200` `CommonRespString` OK
   */
  luteosAfterSaleReplacementReplacementShop = (
    req: ReplacementShopReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/after/sale/replacement/replacementShop`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后订单-补发, 替换sku
   * @name LuteosAfterSaleReplacementReplacementSku
   * @summary 替换sku
   * @request POST:/api/luteos/after/sale/replacement/replacementSku
   * @response `200` `CommonRespString` OK
   */
  luteosAfterSaleReplacementReplacementSku = (req: ReplacementSkuReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/after/sale/replacement/replacementSku`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后客服标签
   * @name LuteosAfterSaleServiceLabelQueryDetail
   * @summary 客服标签详情
   * @request POST:/api/luteos/after/sale/serviceLabel/queryDetail
   * @response `200` `ServiceLabelQueryDetailResp` OK
   */
  luteosAfterSaleServiceLabelQueryDetail = (
    req: ServiceLabelQueryDetailReq,
    params: RequestParams = {},
  ) =>
    this.request<ServiceLabelQueryDetailResp, any>({
      path: `/api/luteos/after/sale/serviceLabel/queryDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后客服标签
   * @name LuteosAfterSaleServiceLabelQueryList
   * @summary 客服标签列表
   * @request POST:/api/luteos/after/sale/serviceLabel/queryList
   * @response `200` `ServiceLabelQueryListResp` OK
   */
  luteosAfterSaleServiceLabelQueryList = (
    req: ServiceLabelQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<ServiceLabelQueryListResp, any>({
      path: `/api/luteos/after/sale/serviceLabel/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后客服标签
   * @name LuteosAfterSaleServiceLabelQueryOption
   * @summary 客服标签选项
   * @request POST:/api/luteos/after/sale/serviceLabel/queryOption
   * @response `200` `ServiceLabelQueryOptionResp` OK
   */
  luteosAfterSaleServiceLabelQueryOption = (
    req: ServiceLabelQueryOptionReq,
    params: RequestParams = {},
  ) =>
    this.request<ServiceLabelQueryOptionResp, any>({
      path: `/api/luteos/after/sale/serviceLabel/queryOption`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 售后客服标签
   * @name LuteosAfterSaleServiceLabelSave
   * @summary 客服标签保存
   * @request POST:/api/luteos/after/sale/serviceLabel/save
   * @response `200` `ServiceLabelSaveResp` OK
   */
  luteosAfterSaleServiceLabelSave = (req: ServiceLabelSaveReq, params: RequestParams = {}) =>
    this.request<ServiceLabelSaveResp, any>({
      path: `/api/luteos/after/sale/serviceLabel/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
