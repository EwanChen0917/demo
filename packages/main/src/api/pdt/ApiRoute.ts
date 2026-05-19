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
  CommonRespBoolean,
  CommonRespObject,
  MetaOperatorQueryResp,
  PdtProductAnalysisResponse,
  PdtProductCancelReq,
  PdtProductComplianceRateTrendencyResponse,
  PdtProductCurrentMonthHandleReq,
  PdtProductCurrentMontyHandleResp,
  PdtProductDeleteReq,
  PdtProductManagerReq,
  PdtProductOperateReq,
  PdtProductOperationResponse,
  PdtProductPageResponse,
  PdtProductReq,
  PdtProductStarAndDelayAnalysisResponse,
  PdtProductStarReq,
  PdtProductStartAndDelayReq,
  PdtProductSummaryBean,
  PdtProductTableReq,
  PdtProductUpdateListingTimeReq,
  PdtProductUpdateReq,
  PdtProductYearLineAnalysisReq,
  PdtProductYearLineAnalysisResponse,
  PdtProductYearReq,
  PdtSpuCombineReq,
  ProductLineResponse,
  SpuYearTargetSummaryResp,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 产品管理
   * @name LuteosPdtCancelPdtProduct
   * @summary 取消产品
   * @request POST:/api/luteos/pdt/cancelPdtProduct
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosPdtCancelPdtProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductCancelReq;
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
   * @tags 产品管理
   * @name LuteosPdtCombineSpu
   * @summary 年规产品关联SPU
   * @request POST:/api/luteos/pdt/combineSpu
   * @deprecated
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosPdtCombineSpu {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtSpuCombineReq;
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
   * @tags 产品管理
   * @name LuteosPdtDeletePdtProduct
   * @summary 删除产品
   * @request POST:/api/luteos/pdt/deletePdtProduct
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosPdtDeletePdtProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductDeleteReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 产品管理
   * @name LuteosPdtExportProduct
   * @summary 年规商品导出
   * @request POST:/api/luteos/pdt/exportProduct
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosPdtExportProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductTableReq;
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
   * @tags 首页看板
   * @name LuteosPdtGetComplianceTrendency
   * @summary 全年产品达标率趋势图
   * @request POST:/api/luteos/pdt/getComplianceTrendency
   * @response `200` `PdtProductComplianceRateTrendencyResponse` OK
   */
  export namespace LuteosPdtGetComplianceTrendency {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductYearReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PdtProductComplianceRateTrendencyResponse;
  }

  /**
   * No description
   * @tags 首页看板
   * @name LuteosPdtGetMonthHandleAnalysis
   * @summary 当月交付新品
   * @request POST:/api/luteos/pdt/getMonthHandleAnalysis
   * @response `200` `PdtProductCurrentMontyHandleResp` OK
   */
  export namespace LuteosPdtGetMonthHandleAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductCurrentMonthHandleReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PdtProductCurrentMontyHandleResp;
  }

  /**
   * No description
   * @tags 首页看板
   * @name LuteosPdtGetPdtProductAvgStartAndDealyCount
   * @summary 年度分值
   * @request POST:/api/luteos/pdt/getPdtProductAvgStartAndDealyCount
   * @response `200` `PdtProductStarAndDelayAnalysisResponse` OK
   */
  export namespace LuteosPdtGetPdtProductAvgStartAndDealyCount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductStartAndDelayReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PdtProductStarAndDelayAnalysisResponse;
  }

  /**
   * No description
   * @tags 首页看板
   * @name LuteosPdtGetYearProductLineAnalysis
   * @summary 全年新品分类
   * @request POST:/api/luteos/pdt/getYearProductLineAnalysis
   * @response `200` `PdtProductYearLineAnalysisResponse` OK
   */
  export namespace LuteosPdtGetYearProductLineAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductYearLineAnalysisReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PdtProductYearLineAnalysisResponse;
  }

  /**
   * No description
   * @tags 首页看板
   * @name LuteosPdtGetYearProductManagerAnalysis
   * @summary 全年新品上线总数-产品经理列表
   * @request POST:/api/luteos/pdt/getYearProductManagerAnalysis
   * @response `200` `PdtProductAnalysisResponse` OK
   */
  export namespace LuteosPdtGetYearProductManagerAnalysis {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductManagerReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PdtProductAnalysisResponse;
  }

  /**
   * No description
   * @tags 产品管理
   * @name LuteosPdtOperatePdt
   * @summary 操作新品年规
   * @request POST:/api/luteos/pdt/operatePdt
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosPdtOperatePdt {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductOperateReq;
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
   * @tags 产品管理
   * @name LuteosPdtQueryOperationLog
   * @summary 查询操作日志
   * @request POST:/api/luteos/pdt/queryOperationLog
   * @response `200` `PdtProductOperationResponse` OK
   */
  export namespace LuteosPdtQueryOperationLog {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductTableReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PdtProductOperationResponse;
  }

  /**
   * No description
   * @tags 产品管理
   * @name LuteosPdtQueryOperatorList
   * @summary 获取产品/项目经理列表
   * @request GET:/api/luteos/pdt/queryOperatorList
   * @response `200` `MetaOperatorQueryResp` OK
   */
  export namespace LuteosPdtQueryOperatorList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 员工类型 1-产品经理 2-项目经理
       * @format int32
       */
      operatorType: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaOperatorQueryResp;
  }

  /**
   * No description
   * @tags 产品管理
   * @name LuteosPdtQueryPdtProductLine
   * @summary 查询产品线
   * @request POST:/api/luteos/pdt/queryPdtProductLine
   * @response `200` `ProductLineResponse` OK
   */
  export namespace LuteosPdtQueryPdtProductLine {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ProductLineResponse;
  }

  /**
   * No description
   * @tags 产品管理
   * @name LuteosPdtQueryPdtProductSummary
   * @summary 年度年规产品统计
   * @request POST:/api/luteos/pdt/queryPdtProductSummary
   * @response `200` `PdtProductSummaryBean` OK
   */
  export namespace LuteosPdtQueryPdtProductSummary {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PdtProductSummaryBean;
  }

  /**
   * No description
   * @tags 产品管理
   * @name LuteosPdtQueryPdtProductTableList
   * @summary 查询年度新品数据-表格
   * @request POST:/api/luteos/pdt/queryPdtProductTableList
   * @response `200` `PdtProductPageResponse` OK
   */
  export namespace LuteosPdtQueryPdtProductTableList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductTableReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PdtProductPageResponse;
  }

  /**
   * No description
   * @tags 产品管理
   * @name LuteosPdtQuerySpuYearTargetSummary
   * @summary SPU年度销售目标统计
   * @request GET:/api/luteos/pdt/querySpuYearTargetSummary
   * @response `200` `SpuYearTargetSummaryResp` OK
   */
  export namespace LuteosPdtQuerySpuYearTargetSummary {
    export type RequestParams = {};
    export type RequestQuery = {
      /** SPU */
      spuCode: string;
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
    export type ResponseBody = SpuYearTargetSummaryResp;
  }

  /**
   * No description
   * @tags 产品管理
   * @name LuteosPdtReviewStar
   * @summary 更新评分
   * @request POST:/api/luteos/pdt/reviewStar
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosPdtReviewStar {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductStarReq;
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
   * @tags 产品管理
   * @name LuteosPdtUpdateListingTime
   * @summary 更新上架时间
   * @request POST:/api/luteos/pdt/updateListingTime
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosPdtUpdateListingTime {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductUpdateListingTimeReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }

  /**
   * No description
   * @tags 产品管理
   * @name LuteosPdtUpdatePdtProduct
   * @summary 编辑产品信息
   * @request POST:/api/luteos/pdt/updatePdtProduct
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosPdtUpdatePdtProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PdtProductUpdateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBoolean;
  }
}
