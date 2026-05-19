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

export namespace Api {
  /**
   * No description
   * @tags 预算调整单
   * @name FinanceBudgetAdjustOrderQueryList
   * @summary 查询列表
   * @request POST:/api/finance/budget/adjust/order/queryList
   * @response `200` `BudgetAdjustOrderListResp` OK
   */
  export namespace FinanceBudgetAdjustOrderQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetAdjustOrderListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetAdjustOrderListResp;
  }

  /**
   * No description
   * @tags 附件
   * @name FinanceBudgetAttachmentBatchUpload
   * @summary 附件上传
   * @request POST:/api/finance/budget/attachment/batchUpload
   * @response `200` `CommonRespListAttachmentDetailResp` OK
   */
  export namespace FinanceBudgetAttachmentBatchUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttachmentBatchUploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListAttachmentDetailResp;
  }

  /**
   * No description
   * @tags 附件
   * @name FinanceBudgetAttachmentDelete
   * @summary 删除附件
   * @request GET:/api/finance/budget/attachment/delete
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetAttachmentDelete {
    export type RequestParams = {};
    export type RequestQuery = {
      /** id */
      id: string;
    };
    export type RequestBody = never;
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
   * @tags 附件
   * @name FinanceBudgetAttachmentDetail
   * @summary 附件详情
   * @request GET:/api/finance/budget/attachment/detail
   * @response `200` `CommonRespAttachmentDetailResp` OK
   */
  export namespace FinanceBudgetAttachmentDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** id */
      id: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespAttachmentDetailResp;
  }

  /**
   * No description
   * @tags 附件
   * @name FinanceBudgetAttachmentList
   * @summary 附件列表
   * @request GET:/api/finance/budget/attachment/list
   * @response `200` `CommonRespAttachmentListResp` OK
   */
  export namespace FinanceBudgetAttachmentList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** businessCode */
      businessCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespAttachmentListResp;
  }

  /**
   * No description
   * @tags 附件
   * @name FinanceBudgetAttachmentUpload
   * @summary 附件上传
   * @request POST:/api/finance/budget/attachment/upload
   * @response `200` `CommonRespAttachmentDetailResp` OK
   */
  export namespace FinanceBudgetAttachmentUpload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AttachmentUploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespAttachmentDetailResp;
  }

  /**
   * No description
   * @tags 预算执行
   * @name FinanceBudgetExeExportList
   * @summary 导出列表
   * @request POST:/api/finance/budget/exe/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBudgetExeExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonExportResp;
  }

  /**
   * No description
   * @tags 预算执行
   * @name FinanceBudgetExeQueryDetail
   * @summary 查询详情
   * @request GET:/api/finance/budget/exe/queryDetail
   * @response `200` `BudgetExeDetailResp` OK
   */
  export namespace FinanceBudgetExeQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetExeDetailResp;
  }

  /**
   * No description
   * @tags 预算执行
   * @name FinanceBudgetExeQueryList
   * @summary 查询列表
   * @request POST:/api/finance/budget/exe/queryList
   * @response `200` `CommonRespBudgetQueryListResp` OK
   */
  export namespace FinanceBudgetExeQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBudgetQueryListResp;
  }

  /**
   * No description
   * @tags 预算池管理
   * @name FinanceBudgetPoolExportList
   * @summary 导出列表
   * @request POST:/api/finance/budget/pool/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBudgetPoolExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetPoolListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonExportResp;
  }

  /**
   * No description
   * @tags 预算池管理
   * @name FinanceBudgetPoolInitBudgetPool
   * @summary 初始化预算池
   * @request POST:/api/finance/budget/pool/initBudgetPool
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetPoolInitBudgetPool {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetPoolInitReq;
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
   * @tags 预算池管理
   * @name FinanceBudgetPoolOperate
   * @summary 预算额度操作--只给openApi RPC,页面不使用这个接口
   * @request POST:/api/finance/budget/pool/operate
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceBudgetPoolOperate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetPoolOperationBeanRpc;
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
   * @tags 预算池管理
   * @name FinanceBudgetPoolQueryExpenseAccountSelect
   * @summary 费用科目筛选查询
   * @request GET:/api/finance/budget/pool/queryExpenseAccountSelect
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  export namespace FinanceBudgetPoolQueryExpenseAccountSelect {
    export type RequestParams = {};
    export type RequestQuery = {
      /** keyword */
      keyword?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicSelectResp[];
  }

  /**
   * No description
   * @tags 预算池管理
   * @name FinanceBudgetPoolQueryInitBudgetPoolStatus
   * @summary 查询初始化预算池状态
   * @request GET:/api/finance/budget/pool/queryInitBudgetPoolStatus
   * @response `200` `BudgetPoolStatusResp` OK
   */
  export namespace FinanceBudgetPoolQueryInitBudgetPoolStatus {
    export type RequestParams = {};
    export type RequestQuery = {
      /** batchCode */
      batchCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetPoolStatusResp;
  }

  /**
   * No description
   * @tags 预算池管理
   * @name FinanceBudgetPoolQueryInitConfig
   * @summary 查询预算初始化配置
   * @request GET:/api/finance/budget/pool/queryInitConfig
   * @response `200` `(BudgetPoolInitResp)[]` OK
   */
  export namespace FinanceBudgetPoolQueryInitConfig {
    export type RequestParams = {};
    export type RequestQuery = {
      /** budgetPeriod */
      budgetPeriod: string;
      /**
       * budgetYear
       * @format int32
       */
      budgetYear: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetPoolInitResp[];
  }

  /**
   * No description
   * @tags 预算池管理
   * @name FinanceBudgetPoolQueryList
   * @summary 查询列表
   * @request POST:/api/finance/budget/pool/queryList
   * @response `200` `BudgetPoolListResp` OK
   */
  export namespace FinanceBudgetPoolQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetPoolListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetPoolListResp;
  }

  /**
   * No description
   * @tags 预算编制
   * @name FinanceBudgetPresentationDistributionDept
   * @summary 预算编制-分发部门
   * @request POST:/api/finance/budget/presentation/distributionDept
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetPresentationDistributionDept {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DistributionDeptReq;
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
   * @tags 预算编制
   * @name FinanceBudgetPresentationDistributionMember
   * @summary 预算编制-分发执行人
   * @request POST:/api/finance/budget/presentation/distributionMember
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetPresentationDistributionMember {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DistributionMemberReq;
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
   * @tags 预算编制
   * @name FinanceBudgetPresentationExportProgressList
   * @summary 预算编制-进度列表导出
   * @request GET:/api/finance/budget/presentation/exportProgressList
   * @response `200` `CommonExportResp` OK
   */
  export namespace FinanceBudgetPresentationExportProgressList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
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
   * @tags 预算编制
   * @name FinanceBudgetPresentationQueryDistributionDeptList
   * @summary 预算编制-查询已分发部门
   * @request POST:/api/finance/budget/presentation/queryDistributionDeptList
   * @response `200` `CommonRespDistributedDeptResp` OK
   */
  export namespace FinanceBudgetPresentationQueryDistributionDeptList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DistributedDeptReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespDistributedDeptResp;
  }

  /**
   * No description
   * @tags 预算编制
   * @name FinanceBudgetPresentationQueryDistributionMemberList
   * @summary 预算编制-查询已分发员工
   * @request GET:/api/finance/budget/presentation/queryDistributionMemberList
   * @response `200` `CommonRespDistributedMemberResp` OK
   */
  export namespace FinanceBudgetPresentationQueryDistributionMemberList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespDistributedMemberResp;
  }

  /**
   * No description
   * @tags 预算编制
   * @name FinanceBudgetPresentationQueryPresentationList
   * @summary 预算编制-编制列表查询
   * @request POST:/api/finance/budget/presentation/queryPresentationList
   * @response `200` `CommonRespPresentationListResp` OK
   */
  export namespace FinanceBudgetPresentationQueryPresentationList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PresentationListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPresentationListResp;
  }

  /**
   * No description
   * @tags 预算编制
   * @name FinanceBudgetPresentationQueryProgressList
   * @summary 预算编制-进度列表
   * @request GET:/api/finance/budget/presentation/queryProgressList
   * @response `200` `CommonRespProgressListResp` OK
   */
  export namespace FinanceBudgetPresentationQueryProgressList {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespProgressListResp;
  }

  /**
   * No description
   * @tags 预算编制
   * @name FinanceBudgetPresentationQuerySharedUserList
   * @summary 预算编制-查询共享人列表
   * @request POST:/api/finance/budget/presentation/querySharedUserList
   * @response `200` `CommonRespSharedUserListResp` OK
   */
  export namespace FinanceBudgetPresentationQuerySharedUserList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SharedUserQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespSharedUserListResp;
  }

  /**
   * No description
   * @tags 预算编制
   * @name FinanceBudgetPresentationQueryTrustee
   * @summary 预算编制-查询委托人
   * @request POST:/api/finance/budget/presentation/queryTrustee
   * @response `200` `CommonRespTrusteeMemberResp` OK
   */
  export namespace FinanceBudgetPresentationQueryTrustee {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TrusteeQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespTrusteeMemberResp;
  }

  /**
   * No description
   * @tags 上报日志
   * @name FinanceBudgetPresentationReportLogQueryList
   * @summary 查询上报日志列表
   * @request POST:/api/finance/budget/presentation/report/log/queryList
   * @response `200` `CommonRespReportLogListResp` OK
   */
  export namespace FinanceBudgetPresentationReportLogQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ReportLogListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespReportLogListResp;
  }

  /**
   * No description
   * @tags 预算编制
   * @name FinanceBudgetPresentationRepulse
   * @summary 预算编制-打回
   * @request POST:/api/finance/budget/presentation/repulse
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetPresentationRepulse {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PresentationRepulseReq;
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
   * @tags 预算编制
   * @name FinanceBudgetPresentationSaveSharedUsers
   * @summary 预算编制-设置共享人
   * @request POST:/api/finance/budget/presentation/save/shared_users
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetPresentationSaveSharedUsers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SharedUserSaveReq;
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
   * @tags 预算编制
   * @name FinanceBudgetPresentationSaveTrustee
   * @summary 预算编制-设置委托人
   * @request POST:/api/finance/budget/presentation/save/trustee
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetPresentationSaveTrustee {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TrusteeSaveReq;
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
   * @tags 预算编制
   * @name FinanceBudgetPresentationSubmit
   * @summary 预算编制-上报
   * @request POST:/api/finance/budget/presentation/submit
   * @response `200` `CommonRespListSubmitValidationResp` OK
   */
  export namespace FinanceBudgetPresentationSubmit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PresentationSubmitReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListSubmitValidationResp;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableChangeToInProgress
   * @summary 预算编制台-变更成在制
   * @request POST:/api/finance/budget/presentation/table/changeToInProgress
   * @response `200` `CommonResp` OK
   */
  export namespace FinanceBudgetPresentationTableChangeToInProgress {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PresentationChangeToInProgressReq;
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
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableCreateImportRecord
   * @summary 预算编制台-保存预算导入记录
   * @request POST:/api/finance/budget/presentation/table/createImportRecord
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetPresentationTableCreateImportRecord {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ImportDataReq;
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
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableDetailExportFile
   * @summary 预算编制台-详情导出
   * @request POST:/api/finance/budget/presentation/table/detail/exportFile
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetPresentationTableDetailExportFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FillDetailByDeptReq;
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
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableDetailExportFileAsync
   * @summary 预算编制台-详情导出-异步导出
   * @request POST:/api/finance/budget/presentation/table/detail/exportFileAsync
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBudgetPresentationTableDetailExportFileAsync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FillDetailByDeptReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonExportResp;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableDwdChannelSkuInventory
   * @summary 预算编制台-BI取数-预算表11-实际期末库存
   * @request POST:/api/finance/budget/presentation/table/dwdChannelSkuInventory
   * @response `200` `CommonRespListDwdChannelSkuInventoryResp` OK
   */
  export namespace FinanceBudgetPresentationTableDwdChannelSkuInventory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DwdChannelSkuInventoryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListDwdChannelSkuInventoryResp;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableDwsFinMultiPlatformMonthFinal
   * @summary 预算编制台-BI取数-预算表(1,2)-统计数据率
   * @request POST:/api/finance/budget/presentation/table/dwsFinMultiPlatformMonthFinal
   * @response `200` `CommonRespListDwsFinMultiPlatformMonthFinalResp` OK
   */
  export namespace FinanceBudgetPresentationTableDwsFinMultiPlatformMonthFinal {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DwsFinMultiPlatformMonthFinalListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListDwsFinMultiPlatformMonthFinalResp;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableListExportFile
   * @summary 预算编制台-列表导出
   * @request POST:/api/finance/budget/presentation/table/list/exportFile
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetPresentationTableListExportFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PresentationListReq;
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
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillDetail
   * @summary 预算编制台-编制填报详情查询
   * @request GET:/api/finance/budget/presentation/table/queryFillDetail
   * @response `200` `CommonRespPresentationFillQueryDetailResp` OK
   */
  export namespace FinanceBudgetPresentationTableQueryFillDetail {
    export type RequestParams = {};
    export type RequestQuery = {
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPresentationFillQueryDetailResp;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillDetailByDept
   * @summary 预算编制台-查看本人及下级填报详情
   * @request POST:/api/finance/budget/presentation/table/queryFillDetailByDept
   * @response `200` `CommonRespPresentationFillQueryByDeptResp` OK
   */
  export namespace FinanceBudgetPresentationTableQueryFillDetailByDept {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FillDetailByDeptReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPresentationFillQueryByDeptResp;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillDetailByDeptTotalPage
   * @summary 预算编制台-查看本人及下级填报详情-总页数
   * @request POST:/api/finance/budget/presentation/table/queryFillDetailByDeptTotalPage
   * @response `200` `CommonRespLong` OK
   */
  export namespace FinanceBudgetPresentationTableQueryFillDetailByDeptTotalPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FillDetailByDeptReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLong;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillDetailTotalPage
   * @summary 预算编制台-编制填报详情-总共多少页
   * @request GET:/api/finance/budget/presentation/table/queryFillDetailTotalPage
   * @response `200` `CommonRespLong` OK
   */
  export namespace FinanceBudgetPresentationTableQueryFillDetailTotalPage {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 编制台列表的code */
      code: string;
      /**
       * 页面大小
       * @format int32
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
    export type ResponseBody = CommonRespLong;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillEnums
   * @summary 预算编制台-编制填报拓展枚举查询
   * @request POST:/api/finance/budget/presentation/table/queryFillEnums
   * @response `200` `CommonRespPresentationFillQueryEnumsResp` OK
   */
  export namespace FinanceBudgetPresentationTableQueryFillEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PresentationFillQueryEnumsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPresentationFillQueryEnumsResp;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillEnumsLastRefreshTime
   * @summary 预算编制台-编制填报拓展枚举最后更新时间
   * @request POST:/api/finance/budget/presentation/table/queryFillEnumsLastRefreshTime
   * @response `200` `CommonRespPresentationFillQueryEnumsLastRefreshTimeResp` OK
   */
  export namespace FinanceBudgetPresentationTableQueryFillEnumsLastRefreshTime {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PresentationFillQueryEnumsReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPresentationFillQueryEnumsLastRefreshTimeResp;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryFillParams
   * @summary 预算编制台-编制填报拓展参数查询
   * @request GET:/api/finance/budget/presentation/table/queryFillParams
   * @response `200` `CommonRespPresentationFillQueryParamResp` OK
   */
  export namespace FinanceBudgetPresentationTableQueryFillParams {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 编制台列表的code */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespPresentationFillQueryParamResp;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableQueryPurchaseCostPrice
   * @summary 预算编制台-预算表2取数-预算表11-采购金额
   * @request POST:/api/finance/budget/presentation/table/queryPurchaseCostPrice
   * @response `200` `CommonRespListPurchaseCostPriceResp` OK
   */
  export namespace FinanceBudgetPresentationTableQueryPurchaseCostPrice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchaseCostPriceReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListPurchaseCostPriceResp;
  }

  /**
   * No description
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableRefreshFillEnums
   * @summary 预算编制台-编制填报拓展枚举缓存刷新
   * @request GET:/api/finance/budget/presentation/table/refreshFillEnums
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetPresentationTableRefreshFillEnums {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
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
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableSaveFillDetail
   * @summary 预算编制台-编制填报详情保存
   * @request POST:/api/finance/budget/presentation/table/saveFillDetail
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetPresentationTableSaveFillDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PresentationFillSaveDetailReq;
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
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableSaveFillDetailFile
   * @summary 预算编制台-编制填报详情保存-文件形式
   * @request POST:/api/finance/budget/presentation/table/saveFillDetailFile
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetPresentationTableSaveFillDetailFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = File;
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
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableSaveFillDetailFileResult
   * @summary 预算编制台-编制填报详情保存-获取结果
   * @request GET:/api/finance/budget/presentation/table/saveFillDetailFileResult
   * @response `200` `CommonRespObject` OK
   */
  export namespace FinanceBudgetPresentationTableSaveFillDetailFileResult {
    export type RequestParams = {};
    export type RequestQuery = {
      /** saveJobId */
      saveJobId: string;
    };
    export type RequestBody = never;
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
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableSaveFillDetailOssFile
   * @summary 预算编制台-编制填报详情保存-Oss文件形式
   * @request POST:/api/finance/budget/presentation/table/saveFillDetailOssFile
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetPresentationTableSaveFillDetailOssFile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
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
   * @tags 预算编制台
   * @name FinanceBudgetPresentationTableUpdateFileRecord
   * @summary 预算编制台-更新文件记录
   * @request POST:/api/finance/budget/presentation/table/updateFileRecord
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetPresentationTableUpdateFileRecord {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 记录编号 */
      recordCode: string;
    };
    export type RequestBody = never;
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
   * @tags 预算编制
   * @name FinanceBudgetPresentationTransfer
   * @summary 预算编制-移交
   * @request POST:/api/finance/budget/presentation/transfer
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetPresentationTransfer {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PresentationTableTransferReq;
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
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgDeleteBatch
   * @summary 批量删除
   * @request POST:/api/finance/budget/ruleControlCfg/deleteBatch
   * @response `200` `CommonRespObject` OK
   */
  export namespace FinanceBudgetRuleControlCfgDeleteBatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
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
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgEnable
   * @summary 启用/禁用
   * @request POST:/api/finance/budget/ruleControlCfg/enable
   * @response `200` `CommonRespObject` OK
   */
  export namespace FinanceBudgetRuleControlCfgEnable {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetRuleControlEnableSaveReq;
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
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgExportList
   * @summary 导出详情
   * @request POST:/api/finance/budget/ruleControlCfg/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBudgetRuleControlCfgExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetRuleControlQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonExportResp;
  }

  /**
   * No description
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgQueryAllDimensionality
   * @summary 查询所有流程维度
   * @request GET:/api/finance/budget/ruleControlCfg/queryAllDimensionality
   * @response `200` `CommonRespListDictCommonBean` OK
   */
  export namespace FinanceBudgetRuleControlCfgQueryAllDimensionality {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListDictCommonBean;
  }

  /**
   * No description
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgQueryAllProcesses
   * @summary 查询所有流程枚举
   * @request GET:/api/finance/budget/ruleControlCfg/queryAllProcesses
   * @response `200` `CommonRespListDictCommonBean` OK
   */
  export namespace FinanceBudgetRuleControlCfgQueryAllProcesses {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListDictCommonBean;
  }

  /**
   * No description
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgQueryList
   * @summary 查询列表
   * @request POST:/api/finance/budget/ruleControlCfg/queryList
   * @response `200` `CommonRespBudgetRuleControlQueryListResp` OK
   */
  export namespace FinanceBudgetRuleControlCfgQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetRuleControlQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespBudgetRuleControlQueryListResp;
  }

  /**
   * No description
   * @tags 预算规则管理
   * @name FinanceBudgetRuleControlCfgSaveOrUpdate
   * @summary 新增/更新
   * @request POST:/api/finance/budget/ruleControlCfg/saveOrUpdate
   * @response `200` `CommonRespObject` OK
   */
  export namespace FinanceBudgetRuleControlCfgSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetRuleControlSaveReq;
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
   * @tags 预算方案
   * @name FinanceBudgetSchemeCalcFinishDate
   * @summary 预算方案-计算截止时间
   * @request POST:/api/finance/budget/scheme/calc/finishDate
   * @response `200` `SchemeFinishDateResp` OK
   */
  export namespace FinanceBudgetSchemeCalcFinishDate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SchemeFinishDateReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SchemeFinishDateResp;
  }

  /**
   * No description
   * @tags 预算方案
   * @name FinanceBudgetSchemeChangeReportTime
   * @summary 预算方案-变更上报时间
   * @request POST:/api/finance/budget/scheme/change/report/time
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetSchemeChangeReportTime {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SchemeUpdateReportTimeReq;
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
   * @tags 预算方案
   * @name FinanceBudgetSchemeCopy
   * @summary 预算方案-复制
   * @request POST:/api/finance/budget/scheme/copy
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetSchemeCopy {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SchemeCopyReq;
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
   * @tags 预算方案
   * @name FinanceBudgetSchemeDelete
   * @summary 预算方案-删除
   * @request POST:/api/finance/budget/scheme/delete
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetSchemeDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SchemeDeleteReq;
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
   * @tags 预算方案
   * @name FinanceBudgetSchemePressNotice
   * @summary 预算方案-催办
   * @request POST:/api/finance/budget/scheme/pressNotice
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetSchemePressNotice {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
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
   * @tags 预算方案
   * @name FinanceBudgetSchemeQueryCopyProcessList
   * @summary 预算方案-复制-进度查询
   * @request GET:/api/finance/budget/scheme/queryCopyProcessList
   * @response `200` `CommonRespListSchemeCopyBean` OK
   */
  export namespace FinanceBudgetSchemeQueryCopyProcessList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListSchemeCopyBean;
  }

  /**
   * No description
   * @tags 预算方案
   * @name FinanceBudgetSchemeQueryList
   * @summary 预算方案-列表查询
   * @request POST:/api/finance/budget/scheme/queryList
   * @response `200` `SchemeListQueryResp` OK
   */
  export namespace FinanceBudgetSchemeQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SchemeListQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SchemeListQueryResp;
  }

  /**
   * No description
   * @tags 预算方案
   * @name FinanceBudgetSchemeQueryNameList
   * @summary 预算方案-方案枚举查询
   * @request GET:/api/finance/budget/scheme/queryNameList
   * @response `200` `(string)[]` OK
   */
  export namespace FinanceBudgetSchemeQueryNameList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = string[];
  }

  /**
   * No description
   * @tags 预算方案
   * @name FinanceBudgetSchemeRefreshLogQueryList
   * @summary 预算方案-刷新列表查询
   * @request POST:/api/finance/budget/scheme/refreshLog/queryList
   * @response `200` `SchemeRefreshLogQueryResp` OK
   */
  export namespace FinanceBudgetSchemeRefreshLogQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SchemeRefreshLogQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SchemeRefreshLogQueryResp;
  }

  /**
   * No description
   * @tags 预算方案
   * @name FinanceBudgetSchemeRefreshLogRefresh
   * @summary 预算方案-刷新更新
   * @request POST:/api/finance/budget/scheme/refreshLog/refresh
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetSchemeRefreshLogRefresh {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SchemeRefreshLogRefreshReq;
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
   * @tags 预算方案
   * @name FinanceBudgetSchemeRefreshLogStart
   * @summary 预算方案-刷新开始
   * @request POST:/api/finance/budget/scheme/refreshLog/start
   * @response `200` `CommonRespLong` OK
   */
  export namespace FinanceBudgetSchemeRefreshLogStart {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SchemeRefreshLogStartReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLong;
  }

  /**
   * No description
   * @tags 预算方案
   * @name FinanceBudgetSchemeSave
   * @summary 预算方案-新增
   * @request POST:/api/finance/budget/scheme/save
   * @response `200` `CommonRespSchemeSaveResp` OK
   */
  export namespace FinanceBudgetSchemeSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SchemeSaveReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespSchemeSaveResp;
  }

  /**
   * No description
   * @tags 预算方案
   * @name FinanceBudgetSchemeTemplateQueryDetail
   * @summary 预算方案-模版字段查询（忽略大小写了，收入规则汇总用）
   * @request GET:/api/finance/budget/scheme/template/queryDetail
   * @response `200` `(SchemeTemplateDetailColumnBean)[]` OK
   */
  export namespace FinanceBudgetSchemeTemplateQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * queryCode
       * @default true
       */
      queryCode?: boolean;
      /** templateCode */
      templateCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = SchemeTemplateDetailColumnBean[];
  }

  /**
   * No description
   * @tags 预算方案
   * @name FinanceBudgetSchemeTemplateQueryList
   * @summary 预算方案-模版查询
   * @request POST:/api/finance/budget/scheme/template/queryList
   * @response `200` `CommonRespSchemeTemplateQueryListResp` OK
   */
  export namespace FinanceBudgetSchemeTemplateQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SchemeTemplateQueryListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespSchemeTemplateQueryListResp;
  }

  /**
   * No description
   * @tags 预算方案
   * @name FinanceBudgetSchemeYearQuery
   * @summary 预算方案-新增方案-系统带出当前预算年度设置
   * @request GET:/api/finance/budget/scheme/year/query
   * @response `200` `BudgetYearSettingResp` OK
   */
  export namespace FinanceBudgetSchemeYearQuery {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetYearSettingResp;
  }

  /**
   * No description
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleBatchDelete
   * @summary 预算校验设置-批量删除
   * @request POST:/api/finance/budget/validation/rule/batchDelete
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetValidationRuleBatchDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = string[];
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
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleBatchUpdateStatus
   * @summary 预算校验设置-批量修改状态
   * @request POST:/api/finance/budget/validation/rule/batchUpdateStatus
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetValidationRuleBatchUpdateStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BatchUpdateStatusReq;
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
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleExportList
   * @summary 导出预算校验设置列表
   * @request POST:/api/finance/budget/validation/rule/exportList
   * @response `200` `CommonRespCommonExportResp` OK
   */
  export namespace FinanceBudgetValidationRuleExportList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ValidationRuleListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespCommonExportResp;
  }

  /**
   * No description
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleQueryCheckValueDataList
   * @summary 预算校验设置-数据列表
   * @request GET:/api/finance/budget/validation/rule/queryCheckValueDataList
   * @response `200` `(BudgetBasicSelectResp)[]` OK
   */
  export namespace FinanceBudgetValidationRuleQueryCheckValueDataList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** checkKey */
      checkKey: string;
      /** checkName */
      checkName: string;
      /** templateCode */
      templateCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetBasicSelectResp[];
  }

  /**
   * No description
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleQueryDetail
   * @summary 预算校验设置-查询详情
   * @request GET:/api/finance/budget/validation/rule/queryDetail
   * @response `200` `ValidationRuleDetailResp` OK
   */
  export namespace FinanceBudgetValidationRuleQueryDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** code */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ValidationRuleDetailResp;
  }

  /**
   * No description
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleQueryList
   * @summary 预算校验设置-列表
   * @request POST:/api/finance/budget/validation/rule/queryList
   * @response `200` `ValidationRuleListResp` OK
   */
  export namespace FinanceBudgetValidationRuleQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ValidationRuleListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ValidationRuleListResp;
  }

  /**
   * No description
   * @tags 预算校验设置
   * @name FinanceBudgetValidationRuleSaveOrUpdate
   * @summary 预算校验设置-保存
   * @request POST:/api/finance/budget/validation/rule/saveOrUpdate
   * @response `200` `CommonRespVoid` OK
   */
  export namespace FinanceBudgetValidationRuleSaveOrUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ValidationRuleDetailReq[];
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
   * @tags 预算配置
   * @name FinanceBudgetYearSettings
   * @summary 查询预算年度
   * @request GET:/api/finance/budget/year/settings
   * @response `200` `BudgetYearSettingResp` OK
   */
  export namespace FinanceBudgetYearSettings {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 预算年度
       * @format int32
       */
      year: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = BudgetYearSettingResp;
  }

  /**
   * No description
   * @tags 预算配置
   * @name FinanceBudgetYearSettingsList
   * @summary 查询所有预算年度
   * @request GET:/api/finance/budget/year/settings/list
   * @response `200` `CommonRespListBudgetYearSettingResp` OK
   */
  export namespace FinanceBudgetYearSettingsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListBudgetYearSettingResp;
  }

  /**
   * No description
   * @tags 预算配置
   * @name FinanceBudgetYearSettingsSave
   * @summary 保存预算年度
   * @request POST:/api/finance/budget/year/settings/save
   * @response `200` `CommonRespString` OK
   */
  export namespace FinanceBudgetYearSettingsSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BudgetYearSettingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespString;
  }
}
