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
  CommonResp,
  CommonRespImportDataResp,
  CommonRespListLogisticsLastmileChannelBillingResp,
  CommonRespLogisticsLastmileChannelDetailResp,
  CommonRespLogisticsLastmileChannelRateConfigQueryResp,
  CommonRespLogisticsOrderAddResp,
  CommonRespLogisticsOrderDetail,
  CommonRespLogisticsSupplierDetailResp,
  CommonRespString,
  CommonRespVoid,
  ImportDataReq,
  ImportDataResp,
  ImportTemplateQueryReq,
  ImportTemplateQueryResp,
  LogisticsChannelNotifyConfigExportReq,
  LogisticsChannelNotifyConfigExportResp,
  LogisticsChannelNotifyConfigListReq,
  LogisticsChannelNotifyConfigListResp,
  LogisticsLastmileChannelBillingReq,
  LogisticsLastmileChannelListReq,
  LogisticsLastmileChannelListResp,
  LogisticsLastmileChannelRateConfigQueryReq,
  LogisticsLastmileChannelSaveReq,
  LogisticsOrderEditReq,
  LogisticsOrderListResp,
  LogisticsOrderPushReq,
  LogisticsSupplierListReq,
  LogisticsSupplierListResp,
  UploadReq,
  UserListQueryResp,
  UserSaveReq,
  UserSaveResp,
} from './data-contracts';

export namespace Api {
  /**
   * No description
   * @tags 用户管理
   * @name TmsBaseUserQueryUserList
   * @summary 用户列表查询
   * @request GET:/api/tms/base/user/queryUserList
   * @response `200` `UserListQueryResp` OK
   */
  export namespace TmsBaseUserQueryUserList {
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
      /** 用户名称 */
      username?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = UserListQueryResp;
  }

  /**
   * No description
   * @tags 用户管理
   * @name TmsBaseUserSaveUserInfo
   * @summary 保存用户信息
   * @request POST:/api/tms/base/user/saveUserInfo
   * @response `200` `UserSaveResp` OK
   */
  export namespace TmsBaseUserSaveUserInfo {
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
   * @tags 导入模块
   * @name TmsCommonFileImportData
   * @summary 数据导入
   * @request POST:/api/tms/common/file/importData
   * @response `200` `ImportDataResp` OK
   */
  export namespace TmsCommonFileImportData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ImportDataReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportDataResp;
  }

