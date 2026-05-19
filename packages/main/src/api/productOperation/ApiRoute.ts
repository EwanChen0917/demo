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
  AIotMacAddressListQueryReq,
  AIotMacAddressListQueryResp,
  AIotMacProductListQueryReq,
  AIotMacProductListQueryResp,
  CommonExportResp,
  CommonResp,
  CommonRespString,
  OperationProjectDetailListReq,
  OperationProjectDetailResp,
  OperationProjectDetailSaveReq,
  OperationProjectDetailSaveResp,
  OperationProjectLogResp,
  OperationProjectQueryResp,
  OperationProjectSaveReq,
  OperationProjectSaveResp,
  OperationTeamHandleReq,
  OperationTeamQueryResp,
  OperationTeamResp,
  OperationTeamSaveReq,
  PlatformOperationBatchReq,
  PlatformOperationQueryReq,
  PlatformOperationQueryResp,
  PlatformOperationSaveReq,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 开放平台-AIot
   * @name LuteosOpenapiAiotQueryMacAddressList
   * @summary 获取MAC地址信息
   * @request POST:/api/luteos/openapi/aiot/queryMacAddressList
   * @response `200` `AIotMacAddressListQueryResp` OK
   */
  export namespace LuteosOpenapiAiotQueryMacAddressList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AIotMacAddressListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AIotMacAddressListQueryResp;
  }

  /**
   * No description
   * @tags 开放平台-AIot
   * @name LuteosOpenapiAiotQueryProductCodeList
   * @summary 获取产品代码
   * @request POST:/api/luteos/openapi/aiot/queryProductCodeList
   * @response `200` `AIotMacProductListQueryResp` OK
   */
  export namespace LuteosOpenapiAiotQueryProductCodeList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AIotMacProductListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AIotMacProductListQueryResp;
  }

  /**
   * No description
   * @tags 运营团队
   * @name LuteosOperationTeamHandleTeam
   * @summary 团队操作
   * @request POST:/api/luteos/operation/team/handleTeam
   * @response `200` `OperationTeamResp` OK
   */
  export namespace LuteosOperationTeamHandleTeam {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationTeamHandleReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OperationTeamResp;
  }

  /**
   * No description
   * @tags 运营团队
   * @name LuteosOperationTeamQueryTeamList
   * @summary 查询运营团队列表
   * @request GET:/api/luteos/operation/team/queryTeamList
   * @response `200` `OperationTeamQueryResp` OK
   */
  export namespace LuteosOperationTeamQueryTeamList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关键字, 团队名称 */
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
      /** 场景 operation-经营团队, meta-红人业务团队 */
      scene: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OperationTeamQueryResp;
  }

  /**
   * No description
   * @tags 运营团队
   * @name LuteosOperationTeamSaveTeamInfo
   * @summary 运营团队信息保存
   * @request POST:/api/luteos/operation/team/saveTeamInfo
   * @response `200` `OperationTeamResp` OK
   */
  export namespace LuteosOperationTeamSaveTeamInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationTeamSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OperationTeamResp;
  }

  /**
   * No description
   * @tags 产品运营
   * @name LuteosOpetationExportOperationProjectDetail
   * @summary 导出产品运营项目周期
   * @request POST:/api/luteos/opetation/exportOperationProjectDetail
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosOpetationExportOperationProjectDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationProjectDetailListReq;
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
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformBatchDeleteByIds
   * @summary 批量删除
   * @request POST:/api/luteos/opetation/platform/batch/deleteByIds
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosOpetationPlatformBatchDeleteByIds {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOperationBatchReq;
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
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformBatchSaveBatch
   * @summary 批量编辑
   * @request POST:/api/luteos/opetation/platform/batch/saveBatch
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosOpetationPlatformBatchSaveBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOperationBatchReq;
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
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformDownTemplate
   * @summary 下载-导入模板
   * @request POST:/api/luteos/opetation/platform/downTemplate
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosOpetationPlatformDownTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOperationQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }

  /**
   * No description
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformExportList
   * @summary 导出列表
   * @request POST:/api/luteos/opetation/platform/exportList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosOpetationPlatformExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOperationQueryReq;
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
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformQueryList
   * @summary 列表
   * @request POST:/api/luteos/opetation/platform/queryList
   * @response `200` `PlatformOperationQueryResp` OK
   */
  export namespace LuteosOpetationPlatformQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOperationQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PlatformOperationQueryResp;
  }

  /**
   * No description
   * @tags 独立站/新平台运营人员
   * @name LuteosOpetationPlatformSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/luteos/opetation/platform/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosOpetationPlatformSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PlatformOperationSaveReq;
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
   * @tags 产品运营
   * @name LuteosOpetationQueryOperationProjectDetail
   * @summary 产品运营项目详情
   * @request GET:/api/luteos/opetation/queryOperationProjectDetail
   * @response `200` `OperationProjectDetailResp` OK
   */
  export namespace LuteosOpetationQueryOperationProjectDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 项目编码编码 */
      projectCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OperationProjectDetailResp;
  }

  /**
   * No description
   * @tags 产品运营
   * @name LuteosOpetationQueryOperationProjectList
   * @summary 产品运营项目列表查询
   * @request GET:/api/luteos/opetation/queryOperationProjectList
   * @response `200` `OperationProjectQueryResp` OK
   */
  export namespace LuteosOpetationQueryOperationProjectList {
    export type RequestParams = {};
    export type RequestQuery = {
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
      /** @format date */
      saleStartDate?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OperationProjectQueryResp;
  }

  /**
   * No description
   * @tags 产品运营
   * @name LuteosOpetationQueryOperationProjectLogList
   * @summary 产品运营项目日志查询
   * @request GET:/api/luteos/opetation/queryOperationProjectLogList
   * @response `200` `OperationProjectLogResp` OK
   */
  export namespace LuteosOpetationQueryOperationProjectLogList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 产品运营项目编码 */
      projectCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OperationProjectLogResp;
  }

  /**
   * No description
   * @tags 产品运营
   * @name LuteosOpetationSaveOperationProject
   * @summary 产品运营项目保存
   * @request POST:/api/luteos/opetation/saveOperationProject
   * @response `200` `OperationProjectSaveResp` OK
   */
  export namespace LuteosOpetationSaveOperationProject {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationProjectSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OperationProjectSaveResp;
  }

  /**
   * No description
   * @tags 产品运营
   * @name LuteosOpetationSaveOperationProjectDetail
   * @summary 产品运营项目周期保存
   * @request POST:/api/luteos/opetation/saveOperationProjectDetail
   * @response `200` `OperationProjectDetailSaveResp` OK
   */
  export namespace LuteosOpetationSaveOperationProjectDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OperationProjectDetailSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = OperationProjectDetailSaveResp;
  }
}
