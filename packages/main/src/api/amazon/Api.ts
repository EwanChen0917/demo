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
  AmazonFileDeleteReq,
  AmazonFileListReq,
  AmazonFileListResp,
  AmazonOrderDetailQueryReq,
  AmazonOrderDetailResp,
  AmazonOrderListReq,
  BatchUploadReq,
  CommonRespAmazonOrderListResp,
  CommonRespAmazonRefundReasonResp,
  CommonRespBatchUploadResp,
  CommonRespObject,
  CommonRespString,
  CommonRespVoid,
  TsAmazon,
  TsAmazon2,
  TsAmazon4,
  TsAmazon6,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags amazon合规文件
   * @name LuteosAmazonFileDelete
   * @summary 删除文件生成记录
   * @request POST:/api/luteos/amazon/file/delete
   * @response `200` `CommonRespVoid` OK
   */
  luteosAmazonFileDelete = (req: AmazonFileDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/luteos/amazon/file/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags amazon合规文件
   * @name LuteosAmazonFileQueryList
   * @summary 获取文件记录列表
   * @request POST:/api/luteos/amazon/file/queryList
   * @response `200` `AmazonFileListResp` OK
   */
  luteosAmazonFileQueryList = (req: AmazonFileListReq, params: RequestParams = {}) =>
    this.request<AmazonFileListResp, any>({
      path: `/api/luteos/amazon/file/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags amazon合规文件
   * @name LuteosAmazonFileUpload
   * @summary 上传文件并生成链接
   * @request POST:/api/luteos/amazon/file/upload
   * @response `200` `CommonRespBatchUploadResp` OK
   */
  luteosAmazonFileUpload = (req: BatchUploadReq, params: RequestParams = {}) =>
    this.request<CommonRespBatchUploadResp, any>({
      path: `/api/luteos/amazon/file/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsGenerateCode
   * @summary 生成编码
   * @request GET:/api/luteos/amazon/ts/generateCode
   * @response `200` `CommonRespString` OK
   */
  luteosAmazonTsGenerateCode = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/amazon/ts/generateCode`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsQueryAmazonRefundReason
   * @summary 获取amazon退款原因
   * @request GET:/api/luteos/amazon/ts/queryAmazonRefundReason
   * @response `200` `CommonRespAmazonRefundReasonResp` OK
   */
  luteosAmazonTsQueryAmazonRefundReason = (params: RequestParams = {}) =>
    this.request<CommonRespAmazonRefundReasonResp, any>({
      path: `/api/luteos/amazon/ts/queryAmazonRefundReason`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsQueryOrder
   * @summary 查询amazon订单
   * @request POST:/api/luteos/amazon/ts/queryOrder
   * @response `200` `TsAmazon` OK
   */
  luteosAmazonTsQueryOrder = (req: TsAmazon2, params: RequestParams = {}) =>
    this.request<TsAmazon, any>({
      path: `/api/luteos/amazon/ts/queryOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsQueryOrderDetail
   * @summary amazon-search接口
   * @request POST:/api/luteos/amazon/ts/queryOrderDetail
   * @response `200` `AmazonOrderDetailResp` OK
   */
  luteosAmazonTsQueryOrderDetail = (req: AmazonOrderDetailQueryReq, params: RequestParams = {}) =>
    this.request<AmazonOrderDetailResp, any>({
      path: `/api/luteos/amazon/ts/queryOrderDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsQueryOrderList
   * @summary 查询amazon订单列表
   * @request POST:/api/luteos/amazon/ts/queryOrderList
   * @response `200` `CommonRespAmazonOrderListResp` OK
   */
  luteosAmazonTsQueryOrderList = (req: AmazonOrderListReq, params: RequestParams = {}) =>
    this.request<CommonRespAmazonOrderListResp, any>({
      path: `/api/luteos/amazon/ts/queryOrderList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsQueryProductList
   * @summary 商品查询
   * @request POST:/api/luteos/amazon/ts/queryProductList
   * @response `200` `TsAmazon` OK
   */
  luteosAmazonTsQueryProductList = (req: TsAmazon2, params: RequestParams = {}) =>
    this.request<TsAmazon, any>({
      path: `/api/luteos/amazon/ts/queryProductList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsRefundOrder
   * @summary 退款amazon订单
   * @request POST:/api/luteos/amazon/ts/refundOrder
   * @response `200` `CommonRespObject` OK
   */
  luteosAmazonTsRefundOrder = (req: TsAmazon6, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/amazon/ts/refundOrder`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsReplacement
   * @summary 补发货
   * @request POST:/api/luteos/amazon/ts/replacement
   * @response `200` `CommonRespObject` OK
   */
  luteosAmazonTsReplacement = (req: TsAmazon4, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/amazon/ts/replacement`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
