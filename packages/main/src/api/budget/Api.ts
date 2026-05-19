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
  AttachmentBatchUploadReq,
  AttachmentUploadReq,
  BatchUpdateStatusReq,
  BudgetAdjustOrderListReq,
  BudgetAdjustOrderListResp,
  BudgetBasicSelectResp,
  BudgetExeDetailResp,
  BudgetPoolInitReq,
  BudgetPoolInitResp,
  BudgetPoolListReq,
  BudgetPoolListResp,
  BudgetPoolOperationBeanRpc,
  BudgetPoolStatusResp,
  BudgetQueryListReq,
  BudgetRuleControlEnableSaveReq,
  BudgetRuleControlQueryListReq,
  BudgetRuleControlSaveReq,
  BudgetYearSettingReq,
  BudgetYearSettingResp,
  CommonExportResp,
  CommonResp,
  CommonRespAttachmentDetailResp,
  CommonRespAttachmentListResp,
  CommonRespBudgetQueryListResp,
  CommonRespBudgetRuleControlQueryListResp,
  CommonRespCommonExportResp,
  CommonRespDistributedDeptResp,
  CommonRespDistributedMemberResp,
  CommonRespListAttachmentDetailResp,
  CommonRespListBudgetYearSettingResp,
  CommonRespListDictCommonBean,
  CommonRespListDwdChannelSkuInventoryResp,
  CommonRespListDwsFinMultiPlatformMonthFinalResp,
  CommonRespListPurchaseCostPriceResp,
  CommonRespListSchemeCopyBean,
  CommonRespListSubmitValidationResp,
  CommonRespLong,
  CommonRespObject,
  CommonRespPresentationFillQueryByDeptResp,
  CommonRespPresentationFillQueryDetailResp,
  CommonRespPresentationFillQueryEnumsLastRefreshTimeResp,
  CommonRespPresentationFillQueryEnumsResp,
  CommonRespPresentationFillQueryParamResp,
  CommonRespPresentationListResp,
  CommonRespProgressListResp,
  CommonRespReportLogListResp,
  CommonRespSchemeSaveResp,
  CommonRespSchemeTemplateQueryListResp,
  CommonRespSharedUserListResp,
  CommonRespString,
  CommonRespTrusteeMemberResp,
  CommonRespVoid,
  DistributedDeptReq,
  DistributionDeptReq,
  DistributionMemberReq,
  DwdChannelSkuInventoryReq,
  DwsFinMultiPlatformMonthFinalListReq,
  FillDetailByDeptReq,
  ImportDataReq,
  PresentationChangeToInProgressReq,
  PresentationFillQueryEnumsReq,
  PresentationFillSaveDetailReq,
  PresentationListReq,
  PresentationRepulseReq,
  PresentationSubmitReq,
  PresentationTableTransferReq,
  PurchaseCostPriceReq,
  ReportLogListReq,
  SchemeCopyReq,
  SchemeDeleteReq,
  SchemeFinishDateReq,
  SchemeFinishDateResp,
  SchemeListQueryReq,
  SchemeListQueryResp,
  SchemeRefreshLogQueryReq,
  SchemeRefreshLogQueryResp,
  SchemeRefreshLogRefreshReq,
  SchemeRefreshLogStartReq,
  SchemeSaveReq,
  SchemeTemplateDetailColumnBean,
  SchemeTemplateQueryListReq,
  SchemeUpdateReportTimeReq,
  SharedUserQueryReq,
  SharedUserSaveReq,
  TrusteeQueryReq,
  TrusteeSaveReq,
  UploadReq,
  ValidationRuleDetailReq,
  ValidationRuleDetailResp,
  ValidationRuleListReq,
  ValidationRuleListResp,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 预算调整单
   * @name FinanceBudgetAdjustOrderQueryList
   * @summary 查询列表
   * @request POST:/api/finance/budget/adjust/order/queryList
   * @response `200` `BudgetAdjustOrderListResp` OK
   */
  financeBudgetAdjustOrderQueryList = (req: BudgetAdjustOrderListReq, params: RequestParams = {}) =>
    this.request<BudgetAdjustOrderListResp, any>({
      path: `/api/finance/budget/adjust/order/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 附件
   * @name FinanceBudgetAttachmentBatchUpload
   * @summary 附件上传
   * @request POST:/api/finance/budget/attachment/batchUpload
   * @response `200` `CommonRespListAttachmentDetailResp` OK
   */
  financeBudgetAttachmentBatchUpload = (
    req: AttachmentBatchUploadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListAttachmentDetailResp, any>({
      path: `/api/finance/budget/attachment/batchUpload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 附件
   * @name FinanceBudgetAttachmentDelete
   * @summary 删除附件
   * @request GET:/api/finance/budget/attachment/delete
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetAttachmentDelete = (
    query: {
      /** id */
      id: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/attachment/delete`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 附件
   * @name FinanceBudgetAttachmentDetail
   * @summary 附件详情
   * @request GET:/api/finance/budget/attachment/detail
   * @response `200` `CommonRespAttachmentDetailResp` OK
   */
  financeBudgetAttachmentDetail = (
    query: {
      /** id */
      id: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespAttachmentDetailResp, any>({
      path: `/api/finance/budget/attachment/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 附件
   * @name FinanceBudgetAttachmentList
   * @summary 附件列表
   * @request GET:/api/finance/budget/attachment/list
   * @response `200` `CommonRespAttachmentListResp` OK
   */
  financeBudgetAttachmentList = (
    query: {
      /** businessCode */
      businessCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespAttachmentListResp, any>({
      path: `/api/finance/budget/attachment/list`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 附件
   * @name FinanceBudgetAttachmentUpload
   * @summary 附件上传
   * @request POST:/api/finance/budget/attachment/upload
   * @response `200` `CommonRespAttachmentDetailResp` OK
   */
  financeBudgetAttachmentUpload = (req: AttachmentUploadReq, params: RequestParams = {}) =>
    this.request<CommonRespAttachmentDetailResp, any>({
      path: `/api/finance/budget/attachment/upload`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算执行
   * @name FinanceBudgetExeExportList
   * @summary 导出列表
   * @request POST:/api/finance/budget/exe/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBudgetExeExportList = (req: BudgetQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/budget/exe/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算执行
   * @name FinanceBudgetExeQueryDetail
   * @summary 查询详情
   * @request GET:/api/finance/budget/exe/queryDetail
   * @response `200` `BudgetExeDetailResp` OK
   */
  financeBudgetExeQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetExeDetailResp, any>({
      path: `/api/finance/budget/exe/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算执行
   * @name FinanceBudgetExeQueryList
   * @summary 查询列表
   * @request POST:/api/finance/budget/exe/queryList
   * @response `200` `CommonRespBudgetQueryListResp` OK
   */
  financeBudgetExeQueryList = (req: BudgetQueryListReq, params: RequestParams = {}) =>
    this.request<CommonRespBudgetQueryListResp, any>({
      path: `/api/finance/budget/exe/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算池管理
   * @name FinanceBudgetPoolExportList
   * @summary 导出列表
   * @request POST:/api/finance/budget/pool/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBudgetPoolExportList = (req: BudgetPoolListReq, params: RequestParams = {}) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/budget/pool/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算池管理
   * @name FinanceBudgetPoolInitBudgetPool
   * @summary 初始化预算池
   * @request POST:/api/finance/budget/pool/initBudgetPool
   * @response `200` `CommonRespString` OK
   */
  financeBudgetPoolInitBudgetPool = (req: BudgetPoolInitReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budget/pool/initBudgetPool`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算池管理
   * @name FinanceBudgetPoolOperate
   * @summary 预算额度操作--只给openApi RPC,页面不使用这个接口
   * @request POST:/api/finance/budget/pool/operate
   * @response `200` `CommonResp` OK
   */
  financeBudgetPoolOperate = (req: BudgetPoolOperationBeanRpc, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/finance/budget/pool/operate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算池管理
   * @name FinanceBudgetPoolQueryExpenseAccountSelect
   * @summary 费用科目筛选查询
   * @request GET:/api/finance/budget/pool/queryExpenseAccountSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  financeBudgetPoolQueryExpenseAccountSelect = (
    query?: {
      /** keyword */
      keyword?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicSelectResp[], any>({
      path: `/api/finance/budget/pool/queryExpenseAccountSelect`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算池管理
   * @name FinanceBudgetPoolQueryInitBudgetPoolStatus
   * @summary 查询初始化预算池状态
   * @request GET:/api/finance/budget/pool/queryInitBudgetPoolStatus
   * @response `200` `BudgetPoolStatusResp` OK
   */
  financeBudgetPoolQueryInitBudgetPoolStatus = (
    query: {
      /** batchCode */
      batchCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetPoolStatusResp, any>({
      path: `/api/finance/budget/pool/queryInitBudgetPoolStatus`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算池管理
   * @name FinanceBudgetPoolQueryInitConfig
   * @summary 查询预算初始化配置
   * @request GET:/api/finance/budget/pool/queryInitConfig
   * @response `200` `(BudgetPoolInitResp)[]` OK
   */
  financeBudgetPoolQueryInitConfig = (
    query: {
      /** budgetPeriod */
      budgetPeriod: string;
      /**
       * budgetYear
       * @format int32
       */
      budgetYear: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetPoolInitResp[], any>({
      path: `/api/finance/budget/pool/queryInitConfig`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算池管理
   * @name FinanceBudgetPoolQueryList
   * @summary 查询列表
   * @request POST:/api/finance/budget/pool/queryList
   * @response `200` `BudgetPoolListResp` OK
   */
  financeBudgetPoolQueryList = (req: BudgetPoolListReq, params: RequestParams = {}) =>
    this.request<BudgetPoolListResp, any>({
      path: `/api/finance/budget/pool/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationDistributionDept
   * @summary 预算编制-分发部门
   * @request POST:/api/finance/budget/presentation/distributionDept
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetPresentationDistributionDept = (
    req: DistributionDeptReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/presentation/distributionDept`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationDistributionMember
   * @summary 预算编制-分发执行人
   * @request POST:/api/finance/budget/presentation/distributionMember
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetPresentationDistributionMember = (
    req: DistributionMemberReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/presentation/distributionMember`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationExportProgressList
   * @summary 预算编制-进度列表导出
   * @request GET:/api/finance/budget/presentation/exportProgressList
   * @response `200` `CommonExportResp` OK
   */
  financeBudgetPresentationExportProgressList = (
    query: {
      /** 编码,预算方案入口传预算方案编码,预算编制入口传预算编制编码 */
      code: string;
      /**
       * 分发状态 0-分发成功 1-取消分发
       * @format int32
       */
      distributionStatus?: number;
      /**
       * 请求入口 0-预算方案 1-预算编制
       * @format int32
       */
      requestEntrance: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/finance/budget/presentation/exportProgressList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationQueryDistributionDeptList
   * @summary 预算编制-查询已分发部门
   * @request POST:/api/finance/budget/presentation/queryDistributionDeptList
   * @response `200` `CommonRespDistributedDeptResp` OK
   */
  financeBudgetPresentationQueryDistributionDeptList = (
    req: DistributedDeptReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespDistributedDeptResp, any>({
      path: `/api/finance/budget/presentation/queryDistributionDeptList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationQueryDistributionMemberList
   * @summary 预算编制-查询已分发员工
   * @request GET:/api/finance/budget/presentation/queryDistributionMemberList
   * @response `200` `CommonRespDistributedMemberResp` OK
   */
  financeBudgetPresentationQueryDistributionMemberList = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespDistributedMemberResp, any>({
      path: `/api/finance/budget/presentation/queryDistributionMemberList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationQueryPresentationList
   * @summary 预算编制-编制列表查询
   * @request POST:/api/finance/budget/presentation/queryPresentationList
   * @response `200` `CommonRespPresentationListResp` OK
   */
  financeBudgetPresentationQueryPresentationList = (
    req: PresentationListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPresentationListResp, any>({
      path: `/api/finance/budget/presentation/queryPresentationList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationQueryProgressList
   * @summary 预算编制-进度列表
   * @request GET:/api/finance/budget/presentation/queryProgressList
   * @response `200` `CommonRespProgressListResp` OK
   */
  financeBudgetPresentationQueryProgressList = (
    query: {
      /** 编码,预算方案入口传预算方案编码,预算编制入口传预算编制编码 */
      code: string;
      /**
       * 分发状态 0-分发成功 1-取消分发
       * @format int32
       */
      distributionStatus?: number;
      /**
       * 请求入口 0-预算方案 1-预算编制
       * @format int32
       */
      requestEntrance: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespProgressListResp, any>({
      path: `/api/finance/budget/presentation/queryProgressList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationQuerySharedUserList
   * @summary 预算编制-查询共享人列表
   * @request POST:/api/finance/budget/presentation/querySharedUserList
   * @response `200` `CommonRespSharedUserListResp` OK
   */
  financeBudgetPresentationQuerySharedUserList = (
    req: SharedUserQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespSharedUserListResp, any>({
      path: `/api/finance/budget/presentation/querySharedUserList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationQueryTrustee
   * @summary 预算编制-查询委托人
   * @request POST:/api/finance/budget/presentation/queryTrustee
   * @response `200` `CommonRespTrusteeMemberResp` OK
   */
  financeBudgetPresentationQueryTrustee = (req: TrusteeQueryReq, params: RequestParams = {}) =>
    this.request<CommonRespTrusteeMemberResp, any>({
      path: `/api/finance/budget/presentation/queryTrustee`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 上报日志
   * @name FinanceBudgetPresentationReportLogQueryList
   * @summary 查询上报日志列表
   * @request POST:/api/finance/budget/presentation/report/log/queryList
   * @response `200` `CommonRespReportLogListResp` OK
   */
  financeBudgetPresentationReportLogQueryList = (
    req: ReportLogListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespReportLogListResp, any>({
      path: `/api/finance/budget/presentation/report/log/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationRepulse
   * @summary 预算编制-打回
   * @request POST:/api/finance/budget/presentation/repulse
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetPresentationRepulse = (req: PresentationRepulseReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/presentation/repulse`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationSaveSharedUsers
   * @summary 预算编制-设置共享人
   * @request POST:/api/finance/budget/presentation/save/shared_users
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetPresentationSaveSharedUsers = (req: SharedUserSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/presentation/save/shared_users`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationSaveTrustee
   * @summary 预算编制-设置委托人
   * @request POST:/api/finance/budget/presentation/save/trustee
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetPresentationSaveTrustee = (req: TrusteeSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/presentation/save/trustee`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationSubmit
   * @summary 预算编制-上报
   * @request POST:/api/finance/budget/presentation/submit
   * @response `200` `CommonRespListSubmitValidationResp` OK
   */
  financeBudgetPresentationSubmit = (req: PresentationSubmitReq, params: RequestParams = {}) =>
    this.request<CommonRespListSubmitValidationResp, any>({
      path: `/api/finance/budget/presentation/submit`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableChangeToInProgress
   * @summary 预算编制台-变更成在制
   * @request POST:/api/finance/budget/presentation/table/changeToInProgress
   * @response `200` `CommonResp` OK
   */
  financeBudgetPresentationTableChangeToInProgress = (
    req: PresentationChangeToInProgressReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonResp, any>({
      path: `/api/finance/budget/presentation/table/changeToInProgress`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableCreateImportRecord
   * @summary 预算编制台-保存预算导入记录
   * @request POST:/api/finance/budget/presentation/table/createImportRecord
   * @response `200` `CommonRespString` OK
   */
  financeBudgetPresentationTableCreateImportRecord = (
    req: ImportDataReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budget/presentation/table/createImportRecord`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableDetailExportFile
   * @summary 预算编制台-详情导出
   * @request POST:/api/finance/budget/presentation/table/detail/exportFile
   * @response `200` `CommonRespString` OK
   */
  financeBudgetPresentationTableDetailExportFile = (
    req: FillDetailByDeptReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budget/presentation/table/detail/exportFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableDetailExportFileAsync
   * @summary 预算编制台-详情导出-异步导出
   * @request POST:/api/finance/budget/presentation/table/detail/exportFileAsync
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBudgetPresentationTableDetailExportFileAsync = (
    req: FillDetailByDeptReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/budget/presentation/table/detail/exportFileAsync`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableDwdChannelSkuInventory
   * @summary 预算编制台-BI取数-预算表11-实际期末库存
   * @request POST:/api/finance/budget/presentation/table/dwdChannelSkuInventory
   * @response `200` `CommonRespListDwdChannelSkuInventoryResp` OK
   */
  financeBudgetPresentationTableDwdChannelSkuInventory = (
    req: DwdChannelSkuInventoryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListDwdChannelSkuInventoryResp, any>({
      path: `/api/finance/budget/presentation/table/dwdChannelSkuInventory`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableDwsFinMultiPlatformMonthFinal
   * @summary 预算编制台-BI取数-预算表(1,2)-统计数据率
   * @request POST:/api/finance/budget/presentation/table/dwsFinMultiPlatformMonthFinal
   * @response `200` `CommonRespListDwsFinMultiPlatformMonthFinalResp` OK
   */
  financeBudgetPresentationTableDwsFinMultiPlatformMonthFinal = (
    req: DwsFinMultiPlatformMonthFinalListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListDwsFinMultiPlatformMonthFinalResp, any>({
      path: `/api/finance/budget/presentation/table/dwsFinMultiPlatformMonthFinal`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableListExportFile
   * @summary 预算编制台-列表导出
   * @request POST:/api/finance/budget/presentation/table/list/exportFile
   * @response `200` `CommonRespString` OK
   */
  financeBudgetPresentationTableListExportFile = (
    req: PresentationListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budget/presentation/table/list/exportFile`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillDetail
   * @summary 预算编制台-编制填报详情查询
   * @request GET:/api/finance/budget/presentation/table/queryFillDetail
   * @response `200` `CommonRespPresentationFillQueryDetailResp` OK
   */
  financeBudgetPresentationTableQueryFillDetail = (
    query: {
      /** 编制台列表的code */
      code: string;
      /**
       * 页码
       * @format int32
       */
      page?: number;
      /**
       * 页面大小
       * @format int32
       */
      pageSize?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPresentationFillQueryDetailResp, any>({
      path: `/api/finance/budget/presentation/table/queryFillDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillDetailByDept
   * @summary 预算编制台-查看本人及下级填报详情
   * @request POST:/api/finance/budget/presentation/table/queryFillDetailByDept
   * @response `200` `CommonRespPresentationFillQueryByDeptResp` OK
   */
  financeBudgetPresentationTableQueryFillDetailByDept = (
    req: FillDetailByDeptReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPresentationFillQueryByDeptResp, any>({
      path: `/api/finance/budget/presentation/table/queryFillDetailByDept`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillDetailByDeptTotalPage
   * @summary 预算编制台-查看本人及下级填报详情-总页数
   * @request POST:/api/finance/budget/presentation/table/queryFillDetailByDeptTotalPage
   * @response `200` `CommonRespLong` OK
   */
  financeBudgetPresentationTableQueryFillDetailByDeptTotalPage = (
    req: FillDetailByDeptReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespLong, any>({
      path: `/api/finance/budget/presentation/table/queryFillDetailByDeptTotalPage`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillDetailTotalPage
   * @summary 预算编制台-编制填报详情-总共多少页
   * @request GET:/api/finance/budget/presentation/table/queryFillDetailTotalPage
   * @response `200` `CommonRespLong` OK
   */
  financeBudgetPresentationTableQueryFillDetailTotalPage = (
    query: {
      /** 编制台列表的code */
      code: string;
      /**
       * 页面大小
       * @format int32
       */
      pageSize: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespLong, any>({
      path: `/api/finance/budget/presentation/table/queryFillDetailTotalPage`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillEnums
   * @summary 预算编制台-编制填报拓展枚举查询
   * @request POST:/api/finance/budget/presentation/table/queryFillEnums
   * @response `200` `CommonRespPresentationFillQueryEnumsResp` OK
   */
  financeBudgetPresentationTableQueryFillEnums = (
    req: PresentationFillQueryEnumsReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPresentationFillQueryEnumsResp, any>({
      path: `/api/finance/budget/presentation/table/queryFillEnums`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillEnumsLastRefreshTime
   * @summary 预算编制台-编制填报拓展枚举最后更新时间
   * @request POST:/api/finance/budget/presentation/table/queryFillEnumsLastRefreshTime
   * @response `200` `CommonRespPresentationFillQueryEnumsLastRefreshTimeResp` OK
   */
  financeBudgetPresentationTableQueryFillEnumsLastRefreshTime = (
    req: PresentationFillQueryEnumsReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPresentationFillQueryEnumsLastRefreshTimeResp, any>({
      path: `/api/finance/budget/presentation/table/queryFillEnumsLastRefreshTime`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillParams
   * @summary 预算编制台-编制填报拓展参数查询
   * @request GET:/api/finance/budget/presentation/table/queryFillParams
   * @response `200` `CommonRespPresentationFillQueryParamResp` OK
   */
  financeBudgetPresentationTableQueryFillParams = (
    query: {
      /** 编制台列表的code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespPresentationFillQueryParamResp, any>({
      path: `/api/finance/budget/presentation/table/queryFillParams`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryPurchaseCostPrice
   * @summary 预算编制台-预算表2取数-预算表11-采购金额
   * @request POST:/api/finance/budget/presentation/table/queryPurchaseCostPrice
   * @response `200` `CommonRespListPurchaseCostPriceResp` OK
   */
  financeBudgetPresentationTableQueryPurchaseCostPrice = (
    req: PurchaseCostPriceReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListPurchaseCostPriceResp, any>({
      path: `/api/finance/budget/presentation/table/queryPurchaseCostPrice`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableRefreshFillEnums
   * @summary 预算编制台-编制填报拓展枚举缓存刷新
   * @request GET:/api/finance/budget/presentation/table/refreshFillEnums
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetPresentationTableRefreshFillEnums = (params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/presentation/table/refreshFillEnums`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableSaveFillDetail
   * @summary 预算编制台-编制填报详情保存
   * @request POST:/api/finance/budget/presentation/table/saveFillDetail
   * @response `200` `CommonRespString` OK
   */
  financeBudgetPresentationTableSaveFillDetail = (
    req: PresentationFillSaveDetailReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budget/presentation/table/saveFillDetail`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableSaveFillDetailFile
   * @summary 预算编制台-编制填报详情保存-文件形式
   * @request POST:/api/finance/budget/presentation/table/saveFillDetailFile
   * @response `200` `CommonRespString` OK
   */
  financeBudgetPresentationTableSaveFillDetailFile = (file: File, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budget/presentation/table/saveFillDetailFile`,
      method: 'POST',
      body: file,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableSaveFillDetailFileResult
   * @summary 预算编制台-编制填报详情保存-获取结果
   * @request GET:/api/finance/budget/presentation/table/saveFillDetailFileResult
   * @response `200` `CommonRespObject` OK
   */
  financeBudgetPresentationTableSaveFillDetailFileResult = (
    query: {
      /** saveJobId */
      saveJobId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/finance/budget/presentation/table/saveFillDetailFileResult`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableSaveFillDetailOssFile
   * @summary 预算编制台-编制填报详情保存-Oss文件形式
   * @request POST:/api/finance/budget/presentation/table/saveFillDetailOssFile
   * @response `200` `CommonRespString` OK
   */
  financeBudgetPresentationTableSaveFillDetailOssFile = (
    uploadReq: UploadReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budget/presentation/table/saveFillDetailOssFile`,
      method: 'POST',
      body: uploadReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableUpdateFileRecord
   * @summary 预算编制台-更新文件记录
   * @request POST:/api/finance/budget/presentation/table/updateFileRecord
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetPresentationTableUpdateFileRecord = (
    query: {
      /** 记录编号 */
      recordCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/presentation/table/updateFileRecord`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算编制
   * @name FinanceBudgetPresentationTransfer
   * @summary 预算编制-移交
   * @request POST:/api/finance/budget/presentation/transfer
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetPresentationTransfer = (
    req: PresentationTableTransferReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/presentation/transfer`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgDeleteBatch
   * @summary 批量删除
   * @request POST:/api/finance/budget/ruleControlCfg/deleteBatch
   * @response `200` `CommonRespObject` OK
   */
  financeBudgetRuleControlCfgDeleteBatch = (codes: string[], params: RequestParams = {}) =>
    this.request<CommonRespObject, any>({
      path: `/api/finance/budget/ruleControlCfg/deleteBatch`,
      method: 'POST',
      body: codes,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgEnable
   * @summary 启用/禁用
   * @request POST:/api/finance/budget/ruleControlCfg/enable
   * @response `200` `CommonRespObject` OK
   */
  financeBudgetRuleControlCfgEnable = (
    req: BudgetRuleControlEnableSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/finance/budget/ruleControlCfg/enable`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgExportList
   * @summary 导出详情
   * @request POST:/api/finance/budget/ruleControlCfg/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBudgetRuleControlCfgExportList = (
    req: BudgetRuleControlQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/budget/ruleControlCfg/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgQueryAllDimensionality
   * @summary 查询所有流程维度
   * @request GET:/api/finance/budget/ruleControlCfg/queryAllDimensionality
   * @response `200` `CommonRespListDictCommonBean` OK
   */
  financeBudgetRuleControlCfgQueryAllDimensionality = (params: RequestParams = {}) =>
    this.request<CommonRespListDictCommonBean, any>({
      path: `/api/finance/budget/ruleControlCfg/queryAllDimensionality`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgQueryAllProcesses
   * @summary 查询所有流程枚举
   * @request GET:/api/finance/budget/ruleControlCfg/queryAllProcesses
   * @response `200` `CommonRespListDictCommonBean` OK
   */
  financeBudgetRuleControlCfgQueryAllProcesses = (params: RequestParams = {}) =>
    this.request<CommonRespListDictCommonBean, any>({
      path: `/api/finance/budget/ruleControlCfg/queryAllProcesses`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgQueryList
   * @summary 查询列表
   * @request POST:/api/finance/budget/ruleControlCfg/queryList
   * @response `200` `CommonRespBudgetRuleControlQueryListResp` OK
   */
  financeBudgetRuleControlCfgQueryList = (
    req: BudgetRuleControlQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespBudgetRuleControlQueryListResp, any>({
      path: `/api/finance/budget/ruleControlCfg/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/finance/budget/ruleControlCfg/saveOrUpdate
   * @response `200` `CommonRespObject` OK
   */
  financeBudgetRuleControlCfgSaveOrUpdate = (
    req: BudgetRuleControlSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespObject, any>({
      path: `/api/finance/budget/ruleControlCfg/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeCalcFinishDate
   * @summary 预算方案-计算截止时间
   * @request POST:/api/finance/budget/scheme/calc/finishDate
   * @response `200` `SchemeFinishDateResp` OK
   */
  financeBudgetSchemeCalcFinishDate = (
    schemeFinishDateReq: SchemeFinishDateReq,
    params: RequestParams = {},
  ) =>
    this.request<SchemeFinishDateResp, any>({
      path: `/api/finance/budget/scheme/calc/finishDate`,
      method: 'POST',
      body: schemeFinishDateReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeChangeReportTime
   * @summary 预算方案-变更上报时间
   * @request POST:/api/finance/budget/scheme/change/report/time
   * @response `200` `CommonRespString` OK
   */
  financeBudgetSchemeChangeReportTime = (
    schemeUpdateReportTimeReq: SchemeUpdateReportTimeReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budget/scheme/change/report/time`,
      method: 'POST',
      body: schemeUpdateReportTimeReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeCopy
   * @summary 预算方案-复制
   * @request POST:/api/finance/budget/scheme/copy
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetSchemeCopy = (schemeCopyReq: SchemeCopyReq, params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/scheme/copy`,
      method: 'POST',
      body: schemeCopyReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeDelete
   * @summary 预算方案-删除
   * @request POST:/api/finance/budget/scheme/delete
   * @response `200` `CommonRespString` OK
   */
  financeBudgetSchemeDelete = (schemeDeleteReq: SchemeDeleteReq, params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budget/scheme/delete`,
      method: 'POST',
      body: schemeDeleteReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemePressNotice
   * @summary 预算方案-催办
   * @request POST:/api/finance/budget/scheme/pressNotice
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetSchemePressNotice = (schemeCodes: string[], params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/scheme/pressNotice`,
      method: 'POST',
      body: schemeCodes,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeQueryCopyProcessList
   * @summary 预算方案-复制-进度查询
   * @request GET:/api/finance/budget/scheme/queryCopyProcessList
   * @response `200` `CommonRespListSchemeCopyBean` OK
   */
  financeBudgetSchemeQueryCopyProcessList = (params: RequestParams = {}) =>
    this.request<CommonRespListSchemeCopyBean, any>({
      path: `/api/finance/budget/scheme/queryCopyProcessList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeQueryList
   * @summary 预算方案-列表查询
   * @request POST:/api/finance/budget/scheme/queryList
   * @response `200` `SchemeListQueryResp` OK
   */
  financeBudgetSchemeQueryList = (req: SchemeListQueryReq, params: RequestParams = {}) =>
    this.request<SchemeListQueryResp, any>({
      path: `/api/finance/budget/scheme/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeQueryNameList
   * @summary 预算方案-方案枚举查询
   * @request GET:/api/finance/budget/scheme/queryNameList
   * @response `200` `(string)[]` OK
   */
  financeBudgetSchemeQueryNameList = (params: RequestParams = {}) =>
    this.request<string[], any>({
      path: `/api/finance/budget/scheme/queryNameList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeRefreshLogQueryList
   * @summary 预算方案-刷新列表查询
   * @request POST:/api/finance/budget/scheme/refreshLog/queryList
   * @response `200` `SchemeRefreshLogQueryResp` OK
   */
  financeBudgetSchemeRefreshLogQueryList = (
    req: SchemeRefreshLogQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<SchemeRefreshLogQueryResp, any>({
      path: `/api/finance/budget/scheme/refreshLog/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeRefreshLogRefresh
   * @summary 预算方案-刷新更新
   * @request POST:/api/finance/budget/scheme/refreshLog/refresh
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetSchemeRefreshLogRefresh = (
    req: SchemeRefreshLogRefreshReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/scheme/refreshLog/refresh`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeRefreshLogStart
   * @summary 预算方案-刷新开始
   * @request POST:/api/finance/budget/scheme/refreshLog/start
   * @response `200` `CommonRespLong` OK
   */
  financeBudgetSchemeRefreshLogStart = (
    req: SchemeRefreshLogStartReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespLong, any>({
      path: `/api/finance/budget/scheme/refreshLog/start`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeSave
   * @summary 预算方案-新增
   * @request POST:/api/finance/budget/scheme/save
   * @response `200` `CommonRespSchemeSaveResp` OK
   */
  financeBudgetSchemeSave = (schemeSaveReq: SchemeSaveReq, params: RequestParams = {}) =>
    this.request<CommonRespSchemeSaveResp, any>({
      path: `/api/finance/budget/scheme/save`,
      method: 'POST',
      body: schemeSaveReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeTemplateQueryDetail
   * @summary 预算方案-模版字段查询（忽略大小写了，收入规则汇总用）
   * @request GET:/api/finance/budget/scheme/template/queryDetail
   * @response `200` `(SchemeTemplateDetailColumnBean)[]` OK
   */
  financeBudgetSchemeTemplateQueryDetail = (
    query: {
      /**
       * queryCode
       * @default true
       */
      queryCode?: boolean;
      /** templateCode */
      templateCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SchemeTemplateDetailColumnBean[], any>({
      path: `/api/finance/budget/scheme/template/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeTemplateQueryList
   * @summary 预算方案-模版查询
   * @request POST:/api/finance/budget/scheme/template/queryList
   * @response `200` `CommonRespSchemeTemplateQueryListResp` OK
   */
  financeBudgetSchemeTemplateQueryList = (
    req: SchemeTemplateQueryListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespSchemeTemplateQueryListResp, any>({
      path: `/api/finance/budget/scheme/template/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算方案
   * @name FinanceBudgetSchemeYearQuery
   * @summary 预算方案-新增方案-系统带出当前预算年度设置
   * @request GET:/api/finance/budget/scheme/year/query
   * @response `200` `BudgetYearSettingResp` OK
   */
  financeBudgetSchemeYearQuery = (params: RequestParams = {}) =>
    this.request<BudgetYearSettingResp, any>({
      path: `/api/finance/budget/scheme/year/query`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleBatchDelete
   * @summary 预算校验设置-批量删除
   * @request POST:/api/finance/budget/validation/rule/batchDelete
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetValidationRuleBatchDelete = (codes: string[], params: RequestParams = {}) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/validation/rule/batchDelete`,
      method: 'POST',
      body: codes,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleBatchUpdateStatus
   * @summary 预算校验设置-批量修改状态
   * @request POST:/api/finance/budget/validation/rule/batchUpdateStatus
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetValidationRuleBatchUpdateStatus = (
    req: BatchUpdateStatusReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/validation/rule/batchUpdateStatus`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleExportList
   * @summary 导出预算校验设置列表
   * @request POST:/api/finance/budget/validation/rule/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  financeBudgetValidationRuleExportList = (
    req: ValidationRuleListReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespCommonExportResp, any>({
      path: `/api/finance/budget/validation/rule/exportList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleQueryCheckValueDataList
   * @summary 预算校验设置-数据列表
   * @request GET:/api/finance/budget/validation/rule/queryCheckValueDataList
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  financeBudgetValidationRuleQueryCheckValueDataList = (
    query: {
      /** checkKey */
      checkKey: string;
      /** checkName */
      checkName: string;
      /** templateCode */
      templateCode: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetBasicSelectResp[], any>({
      path: `/api/finance/budget/validation/rule/queryCheckValueDataList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleQueryDetail
   * @summary 预算校验设置-查询详情
   * @request GET:/api/finance/budget/validation/rule/queryDetail
   * @response `200` `ValidationRuleDetailResp` OK
   */
  financeBudgetValidationRuleQueryDetail = (
    query: {
      /** code */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ValidationRuleDetailResp, any>({
      path: `/api/finance/budget/validation/rule/queryDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleQueryList
   * @summary 预算校验设置-列表
   * @request POST:/api/finance/budget/validation/rule/queryList
   * @response `200` `ValidationRuleListResp` OK
   */
  financeBudgetValidationRuleQueryList = (req: ValidationRuleListReq, params: RequestParams = {}) =>
    this.request<ValidationRuleListResp, any>({
      path: `/api/finance/budget/validation/rule/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleSaveOrUpdate
   * @summary 预算校验设置-保存
   * @request POST:/api/finance/budget/validation/rule/saveOrUpdate
   * @response `200` `CommonRespVoid` OK
   */
  financeBudgetValidationRuleSaveOrUpdate = (
    req: ValidationRuleDetailReq[],
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/finance/budget/validation/rule/saveOrUpdate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算配置
   * @name FinanceBudgetYearSettings
   * @summary 查询预算年度
   * @request GET:/api/finance/budget/year/settings
   * @response `200` `BudgetYearSettingResp` OK
   */
  financeBudgetYearSettings = (
    query: {
      /**
       * 预算年度
       * @format int32
       */
      year: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<BudgetYearSettingResp, any>({
      path: `/api/finance/budget/year/settings`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算配置
   * @name FinanceBudgetYearSettingsList
   * @summary 查询所有预算年度
   * @request GET:/api/finance/budget/year/settings/list
   * @response `200` `CommonRespListBudgetYearSettingResp` OK
   */
  financeBudgetYearSettingsList = (params: RequestParams = {}) =>
    this.request<CommonRespListBudgetYearSettingResp, any>({
      path: `/api/finance/budget/year/settings/list`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags 预算配置
   * @name FinanceBudgetYearSettingsSave
   * @summary 保存预算年度
   * @request POST:/api/finance/budget/year/settings/save
   * @response `200` `CommonRespString` OK
   */
  financeBudgetYearSettingsSave = (
    budgetYearSettingReq: BudgetYearSettingReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespString, any>({
      path: `/api/finance/budget/year/settings/save`,
      method: 'POST',
      body: budgetYearSettingReq,
      type: ContentType.Json,
      ...params,
    });
}
