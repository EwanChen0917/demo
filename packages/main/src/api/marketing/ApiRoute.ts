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
  GtmOptionsResp,
  MemberListQueryResp,
  UrlInfoResp,
  WeekReportCreateReq,
  WeekReportCreateResp,
  WeekReportDeleteReq,
  WeekReportDetailCopyReq,
  WeekReportDetailCreateReq,
  WeekReportDetailCreateResp,
  WeekReportDetailDeleteReq,
  WeekReportDetailListResp,
  WeekReportDetailUpdateReq,
  WeekReportListResp,
  WeekReportUpdateReq,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags BI看板模块(RSP)
   * @name LuteosMarketingBiReportCashFlowUrl
   * @summary 获取资金流BI链接
   * @request GET:/api/luteos/marketing/BIReport/cashFlowUrl
   * @response `200` `UrlInfoResp` OK
   */
  export namespace LuteosMarketingBiReportCashFlowUrl {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UrlInfoResp;
  }

  /**
   * No description
   * @tags BI看板模块(RSP)
   * @name LuteosMarketingBiReportGetBiUrl
   * @summary 获取BI看板链接
   * @request GET:/api/luteos/marketing/BIReport/getBiUrl
   * @response `200` `UrlInfoResp` OK
   */
  export namespace LuteosMarketingBiReportGetBiUrl {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * BI类型：1-VOC看板 2-亚马逊运营周报
       * @format int32
       */
      type: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UrlInfoResp;
  }

  /**
   * No description
   * @tags BI看板模块(RSP)
   * @name LuteosMarketingBiReportMonthlyUrl
   * @summary 获取月报BI链接
   * @request GET:/api/luteos/marketing/BIReport/monthlyUrl
   * @response `200` `UrlInfoResp` OK
   */
  export namespace LuteosMarketingBiReportMonthlyUrl {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UrlInfoResp;
  }

  /**
   * No description
   * @tags BI看板模块(RSP)
   * @name LuteosMarketingBiReportSpuNewProductUrl
   * @summary 获取SPU新品分析BI链接
   * @request GET:/api/luteos/marketing/BIReport/spuNewProductUrl
   * @response `200` `UrlInfoResp` OK
   */
  export namespace LuteosMarketingBiReportSpuNewProductUrl {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UrlInfoResp;
  }

  /**
   * No description
   * @tags BI看板模块(RSP)
   * @name LuteosMarketingBiReportStockUpUrl
   * @summary 获取供应链备货情况BI链接
   * @request GET:/api/luteos/marketing/BIReport/stockUpUrl
   * @response `200` `UrlInfoResp` OK
   */
  export namespace LuteosMarketingBiReportStockUpUrl {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UrlInfoResp;
  }

  /**
   * No description
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportAmazonOptions
   * @summary 亚马逊运营周报branch选择项
   * @request GET:/api/luteos/marketing/weekReport/amazonOptions
   * @response `200` `GtmOptionsResp` OK
   */
  export namespace LuteosMarketingWeekReportAmazonOptions {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = GtmOptionsResp;
  }

  /**
   * No description
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportBranchOptions
   * @summary 周报branch选择项
   * @request GET:/api/luteos/marketing/weekReport/branchOptions
   * @response `200` `GtmOptionsResp` OK
   */
  export namespace LuteosMarketingWeekReportBranchOptions {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = GtmOptionsResp;
  }

  /**
   * No description
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportCreateDetail
   * @summary 新增周报详情
   * @request POST:/api/luteos/marketing/weekReport/createDetail
   * @response `200` `WeekReportDetailCreateResp` OK
   */
  export namespace LuteosMarketingWeekReportCreateDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WeekReportDetailCreateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WeekReportDetailCreateResp;
  }

  /**
   * No description
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportDelete
   * @summary 删除周报
   * @request POST:/api/luteos/marketing/weekReport/delete
   * @response `200` `void` OK
   */
  export namespace LuteosMarketingWeekReportDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WeekReportDeleteReq;
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
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportDeleteDetail
   * @summary 删除周报详情
   * @request POST:/api/luteos/marketing/weekReport/deleteDetail
   * @response `200` `void` OK
   */
  export namespace LuteosMarketingWeekReportDeleteDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WeekReportDetailDeleteReq;
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
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportDetailCopy
   * @summary 复制周报详情
   * @request POST:/api/luteos/marketing/weekReport/detailCopy
   * @response `200` `WeekReportCreateResp` OK
   */
  export namespace LuteosMarketingWeekReportDetailCopy {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WeekReportDetailCopyReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WeekReportCreateResp;
  }

  /**
   * No description
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportDetailList
   * @summary 周报详情列表
   * @request GET:/api/luteos/marketing/weekReport/detailList
   * @response `200` `WeekReportDetailListResp` OK
   */
  export namespace LuteosMarketingWeekReportDetailList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 员工工号 */
      jobNumber?: string;
      /** 员工编号 */
      memberCode?: string;
      /**
       * 每页数量
       * @format int32
       */
      pageNum?: number;
      /**
       * 页数
       * @format int32
       */
      pageSize?: number;
      /** 周报编码 */
      reportCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WeekReportDetailListResp;
  }

  /**
   * No description
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportList
   * @summary 周报列表
   * @request GET:/api/luteos/marketing/weekReport/list
   * @response `200` `WeekReportListResp` OK
   */
  export namespace LuteosMarketingWeekReportList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 所属部门分支 */
      branch?: string;
      /** 员工工号 */
      jobNumber?: string;
      /** 员工编号 */
      memberCode?: string;
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
       * 报告类型(1 - 经营分析周报，2 - VOC周报，VOC报告必填，3-亚马逊周报)
       * @format int32
       */
      reportType?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WeekReportListResp;
  }

  /**
   * No description
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportQueryPermissionMemberList
   * @summary 获取有权限的成员
   * @request GET:/api/luteos/marketing/weekReport/queryPermissionMemberList
   * @response `200` `MemberListQueryResp` OK
   */
  export namespace LuteosMarketingWeekReportQueryPermissionMemberList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 报告类型：1 - 经营分析周报，2 - VOC周报
       * @format int32
       */
      reportType: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MemberListQueryResp;
  }

  /**
   * No description
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportSave
   * @summary 保存周报
   * @request POST:/api/luteos/marketing/weekReport/save
   * @response `200` `WeekReportCreateResp` OK
   */
  export namespace LuteosMarketingWeekReportSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WeekReportCreateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = WeekReportCreateResp;
  }

  /**
   * No description
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportUpdate
   * @summary 修改周报
   * @request POST:/api/luteos/marketing/weekReport/update
   * @response `200` `void` OK
   */
  export namespace LuteosMarketingWeekReportUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WeekReportUpdateReq;
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
   * @tags 周报管理(RSP)
   * @name LuteosMarketingWeekReportUpdateDetail
   * @summary 修改周报详情
   * @request POST:/api/luteos/marketing/weekReport/updateDetail
   * @response `200` `void` OK
   */
  export namespace LuteosMarketingWeekReportUpdateDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WeekReportDetailUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = void;
  }
}
