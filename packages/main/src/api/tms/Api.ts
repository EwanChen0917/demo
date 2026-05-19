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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 用户管理
   * @name TmsBaseUserQueryUserList
   * @summary 用户列表查询
   * @request GET:/api/tms/base/user/queryUserList
   * @response `200` `UserListQueryResp` OK
   */
  tmsBaseUserQueryUserList = (
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
      /** 用户名称 */
      username?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserListQueryResp, any>({
      path: `/api/tms/base/user/queryUserList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 用户管理
   * @name TmsBaseUserSaveUserInfo
   * @summary 保存用户信息
   * @request POST:/api/tms/base/user/saveUserInfo
   * @response `200` `UserSaveResp` OK
   */
  tmsBaseUserSaveUserInfo = (req: UserSaveReq, params: RequestParams = {}) =>
    this.request<UserSaveResp, any>({
      path: `/api/tms/base/user/saveUserInfo`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 导入模块
   * @name TmsCommonFileImportData
   * @summary 数据导入
   * @request POST:/api/tms/common/file/importData
   * @response `200` `ImportDataResp` OK
   */
  tmsCommonFileImportData = (req: ImportDataReq, params: RequestParams = {}) =>
    this.request<ImportDataResp, any>({
      path: `/api/tms/common/file/importData`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 导入模块
   * @name TmsCommonFileQueryImportTemplate
   * @summary 获取导入模板
   * @request POST:/api/tms/common/file/queryImportTemplate
   * @response `200` `ImportTemplateQueryResp` OK
   */
  tmsCommonFileQueryImportTemplate = (req: ImportTemplateQueryReq, params: RequestParams = {}) =>
    this.request<ImportTemplateQueryResp, any>({
      path: `/api/tms/common/file/queryImportTemplate`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流预警配置
   * @name TmsErpLogisticsChannelNotifyConfigExport
   * @summary 头程物流预警配置-导出（与导入模板同列顺序与 Sheet 名，可直接再导入）
   * @request POST:/api/tms/erp/logistics/channelNotifyConfig/export
   * @response `200` `LogisticsChannelNotifyConfigExportResp` OK
   */
  tmsErpLogisticsChannelNotifyConfigExport = (
    req: LogisticsChannelNotifyConfigExportReq,
    params: RequestParams = {},
  ) =>
    this.request<LogisticsChannelNotifyConfigExportResp, any>({
      path: `/api/tms/erp/logistics/channelNotifyConfig/export`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 头程物流预警配置
   * @name TmsErpLogisticsChannelNotifyConfigQueryList
   * @summary 头程物流预警配置-列表查询
   * @request POST:/api/tms/erp/logistics/channelNotifyConfig/queryList
   * @response `200` `LogisticsChannelNotifyConfigListResp` OK
   */
  tmsErpLogisticsChannelNotifyConfigQueryList = (
    req: LogisticsChannelNotifyConfigListReq,
    params: RequestParams = {},
  ) =>
    this.request<LogisticsChannelNotifyConfigListResp, any>({
      path: `/api/tms/erp/logistics/channelNotifyConfig/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 尾程物流渠道-msrp
   * @name TmsErpLogisticsLastmileChannelBillingForMsrp
   * @summary 尾程物流渠道-测算计费
   * @request POST:/api/tms/erp/logistics/lastmileChannel/billingForMsrp
   * @response `200` `CommonRespListLogisticsLastmileChannelBillingResp` OK
   */
  tmsErpLogisticsLastmileChannelBillingForMsrp = (
    req: LogisticsLastmileChannelBillingReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespListLogisticsLastmileChannelBillingResp, any>({
      path: `/api/tms/erp/logistics/lastmileChannel/billingForMsrp`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 尾程物流渠道
   * @name TmsErpLogisticsLastmileChannelDetail
   * @summary 尾程物流渠道-查询详情
   * @request GET:/api/tms/erp/logistics/lastmileChannel/detail
   * @response `200` `CommonRespLogisticsLastmileChannelDetailResp` OK
   */
  tmsErpLogisticsLastmileChannelDetail = (
    query: {
      /**
       * 渠道id
       * @format int32
       */
      channelId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespLogisticsLastmileChannelDetailResp, any>({
      path: `/api/tms/erp/logistics/lastmileChannel/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 尾程物流渠道-msrp
   * @name TmsErpLogisticsLastmileChannelDownTemplate
   * @summary 物流渠道-下载批量新增模板
   * @request POST:/api/tms/erp/logistics/lastmileChannel/downTemplate
   * @response `200` `CommonRespString` OK
   */
  tmsErpLogisticsLastmileChannelDownTemplate = (params: RequestParams = {}) =>
    this.request<CommonRespString, any>({
      path: `/api/tms/erp/logistics/lastmileChannel/downTemplate`,
      method: 'POST',
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 尾程物流渠道-msrp
   * @name TmsErpLogisticsLastmileChannelImport
   * @summary 尾程物流渠道-上传
   * @request POST:/api/tms/erp/logistics/lastmileChannel/import
   * @response `200` `CommonRespImportDataResp` OK
   */
  tmsErpLogisticsLastmileChannelImport = (req: UploadReq, params: RequestParams = {}) =>
    this.request<CommonRespImportDataResp, any>({
      path: `/api/tms/erp/logistics/lastmileChannel/import`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 尾程物流渠道
   * @name TmsErpLogisticsLastmileChannelQueryList
   * @summary 尾程物流渠道-查询列表
   * @request POST:/api/tms/erp/logistics/lastmileChannel/queryList
   * @response `200` `LogisticsLastmileChannelListResp` OK
   */
  tmsErpLogisticsLastmileChannelQueryList = (
    req: LogisticsLastmileChannelListReq,
    params: RequestParams = {},
  ) =>
    this.request<LogisticsLastmileChannelListResp, any>({
      path: `/api/tms/erp/logistics/lastmileChannel/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 尾程物流渠道
   * @name TmsErpLogisticsLastmileChannelQueryRateConfig
   * @summary 尾程物流渠道费率配置-查询（转置格式）
   * @request POST:/api/tms/erp/logistics/lastmileChannel/queryRateConfig
   * @response `200` `CommonRespLogisticsLastmileChannelRateConfigQueryResp` OK
   */
  tmsErpLogisticsLastmileChannelQueryRateConfig = (
    req: LogisticsLastmileChannelRateConfigQueryReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespLogisticsLastmileChannelRateConfigQueryResp, any>({
      path: `/api/tms/erp/logistics/lastmileChannel/queryRateConfig`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 尾程物流渠道
   * @name TmsErpLogisticsLastmileChannelSave
   * @summary 尾程物流渠道-保存
   * @request POST:/api/tms/erp/logistics/lastmileChannel/save
   * @response `200` `CommonRespVoid` OK
   */
  tmsErpLogisticsLastmileChannelSave = (
    req: LogisticsLastmileChannelSaveReq,
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/tms/erp/logistics/lastmileChannel/save`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流商档案
   * @name TmsLogisticsSupplierContactDelete
   * @summary 删除物流商联系人
   * @request POST:/api/tms/logistics/supplier/contact/delete
   * @response `200` `CommonRespVoid` OK
   */
  tmsLogisticsSupplierContactDelete = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespVoid, any>({
      path: `/api/tms/logistics/supplier/contact/delete`,
      method: 'POST',
      query: query,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流商档案
   * @name TmsLogisticsSupplierDetail
   * @summary 物流商详情（分块：基础/结算/资质/联系人）
   * @request GET:/api/tms/logistics/supplier/detail
   * @response `200` `CommonRespLogisticsSupplierDetailResp` OK
   */
  tmsLogisticsSupplierDetail = (
    query: {
      /**
       * 物流商id
       * @format int32
       */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespLogisticsSupplierDetailResp, any>({
      path: `/api/tms/logistics/supplier/detail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流商档案
   * @name TmsLogisticsSupplierQueryList
   * @summary 物流商分页查询
   * @request POST:/api/tms/logistics/supplier/queryList
   * @response `200` `LogisticsSupplierListResp` OK
   */
  tmsLogisticsSupplierQueryList = (req: LogisticsSupplierListReq, params: RequestParams = {}) =>
    this.request<LogisticsSupplierListResp, any>({
      path: `/api/tms/logistics/supplier/queryList`,
      method: 'POST',
      body: req,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流商管理
   * @name TmsLogisticsOrderOrderDetail
   * @summary 物流单详情
   * @request GET:/api/tms/logisticsOrder/orderDetail
   * @response `200` `CommonRespLogisticsOrderDetail` OK
   */
  tmsLogisticsOrderOrderDetail = (
    query?: {
      /** orderCode */
      orderCode?: string;
      /** type */
      type?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonRespLogisticsOrderDetail, any>({
      path: `/api/tms/logisticsOrder/orderDetail`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流商管理
   * @name TmsLogisticsOrderOrderEdit
   * @summary 编辑物流单
   * @request POST:/api/tms/logisticsOrder/orderEdit
   * @response `200` `CommonResp` OK
   */
  tmsLogisticsOrderOrderEdit = (orderEditReq: LogisticsOrderEditReq, params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/tms/logisticsOrder/orderEdit`,
      method: 'POST',
      body: orderEditReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流商管理
   * @name TmsLogisticsOrderOrderExport
   * @summary 导出物流单
   * @request GET:/api/tms/logisticsOrder/orderExport
   * @response `200` `CommonExportResp` OK
   */
  tmsLogisticsOrderOrderExport = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CommonExportResp, any>({
      path: `/api/tms/logisticsOrder/orderExport`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流商管理
   * @name TmsLogisticsOrderOrderList
   * @summary 物流单列表
   * @request GET:/api/tms/logisticsOrder/orderList
   * @response `200` `LogisticsOrderListResp` OK
   */
  tmsLogisticsOrderOrderList = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<LogisticsOrderListResp, any>({
      path: `/api/tms/logisticsOrder/orderList`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流商管理
   * @name TmsLogisticsOrderOrderPush
   * @summary 推送物流单
   * @request POST:/api/tms/logisticsOrder/orderPush
   * @response `200` `CommonRespLogisticsOrderAddResp` OK
   */
  tmsLogisticsOrderOrderPush = (orderReq: LogisticsOrderPushReq, params: RequestParams = {}) =>
    this.request<CommonRespLogisticsOrderAddResp, any>({
      path: `/api/tms/logisticsOrder/orderPush`,
      method: 'POST',
      body: orderReq,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags 物流商管理
   * @name TmsLogisticsOrderRefresh
   * @summary 刷新订单接口
   * @request POST:/api/tms/logisticsOrder/refresh
   * @response `200` `CommonResp` OK
   */
  tmsLogisticsOrderRefresh = (orderIds: number[], params: RequestParams = {}) =>
    this.request<CommonResp, any>({
      path: `/api/tms/logisticsOrder/refresh`,
      method: 'POST',
      body: orderIds,
      type: ContentType.Json,
      ...params,
    });
}
