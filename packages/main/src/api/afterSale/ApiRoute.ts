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

export namespace Api {
  /**
   * No description
   * @tags 售后订单-退款, 批量审核
   * @name LuteosAfterSaleRefundBatchAudit
   * @summary 批量审核
   * @request POST:/api/luteos/after/sale/refund/batchAudit
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAfterSaleRefundBatchAudit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RefundAuditReq;
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
   * @tags 售后订单-退款, 批量删除
   * @name LuteosAfterSaleRefundBatchDeleted
   * @summary 批量删除
   * @request POST:/api/luteos/after/sale/refund/batchDeleted
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAfterSaleRefundBatchDeleted {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RefundBatchDeletedReq;
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
   * @tags 售后订单-退款, 批量重推
   * @name LuteosAfterSaleRefundBatchRePush
   * @summary 批量重推
   * @request POST:/api/luteos/after/sale/refund/batchRePush
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAfterSaleRefundBatchRePush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RefundBatchRePushReq;
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
   * @tags 售后订单-退款, 编辑备注
   * @name LuteosAfterSaleRefundEditRemark
   * @summary 编辑备注
   * @request POST:/api/luteos/after/sale/refund/editRemark
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAfterSaleRefundEditRemark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RefundEditRemarkReq;
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
   * @tags 售后订单-退款
   * @name LuteosAfterSaleRefundExport
   * @summary 导出
   * @request POST:/api/luteos/after/sale/refund/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosAfterSaleRefundExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RefundQueryListReq;
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
   * @tags 售后订单-退款, 退款列表
   * @name LuteosAfterSaleRefundQueryList
   * @summary 退款列表
   * @request POST:/api/luteos/after/sale/refund/queryList
   * @response `200` `RefundQueryListResp` OK
   */
  export namespace LuteosAfterSaleRefundQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RefundQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = RefundQueryListResp;
  }

  /**
   * No description
   * @tags 售后订单-补发, 批量删除
   * @name LuteosAfterSaleReplacementBatchDeleted
   * @summary 批量删除
   * @request POST:/api/luteos/after/sale/replacement/batchDeleted
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAfterSaleReplacementBatchDeleted {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReplacementBatchDeletedReq;
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
   * @tags 售后订单-补发, 批量重推
   * @name LuteosAfterSaleReplacementBatchRePush
   * @summary 批量重推
   * @request POST:/api/luteos/after/sale/replacement/batchRePush
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAfterSaleReplacementBatchRePush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReplacementBatchDeletedReq;
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
   * @tags 售后订单-补发, 编辑地址
   * @name LuteosAfterSaleReplacementEditAddress
   * @summary 编辑地址
   * @request POST:/api/luteos/after/sale/replacement/editAddress
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAfterSaleReplacementEditAddress {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReplacementEditAddressReq;
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
   * @tags 售后订单-补发, 编辑备注
   * @name LuteosAfterSaleReplacementEditRemark
   * @summary 编辑备注
   * @request POST:/api/luteos/after/sale/replacement/editRemark
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAfterSaleReplacementEditRemark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReplacementEditRemarkReq;
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
   * @tags 售后订单-补发
   * @name LuteosAfterSaleReplacementExport
   * @summary 导出
   * @request POST:/api/luteos/after/sale/replacement/export
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosAfterSaleReplacementExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReplacementQueryListReq;
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
   * @tags 列表查询, 售后订单-补发
   * @name LuteosAfterSaleReplacementQueryList
   * @summary 列表查询
   * @request POST:/api/luteos/after/sale/replacement/queryList
   * @response `200` `ReplacementQueryListResp` OK
   */
  export namespace LuteosAfterSaleReplacementQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReplacementQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ReplacementQueryListResp;
  }

  /**
   * No description
   * @tags 售后订单-补发
   * @name LuteosAfterSaleReplacementQueryShop
   * @summary 获取店铺
   * @request POST:/api/luteos/after/sale/replacement/queryShop
   * @response `200` `CommonRespReplacementShopQueryResp` OK
   */
  export namespace LuteosAfterSaleReplacementQueryShop {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReplacemenetShopQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespReplacementShopQueryResp;
  }

  /**
   * No description
   * @tags 售后订单-补发, 更换店铺/站点
   * @name LuteosAfterSaleReplacementReplacementShop
   * @summary 更换店铺/站点
   * @request POST:/api/luteos/after/sale/replacement/replacementShop
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAfterSaleReplacementReplacementShop {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReplacementShopReq;
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
   * @tags 售后订单-补发, 替换sku
   * @name LuteosAfterSaleReplacementReplacementSku
   * @summary 替换sku
   * @request POST:/api/luteos/after/sale/replacement/replacementSku
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosAfterSaleReplacementReplacementSku {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReplacementSkuReq;
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
   * @tags 售后客服标签
   * @name LuteosAfterSaleServiceLabelQueryDetail
   * @summary 客服标签详情
   * @request POST:/api/luteos/after/sale/serviceLabel/queryDetail
   * @response `200` `ServiceLabelQueryDetailResp` OK
   */
  export namespace LuteosAfterSaleServiceLabelQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ServiceLabelQueryDetailReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ServiceLabelQueryDetailResp;
  }

  /**
   * No description
   * @tags 售后客服标签
   * @name LuteosAfterSaleServiceLabelQueryList
   * @summary 客服标签列表
   * @request POST:/api/luteos/after/sale/serviceLabel/queryList
   * @response `200` `ServiceLabelQueryListResp` OK
   */
  export namespace LuteosAfterSaleServiceLabelQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ServiceLabelQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ServiceLabelQueryListResp;
  }

  /**
   * No description
   * @tags 售后客服标签
   * @name LuteosAfterSaleServiceLabelQueryOption
   * @summary 客服标签选项
   * @request POST:/api/luteos/after/sale/serviceLabel/queryOption
   * @response `200` `ServiceLabelQueryOptionResp` OK
   */
  export namespace LuteosAfterSaleServiceLabelQueryOption {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ServiceLabelQueryOptionReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ServiceLabelQueryOptionResp;
  }

  /**
   * No description
   * @tags 售后客服标签
   * @name LuteosAfterSaleServiceLabelSave
   * @summary 客服标签保存
   * @request POST:/api/luteos/after/sale/serviceLabel/save
   * @response `200` `ServiceLabelSaveResp` OK
   */
  export namespace LuteosAfterSaleServiceLabelSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ServiceLabelSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ServiceLabelSaveResp;
  }
}
