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
  AgencyCategoryListResp,
  AgencyCategorySaveReq,
  AgencyDeleteReq,
  AgencyInfoResp,
  AgencyListReq,
  AgencyListResp,
  AgencyOperationLog,
  AgencySaveReq,
  ChannelQueryResp,
  ChannelSaveReq,
  ChannelSaveResp,
  CommonExportResp,
  CommonResp,
  CommonRespBoolean,
  CommonRespJSONObject,
  CommonRespObject,
  CommonRespPprDraftEnumsResp,
  CommonRespSaveCheckDingResp,
  CommonRespString,
  CurrencyRateConvertResp,
  EmailAppealOperateReq,
  EmailAppealOperateResp,
  JoinMarkPromotionReq,
  LabelListQueryResp,
  MarkTaskPromotionDetailResp,
  MarkTaskPromotionListResp,
  MarkTaskPromotionSaveReq,
  MarkTaskStationDetailResp,
  MarkTaskStationResp,
  MetaApproveConfigReq,
  MetaEmailAccountDetailResp,
  MetaEmailAccountQueryResp,
  MetaEmailAccountSaveReq,
  MetaEmailAccountSaveResp,
  MetaEmailAppealResp,
  MetaEmailBatchReq,
  MetaEmailBatchResp,
  MetaEmailBlackResp,
  MetaEmailBlackSaveReq,
  MetaEmailContentResp,
  MetaEmailHistoryResp,
  MetaEmailRecordReq,
  MetaEmailRepeatReq,
  MetaEmailRepeatResp,
  MetaEmailRepeatSendExcelReq,
  MetaEmailResp,
  MetaEmailTagQueryReq,
  MetaEmailTagResp,
  MetaFeatureQueryResp,
  MetaFeatureSaveReq,
  MetaFeatureSaveResp,
  MetaInfoLastCacheResp,
  MetaMarkHandleReq,
  MetaMarkHandleResp,
  MetaMarkListQueryReq,
  MetaMarkListQueryResp,
  MetaMarkMemberResp,
  MetaMarkOperatorMappingReq,
  MetaMarkProductConfigQueryReq,
  MetaMarkProductConfigQueryResp,
  MetaMarkSaveReq,
  MetaMarkTaskHandleReq,
  MetaMarkTaskListQueryReq,
  MetaMarkTaskListQueryResp,
  MetaMarkTaskOperatorResp,
  MetaMarkTaskOperatorV2Req,
  MetaMarkTaskOperatorV2Resp,
  MetaMarkTaskSaveReq,
  MetaMarkTaskSaveResp,
  MetaMarkTrackingMappingBatchUpdateReq,
  MetaMarkTrackingMappingResp,
  MetaModifyTagReq,
  MetaOperateLogResp,
  MetaOperatorQueryResp,
  MetaProductLineQueryResp,
  MetaProductListQueryV2Resp,
  MetaProjectAuthResp,
  MetaProjectChannelUpdateReq,
  MetaProjectDetailResp,
  MetaProjectOperateReq,
  MetaProjectOperateResp,
  MetaProjectPartnerVideoReq,
  MetaProjectPlatformResp,
  MetaProjectReq,
  MetaProjectResp,
  MetaProjectSaveReq,
  MetaProjectSaveResp,
  MetaProjectStatusReq,
  MetaProjectTkAmountReq,
  MetaTeamListResp,
  MetaUserChannelCheckResp,
  MetaUserImportReq,
  PprListQueryReq,
  PprListQueryResp,
  PprSaveReq,
  ReferenceParamsDeliveryMapResp,
  ReferenceParamsDeliveryReq,
  ReferenceParamsResp,
  SampleOrderV3DetailResp,
  SampleOrderV3ListQueryReq,
  SampleOrderV3ListQueryResp,
  SampleOrderV3RefreshReq,
  SampleOrderV3SaveReq,
  UserChannelCheckReq,
  UserChannelInfoDeleteReq,
  UserChannelInfoUpdateReq,
  UserChannelListQueryResp,
  UserChannelSaveReq,
  UserDetailQueryResp,
  UserListParamQueryResp,
  UserOperateReq,
  UserOperateResp,
  UserQueryReq,
  UserQueryResp,
  UserSaveReq,
  UserSaveResp,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 服务商资源分类模块
   * @name LuteosMetaAgencyCategoryDelete
   * @summary 删除资源分类
   * @request POST:/api/luteos/meta/agency/category/delete
   * @response `200` `void` OK
   */
  export namespace LuteosMetaAgencyCategoryDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AgencyDeleteReq;
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
   * @tags 服务商资源分类模块
   * @name LuteosMetaAgencyCategoryList
   * @summary 服务商资源分类列表查询
   * @request GET:/api/luteos/meta/agency/category/list
   * @response `200` `AgencyCategoryListResp` OK
   */
  export namespace LuteosMetaAgencyCategoryList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 上级分类code */
      parentCategoryCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AgencyCategoryListResp;
  }

  /**
   * No description
   * @tags 服务商资源分类模块
   * @name LuteosMetaAgencyCategorySave
   * @summary 保存服务商资源分类
   * @request POST:/api/luteos/meta/agency/category/save
   * @response `200` `void` OK
   */
  export namespace LuteosMetaAgencyCategorySave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AgencyCategorySaveReq;
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
   * @tags 服务商资源模块
   * @name LuteosMetaAgencyExportExcel
   * @summary 导出excel
   * @request POST:/api/luteos/meta/agency/exportExcel
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaAgencyExportExcel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AgencyListReq;
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
   * @tags 服务商资源模块
   * @name LuteosMetaAgencyInfo
   * @summary 服务商资源详情
   * @request GET:/api/luteos/meta/agency/info
   * @response `200` `AgencyInfoResp` OK
   */
  export namespace LuteosMetaAgencyInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AgencyInfoResp;
  }

  /**
   * No description
   * @tags 服务商资源模块
   * @name LuteosMetaAgencyList
   * @summary 服务商资源列表
   * @request GET:/api/luteos/meta/agency/list
   * @response `200` `AgencyListResp` OK
   */
  export namespace LuteosMetaAgencyList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 企业编码 */
      companyCode?: string;
      /** 一级分类code */
      firstCategory?: string;
      /** 资源名称 */
      name?: string;
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
      /** 二级分类code */
      secondCategory?: string;
      /** 标签code */
      tags?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AgencyListResp;
  }

  /**
   * No description
   * @tags 服务商资源模块
   * @name LuteosMetaAgencyOperationLogList
   * @summary 查询服务商资源操作日志
   * @request GET:/api/luteos/meta/agency/operationLog/list
   * @response `200` `(AgencyOperationLog)[]` OK
   */
  export namespace LuteosMetaAgencyOperationLogList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 资源code */
      agcCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = AgencyOperationLog[];
  }

  /**
   * No description
   * @tags 服务商资源模块
   * @name LuteosMetaAgencySave
   * @summary 保存服务商资源
   * @request POST:/api/luteos/meta/agency/save
   * @response `200` `void` OK
   */
  export namespace LuteosMetaAgencySave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AgencySaveReq;
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
   * @tags 标识码管理
   * @name LuteosMetaBatchUpdateMapping
   * @summary 产品运营映射配置一键编辑
   * @request POST:/api/luteos/meta/batchUpdateMapping
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMetaBatchUpdateMapping {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkOperatorMappingReq;
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
   * @tags 红人管理
   * @name LuteosMetaCheckChannelUser
   * @summary 渠道红人查重校验
   * @request POST:/api/luteos/meta/checkChannelUser
   * @response `200` `void` OK
   */
  export namespace LuteosMetaCheckChannelUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserChannelCheckReq;
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
   * @tags 红人管理
   * @name LuteosMetaCheckChannelUserData
   * @summary 渠道红人数据更新校验（插件）
   * @request POST:/api/luteos/meta/checkChannelUserData
   * @response `200` `MetaUserChannelCheckResp` OK
   */
  export namespace LuteosMetaCheckChannelUserData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserChannelCheckReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaUserChannelCheckResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaCheckMetaUserInfo
   * @summary 校验红人参数
   * @request GET:/api/luteos/meta/checkMetaUserInfo
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosMetaCheckMetaUserInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 红人编码 */
      userCode?: string;
    };
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
   * @tags 基础数据
   * @name LuteosMetaCurrencyRateConvert
   * @summary 币种汇率转换
   * @request GET:/api/luteos/meta/currencyRateConvert
   * @response `200` `CurrencyRateConvertResp` OK
   */
  export namespace LuteosMetaCurrencyRateConvert {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 金额 */
      amount: number;
      /** 原币种 */
      sourceCurrency: string;
      /** 目标币种 */
      targetCurrency?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CurrencyRateConvertResp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosMetaCurrencyRateConvertV2
   * @summary 币种汇率转换V2
   * @request GET:/api/luteos/meta/currencyRateConvertV2
   * @response `200` `CurrencyRateConvertResp` OK
   */
  export namespace LuteosMetaCurrencyRateConvertV2 {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 金额 */
      amount: number;
      /** 原币种 */
      sourceCurrency: string;
      /** 目标币种 */
      targetCurrency?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CurrencyRateConvertResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaDeleteUserChannelInfo
   * @summary 红人详情-红人渠道列表-删除
   * @request POST:/api/luteos/meta/deleteUserChannelInfo
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMetaDeleteUserChannelInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserChannelInfoDeleteReq;
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
   * @tags 红人管理
   * @name LuteosMetaDownLoadMetaOrderTemplate
   * @summary 下载批量新增红人订单模板
   * @request POST:/api/luteos/meta/downLoadMetaOrderTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosMetaDownLoadMetaOrderTemplate {
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
   * @tags 红人管理
   * @name LuteosMetaDownMetaTemplate
   * @summary 下载批量新增红人模板
   * @request POST:/api/luteos/meta/downMetaTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosMetaDownMetaTemplate {
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
   * @tags 红人管理
   * @name LuteosMetaEditUserChannelInfo
   * @summary 红人详情-红人渠道列表-编辑
   * @request POST:/api/luteos/meta/editUserChannelInfo
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMetaEditUserChannelInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserChannelInfoUpdateReq;
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
   * @tags 红人邮箱设置管理
   * @name LuteosMetaEmailAccountQueryEmailDetail
   * @summary 查询公司邮件账号详情
   * @request GET:/api/luteos/meta/email/account/queryEmailDetail
   * @response `200` `MetaEmailAccountDetailResp` OK
   */
  export namespace LuteosMetaEmailAccountQueryEmailDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 唯一id
       * @format int64
       */
      id?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaEmailAccountDetailResp;
  }

  /**
   * No description
   * @tags 红人邮箱设置管理
   * @name LuteosMetaEmailAccountQueryEmailList
   * @summary 查询公司邮件账号列表
   * @request GET:/api/luteos/meta/email/account/queryEmailList
   * @response `200` `MetaEmailAccountQueryResp` OK
   */
  export namespace LuteosMetaEmailAccountQueryEmailList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 所属部门 */
      deptIdList?: number[];
      /** 推广邮箱 */
      email?: string;
      /** 使用人 */
      owner?: string;
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
    export type ResponseBody = MetaEmailAccountQueryResp;
  }

  /**
   * No description
   * @tags 红人邮箱设置管理
   * @name LuteosMetaEmailAccountSaveEmail
   * @summary 保存邮箱账号
   * @request POST:/api/luteos/meta/email/account/saveEmail
   * @response `200` `MetaEmailAccountSaveResp` OK
   */
  export namespace LuteosMetaEmailAccountSaveEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaEmailAccountSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaEmailAccountSaveResp;
  }

  /**
   * No description
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailExportBatchEmail
   * @summary 批量查询导出结果
   * @request POST:/api/luteos/meta/email/exportBatchEmail
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaEmailExportBatchEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaEmailBatchReq;
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
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailExportEmail
   * @summary 导出红人邮件列表
   * @request POST:/api/luteos/meta/email/exportEmail
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaEmailExportEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaEmailRecordReq;
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
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailExportEmailRepeatList
   * @summary 导出邮箱触达列表
   * @request POST:/api/luteos/meta/email/exportEmailRepeatList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaEmailExportEmailRepeatList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaEmailRepeatReq;
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
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailExportRepeatSendEmail
   * @summary 导出重复触达记录
   * @request POST:/api/luteos/meta/email/exportRepeatSendEmail
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaEmailExportRepeatSendEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaEmailRepeatSendExcelReq;
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
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailOperateEmailAppeal
   * @summary 申诉操作
   * @request POST:/api/luteos/meta/email/operateEmailAppeal
   * @response `200` `EmailAppealOperateResp` OK
   */
  export namespace LuteosMetaEmailOperateEmailAppeal {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EmailAppealOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = EmailAppealOperateResp;
  }

  /**
   * No description
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryBatchEmailList
   * @summary 批量查询红人邮箱
   * @request POST:/api/luteos/meta/email/queryBatchEmailList
   * @response `200` `MetaEmailBatchResp` OK
   */
  export namespace LuteosMetaEmailQueryBatchEmailList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaEmailBatchReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaEmailBatchResp;
  }

  /**
   * No description
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailAppealList
   * @summary 申诉列表
   * @request POST:/api/luteos/meta/email/queryEmailAppealList
   * @response `200` `MetaEmailAppealResp` OK
   */
  export namespace LuteosMetaEmailQueryEmailAppealList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 发件邮箱/收件邮箱 */
      emailKeyword?: string;
      /** 提交人/邮箱使用人 */
      nameKeyword?: string;
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
       * 审核状态 1-待审核 2-已通过 3-驳回 4-撤销
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
    export type ResponseBody = MetaEmailAppealResp;
  }

  /**
   * No description
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailBlackList
   * @summary 查询邮件黑/白名单或审核人列表
   * @request GET:/api/luteos/meta/email/queryEmailBlackList
   * @response `200` `MetaEmailBlackResp` OK
   */
  export namespace LuteosMetaEmailQueryEmailBlackList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 场景 邮箱：email */
      scene?: string;
      /** 场景 邮箱：email 审核人：approve_by */
      sceneList?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaEmailBlackResp;
  }

  /**
   * No description
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailContent
   * @summary 查询红人邮箱内容
   * @request GET:/api/luteos/meta/email/queryEmailContent
   * @response `200` `MetaEmailContentResp` OK
   */
  export namespace LuteosMetaEmailQueryEmailContent {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 消息ID */
      messageId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaEmailContentResp;
  }

  /**
   * No description
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailHistoryList
   * @summary 查询往来邮件列表
   * @request POST:/api/luteos/meta/email/queryEmailHistoryList
   * @response `200` `MetaEmailHistoryResp` OK
   */
  export namespace LuteosMetaEmailQueryEmailHistoryList {
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
      /** 红人邮箱 */
      receiverEmail?: string;
      /** 推广发件邮箱 */
      sendEmail?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaEmailHistoryResp;
  }

  /**
   * No description
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailList
   * @summary 查询红人邮件列表
   * @request POST:/api/luteos/meta/email/queryEmailList
   * @response `200` `MetaEmailResp` OK
   */
  export namespace LuteosMetaEmailQueryEmailList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaEmailRecordReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaEmailResp;
  }

  /**
   * No description
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailRepeatList
   * @summary 查询邮箱触达列表
   * @request POST:/api/luteos/meta/email/queryEmailRepeatList
   * @response `200` `MetaEmailRepeatResp` OK
   */
  export namespace LuteosMetaEmailQueryEmailRepeatList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaEmailRepeatReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaEmailRepeatResp;
  }

  /**
   * No description
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryRepeatSendEmail
   * @summary 查询导出重复触达记录
   * @request GET:/api/luteos/meta/email/queryRepeatSendEmail
   * @response `200` `MetaEmailResp` OK
   */
  export namespace LuteosMetaEmailQueryRepeatSendEmail {
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
      /** 收件人邮箱 */
      receiverEmail?: string;
      /** 发件人邮箱 */
      sendEmail?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaEmailResp;
  }

  /**
   * No description
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryTag
   * @summary 邮箱标签查询
   * @request POST:/api/luteos/meta/email/queryTag
   * @response `200` `MetaEmailTagResp` OK
   */
  export namespace LuteosMetaEmailQueryTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaEmailTagQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaEmailTagResp;
  }

  /**
   * No description
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailSaveApproveConfig
   * @summary 保存申诉配置
   * @request POST:/api/luteos/meta/email/saveApproveConfig
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMetaEmailSaveApproveConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaApproveConfigReq;
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
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailSaveEmailBlackList
   * @summary 保存邮箱黑名单
   * @request POST:/api/luteos/meta/email/saveEmailBlackList
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMetaEmailSaveEmailBlackList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaEmailBlackSaveReq;
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
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailUpdateTag
   * @summary 邮箱标签保存更新
   * @request POST:/api/luteos/meta/email/updateTag
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMetaEmailUpdateTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaModifyTagReq;
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
   * @tags 标识码管理
   * @name LuteosMetaExportAmazonMetaMarkList
   * @summary 亚马逊标识码列表导出
   * @request POST:/api/luteos/meta/exportAmazonMetaMarkList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaExportAmazonMetaMarkList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkListQueryReq;
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
   * @tags 标识码管理
   * @name LuteosMetaExportMetaMark
   * @summary 标识码列表导出
   * @request POST:/api/luteos/meta/exportMetaMark
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaExportMetaMark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkListQueryReq;
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
   * @tags 标识码管理
   * @name LuteosMetaExportMetaMarkStationTask
   * @summary 折扣码独立站任务列表导出
   * @request POST:/api/luteos/meta/exportMetaMarkStationTask
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaExportMetaMarkStationTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkTaskListQueryReq;
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
   * @tags 标识码管理
   * @name LuteosMetaExportMetaMarkTask
   * @summary 折扣码亚马逊任务列表导出
   * @request POST:/api/luteos/meta/exportMetaMarkTask
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaExportMetaMarkTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkTaskListQueryReq;
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
   * @tags 合作管理
   * @name LuteosMetaExportPartnerDataList
   * @summary 合作项目-合作数据维度导出
   * @request POST:/api/luteos/meta/exportPartnerDataList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaExportPartnerDataList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaProjectReq;
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
   * @tags 合作管理
   * @name LuteosMetaExportProjectList
   * @summary 合作项目列表导出
   * @request POST:/api/luteos/meta/exportProjectList
   * @deprecated
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaExportProjectList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaProjectReq;
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
   * @tags 标识码管理
   * @name LuteosMetaExportShopifyMetaMarkList
   * @summary 独立站标识码列表导出
   * @request POST:/api/luteos/meta/exportShopifyMetaMarkList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaExportShopifyMetaMarkList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkListQueryReq;
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
   * @tags 红人管理
   * @name LuteosMetaExportUserList
   * @summary 红人列表导出
   * @request POST:/api/luteos/meta/exportUserList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaExportUserList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserQueryReq;
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
   * @tags 标识码管理
   * @name LuteosMetaGetMetaInfoLastCache
   * @summary 获取用户缓存红人信息
   * @request GET:/api/luteos/meta/getMetaInfoLastCache
   * @response `200` `MetaInfoLastCacheResp` OK
   */
  export namespace LuteosMetaGetMetaInfoLastCache {
    export type RequestParams = {};
    export type RequestQuery = {
      /** userCode */
      userCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaInfoLastCacheResp;
  }

  /**
   * No description
   * @tags 标识码管理
   * @name LuteosMetaHandleMetaMark
   * @summary 标识码信息操作
   * @request POST:/api/luteos/meta/handleMetaMark
   * @response `200` `MetaMarkHandleResp` OK
   */
  export namespace LuteosMetaHandleMetaMark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkHandleReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaMarkHandleResp;
  }

  /**
   * No description
   * @tags 标识码管理
   * @name LuteosMetaHandleMetaMarkTask
   * @summary 标识码任务操作
   * @request POST:/api/luteos/meta/handleMetaMarkTask
   * @response `200` `void` OK
   */
  export namespace LuteosMetaHandleMetaMarkTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkTaskHandleReq;
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
   * @tags 红人管理
   * @name LuteosMetaImportMetaUser
   * @summary 批量上传红人信息
   * @request POST:/api/luteos/meta/import/metaUser
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosMetaImportMetaUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaUserImportReq;
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
   * @tags 标识码管理
   * @name LuteosMetaJoinMarkPromotion
   * @summary 参与大促
   * @request POST:/api/luteos/meta/joinMarkPromotion
   * @response `200` `void` OK
   */
  export namespace LuteosMetaJoinMarkPromotion {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = JoinMarkPromotionReq;
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
   * @tags 亚马逊折-扣码映射
   * @name LuteosMetaMappingQueryMetaMarkTrackingMapping
   * @summary 查询亚马逊-折扣码映射
   * @request GET:/api/luteos/meta/mapping/queryMetaMarkTrackingMapping
   * @response `200` `MetaMarkTrackingMappingResp` OK
   */
  export namespace LuteosMetaMappingQueryMetaMarkTrackingMapping {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 红人渠道 */
      channelCode?: string;
      /** 推广人员 */
      creator?: string;
      /** 折扣码/红人渠道账号/追踪码 */
      keyword?: string;
      /**
       * 映射状态 0-无效 1-有效
       * @format int32
       */
      mappingStatus?: number;
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
      /** 平台 amazon-亚马逊 station-独立站 */
      platformCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaMarkTrackingMappingResp;
  }

  /**
   * No description
   * @tags 亚马逊-折扣码映射
   * @name LuteosMetaMappingUpdateMetaMarkTrackingMapping
   * @summary 编辑亚马逊-折扣码映射
   * @request POST:/api/luteos/meta/mapping/updateMetaMarkTrackingMapping
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMetaMappingUpdateMetaMarkTrackingMapping {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkTrackingMappingBatchUpdateReq;
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
   * @tags 合作管理
   * @name LuteosMetaOperateMetaProject
   * @summary 合作项目操作
   * @request POST:/api/luteos/meta/operateMetaProject
   * @response `200` `MetaProjectOperateResp` OK
   */
  export namespace LuteosMetaOperateMetaProject {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaProjectOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaProjectOperateResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaOperateUser
   * @summary 红人操作
   * @request POST:/api/luteos/meta/operateUser
   * @response `200` `UserOperateResp` OK
   */
  export namespace LuteosMetaOperateUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserOperateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserOperateResp;
  }

  /**
   * No description
   * @tags 红人付款申请单
   * @name LuteosMetaPprQueryDraftAndEnums
   * @summary 查询草稿及枚举
   * @request GET:/api/luteos/meta/ppr/queryDraftAndEnums
   * @response `200` `CommonRespPprDraftEnumsResp` OK
   */
  export namespace LuteosMetaPprQueryDraftAndEnums {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code?: string;
      /** projectCode */
      projectCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPprDraftEnumsResp;
  }

  /**
   * No description
   * @tags 红人付款申请单
   * @name LuteosMetaPprQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/meta/ppr/queryList
   * @response `200` `PprListQueryResp` OK
   */
  export namespace LuteosMetaPprQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PprListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = PprListQueryResp;
  }

  /**
   * No description
   * @tags 红人付款申请单
   * @name LuteosMetaPprQueryProcessNodeParams
   * @summary 获取审核节点参数
   * @request POST:/api/luteos/meta/ppr/queryProcessNodeParams
   * @response `200` `CommonRespJSONObject` OK
   */
  export namespace LuteosMetaPprQueryProcessNodeParams {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PprSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespJSONObject;
  }

  /**
   * No description
   * @tags 红人付款申请单
   * @name LuteosMetaPprSaveOrUpdate
   * @summary 保存或保存草稿
   * @request POST:/api/luteos/meta/ppr/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  export namespace LuteosMetaPprSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PprSaveReq;
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
   * @tags 渠道管理
   * @name LuteosMetaQueryChannelList
   * @summary 查询渠道列表
   * @request GET:/api/luteos/meta/queryChannelList
   * @response `200` `ChannelQueryResp` OK
   */
  export namespace LuteosMetaQueryChannelList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道code */
      channelCode?: string;
      /** 关键字查询, 渠道名称 */
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
    export type ResponseBody = ChannelQueryResp;
  }

  /**
   * No description
   * @tags 特征管理
   * @name LuteosMetaQueryFeatureList
   * @summary 查询特征列表
   * @request GET:/api/luteos/meta/queryFeatureList
   * @response `200` `MetaFeatureQueryResp` OK
   */
  export namespace LuteosMetaQueryFeatureList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 关键词 */
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
    export type ResponseBody = MetaFeatureQueryResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaQueryLabelList
   * @summary 标签列表查询
   * @request GET:/api/luteos/meta/queryLabelList
   * @response `200` `LabelListQueryResp` OK
   */
  export namespace LuteosMetaQueryLabelList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 标签编码 （红人模块：不传查一级标签，传查二级标签） */
      labelCode?: string;
      /** 标签模块 meta-红人 agency-服务商 */
      module?: string;
      /** 标签名称 */
      name?: string;
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
    export type ResponseBody = LabelListQueryResp;
  }

  /**
   * No description
   * @tags 标识码管理
   * @name LuteosMetaQueryMarkTaskStationDetail
   * @summary 折扣码独立站详情
   * @request GET:/api/luteos/meta/queryMarkTaskStationDetail
   * @response `200` `MarkTaskStationDetailResp` OK
   */
  export namespace LuteosMetaQueryMarkTaskStationDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 折扣任务编码 */
      taskCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MarkTaskStationDetailResp;
  }

  /**
   * No description
   * @tags 标识码管理
   * @name LuteosMetaQueryMarketMemberList
   * @summary 推广人员列表
   * @request GET:/api/luteos/meta/queryMarketMemberList
   * @response `200` `MetaMarkMemberResp` OK
   */
  export namespace LuteosMetaQueryMarketMemberList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaMarkMemberResp;
  }

  /**
   * No description
   * @tags 标识码管理
   * @name LuteosMetaQueryMetaCommonOperateLog
   * @summary 通用操作日志
   * @request GET:/api/luteos/meta/queryMetaCommonOperateLog
   * @response `200` `MetaOperateLogResp` OK
   */
  export namespace LuteosMetaQueryMetaCommonOperateLog {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 记录唯一编码 */
      itemCode: string;
      /** 模块类型  折扣码任务模块：mark_task  */
      moduleType: string;
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
    export type ResponseBody = MetaOperateLogResp;
  }

  /**
   * No description
   * @tags 标识码管理
   * @name LuteosMetaQueryMetaMarkList
   * @summary 标识码列表查询
   * @request GET:/api/luteos/meta/queryMetaMarkList
   * @response `200` `MetaMarkListQueryResp` OK
   */
  export namespace LuteosMetaQueryMetaMarkList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道平台 tiktok youtube instagram */
      channelCode?: string;
      /**
       * 折扣码创建日期
       * @format date
       */
      codeCreateTime?: string;
      /**
       * 折扣失效日期
       * @format date
       */
      codeDisableTime?: string;
      /** 创建人-推广人编码 */
      creatorCode?: string;
      /**
       * 结束时间
       * @format date
       */
      endTime?: string;
      /** 关键字查询, 红人名称/合作产品/品线 */
      keyword?: string;
      /** 品线 */
      lineCode?: string;
      /** 标识码 */
      markCode?: string;
      /**
       * 折扣码状态 1-待生效 2-生效中 3-已到期 4-已取消 5-关停中 6-已作废
       * @format int32
       */
      markStatus?: number;
      /** 折扣码标识 */
      markTag?: string;
      /** 运营负责人 */
      operator?: string;
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
      /** 平台编码  区分两个平台的数据，数据隔离 */
      platformCode: string;
      /** 合作项目编码 */
      projectCode?: string;
      /** 产品编码 */
      spuCode?: string;
      /**
       * 开始时间
       * @format date
       */
      startTime?: string;
      /** 红人账号 */
      userCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaMarkListQueryResp;
  }

  /**
   * No description
   * @tags 标识码管理
   * @name LuteosMetaQueryMetaMarkTaskList
   * @summary 标识码任务列表查询
   * @request GET:/api/luteos/meta/queryMetaMarkTaskList
   * @response `200` `MetaMarkTaskListQueryResp` OK
   */
  export namespace LuteosMetaQueryMetaMarkTaskList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道平台 tiktok youtube instagram */
      channelCode?: string;
      /** 创建人-推广人编码 */
      creatorCode?: string;
      /**
       * 折扣类型  1-全站折扣 2-单品折扣 3-分类页折扣
       * @format int32
       */
      discountType?: number;
      /**
       * 结束时间
       * @format date
       */
      endTime?: string;
      /**
       * 是否导出操作 1-是 ，导出时必传
       * @format int32
       */
      exportFlag?: number;
      /** 关键字查询, 红人名称/合作产品/品线 */
      keyword?: string;
      /** 品线 */
      lineCode?: string;
      /** 标识码 */
      markCode?: string;
      /** 折扣码标识 */
      markTag?: string;
      /** 运营编码 */
      operateCode?: string;
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
      /** 平台编码 */
      platformCode: string;
      /**
       * 开始时间
       * @format date
       */
      startTime?: string;
      /** 任务编码集合 勾选时传 */
      taskCodeList?: string[];
      /**
       * 任务状态 1-待办 2-已完成 3-取消
       * @format int32
       */
      taskStatus?: number;
      /**
       * 任务类型 1-新建 2-延期 3-重建 4-大促配置 5-大促后配置
       * @format int32
       */
      taskType?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaMarkTaskListQueryResp;
  }

  /**
   * No description
   * @tags 合作项目
   * @name LuteosMetaQueryMetaOperateLog
   * @summary 红人操作日志
   * @request GET:/api/luteos/meta/queryMetaOperateLog
   * @response `200` `MetaOperateLogResp` OK
   */
  export namespace LuteosMetaQueryMetaOperateLog {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 红人编码 */
      userCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaOperateLogResp;
  }

  /**
   * No description
   * @tags 合作管理
   * @name LuteosMetaQueryMetaProjectAuth
   * @summary 合作项目权限查询
   * @request GET:/api/luteos/meta/queryMetaProjectAuth
   * @response `200` `MetaProjectAuthResp` OK
   */
  export namespace LuteosMetaQueryMetaProjectAuth {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaProjectAuthResp;
  }

  /**
   * No description
   * @tags 合作项目
   * @name LuteosMetaQueryMetaProjectDetail
   * @summary 合作项目详情
   * @request POST:/api/luteos/meta/queryMetaProjectDetail
   * @response `200` `MetaProjectDetailResp` OK
   */
  export namespace LuteosMetaQueryMetaProjectDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 合作项目编码 */
      projectCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaProjectDetailResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaQueryMetaTeamList
   * @summary 查询红人推广团队列表
   * @request GET:/api/luteos/meta/queryMetaTeamList
   * @response `200` `MetaTeamListResp` OK
   */
  export namespace LuteosMetaQueryMetaTeamList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaTeamListResp;
  }

  /**
   * No description
   * @tags 标识码管理
   * @name LuteosMetaQueryOneTaskOperators
   * @summary 标识码任务运营人员查询-多个标识码
   * @request POST:/api/luteos/meta/queryOneTaskOperators
   * @response `200` `MetaMarkTaskOperatorV2Resp` OK
   */
  export namespace LuteosMetaQueryOneTaskOperators {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkTaskOperatorV2Req;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaMarkTaskOperatorV2Resp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosMetaQueryOperatorList
   * @summary 获取运营人员列表
   * @request GET:/api/luteos/meta/queryOperatorList
   * @response `200` `MetaOperatorQueryResp` OK
   */
  export namespace LuteosMetaQueryOperatorList {
    export type RequestParams = {};
    export type RequestQuery = {};
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
   * @tags 标识码管理
   * @name LuteosMetaQueryOperatorToday
   * @summary 查询折扣独立站当天运营
   * @request GET:/api/luteos/meta/queryOperatorToday
   * @response `200` `MarkTaskStationResp` OK
   */
  export namespace LuteosMetaQueryOperatorToday {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MarkTaskStationResp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosMetaQueryProductByLine
   * @summary 品线列表查询商品
   * @request GET:/api/luteos/meta/queryProductByLine
   * @response `200` `MetaProductListQueryV2Resp` OK
   */
  export namespace LuteosMetaQueryProductByLine {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 品牌编码 */
      brandCode?: string;
      /** 分类编码，如果传分类编码，分类等级一定要赋值 */
      categoryCode?: string;
      /** 勾选导出的编码 */
      codeList?: string[];
      /** 对象编码 */
      itemCode?: string;
      /**
       * 对象类型 1-品牌 2-型号 3-系列 4-敏感类型 5-标签
       * @format int32
       */
      itemType?: number;
      /** 商品名称/spu */
      keyWord?: string;
      /**
       * 分类等级，如果传分类编码，分类等级一定要赋值
       * @format int32
       * @min 1
       * @exclusiveMin false
       * @max 5
       * @exclusiveMax false
       */
      level?: number;
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
      /** 产品经理编码 */
      productManagerCode?: string;
      /** 商品名称 */
      productName?: string;
      /** 商品spu编码 */
      productSpu?: string;
      /**
       * 状态
       * @format int32
       */
      state?: number;
      /** 标签编码 */
      tagCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaProductListQueryV2Resp;
  }

  /**
   * No description
   * @tags 标识码管理
   * @name LuteosMetaQueryProductConfigMapping
   * @summary 配置映射查询
   * @request POST:/api/luteos/meta/queryProductConfigMapping
   * @response `200` `MetaMarkProductConfigQueryResp` OK
   */
  export namespace LuteosMetaQueryProductConfigMapping {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkProductConfigQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaMarkProductConfigQueryResp;
  }

  /**
   * No description
   * @tags 基础数据
   * @name LuteosMetaQueryProductLineList
   * @summary 品线列表查询
   * @request GET:/api/luteos/meta/queryProductLineList
   * @response `200` `MetaProductLineQueryResp` OK
   */
  export namespace LuteosMetaQueryProductLineList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 产品线名称 */
      name?: string;
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
      /** 产品线编码 */
      productLineCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaProductLineQueryResp;
  }

  /**
   * No description
   * @tags 合作管理
   * @name LuteosMetaQueryProjectList
   * @summary 合作项目列表查询
   * @request GET:/api/luteos/meta/queryProjectList
   * @response `200` `MetaProjectResp` OK
   */
  export namespace LuteosMetaQueryProjectList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 信息维度 mark-折扣码 video-合作数据 order-寄样信息 */
      dimension?: string;
      /**
       * 结束时间
       * @format date
       */
      endTime?: string;
      /** 关键字 */
      keyword?: string;
      /** 合作标签集合 */
      labelCodeList?: string[];
      /** 项目成员编码 合伙人编码 */
      memberCode?: string;
      /** 合作事项创建人集合  红人详情查询合作事项列表使用 */
      memberCodeList?: string[];
      /** 项目名称 */
      name?: string;
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
      /** 项目编码 */
      projectCode?: string;
      /** spu编码集合  -- 寄样产品多选 */
      sampleSpuCodeList?: string[];
      /** 场景 合作管理-manage 我的合作-mine */
      scene?: string;
      /** spu编码集合 */
      spuCodeList?: string[];
      /**
       * 开始时间
       * @format date
       */
      startTime?: string;
      /** 项目状态 2-进行中 21-进行中-已寄样 22-进行中-已付款 23-进行中-已发布 5-顺利完结 4-取消 41-取消-跑单 42-取消-需求变动 43-取消-缺货 44-取消-其他 */
      statusList?: number[];
      /**
       * 团队
       * @format int32
       */
      team?: number;
      /** 团队编码 */
      teamCode?: string;
      /** 红人编码 */
      userCode?: string;
      /** 红人名称 */
      userName?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaProjectResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaQueryProjectPlatform
   * @summary 查询合作项目的合作平台
   * @request GET:/api/luteos/meta/queryProjectPlatform
   * @response `200` `MetaProjectPlatformResp` OK
   */
  export namespace LuteosMetaQueryProjectPlatform {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 项目编码 */
      projectCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaProjectPlatformResp;
  }

  /**
   * No description
   * @tags 标识码管理
   * @name LuteosMetaQueryTaskOperators
   * @summary 标识码任务运营人员查询
   * @request GET:/api/luteos/meta/queryTaskOperators
   * @response `200` `MetaMarkTaskOperatorResp` OK
   */
  export namespace LuteosMetaQueryTaskOperators {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 商品编码 */
      productCode: string;
      /** 商品编码列表 */
      productCodeList?: string[];
      /** 站点 */
      site: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaMarkTaskOperatorResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaQueryUserChannelInfo
   * @summary 红人详情-红人渠道列表-查询
   * @request GET:/api/luteos/meta/queryUserChannelInfo
   * @response `200` `UserChannelListQueryResp` OK
   */
  export namespace LuteosMetaQueryUserChannelInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 用户编码 */
      userCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserChannelListQueryResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaQueryUserInfo
   * @summary 查询红人详情
   * @request GET:/api/luteos/meta/queryUserInfo
   * @response `200` `UserDetailQueryResp` OK
   */
  export namespace LuteosMetaQueryUserInfo {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 操作  1-合作 2-创建合作
       * @format int32
       */
      operateType: number;
      /** 用户编码 */
      userCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserDetailQueryResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaQueryUserList
   * @summary 查询红人列表
   * @request GET:/api/luteos/meta/queryUserList
   * @response `200` `UserQueryResp` OK
   */
  export namespace LuteosMetaQueryUserList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道code列表 */
      channelCodeList?: string[];
      /** 合作产品 */
      cooperationProducts?: string[];
      /** 国家code列表 */
      countryList?: string[];
      /** 录入人 */
      creatorCode?: string;
      /**
       * 粉丝数
       * @format int32
       */
      fansNumEnd?: number;
      /**
       * 粉丝数
       * @format int32
       */
      fansNumStart?: number;
      /** 特征code列表 */
      featureCodeList?: string[];
      /** 关键字查询, 用户名称/邮箱 */
      keyword?: string;
      /** 标签code列表 */
      labelCodeList?: string[];
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
      /** 录入日期 yyyy-MM-dd */
      recordDate?: string;
      /** 录入日期 yyyy-MM-dd */
      recordDateEnd?: string;
      /** 录入日期 yyyy-MM-dd */
      recordDateStart?: string;
      /**
       * 状态 1-未合作 2-合作中 MetaUserStatusEnum
       * @format int32
       */
      status?: number;
      /**
       * 团队 1-品牌推广 2-GTM推广 3-小店推广 枚举 MetaUserTeamEnum
       * @format int32
       */
      team?: number;
      /** 团队编码 */
      teamCode?: string;
      /** 未合作产品 */
      unCooperationProducts?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserQueryResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaQueryUserListParam
   * @summary 红人列表查询参数
   * @request GET:/api/luteos/meta/queryUserListParam
   * @response `200` `UserListParamQueryResp` OK
   */
  export namespace LuteosMetaQueryUserListParam {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserListParamQueryResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaQueryUserListSelect
   * @summary 查询红人列表-下拉选择
   * @request GET:/api/luteos/meta/queryUserListSelect
   * @response `200` `UserQueryResp` OK
   */
  export namespace LuteosMetaQueryUserListSelect {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 渠道code列表 */
      channelCodeList?: string[];
      /** 合作产品 */
      cooperationProducts?: string[];
      /** 国家code列表 */
      countryList?: string[];
      /** 录入人 */
      creatorCode?: string;
      /**
       * 粉丝数
       * @format int32
       */
      fansNumEnd?: number;
      /**
       * 粉丝数
       * @format int32
       */
      fansNumStart?: number;
      /** 特征code列表 */
      featureCodeList?: string[];
      /** 关键字查询, 用户名称/邮箱 */
      keyword?: string;
      /** 标签code列表 */
      labelCodeList?: string[];
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
      /** 录入日期 yyyy-MM-dd */
      recordDate?: string;
      /** 录入日期 yyyy-MM-dd */
      recordDateEnd?: string;
      /** 录入日期 yyyy-MM-dd */
      recordDateStart?: string;
      /**
       * 状态 1-未合作 2-合作中 MetaUserStatusEnum
       * @format int32
       */
      status?: number;
      /**
       * 团队 1-品牌推广 2-GTM推广 3-小店推广 枚举 MetaUserTeamEnum
       * @format int32
       */
      team?: number;
      /** 团队编码 */
      teamCode?: string;
      /** 未合作产品 */
      unCooperationProducts?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserQueryResp;
  }

  /**
   * No description
   * @tags 合作管理
   * @name LuteosMetaRefreshMetaPartnerVideo
   * @summary 合作项目-更新合作视频数据
   * @request POST:/api/luteos/meta/refreshMetaPartnerVideo
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMetaRefreshMetaPartnerVideo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaProjectPartnerVideoReq;
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
   * @tags 渠道管理
   * @name LuteosMetaSaveChannelInfo
   * @summary 保存渠道信息
   * @request POST:/api/luteos/meta/saveChannelInfo
   * @response `200` `ChannelSaveResp` OK
   */
  export namespace LuteosMetaSaveChannelInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChannelSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ChannelSaveResp;
  }

  /**
   * No description
   * @tags 红人管理
   * @name LuteosMetaSaveChannelUserInfo
   * @summary 保存渠道红人信息（插件）
   * @request POST:/api/luteos/meta/saveChannelUserInfo
   * @response `200` `void` OK
   */
  export namespace LuteosMetaSaveChannelUserInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserChannelSaveReq;
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
   * @tags 特征管理
   * @name LuteosMetaSaveFeature
   * @summary 保存红人特征
   * @request POST:/api/luteos/meta/saveFeature
   * @response `200` `MetaFeatureSaveResp` OK
   */
  export namespace LuteosMetaSaveFeature {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaFeatureSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaFeatureSaveResp;
  }

  /**
   * No description
   * @tags 标识码管理
   * @name LuteosMetaSaveMetaMarkInfo
   * @summary 标识码信息保存
   * @request POST:/api/luteos/meta/saveMetaMarkInfo
   * @response `200` `void` OK
   */
  export namespace LuteosMetaSaveMetaMarkInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkSaveReq;
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
   * @tags 标识码管理
   * @name LuteosMetaSaveMetaMarkTask
   * @summary 标识码任务保存
   * @request POST:/api/luteos/meta/saveMetaMarkTask
   * @response `200` `MetaMarkTaskSaveResp` OK
   */
  export namespace LuteosMetaSaveMetaMarkTask {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaMarkTaskSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaMarkTaskSaveResp;
  }

  /**
   * No description
   * @tags 合作项目
   * @name LuteosMetaSaveMetaProject
   * @summary 合作项目保存
   * @request POST:/api/luteos/meta/saveMetaProject
   * @response `200` `MetaProjectSaveResp` OK
   */
  export namespace LuteosMetaSaveMetaProject {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaProjectSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MetaProjectSaveResp;
  }

  /**
   * No description
   * @tags 合作项目
   * @name LuteosMetaSaveProjectTkAmount
   * @summary TK小店引入金额添加
   * @request POST:/api/luteos/meta/saveProjectTkAmount
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMetaSaveProjectTkAmount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaProjectTkAmountReq;
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
   * @tags 红人管理
   * @name LuteosMetaSaveUserInfo
   * @summary 保存红人信息
   * @request POST:/api/luteos/meta/saveUserInfo
   * @response `200` `UserSaveResp` OK
   */
  export namespace LuteosMetaSaveUserInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserSaveResp;
  }

  /**
   * No description
   * @tags mark-task-promotion-controller
   * @name LuteosMetaTaskPromotionQueryMarkTaskPromotionDetail
   * @summary 查询大促配置详情
   * @request GET:/api/luteos/meta/task/promotion/queryMarkTaskPromotionDetail
   * @response `200` `MarkTaskPromotionDetailResp` OK
   */
  export namespace LuteosMetaTaskPromotionQueryMarkTaskPromotionDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 唯一编码 */
      taskPromotionCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MarkTaskPromotionDetailResp;
  }

  /**
   * No description
   * @tags mark-task-promotion-controller
   * @name LuteosMetaTaskPromotionQueryMarkTaskPromotionList
   * @summary 查询大促配置列表
   * @request GET:/api/luteos/meta/task/promotion/queryMarkTaskPromotionList
   * @response `200` `MarkTaskPromotionListResp` OK
   */
  export namespace LuteosMetaTaskPromotionQueryMarkTaskPromotionList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = MarkTaskPromotionListResp;
  }

  /**
   * No description
   * @tags mark-task-promotion-controller
   * @name LuteosMetaTaskPromotionSaveMarkTaskPromotion
   * @summary 大促配置保存操作
   * @request POST:/api/luteos/meta/task/promotion/saveMarkTaskPromotion
   * @response `200` `void` OK
   */
  export namespace LuteosMetaTaskPromotionSaveMarkTaskPromotion {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MarkTaskPromotionSaveReq;
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
   * @tags 合作项目
   * @name LuteosMetaUpdateMetaProjectDetailStaus
   * @summary 修改合作项目状态
   * @request POST:/api/luteos/meta/updateMetaProjectDetailStaus
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMetaUpdateMetaProjectDetailStaus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaProjectStatusReq;
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
   * @tags 合作项目
   * @name LuteosMetaUpdateProjectDetailChannel
   * @summary 更新合作项目渠道
   * @request POST:/api/luteos/meta/updateProjectDetailChannel
   * @response `200` `CommonRespObject` OK
   */
  export namespace LuteosMetaUpdateProjectDetailChannel {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaProjectChannelUpdateReq;
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
   * @tags 合作管理
   * @name LuteosMetaV2ExportProjectList
   * @summary 合作项目列表导出V2
   * @request POST:/api/luteos/meta/v2/exportProjectList
   * @response `200` `CommonExportResp` OK
   */
  export namespace LuteosMetaV2ExportProjectList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MetaProjectReq;
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
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderAbandon
   * @summary 发样单-作废
   * @request POST:/api/luteos/meta/v3/sampleorder/abandon
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosMetaV3SampleorderAbandon {
    export type RequestParams = {};
    export type RequestQuery = {
      /** orderCode */
      orderCode: string;
    };
    export type RequestBody = never;
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
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderCanRefresh
   * @summary 发样单-是否能手动刷新
   * @request POST:/api/luteos/meta/v3/sampleorder/can/refresh
   * @deprecated
   * @response `200` `CommonRespBoolean` OK
   */
  export namespace LuteosMetaV3SampleorderCanRefresh {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderCheckSampleSpu
   * @summary 发样单-校验商品信息
   * @request GET:/api/luteos/meta/v3/sampleorder/checkSampleSpu
   * @response `200` `void` OK
   */
  export namespace LuteosMetaV3SampleorderCheckSampleSpu {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 合作人编码 */
      memberCode?: string;
      /** 商品中心spu编码 */
      spuCodeList: string[];
      /** 红人编码 */
      userCode: string;
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
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderQueryDetail
   * @summary 发样单-详情
   * @request GET:/api/luteos/meta/v3/sampleorder/queryDetail
   * @response `200` `SampleOrderV3DetailResp` OK
   */
  export namespace LuteosMetaV3SampleorderQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** orderCode */
      orderCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SampleOrderV3DetailResp;
  }

  /**
   * No description
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderQueryList
   * @summary 发样单-查询
   * @request POST:/api/luteos/meta/v3/sampleorder/queryList
   * @response `200` `SampleOrderV3ListQueryResp` OK
   */
  export namespace LuteosMetaV3SampleorderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SampleOrderV3ListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SampleOrderV3ListQueryResp;
  }

  /**
   * No description
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderReferenceParams
   * @summary 发样单-引用特殊参数
   * @request POST:/api/luteos/meta/v3/sampleorder/reference/params
   * @response `200` `ReferenceParamsResp` OK
   */
  export namespace LuteosMetaV3SampleorderReferenceParams {
    export type RequestParams = {};
    export type RequestQuery = {
      /** countryCode */
      countryCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ReferenceParamsResp;
  }

  /**
   * No description
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderReferenceParamsBySkuCode
   * @summary 发样单-引用特殊参数-按skucode过滤
   * @request POST:/api/luteos/meta/v3/sampleorder/reference/paramsBySkuCode
   * @response `200` `ReferenceParamsDeliveryMapResp` OK
   */
  export namespace LuteosMetaV3SampleorderReferenceParamsBySkuCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReferenceParamsDeliveryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ReferenceParamsDeliveryMapResp;
  }

  /**
   * No description
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderRefresh
   * @summary 发样单-手动刷新
   * @request POST:/api/luteos/meta/v3/sampleorder/refresh
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosMetaV3SampleorderRefresh {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SampleOrderV3RefreshReq;
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
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderSave
   * @summary 发样单-新增
   * @request POST:/api/luteos/meta/v3/sampleorder/save
   * @response `200` `CommonResp` OK
   */
  export namespace LuteosMetaV3SampleorderSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SampleOrderV3SaveReq;
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
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderSaveCheckDing
   * @summary 发样单-是否需要钉钉二次审核
   * @request POST:/api/luteos/meta/v3/sampleorder/saveCheckDing
   * @response `200` `CommonRespSaveCheckDingResp` OK
   */
  export namespace LuteosMetaV3SampleorderSaveCheckDing {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SampleOrderV3SaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespSaveCheckDingResp;
  }
}
