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

export namespace Api {
  /**
   * No description
   * @tags amazon合规文件
   * @name LuteosAmazonFileDelete
   * @summary 删除文件生成记录
   * @request POST:/api/luteos/amazon/file/delete
   * @response `200` `CommonRespVoid` OK
   */
  export namespace LuteosAmazonFileDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonFileDeleteReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespVoid;
  }

  /**
   * No description
   * @tags amazon合规文件
   * @name LuteosAmazonFileQueryList
   * @summary 获取文件记录列表
   * @request POST:/api/luteos/amazon/file/queryList
   * @response `200` `AmazonFileListResp` OK
   */
  export namespace LuteosAmazonFileQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonFileListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AmazonFileListResp;
  }

  /**
   * No description
   * @tags amazon合规文件
   * @name LuteosAmazonFileUpload
   * @summary 上传文件并生成链接
   * @request POST:/api/luteos/amazon/file/upload
   * @response `200` `CommonRespBatchUploadResp` OK
   */
  export namespace LuteosAmazonFileUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchUploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBatchUploadResp;
  }

  /**
   * No description
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsGenerateCode
   * @summary 生成编码
   * @request GET:/api/luteos/amazon/ts/generateCode
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAmazonTsGenerateCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespString;
  }

  /**
   * No description
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsQueryAmazonRefundReason
   * @summary 获取amazon退款原因
   * @request GET:/api/luteos/amazon/ts/queryAmazonRefundReason
   * @response `200` `CommonRespAmazonRefundReasonResp` OK
   */
  export namespace LuteosAmazonTsQueryAmazonRefundReason {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespAmazonRefundReasonResp;
  }

  /**
   * No description
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsQueryOrder
   * @summary 查询amazon订单
   * @request POST:/api/luteos/amazon/ts/queryOrder
   * @response `200` `TsAmazon` OK
   */
  export namespace LuteosAmazonTsQueryOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TsAmazon2;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TsAmazon;
  }

  /**
   * No description
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsQueryOrderDetail
   * @summary amazon-search接口
   * @request POST:/api/luteos/amazon/ts/queryOrderDetail
   * @response `200` `AmazonOrderDetailResp` OK
   */
  export namespace LuteosAmazonTsQueryOrderDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonOrderDetailQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AmazonOrderDetailResp;
  }

  /**
   * No description
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsQueryOrderList
   * @summary 查询amazon订单列表
   * @request POST:/api/luteos/amazon/ts/queryOrderList
   * @response `200` `CommonRespAmazonOrderListResp` OK
   */
  export namespace LuteosAmazonTsQueryOrderList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AmazonOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespAmazonOrderListResp;
  }

  /**
   * No description
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsQueryProductList
   * @summary 商品查询
   * @request POST:/api/luteos/amazon/ts/queryProductList
   * @response `200` `TsAmazon` OK
   */
  export namespace LuteosAmazonTsQueryProductList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TsAmazon2;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = TsAmazon;
  }

  /**
   * No description
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsRefundOrder
   * @summary 退款amazon订单
   * @request POST:/api/luteos/amazon/ts/refundOrder
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosAmazonTsRefundOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TsAmazon6;
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
   * @tags ts-amazon订单管理
   * @name LuteosAmazonTsReplacement
   * @summary 补发货
   * @request POST:/api/luteos/amazon/ts/replacement
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosAmazonTsReplacement {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TsAmazon4;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespObject;
  }
}