  /**
   * No description
   * @tags 导入模块
   * @name TmsCommonFileQueryImportTemplate
   * @summary 获取导入模板
   * @request POST:/api/tms/common/file/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  export namespace TmsCommonFileQueryImportTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ImportTemplateQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = ImportTemplateQueryResp;
  }

  /**
   * No description
   * @tags 头程物流预警配置
   * @name TmsErpLogisticsChannelNotifyConfigExport
   * @summary 头程物流预警配置-导出（与导入模板同列顺序与 Sheet 名，可直接再导入）
   * @request POST:/api/tms/erp/logistics/channelNotifyConfig/export
   * @response `200` `LogisticsChannelNotifyConfigExportResp` OK
   */
  export namespace TmsErpLogisticsChannelNotifyConfigExport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsChannelNotifyConfigExportReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsChannelNotifyConfigExportResp;
  }

  /**
   * No description
   * @tags 头程物流预警配置
   * @name TmsErpLogisticsChannelNotifyConfigQueryList
   * @summary 头程物流预警配置-列表查询
   * @request POST:/api/tms/erp/logistics/channelNotifyConfig/queryList
   * @response `200` `LogisticsChannelNotifyConfigListResp` OK
   */
  export namespace TmsErpLogisticsChannelNotifyConfigQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsChannelNotifyConfigListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsChannelNotifyConfigListResp;
  }

  /**
   * No description
   * @tags 尾程物流渠道-msrp
   * @name TmsErpLogisticsLastmileChannelBillingForMsrp
   * @summary 尾程物流渠道-测算计费
   * @request POST:/api/tms/erp/logistics/lastmileChannel/billingForMsrp
   * @response `200` `CommonRespListLogisticsLastmileChannelBillingResp` OK
   */
  export namespace TmsErpLogisticsLastmileChannelBillingForMsrp {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsLastmileChannelBillingReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespListLogisticsLastmileChannelBillingResp;
  }

  /**
   * No description
   * @tags 尾程物流渠道
   * @name TmsErpLogisticsLastmileChannelDetail
   * @summary 尾程物流渠道-查询详情
   * @request GET:/api/tms/erp/logistics/lastmileChannel/detail
   * @response `200` `CommonRespLogisticsLastmileChannelDetailResp` OK
   */
  export namespace TmsErpLogisticsLastmileChannelDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 渠道id
       * @format int32
       */
      channelId: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLogisticsLastmileChannelDetailResp;
  }

  /**
   * No description
   * @tags 尾程物流渠道-msrp
   * @name TmsErpLogisticsLastmileChannelDownTemplate
   * @summary 物流渠道-下载批量新增模板
   * @request POST:/api/tms/erp/logistics/lastmileChannel/downTemplate
   * @response `200` `CommonRespString` OK
   */
  export namespace TmsErpLogisticsLastmileChannelDownTemplate {
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
   * @tags 尾程物流渠道-msrp
   * @name TmsErpLogisticsLastmileChannelImport
   * @summary 尾程物流渠道-上传
   * @request POST:/api/tms/erp/logistics/lastmileChannel/import
   * @response `200` `CommonRespImportDataResp` OK
   */
  export namespace TmsErpLogisticsLastmileChannelImport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UploadReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespImportDataResp;
  }

  /**
   * No description
   * @tags 尾程物流渠道
   * @name TmsErpLogisticsLastmileChannelQueryList
   * @summary 尾程物流渠道-查询列表
   * @request POST:/api/tms/erp/logistics/lastmileChannel/queryList
   * @response `200` `LogisticsLastmileChannelListResp` OK
   */
  export namespace TmsErpLogisticsLastmileChannelQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsLastmileChannelListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsLastmileChannelListResp;
  }

  /**
   * No description
   * @tags 尾程物流渠道
   * @name TmsErpLogisticsLastmileChannelQueryRateConfig
   * @summary 尾程物流渠道费率配置-查询（转置格式）
   * @request POST:/api/tms/erp/logistics/lastmileChannel/queryRateConfig
   * @response `200` `CommonRespLogisticsLastmileChannelRateConfigQueryResp` OK
   */
  export namespace TmsErpLogisticsLastmileChannelQueryRateConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsLastmileChannelRateConfigQueryReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLogisticsLastmileChannelRateConfigQueryResp;
  }

  /**
   * No description
   * @tags 尾程物流渠道
   * @name TmsErpLogisticsLastmileChannelSave
   * @summary 尾程物流渠道-保存
   * @request POST:/api/tms/erp/logistics/lastmileChannel/save
   * @response `200` `CommonRespVoid` OK
   */
  export namespace TmsErpLogisticsLastmileChannelSave {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsLastmileChannelSaveReq;
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
   * @tags 物流商档案
   * @name TmsLogisticsSupplierContactDelete
   * @summary 删除物流商联系人
   * @request POST:/api/tms/logistics/supplier/contact/delete
   * @response `200` `CommonRespVoid` OK
   */
  export namespace TmsLogisticsSupplierContactDelete {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 联系人主键id
       * @format int64
       */
      contactId: number;
      /**
       * 物流商id
       * @format int32
       */
      supplierId: number;
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
   * @tags 物流商档案
   * @name TmsLogisticsSupplierDetail
   * @summary 物流商详情（分块：基础/结算/资质/联系人）
   * @request GET:/api/tms/logistics/supplier/detail
   * @response `200` `CommonRespLogisticsSupplierDetailResp` OK
   */
  export namespace TmsLogisticsSupplierDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 物流商id
       * @format int32
       */
      id: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLogisticsSupplierDetailResp;
  }

  /**
   * No description
   * @tags 物流商档案
   * @name TmsLogisticsSupplierQueryList
   * @summary 物流商分页查询
   * @request POST:/api/tms/logistics/supplier/queryList
   * @response `200` `LogisticsSupplierListResp` OK
   */
  export namespace TmsLogisticsSupplierQueryList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsSupplierListReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsSupplierListResp;
  }

  /**
   * No description
   * @tags 物流商管理
   * @name TmsLogisticsOrderOrderDetail
   * @summary 物流单详情
   * @request GET:/api/tms/logisticsOrder/orderDetail
   * @response `200` `CommonRespLogisticsOrderDetail` OK
   */
  export namespace TmsLogisticsOrderOrderDetail {
    export type RequestParams = {};
    export type RequestQuery = {
      /** orderCode */
      orderCode?: string;
      /** type */
      type?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLogisticsOrderDetail;
  }

  /**
   * No description
   * @tags 物流商管理
   * @name TmsLogisticsOrderOrderEdit
   * @summary 编辑物流单
   * @request POST:/api/tms/logisticsOrder/orderEdit
   * @response `200` `CommonResp` OK
   */
  export namespace TmsLogisticsOrderOrderEdit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsOrderEditReq;
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
   * @tags 物流商管理
   * @name TmsLogisticsOrderOrderExport
   * @summary 导出物流单
   * @request GET:/api/tms/logisticsOrder/orderExport
   * @response `200` `CommonExportResp` OK
   */
  export namespace TmsLogisticsOrderOrderExport {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 结束时间
       * @format date-time
       */
      endTime?: string;
      /** 自定义条件导出编码 */
      exportConditionCode?: string;
      /** 物流单号 */
      logisticsNo?: string;
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
      /** 来源单号，上游单号 */
      refNo?: string;
      /** 物流服务商编码 */
      spCode?: string;
      /**
       * 开始时间
       * @format date-time
       */
      startTime?: string;
      /**
       * 订单状态
       * @format int32
       */
      status?: number;
      /** 运单号 */
      waybillNo?: string;
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
   * @tags 物流商管理
   * @name TmsLogisticsOrderOrderList
   * @summary 物流单列表
   * @request GET:/api/tms/logisticsOrder/orderList
   * @response `200` `LogisticsOrderListResp` OK
   */
  export namespace TmsLogisticsOrderOrderList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 结束时间
       * @format date-time
       */
      endTime?: string;
      /** 自定义条件导出编码 */
      exportConditionCode?: string;
      /** 物流单号 */
      logisticsNo?: string;
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
      /** 来源单号，上游单号 */
      refNo?: string;
      /** 物流服务商编码 */
      spCode?: string;
      /**
       * 开始时间
       * @format date-time
       */
      startTime?: string;
      /**
       * 订单状态
       * @format int32
       */
      status?: number;
      /** 运单号 */
      waybillNo?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = LogisticsOrderListResp;
  }

  /**
   * No description
   * @tags 物流商管理
   * @name TmsLogisticsOrderOrderPush
   * @summary 推送物流单
   * @request POST:/api/tms/logisticsOrder/orderPush
   * @response `200` `CommonRespLogisticsOrderAddResp` OK
   */
  export namespace TmsLogisticsOrderOrderPush {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LogisticsOrderPushReq;
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonRespLogisticsOrderAddResp;
  }

  /**
   * No description
   * @tags 物流商管理
   * @name TmsLogisticsOrderRefresh
   * @summary 刷新订单接口
   * @request POST:/api/tms/logisticsOrder/refresh
   * @response `200` `CommonResp` OK
   */
  export namespace TmsLogisticsOrderRefresh {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = number[];
    export type RequestHeaders = {
      /** token */
      Authorization?: any;
      /** token */
      'lute-account-str'?: any;
    };
    export type ResponseBody = CommonResp;
  }
}
