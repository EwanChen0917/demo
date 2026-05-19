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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 服务商资源分类模块
   * @name LuteosMetaAgencyCategoryDelete
   * @summary 删除资源分类
   * @request POST:/api/luteos/meta/agency/category/delete
   * @response `200` `void` OK
   */
  luteosMetaAgencyCategoryDelete = (req: AgencyDeleteReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/meta/agency/category/delete`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 服务商资源分类模块
   * @name LuteosMetaAgencyCategoryList
   * @summary 服务商资源分类列表查询
   * @request GET:/api/luteos/meta/agency/category/list
   * @response `200` `AgencyCategoryListResp` OK
   */
  luteosMetaAgencyCategoryList = (
    query?: {
      /** 上级分类code */
      parentCategoryCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AgencyCategoryListResp, any>({
      path: `/api/luteos/meta/agency/category/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 服务商资源分类模块
   * @name LuteosMetaAgencyCategorySave
   * @summary 保存服务商资源分类
   * @request POST:/api/luteos/meta/agency/category/save
   * @response `200` `void` OK
   */
  luteosMetaAgencyCategorySave = (req: AgencyCategorySaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/meta/agency/category/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 服务商资源模块
   * @name LuteosMetaAgencyExportExcel
   * @summary 导出excel
   * @request POST:/api/luteos/meta/agency/exportExcel
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaAgencyExportExcel = (req: AgencyListReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/agency/exportExcel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 服务商资源模块
   * @name LuteosMetaAgencyInfo
   * @summary 服务商资源详情
   * @request GET:/api/luteos/meta/agency/info
   * @response `200` `AgencyInfoResp` OK
   */
  luteosMetaAgencyInfo = (
    query?: {
      /** code */
      code?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AgencyInfoResp, any>({
      path: `/api/luteos/meta/agency/info`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 服务商资源模块
   * @name LuteosMetaAgencyList
   * @summary 服务商资源列表
   * @request GET:/api/luteos/meta/agency/list
   * @response `200` `AgencyListResp` OK
   */
  luteosMetaAgencyList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<AgencyListResp, any>({
      path: `/api/luteos/meta/agency/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 服务商资源模块
   * @name LuteosMetaAgencyOperationLogList
   * @summary 查询服务商资源操作日志
   * @request GET:/api/luteos/meta/agency/operationLog/list
   * @response `200` `(AgencyOperationLog)[]` OK
   */
  luteosMetaAgencyOperationLogList = (
    query: {
      /** 资源code */
      agcCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<AgencyOperationLog[], any>({
      path: `/api/luteos/meta/agency/operationLog/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 服务商资源模块
   * @name LuteosMetaAgencySave
   * @summary 保存服务商资源
   * @request POST:/api/luteos/meta/agency/save
   * @response `200` `void` OK
   */
  luteosMetaAgencySave = (req: AgencySaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/meta/agency/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaBatchUpdateMapping
   * @summary 产品运营映射配置一键编辑
   * @request POST:/api/luteos/meta/batchUpdateMapping
   * @response `200` `CommonRespObject` OK
   */
  luteosMetaBatchUpdateMapping = (req: MetaMarkOperatorMappingReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/meta/batchUpdateMapping`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaCheckChannelUser
   * @summary 渠道红人查重校验
   * @request POST:/api/luteos/meta/checkChannelUser
   * @response `200` `void` OK
   */
  luteosMetaCheckChannelUser = (req: UserChannelCheckReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/meta/checkChannelUser`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaCheckChannelUserData
   * @summary 渠道红人数据更新校验（插件）
   * @request POST:/api/luteos/meta/checkChannelUserData
   * @response `200` `MetaUserChannelCheckResp` OK
   */
  luteosMetaCheckChannelUserData = (req: UserChannelCheckReq, params: RequestParams = {}) =>
    this.request<MetaUserChannelCheckResp, any>({
      path: `/api/luteos/meta/checkChannelUserData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaCheckMetaUserInfo
   * @summary 校验红人参数
   * @request GET:/api/luteos/meta/checkMetaUserInfo
   * @response `200` `CommonRespString` OK
   */
  luteosMetaCheckMetaUserInfo = (
    query?: {
      /** 红人编码 */
      userCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/meta/checkMetaUserInfo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础数据
   * @name LuteosMetaCurrencyRateConvert
   * @summary 币种汇率转换
   * @request GET:/api/luteos/meta/currencyRateConvert
   * @response `200` `CurrencyRateConvertResp` OK
   */
  luteosMetaCurrencyRateConvert = (
    query: {
      /** 金额 */
      amount: number;
      /** 原币种 */
      sourceCurrency: string;
      /** 目标币种 */
      targetCurrency?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CurrencyRateConvertResp, any>({
      path: `/api/luteos/meta/currencyRateConvert`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础数据
   * @name LuteosMetaCurrencyRateConvertV2
   * @summary 币种汇率转换V2
   * @request GET:/api/luteos/meta/currencyRateConvertV2
   * @response `200` `CurrencyRateConvertResp` OK
   */
  luteosMetaCurrencyRateConvertV2 = (
    query: {
      /** 金额 */
      amount: number;
      /** 原币种 */
      sourceCurrency: string;
      /** 目标币种 */
      targetCurrency?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CurrencyRateConvertResp, any>({
      path: `/api/luteos/meta/currencyRateConvertV2`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaDeleteUserChannelInfo
   * @summary 红人详情-红人渠道列表-删除
   * @request POST:/api/luteos/meta/deleteUserChannelInfo
   * @response `200` `CommonRespObject` OK
   */
  luteosMetaDeleteUserChannelInfo = (req: UserChannelInfoDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/meta/deleteUserChannelInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaDownLoadMetaOrderTemplate
   * @summary 下载批量新增红人订单模板
   * @request POST:/api/luteos/meta/downLoadMetaOrderTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosMetaDownLoadMetaOrderTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/meta/downLoadMetaOrderTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaDownMetaTemplate
   * @summary 下载批量新增红人模板
   * @request POST:/api/luteos/meta/downMetaTemplate
   * @response `200` `CommonRespString` OK
   */
  luteosMetaDownMetaTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/meta/downMetaTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaEditUserChannelInfo
   * @summary 红人详情-红人渠道列表-编辑
   * @request POST:/api/luteos/meta/editUserChannelInfo
   * @response `200` `CommonRespObject` OK
   */
  luteosMetaEditUserChannelInfo = (req: UserChannelInfoUpdateReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/meta/editUserChannelInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱设置管理
   * @name LuteosMetaEmailAccountQueryEmailDetail
   * @summary 查询公司邮件账号详情
   * @request GET:/api/luteos/meta/email/account/queryEmailDetail
   * @response `200` `MetaEmailAccountDetailResp` OK
   */
  luteosMetaEmailAccountQueryEmailDetail = (
    query?: {
      /**
       * 唯一id
       * @format int64
       */
      id?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaEmailAccountDetailResp, any>({
      path: `/api/luteos/meta/email/account/queryEmailDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱设置管理
   * @name LuteosMetaEmailAccountQueryEmailList
   * @summary 查询公司邮件账号列表
   * @request GET:/api/luteos/meta/email/account/queryEmailList
   * @response `200` `MetaEmailAccountQueryResp` OK
   */
  luteosMetaEmailAccountQueryEmailList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaEmailAccountQueryResp, any>({
      path: `/api/luteos/meta/email/account/queryEmailList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱设置管理
   * @name LuteosMetaEmailAccountSaveEmail
   * @summary 保存邮箱账号
   * @request POST:/api/luteos/meta/email/account/saveEmail
   * @response `200` `MetaEmailAccountSaveResp` OK
   */
  luteosMetaEmailAccountSaveEmail = (req: MetaEmailAccountSaveReq, params: RequestParams = {}) =>
    this.request<MetaEmailAccountSaveResp, any>({
      path: `/api/luteos/meta/email/account/saveEmail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailExportBatchEmail
   * @summary 批量查询导出结果
   * @request POST:/api/luteos/meta/email/exportBatchEmail
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaEmailExportBatchEmail = (req: MetaEmailBatchReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/email/exportBatchEmail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailExportEmail
   * @summary 导出红人邮件列表
   * @request POST:/api/luteos/meta/email/exportEmail
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaEmailExportEmail = (req: MetaEmailRecordReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/email/exportEmail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailExportEmailRepeatList
   * @summary 导出邮箱触达列表
   * @request POST:/api/luteos/meta/email/exportEmailRepeatList
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaEmailExportEmailRepeatList = (req: MetaEmailRepeatReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/email/exportEmailRepeatList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailExportRepeatSendEmail
   * @summary 导出重复触达记录
   * @request POST:/api/luteos/meta/email/exportRepeatSendEmail
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaEmailExportRepeatSendEmail = (
    req: MetaEmailRepeatSendExcelReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/email/exportRepeatSendEmail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailOperateEmailAppeal
   * @summary 申诉操作
   * @request POST:/api/luteos/meta/email/operateEmailAppeal
   * @response `200` `EmailAppealOperateResp` OK
   */
  luteosMetaEmailOperateEmailAppeal = (req: EmailAppealOperateReq, params: RequestParams = {}) =>
    this.request<EmailAppealOperateResp, any>({
      path: `/api/luteos/meta/email/operateEmailAppeal`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryBatchEmailList
   * @summary 批量查询红人邮箱
   * @request POST:/api/luteos/meta/email/queryBatchEmailList
   * @response `200` `MetaEmailBatchResp` OK
   */
  luteosMetaEmailQueryBatchEmailList = (req: MetaEmailBatchReq, params: RequestParams = {}) =>
    this.request<MetaEmailBatchResp, any>({
      path: `/api/luteos/meta/email/queryBatchEmailList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailAppealList
   * @summary 申诉列表
   * @request POST:/api/luteos/meta/email/queryEmailAppealList
   * @response `200` `MetaEmailAppealResp` OK
   */
  luteosMetaEmailQueryEmailAppealList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaEmailAppealResp, any>({
      path: `/api/luteos/meta/email/queryEmailAppealList`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailBlackList
   * @summary 查询邮件黑/白名单或审核人列表
   * @request GET:/api/luteos/meta/email/queryEmailBlackList
   * @response `200` `MetaEmailBlackResp` OK
   */
  luteosMetaEmailQueryEmailBlackList = (
    query?: {
      /** 场景 邮箱：email */
      scene?: string;
      /** 场景 邮箱：email 审核人：approve_by */
      sceneList?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaEmailBlackResp, any>({
      path: `/api/luteos/meta/email/queryEmailBlackList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailContent
   * @summary 查询红人邮箱内容
   * @request GET:/api/luteos/meta/email/queryEmailContent
   * @response `200` `MetaEmailContentResp` OK
   */
  luteosMetaEmailQueryEmailContent = (
    query: {
      /** 消息ID */
      messageId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaEmailContentResp, any>({
      path: `/api/luteos/meta/email/queryEmailContent`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailHistoryList
   * @summary 查询往来邮件列表
   * @request POST:/api/luteos/meta/email/queryEmailHistoryList
   * @response `200` `MetaEmailHistoryResp` OK
   */
  luteosMetaEmailQueryEmailHistoryList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaEmailHistoryResp, any>({
      path: `/api/luteos/meta/email/queryEmailHistoryList`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailList
   * @summary 查询红人邮件列表
   * @request POST:/api/luteos/meta/email/queryEmailList
   * @response `200` `MetaEmailResp` OK
   */
  luteosMetaEmailQueryEmailList = (req: MetaEmailRecordReq, params: RequestParams = {}) =>
    this.request<MetaEmailResp, any>({
      path: `/api/luteos/meta/email/queryEmailList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryEmailRepeatList
   * @summary 查询邮箱触达列表
   * @request POST:/api/luteos/meta/email/queryEmailRepeatList
   * @response `200` `MetaEmailRepeatResp` OK
   */
  luteosMetaEmailQueryEmailRepeatList = (req: MetaEmailRepeatReq, params: RequestParams = {}) =>
    this.request<MetaEmailRepeatResp, any>({
      path: `/api/luteos/meta/email/queryEmailRepeatList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryRepeatSendEmail
   * @summary 查询导出重复触达记录
   * @request GET:/api/luteos/meta/email/queryRepeatSendEmail
   * @response `200` `MetaEmailResp` OK
   */
  luteosMetaEmailQueryRepeatSendEmail = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaEmailResp, any>({
      path: `/api/luteos/meta/email/queryRepeatSendEmail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailQueryTag
   * @summary 邮箱标签查询
   * @request POST:/api/luteos/meta/email/queryTag
   * @response `200` `MetaEmailTagResp` OK
   */
  luteosMetaEmailQueryTag = (req: MetaEmailTagQueryReq, params: RequestParams = {}) =>
    this.request<MetaEmailTagResp, any>({
      path: `/api/luteos/meta/email/queryTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailSaveApproveConfig
   * @summary 保存申诉配置
   * @request POST:/api/luteos/meta/email/saveApproveConfig
   * @response `200` `CommonRespObject` OK
   */
  luteosMetaEmailSaveApproveConfig = (req: MetaApproveConfigReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/meta/email/saveApproveConfig`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailSaveEmailBlackList
   * @summary 保存邮箱黑名单
   * @request POST:/api/luteos/meta/email/saveEmailBlackList
   * @response `200` `CommonRespObject` OK
   */
  luteosMetaEmailSaveEmailBlackList = (req: MetaEmailBlackSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/meta/email/saveEmailBlackList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人邮箱管理
   * @name LuteosMetaEmailUpdateTag
   * @summary 邮箱标签保存更新
   * @request POST:/api/luteos/meta/email/updateTag
   * @response `200` `CommonRespObject` OK
   */
  luteosMetaEmailUpdateTag = (req: MetaModifyTagReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/meta/email/updateTag`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaExportAmazonMetaMarkList
   * @summary 亚马逊标识码列表导出
   * @request POST:/api/luteos/meta/exportAmazonMetaMarkList
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaExportAmazonMetaMarkList = (req: MetaMarkListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/exportAmazonMetaMarkList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaExportMetaMark
   * @summary 标识码列表导出
   * @request POST:/api/luteos/meta/exportMetaMark
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaExportMetaMark = (req: MetaMarkListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/exportMetaMark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaExportMetaMarkStationTask
   * @summary 折扣码独立站任务列表导出
   * @request POST:/api/luteos/meta/exportMetaMarkStationTask
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaExportMetaMarkStationTask = (
    req: MetaMarkTaskListQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/exportMetaMarkStationTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaExportMetaMarkTask
   * @summary 折扣码亚马逊任务列表导出
   * @request POST:/api/luteos/meta/exportMetaMarkTask
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaExportMetaMarkTask = (req: MetaMarkTaskListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/exportMetaMarkTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作管理
   * @name LuteosMetaExportPartnerDataList
   * @summary 合作项目-合作数据维度导出
   * @request POST:/api/luteos/meta/exportPartnerDataList
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaExportPartnerDataList = (req: MetaProjectReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/exportPartnerDataList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作管理
   * @name LuteosMetaExportProjectList
   * @summary 合作项目列表导出
   * @request POST:/api/luteos/meta/exportProjectList
   * @deprecated
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaExportProjectList = (req: MetaProjectReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/exportProjectList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaExportShopifyMetaMarkList
   * @summary 独立站标识码列表导出
   * @request POST:/api/luteos/meta/exportShopifyMetaMarkList
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaExportShopifyMetaMarkList = (req: MetaMarkListQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/exportShopifyMetaMarkList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaExportUserList
   * @summary 红人列表导出
   * @request POST:/api/luteos/meta/exportUserList
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaExportUserList = (req: UserQueryReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/exportUserList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaGetMetaInfoLastCache
   * @summary 获取用户缓存红人信息
   * @request GET:/api/luteos/meta/getMetaInfoLastCache
   * @response `200` `MetaInfoLastCacheResp` OK
   */
  luteosMetaGetMetaInfoLastCache = (
    query?: {
      /** userCode */
      userCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaInfoLastCacheResp, any>({
      path: `/api/luteos/meta/getMetaInfoLastCache`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaHandleMetaMark
   * @summary 标识码信息操作
   * @request POST:/api/luteos/meta/handleMetaMark
   * @response `200` `MetaMarkHandleResp` OK
   */
  luteosMetaHandleMetaMark = (req: MetaMarkHandleReq, params: RequestParams = {}) =>
    this.request<MetaMarkHandleResp, any>({
      path: `/api/luteos/meta/handleMetaMark`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaHandleMetaMarkTask
   * @summary 标识码任务操作
   * @request POST:/api/luteos/meta/handleMetaMarkTask
   * @response `200` `void` OK
   */
  luteosMetaHandleMetaMarkTask = (req: MetaMarkTaskHandleReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/meta/handleMetaMarkTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaImportMetaUser
   * @summary 批量上传红人信息
   * @request POST:/api/luteos/meta/import/metaUser
   * @response `200` `CommonRespString` OK
   */
  luteosMetaImportMetaUser = (req: MetaUserImportReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/meta/import/metaUser`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaJoinMarkPromotion
   * @summary 参与大促
   * @request POST:/api/luteos/meta/joinMarkPromotion
   * @response `200` `void` OK
   */
  luteosMetaJoinMarkPromotion = (req: JoinMarkPromotionReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/meta/joinMarkPromotion`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊折-扣码映射
   * @name LuteosMetaMappingQueryMetaMarkTrackingMapping
   * @summary 查询亚马逊-折扣码映射
   * @request GET:/api/luteos/meta/mapping/queryMetaMarkTrackingMapping
   * @response `200` `MetaMarkTrackingMappingResp` OK
   */
  luteosMetaMappingQueryMetaMarkTrackingMapping = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaMarkTrackingMappingResp, any>({
      path: `/api/luteos/meta/mapping/queryMetaMarkTrackingMapping`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 亚马逊-折扣码映射
   * @name LuteosMetaMappingUpdateMetaMarkTrackingMapping
   * @summary 编辑亚马逊-折扣码映射
   * @request POST:/api/luteos/meta/mapping/updateMetaMarkTrackingMapping
   * @response `200` `CommonRespObject` OK
   */
  luteosMetaMappingUpdateMetaMarkTrackingMapping = (
    req: MetaMarkTrackingMappingBatchUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/meta/mapping/updateMetaMarkTrackingMapping`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作管理
   * @name LuteosMetaOperateMetaProject
   * @summary 合作项目操作
   * @request POST:/api/luteos/meta/operateMetaProject
   * @response `200` `MetaProjectOperateResp` OK
   */
  luteosMetaOperateMetaProject = (req: MetaProjectOperateReq, params: RequestParams = {}) =>
    this.request<MetaProjectOperateResp, any>({
      path: `/api/luteos/meta/operateMetaProject`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaOperateUser
   * @summary 红人操作
   * @request POST:/api/luteos/meta/operateUser
   * @response `200` `UserOperateResp` OK
   */
  luteosMetaOperateUser = (req: UserOperateReq, params: RequestParams = {}) =>
    this.request<UserOperateResp, any>({
      path: `/api/luteos/meta/operateUser`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人付款申请单
   * @name LuteosMetaPprQueryDraftAndEnums
   * @summary 查询草稿及枚举
   * @request GET:/api/luteos/meta/ppr/queryDraftAndEnums
   * @response `200` `CommonRespPprDraftEnumsResp` OK
   */
  luteosMetaPprQueryDraftAndEnums = (
    query: {
      /** code */
      code?: string;
      /** projectCode */
      projectCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPprDraftEnumsResp, any>({
      path: `/api/luteos/meta/ppr/queryDraftAndEnums`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人付款申请单
   * @name LuteosMetaPprQueryList
   * @summary 查询列表
   * @request POST:/api/luteos/meta/ppr/queryList
   * @response `200` `PprListQueryResp` OK
   */
  luteosMetaPprQueryList = (req: PprListQueryReq, params: RequestParams = {}) =>
    this.request<PprListQueryResp, any>({
      path: `/api/luteos/meta/ppr/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人付款申请单
   * @name LuteosMetaPprQueryProcessNodeParams
   * @summary 获取审核节点参数
   * @request POST:/api/luteos/meta/ppr/queryProcessNodeParams
   * @response `200` `CommonRespJSONObject` OK
   */
  luteosMetaPprQueryProcessNodeParams = (req: PprSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespJSONObject, any>({
      path: `/api/luteos/meta/ppr/queryProcessNodeParams`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人付款申请单
   * @name LuteosMetaPprSaveOrUpdate
   * @summary 保存或保存草稿
   * @request POST:/api/luteos/meta/ppr/saveOrUpdate
   * @response `200` `CommonRespString` OK
   */
  luteosMetaPprSaveOrUpdate = (req: PprSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/luteos/meta/ppr/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 渠道管理
   * @name LuteosMetaQueryChannelList
   * @summary 查询渠道列表
   * @request GET:/api/luteos/meta/queryChannelList
   * @response `200` `ChannelQueryResp` OK
   */
  luteosMetaQueryChannelList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<ChannelQueryResp, any>({
      path: `/api/luteos/meta/queryChannelList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 特征管理
   * @name LuteosMetaQueryFeatureList
   * @summary 查询特征列表
   * @request GET:/api/luteos/meta/queryFeatureList
   * @response `200` `MetaFeatureQueryResp` OK
   */
  luteosMetaQueryFeatureList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaFeatureQueryResp, any>({
      path: `/api/luteos/meta/queryFeatureList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaQueryLabelList
   * @summary 标签列表查询
   * @request GET:/api/luteos/meta/queryLabelList
   * @response `200` `LabelListQueryResp` OK
   */
  luteosMetaQueryLabelList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<LabelListQueryResp, any>({
      path: `/api/luteos/meta/queryLabelList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaQueryMarkTaskStationDetail
   * @summary 折扣码独立站详情
   * @request GET:/api/luteos/meta/queryMarkTaskStationDetail
   * @response `200` `MarkTaskStationDetailResp` OK
   */
  luteosMetaQueryMarkTaskStationDetail = (
    query: {
      /** 折扣任务编码 */
      taskCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MarkTaskStationDetailResp, any>({
      path: `/api/luteos/meta/queryMarkTaskStationDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaQueryMarketMemberList
   * @summary 推广人员列表
   * @request GET:/api/luteos/meta/queryMarketMemberList
   * @response `200` `MetaMarkMemberResp` OK
   */
  luteosMetaQueryMarketMemberList = (params: RequestParams = {}) =>
    this.request<MetaMarkMemberResp, any>({
      path: `/api/luteos/meta/queryMarketMemberList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaQueryMetaCommonOperateLog
   * @summary 通用操作日志
   * @request GET:/api/luteos/meta/queryMetaCommonOperateLog
   * @response `200` `MetaOperateLogResp` OK
   */
  luteosMetaQueryMetaCommonOperateLog = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaOperateLogResp, any>({
      path: `/api/luteos/meta/queryMetaCommonOperateLog`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaQueryMetaMarkList
   * @summary 标识码列表查询
   * @request GET:/api/luteos/meta/queryMetaMarkList
   * @response `200` `MetaMarkListQueryResp` OK
   */
  luteosMetaQueryMetaMarkList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaMarkListQueryResp, any>({
      path: `/api/luteos/meta/queryMetaMarkList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaQueryMetaMarkTaskList
   * @summary 标识码任务列表查询
   * @request GET:/api/luteos/meta/queryMetaMarkTaskList
   * @response `200` `MetaMarkTaskListQueryResp` OK
   */
  luteosMetaQueryMetaMarkTaskList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaMarkTaskListQueryResp, any>({
      path: `/api/luteos/meta/queryMetaMarkTaskList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作项目
   * @name LuteosMetaQueryMetaOperateLog
   * @summary 红人操作日志
   * @request GET:/api/luteos/meta/queryMetaOperateLog
   * @response `200` `MetaOperateLogResp` OK
   */
  luteosMetaQueryMetaOperateLog = (
    query: {
      /** 红人编码 */
      userCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaOperateLogResp, any>({
      path: `/api/luteos/meta/queryMetaOperateLog`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作管理
   * @name LuteosMetaQueryMetaProjectAuth
   * @summary 合作项目权限查询
   * @request GET:/api/luteos/meta/queryMetaProjectAuth
   * @response `200` `MetaProjectAuthResp` OK
   */
  luteosMetaQueryMetaProjectAuth = (params: RequestParams = {}) =>
    this.request<MetaProjectAuthResp, any>({
      path: `/api/luteos/meta/queryMetaProjectAuth`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作项目
   * @name LuteosMetaQueryMetaProjectDetail
   * @summary 合作项目详情
   * @request POST:/api/luteos/meta/queryMetaProjectDetail
   * @response `200` `MetaProjectDetailResp` OK
   */
  luteosMetaQueryMetaProjectDetail = (
    query: {
      /** 合作项目编码 */
      projectCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaProjectDetailResp, any>({
      path: `/api/luteos/meta/queryMetaProjectDetail`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaQueryMetaTeamList
   * @summary 查询红人推广团队列表
   * @request GET:/api/luteos/meta/queryMetaTeamList
   * @response `200` `MetaTeamListResp` OK
   */
  luteosMetaQueryMetaTeamList = (params: RequestParams = {}) =>
    this.request<MetaTeamListResp, any>({
      path: `/api/luteos/meta/queryMetaTeamList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaQueryOneTaskOperators
   * @summary 标识码任务运营人员查询-多个标识码
   * @request POST:/api/luteos/meta/queryOneTaskOperators
   * @response `200` `MetaMarkTaskOperatorV2Resp` OK
   */
  luteosMetaQueryOneTaskOperators = (req: MetaMarkTaskOperatorV2Req, params: RequestParams = {}) =>
    this.request<MetaMarkTaskOperatorV2Resp, any>({
      path: `/api/luteos/meta/queryOneTaskOperators`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础数据
   * @name LuteosMetaQueryOperatorList
   * @summary 获取运营人员列表
   * @request GET:/api/luteos/meta/queryOperatorList
   * @response `200` `MetaOperatorQueryResp` OK
   */
  luteosMetaQueryOperatorList = (params: RequestParams = {}) =>
    this.request<MetaOperatorQueryResp, any>({
      path: `/api/luteos/meta/queryOperatorList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaQueryOperatorToday
   * @summary 查询折扣独立站当天运营
   * @request GET:/api/luteos/meta/queryOperatorToday
   * @response `200` `MarkTaskStationResp` OK
   */
  luteosMetaQueryOperatorToday = (params: RequestParams = {}) =>
    this.request<MarkTaskStationResp, any>({
      path: `/api/luteos/meta/queryOperatorToday`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础数据
   * @name LuteosMetaQueryProductByLine
   * @summary 品线列表查询商品
   * @request GET:/api/luteos/meta/queryProductByLine
   * @response `200` `MetaProductListQueryV2Resp` OK
   */
  luteosMetaQueryProductByLine = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaProductListQueryV2Resp, any>({
      path: `/api/luteos/meta/queryProductByLine`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaQueryProductConfigMapping
   * @summary 配置映射查询
   * @request POST:/api/luteos/meta/queryProductConfigMapping
   * @response `200` `MetaMarkProductConfigQueryResp` OK
   */
  luteosMetaQueryProductConfigMapping = (
    req: MetaMarkProductConfigQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<MetaMarkProductConfigQueryResp, any>({
      path: `/api/luteos/meta/queryProductConfigMapping`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 基础数据
   * @name LuteosMetaQueryProductLineList
   * @summary 品线列表查询
   * @request GET:/api/luteos/meta/queryProductLineList
   * @response `200` `MetaProductLineQueryResp` OK
   */
  luteosMetaQueryProductLineList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaProductLineQueryResp, any>({
      path: `/api/luteos/meta/queryProductLineList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作管理
   * @name LuteosMetaQueryProjectList
   * @summary 合作项目列表查询
   * @request GET:/api/luteos/meta/queryProjectList
   * @response `200` `MetaProjectResp` OK
   */
  luteosMetaQueryProjectList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaProjectResp, any>({
      path: `/api/luteos/meta/queryProjectList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaQueryProjectPlatform
   * @summary 查询合作项目的合作平台
   * @request GET:/api/luteos/meta/queryProjectPlatform
   * @response `200` `MetaProjectPlatformResp` OK
   */
  luteosMetaQueryProjectPlatform = (
    query: {
      /** 项目编码 */
      projectCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaProjectPlatformResp, any>({
      path: `/api/luteos/meta/queryProjectPlatform`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaQueryTaskOperators
   * @summary 标识码任务运营人员查询
   * @request GET:/api/luteos/meta/queryTaskOperators
   * @response `200` `MetaMarkTaskOperatorResp` OK
   */
  luteosMetaQueryTaskOperators = (
    query: {
      /** 商品编码 */
      productCode: string;
      /** 商品编码列表 */
      productCodeList?: string[];
      /** 站点 */
      site: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MetaMarkTaskOperatorResp, any>({
      path: `/api/luteos/meta/queryTaskOperators`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaQueryUserChannelInfo
   * @summary 红人详情-红人渠道列表-查询
   * @request GET:/api/luteos/meta/queryUserChannelInfo
   * @response `200` `UserChannelListQueryResp` OK
   */
  luteosMetaQueryUserChannelInfo = (
    query: {
      /** 用户编码 */
      userCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserChannelListQueryResp, any>({
      path: `/api/luteos/meta/queryUserChannelInfo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaQueryUserInfo
   * @summary 查询红人详情
   * @request GET:/api/luteos/meta/queryUserInfo
   * @response `200` `UserDetailQueryResp` OK
   */
  luteosMetaQueryUserInfo = (
    query: {
      /**
       * 操作  1-合作 2-创建合作
       * @format int32
       */
      operateType: number;
      /** 用户编码 */
      userCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserDetailQueryResp, any>({
      path: `/api/luteos/meta/queryUserInfo`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaQueryUserList
   * @summary 查询红人列表
   * @request GET:/api/luteos/meta/queryUserList
   * @response `200` `UserQueryResp` OK
   */
  luteosMetaQueryUserList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<UserQueryResp, any>({
      path: `/api/luteos/meta/queryUserList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaQueryUserListParam
   * @summary 红人列表查询参数
   * @request GET:/api/luteos/meta/queryUserListParam
   * @response `200` `UserListParamQueryResp` OK
   */
  luteosMetaQueryUserListParam = (params: RequestParams = {}) =>
    this.request<UserListParamQueryResp, any>({
      path: `/api/luteos/meta/queryUserListParam`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaQueryUserListSelect
   * @summary 查询红人列表-下拉选择
   * @request GET:/api/luteos/meta/queryUserListSelect
   * @response `200` `UserQueryResp` OK
   */
  luteosMetaQueryUserListSelect = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<UserQueryResp, any>({
      path: `/api/luteos/meta/queryUserListSelect`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作管理
   * @name LuteosMetaRefreshMetaPartnerVideo
   * @summary 合作项目-更新合作视频数据
   * @request POST:/api/luteos/meta/refreshMetaPartnerVideo
   * @response `200` `CommonRespObject` OK
   */
  luteosMetaRefreshMetaPartnerVideo = (
    req: MetaProjectPartnerVideoReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/meta/refreshMetaPartnerVideo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 渠道管理
   * @name LuteosMetaSaveChannelInfo
   * @summary 保存渠道信息
   * @request POST:/api/luteos/meta/saveChannelInfo
   * @response `200` `ChannelSaveResp` OK
   */
  luteosMetaSaveChannelInfo = (req: ChannelSaveReq, params: RequestParams = {}) =>
    this.request<ChannelSaveResp, any>({
      path: `/api/luteos/meta/saveChannelInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaSaveChannelUserInfo
   * @summary 保存渠道红人信息（插件）
   * @request POST:/api/luteos/meta/saveChannelUserInfo
   * @response `200` `void` OK
   */
  luteosMetaSaveChannelUserInfo = (req: UserChannelSaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/meta/saveChannelUserInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 特征管理
   * @name LuteosMetaSaveFeature
   * @summary 保存红人特征
   * @request POST:/api/luteos/meta/saveFeature
   * @response `200` `MetaFeatureSaveResp` OK
   */
  luteosMetaSaveFeature = (req: MetaFeatureSaveReq, params: RequestParams = {}) =>
    this.request<MetaFeatureSaveResp, any>({
      path: `/api/luteos/meta/saveFeature`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaSaveMetaMarkInfo
   * @summary 标识码信息保存
   * @request POST:/api/luteos/meta/saveMetaMarkInfo
   * @response `200` `void` OK
   */
  luteosMetaSaveMetaMarkInfo = (req: MetaMarkSaveReq, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/luteos/meta/saveMetaMarkInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 标识码管理
   * @name LuteosMetaSaveMetaMarkTask
   * @summary 标识码任务保存
   * @request POST:/api/luteos/meta/saveMetaMarkTask
   * @response `200` `MetaMarkTaskSaveResp` OK
   */
  luteosMetaSaveMetaMarkTask = (req: MetaMarkTaskSaveReq, params: RequestParams = {}) =>
    this.request<MetaMarkTaskSaveResp, any>({
      path: `/api/luteos/meta/saveMetaMarkTask`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作项目
   * @name LuteosMetaSaveMetaProject
   * @summary 合作项目保存
   * @request POST:/api/luteos/meta/saveMetaProject
   * @response `200` `MetaProjectSaveResp` OK
   */
  luteosMetaSaveMetaProject = (req: MetaProjectSaveReq, params: RequestParams = {}) =>
    this.request<MetaProjectSaveResp, any>({
      path: `/api/luteos/meta/saveMetaProject`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作项目
   * @name LuteosMetaSaveProjectTkAmount
   * @summary TK小店引入金额添加
   * @request POST:/api/luteos/meta/saveProjectTkAmount
   * @response `200` `CommonRespObject` OK
   */
  luteosMetaSaveProjectTkAmount = (req: MetaProjectTkAmountReq, params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/meta/saveProjectTkAmount`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人管理
   * @name LuteosMetaSaveUserInfo
   * @summary 保存红人信息
   * @request POST:/api/luteos/meta/saveUserInfo
   * @response `200` `UserSaveResp` OK
   */
  luteosMetaSaveUserInfo = (req: UserSaveReq, params: RequestParams = {}) =>
    this.request<UserSaveResp, any>({
      path: `/api/luteos/meta/saveUserInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags mark-task-promotion-controller
   * @name LuteosMetaTaskPromotionQueryMarkTaskPromotionDetail
   * @summary 查询大促配置详情
   * @request GET:/api/luteos/meta/task/promotion/queryMarkTaskPromotionDetail
   * @response `200` `MarkTaskPromotionDetailResp` OK
   */
  luteosMetaTaskPromotionQueryMarkTaskPromotionDetail = (
    query: {
      /** 唯一编码 */
      taskPromotionCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MarkTaskPromotionDetailResp, any>({
      path: `/api/luteos/meta/task/promotion/queryMarkTaskPromotionDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags mark-task-promotion-controller
   * @name LuteosMetaTaskPromotionQueryMarkTaskPromotionList
   * @summary 查询大促配置列表
   * @request GET:/api/luteos/meta/task/promotion/queryMarkTaskPromotionList
   * @response `200` `MarkTaskPromotionListResp` OK
   */
  luteosMetaTaskPromotionQueryMarkTaskPromotionList = (params: RequestParams = {}) =>
    this.request<MarkTaskPromotionListResp, any>({
      path: `/api/luteos/meta/task/promotion/queryMarkTaskPromotionList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags mark-task-promotion-controller
   * @name LuteosMetaTaskPromotionSaveMarkTaskPromotion
   * @summary 大促配置保存操作
   * @request POST:/api/luteos/meta/task/promotion/saveMarkTaskPromotion
   * @response `200` `void` OK
   */
  luteosMetaTaskPromotionSaveMarkTaskPromotion = (
    req: MarkTaskPromotionSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/meta/task/promotion/saveMarkTaskPromotion`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作项目
   * @name LuteosMetaUpdateMetaProjectDetailStaus
   * @summary 修改合作项目状态
   * @request POST:/api/luteos/meta/updateMetaProjectDetailStaus
   * @response `200` `CommonRespObject` OK
   */
  luteosMetaUpdateMetaProjectDetailStaus = (
    req: MetaProjectStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/meta/updateMetaProjectDetailStaus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作项目
   * @name LuteosMetaUpdateProjectDetailChannel
   * @summary 更新合作项目渠道
   * @request POST:/api/luteos/meta/updateProjectDetailChannel
   * @response `200` `CommonRespObject` OK
   */
  luteosMetaUpdateProjectDetailChannel = (
    req: MetaProjectChannelUpdateReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/luteos/meta/updateProjectDetailChannel`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 合作管理
   * @name LuteosMetaV2ExportProjectList
   * @summary 合作项目列表导出V2
   * @request POST:/api/luteos/meta/v2/exportProjectList
   * @response `200` `CommonExportResp` OK
   */
  luteosMetaV2ExportProjectList = (req: MetaProjectReq, params: RequestParams = {}) =>
    this.request<CommonExportResp, any>({
      path: `/api/luteos/meta/v2/exportProjectList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderAbandon
   * @summary 发样单-作废
   * @request POST:/api/luteos/meta/v3/sampleorder/abandon
   * @response `200` `CommonResp` OK
   */
  luteosMetaV3SampleorderAbandon = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/meta/v3/sampleorder/abandon`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderCanRefresh
   * @summary 发样单-是否能手动刷新
   * @request POST:/api/luteos/meta/v3/sampleorder/can/refresh
   * @deprecated
   * @response `200` `CommonRespBoolean` OK
   */
  luteosMetaV3SampleorderCanRefresh = (params: RequestParams = {}) =>
    this.request<CommonRespBoolean, any>({
      path: `/api/luteos/meta/v3/sampleorder/can/refresh`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderCheckSampleSpu
   * @summary 发样单-校验商品信息
   * @request GET:/api/luteos/meta/v3/sampleorder/checkSampleSpu
   * @response `200` `void` OK
   */
  luteosMetaV3SampleorderCheckSampleSpu = (
    query: {
      /** 合作人编码 */
      memberCode?: string;
      /** 商品中心spu编码 */
      spuCodeList: string[];
      /** 红人编码 */
      userCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/luteos/meta/v3/sampleorder/checkSampleSpu`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderQueryDetail
   * @summary 发样单-详情
   * @request GET:/api/luteos/meta/v3/sampleorder/queryDetail
   * @response `200` `SampleOrderV3DetailResp` OK
   */
  luteosMetaV3SampleorderQueryDetail = (
    query: {
      /** orderCode */
      orderCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SampleOrderV3DetailResp, any>({
      path: `/api/luteos/meta/v3/sampleorder/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderQueryList
   * @summary 发样单-查询
   * @request POST:/api/luteos/meta/v3/sampleorder/queryList
   * @response `200` `SampleOrderV3ListQueryResp` OK
   */
  luteosMetaV3SampleorderQueryList = (req: SampleOrderV3ListQueryReq, params: RequestParams = {}) =>
    this.request<SampleOrderV3ListQueryResp, any>({
      path: `/api/luteos/meta/v3/sampleorder/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderReferenceParams
   * @summary 发样单-引用特殊参数
   * @request POST:/api/luteos/meta/v3/sampleorder/reference/params
   * @response `200` `ReferenceParamsResp` OK
   */
  luteosMetaV3SampleorderReferenceParams = (
    query?: {
      /** countryCode */
      countryCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ReferenceParamsResp, any>({
      path: `/api/luteos/meta/v3/sampleorder/reference/params`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderReferenceParamsBySkuCode
   * @summary 发样单-引用特殊参数-按skucode过滤
   * @request POST:/api/luteos/meta/v3/sampleorder/reference/paramsBySkuCode
   * @response `200` `ReferenceParamsDeliveryMapResp` OK
   */
  luteosMetaV3SampleorderReferenceParamsBySkuCode = (
    req: ReferenceParamsDeliveryReq,
    params: RequestParams = {},
  ) =>
    this.request<ReferenceParamsDeliveryMapResp, any>({
      path: `/api/luteos/meta/v3/sampleorder/reference/paramsBySkuCode`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderRefresh
   * @summary 发样单-手动刷新
   * @request POST:/api/luteos/meta/v3/sampleorder/refresh
   * @deprecated
   * @response `200` `CommonResp` OK
   */
  luteosMetaV3SampleorderRefresh = (req: SampleOrderV3RefreshReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/meta/v3/sampleorder/refresh`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderSave
   * @summary 发样单-新增
   * @request POST:/api/luteos/meta/v3/sampleorder/save
   * @response `200` `CommonResp` OK
   */
  luteosMetaV3SampleorderSave = (req: SampleOrderV3SaveReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/luteos/meta/v3/sampleorder/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 红人发样-V3
   * @name LuteosMetaV3SampleorderSaveCheckDing
   * @summary 发样单-是否需要钉钉二次审核
   * @request POST:/api/luteos/meta/v3/sampleorder/saveCheckDing
   * @response `200` `CommonRespSaveCheckDingResp` OK
   */
  luteosMetaV3SampleorderSaveCheckDing = (req: SampleOrderV3SaveReq, params: RequestParams = {}) =>
    this.request<CommonRespSaveCheckDingResp, any>({
      path: `/api/luteos/meta/v3/sampleorder/saveCheckDing`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
}
