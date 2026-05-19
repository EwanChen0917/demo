/* eslint-disable no-param-reassign */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Action } from 'element-plus';
import { downloadFileSteam } from '@/utils/download';
// import { getToken } from '@/utils/auth';
import { useCache } from '@/hooks/web/useCache';

import { getCookieToken, removeCookieToken } from '@/hooks/web/useCookie';
import { Api as CommonApiClient } from './common/Api';
import { Api as DataApiClient } from './data/Api';
import { Api as MemberApiClient } from './member/Api';
import { Api as MdpMemberApiClient } from './mdpMember/Api';
import { Api as MetaApiClient } from './meta/Api';
import { Api as PdtApiClient } from './pdt/Api';
import { Api as PlatformApiClient } from './platform/Api';
import { Api as MarketingApiClient } from './marketing/Api';
import { Api as MpcWeeklyReportApiClient } from './MPCWeeklyReport/Api';
import { Api as TmsApiClient } from './tms/Api';
import { Api as OfficeApiClient } from './office/Api';
import { Api as ProductApiClient } from './product/Api';
import { Api as SOPApiClient } from './sop/Api';
import { Api as ShopApiClient } from './shop/Api';
import { Api as ProcessApiClient } from './process/Api';
import { Api as WorkflowApiClient } from './workflow/Api';
import { Api as DesignApiClient } from './design/Api';
import { Api as ErpApiClient } from './erp/Api';
import { Api as SupplierApiClient } from './supplier/Api';
import { Api as PriceApiClient } from './price/Api';
import { Api as FccApiClient } from './fcc/Api';
import { Api as ChannelProductClient } from './channelProduct/Api';
import { Api as ProductOperationClient } from './productOperation/Api';
import { Api as DailyClient } from './daily/Api';
import { Api as DatamarketClient } from './datamarket/Api';
import { Api as MediaClient } from './media/Api';
import { Api as EvaluateClient } from './evaluate/Api';
import { Api as StudyClient } from './study/Api';
import { Api as DingClient } from './ding/Api';
import { Api as FinanceClient } from './finance/Api';
import { Api as FinanceSystemClient } from './financeSystem/Api';
import { Api as afterSaleApiClient } from './afterSale/Api';
import { Api as gtmApiClient } from './gtm/Api';
import { Api as BudgetApiClient } from './budget/Api';
import { Api as PersonalCenterApiClient } from './personalCenter/Api';
import { Api as BiApiClient } from './bi/Api';
import { Api as AiStatisticsApiClient } from './aiStatistics/Api';
import { Api as knowledgeApiClient } from './knowledge/Api';
import { Api as AiApiClient } from './ai/Api';
import { Api as ReconciliationClient } from './reconciliation/Api';
import { Api as NewProductApiClient } from './newProduct/Api';
import { Api as AmazonApiClient } from './amazon/Api';
import { Api as OmsApiClient } from './oms/Api';
import { Api as CisApiClient } from './cis/Api';
import { Api as ProductFileApiClient } from './productFile/Api';
import { Api as MDSApiClient } from './MDS/Api';
import { Api as AiGenerateImageApiClient } from './aiGenerateImage/Api';

import { Api as CommonApi } from './common/ApiRoute';
import { Api as DataApi } from './data/ApiRoute';
import { Api as MemberApi } from './member/ApiRoute';
import { Api as MdpMemberApi } from './mdpMember/ApiRoute';
import { Api as MetaApi } from './meta/ApiRoute';
import { Api as PdtApi } from './pdt/ApiRoute';
import { Api as PlatformApi } from './platform/ApiRoute';
import { Api as MarketingApi } from './marketing/ApiRoute';
import { Api as MpcWeeklyReportApi } from './MPCWeeklyReport/ApiRoute';
import { Api as TmsApi } from './tms/ApiRoute';
import { Api as ProductApi } from './product/ApiRoute';
import { Api as SOPApi } from './sop/ApiRoute';
import { Api as ShopApi } from './shop/ApiRoute';
import { Api as ProcessApi } from './process/ApiRoute';
import { Api as WorkflowApi } from './workflow/ApiRoute';
import { Api as DesignApi } from './design/ApiRoute';
import { Api as ErpApi } from './erp/ApiRoute';
import { Api as SupplierApi } from './supplier/ApiRoute';
import { Api as PriceApi } from './price/ApiRoute';
import { Api as FccApi } from './fcc/ApiRoute';
import { Api as ChannelProductApi } from './channelProduct/ApiRoute';
import { Api as ProductOperationApi } from './productOperation/ApiRoute';
import { Api as DailyApi } from './daily/ApiRoute';
import { Api as DatamarketApi } from './datamarket/ApiRoute';
import { Api as MediaApi } from './media/ApiRoute';
import { Api as EvaluateApi } from './evaluate/ApiRoute';
import { Api as StudyApi } from './study/ApiRoute';
import { Api as DingApi } from './ding/ApiRoute';
import { Api as FinanceApi } from './finance/ApiRoute';
import { Api as FinanceSystemApi } from './financeSystem/ApiRoute';
import { Api as AfterSaleApi } from './afterSale/ApiRoute';
import { Api as GtmApi } from './gtm/ApiRoute';
import { Api as BudgetApi } from './budget/ApiRoute';
import { Api as PersonalCenterApi } from './personalCenter/ApiRoute';
import { Api as BiApi } from './bi/ApiRoute';
import { Api as AiStatisticsApi } from './aiStatistics/ApiRoute';
import { Api as KnowledgeApi } from './knowledge/ApiRoute';
import { Api as AiApi } from './ai/ApiRoute';
import { Api as ReconciliationApi } from './reconciliation/ApiRoute';
import { Api as NewProductApi } from './newProduct/ApiRoute';
import { Api as OmsApi } from './oms/ApiRoute';
import { Api as StatisticalApiClient } from './statistical/Api';
import { Api as StatisticalApi } from './statistical/ApiRoute';
import { Api as AmazonApi } from './amazon/ApiRoute';
import { Api as CisApi } from './cis/ApiRoute';
import { Api as ProductFileApi } from './productFile/ApiRoute';
import { Api as ZoneConversionApiClient } from './zoneConversion/Api';
import { Api as ZoneConversionApi } from './zoneConversion/ApiRoute';
import { Api as MDSApi } from './MDS/ApiRoute';

import * as CommonContracts from './common/data-contracts';
import * as DataContracts from './data/data-contracts';
import * as MemberContracts from './member/data-contracts';
import * as MdpMemberContracts from './mdpMember/data-contracts';
import * as MetaContracts from './meta/data-contracts';
import * as PdtContracts from './pdt/data-contracts';
import * as PlatformContracts from './platform/data-contracts';
import * as ProductContracts from './product/data-contracts';
import * as SOPContracts from './sop/data-contracts';
import * as ShopContracts from './shop/data-contracts';
import * as ProcessContracts from './process/data-contracts';
import * as DesignContracts from './design/data-contracts';
import * as WorkflowContracts from './workflow/data-contracts';
import * as ErpContracts from './erp/data-contracts';
import * as SupplierContracts from './supplier/data-contracts';
import * as PriceContracts from './price/data-contracts';
import * as FccContracts from './fcc/data-contracts';
import * as channelProductContracts from './channelProduct/data-contracts';
import * as ProductOperationContracts from './productOperation/data-contracts';
import * as DailyContracts from './daily/data-contracts';
import * as DatamarketContracts from './datamarket/data-contracts';
import * as MediaContracts from './media/data-contracts';
import * as EvaluateContracts from './evaluate/data-contracts';
import * as StudyContracts from './study/data-contracts';
import * as DingContracts from './ding/data-contracts';
import * as FinanceContracts from './finance/data-contracts';
import * as FinanceSystemContracts from './financeSystem/data-contracts';
import * as MarketingContracts from './marketing/data-contracts';
import * as MpcWeeklyReportContracts from './MPCWeeklyReport/data-contracts';
import * as AfterSaleContracts from './afterSale/data-contracts';
import * as gtmContracts from './gtm/data-contracts';
import * as BudgetContracts from './budget/data-contracts';
import * as PersonalCenterContracts from './personalCenter/data-contracts';
import * as BiContracts from './bi/data-contracts';
import * as AiStatisticsContracts from './aiStatistics/data-contracts';
import * as KnowledgeContracts from './knowledge/data-contracts';
import * as AiContracts from './ai/data-contracts';
import * as ReconciliationContracts from './reconciliation/data-contracts';
import * as NewProductContracts from './newProduct/data-contracts';
import * as OmsContracts from './oms/data-contracts';
import * as StatisticalContracts from './statistical/data-contracts';
import * as AmazonContracts from './amazon/data-contracts';
import * as TmsContracts from './tms/data-contracts';
import * as CisContracts from './cis/data-contracts';
import * as ProductFileContracts from './productFile/data-contracts';
import * as ZoneConversionContracts from './zoneConversion/data-contracts';
import * as MDSContracts from './MDS/data-contracts';
import * as AiGenerateImageContracts from './aiGenerateImage/data-contracts';

// 视频素材管理相关
import { Api as VideoAnalysisApiClient } from './videoAnalysis/Api';
import { Api as VideoAnalysisApi } from './videoAnalysis/ApiRoute';
import * as VideoAnalysisContracts from './videoAnalysis/data-contracts';

interface ApiResponse<T = unknown> {
  message?: string;
  code?: number | string;
  result?: T;
  traceId?: string;
}

const MESSAGE_DEDUPE_WINDOW_MS = 5000;
const messageDedupeCache = new Map<string, number>();

function normalizeMessageKey(message: string) {
  return (message || '')
    .replace(/,?\s*traceId:\s*[\w-]+/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function showErrorMessageDeduped(message: string, duration = 5 * 1000) {
  const normalized = normalizeMessageKey(message);
  const key = normalized || 'Error';

  const now = Date.now();
  const lastShownAt = messageDedupeCache.get(key);
  if (typeof lastShownAt === 'number' && now - lastShownAt < MESSAGE_DEDUPE_WINDOW_MS) return;
  messageDedupeCache.set(key, now);
  setTimeout(() => {
    if (messageDedupeCache.get(key) === now) messageDedupeCache.delete(key);
  }, MESSAGE_DEDUPE_WINDOW_MS);

  ElMessage.error({
    message: message || 'Error',
    duration,
  });
}

// 业务错误：用于区分前端运行时异常与后端业务返回
class BusinessError extends Error {
  code?: number | string;

  traceId?: string;

  isBusinessError: boolean;

  constructor(message?: string, code?: number | string, traceId?: string) {
    super(message || 'BusinessError');
    this.name = 'BusinessError';
    this.code = code;
    this.traceId = traceId;
    this.isBusinessError = true;
  }
}

const { wsCache } = useCache('localStorage');

function wrapperApi<T>(Api: any) {
  const api = new Api({
    baseURL: '/',
    customCatch: false,
  });

  const { instance } = api;

  // if (import.meta.env.VITE_API_BASE_URL) {
  //   instance.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  // }

  instance.interceptors.request.use(
    (config: AxiosRequestConfig = {}) => {
      if (!config.headers) config.headers = {};

      const token = getCookieToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // do something
      return Promise.reject(error);
    }
  );

  let isLogoutModalShow = false;
  const userLogout = async () => {
    if (isLogoutModalShow) {
      return Promise.reject({ message: 'Unauthorized' });
    }
    return new Promise((_, reject) => {
      isLogoutModalShow = true;
      ElMessageBox.alert('账号登录信息已失效，请重新登录', '退出确认', {
        confirmButtonText: '重新登录',
        callback: async (action: Action) => {
          if (action === 'confirm') {
            removeCookieToken();
            wsCache.delete('userInfo');
            wsCache.delete('token');
            window.location.reload();
            reject({ message: 'Unauthorized' });
          } else {
            isLogoutModalShow = false;
            reject({ message: 'Unauthorized' });
          }
        },
      });
    });
  };

  // add response interceptors
  instance.interceptors.response.use(
    async (response: AxiosResponse<ApiResponse>) => {
      if (response.status === 401) {
        return userLogout();
      }
      // bolb下载
      if (response.headers['content-disposition']) {
        downloadFileSteam(response);
      }
      let res = response.data;
      // FIXME 兼容没有包裹的情况
      if (typeof res.code === 'undefined' && typeof res.result === 'undefined') {
        res = {
          code: 0,
          message: '',
          result: res,
          traceId: '',
        };
      }
      // if the custom code is not 0, it is judged as an error.
      if (![0, 200].includes(Number(res.code ?? 0))) {
        // token失效
        if (
          res.code &&
          ['10001002', '10001003', '10001004'].includes(`${res.code}`) &&
          !response.config.url?.includes('/account/getCurrentUser')
        ) {
          return userLogout();
        }
        if (
          res.code === 500 &&
          (res.message?.includes('Connection refused') || res.message?.includes('finishConnect'))
        ) {
          showErrorMessageDeduped('连接服务器异常，请稍后再试，或联系系统管理员', 5 * 1000);
          return Promise.reject(new Error(res.message));
        }
        if (!(response.config as any).customCatch) {
          showErrorMessageDeduped(res.message || 'Error', 5 * 1000);
        }
        // 其他业务错误：以 BusinessError 抛出，供调用方按需处理；Sentry 会按 beforeSend 过滤
        const bizErr = new BusinessError(res.message, res.code, res.traceId);
        return Promise.reject(bizErr);
      }
      return {
        ...res,
        data: res.result || true,
      };
    },
    (error) => {
      if (error?.response?.status === 401) {
        return userLogout();
      }
      if (!(error.config as any).customCatch) {
        const baseMessage = error?.response?.data?.message || error?.message || 'Request Error';
        const traceId = error?.response?.data?.traceId;
        const message = traceId ? `${baseMessage},traceId: ${traceId}` : baseMessage;
        showErrorMessageDeduped(message, 5 * 1000);
      }
      return Promise.reject(error);
    }
  );
  return api as T;
}

// Api Client
export const commonApi = wrapperApi<CommonApiClient>(CommonApiClient);
export const dataApi = wrapperApi<DataApiClient>(DataApiClient);
export const memberApi = wrapperApi<MemberApiClient>(MemberApiClient);
export const mdpMemberApi = wrapperApi<MdpMemberApiClient>(MdpMemberApiClient);
export const metaApi = wrapperApi<MetaApiClient>(MetaApiClient);
export const pdtApi = wrapperApi<PdtApiClient>(PdtApiClient);
export const platformApi = wrapperApi<PlatformApiClient>(PlatformApiClient);
export const tmsApi = wrapperApi<TmsApiClient>(TmsApiClient);
export const officeApi = wrapperApi<OfficeApiClient>(OfficeApiClient);
export const productApi = wrapperApi<ProductApiClient>(ProductApiClient);
export const sopApi = wrapperApi<SOPApiClient>(SOPApiClient);
export const shopApi = wrapperApi<ShopApiClient>(ShopApiClient);
export const processApi = wrapperApi<ProcessApiClient>(ProcessApiClient);
export const workflowApi = wrapperApi<WorkflowApiClient>(WorkflowApiClient);
export const designApi = wrapperApi<DesignApiClient>(DesignApiClient);
export const erpApi = wrapperApi<ErpApiClient>(ErpApiClient);
export const supplierApi = wrapperApi<SupplierApiClient>(SupplierApiClient);
export const priceApi = wrapperApi<PriceApiClient>(PriceApiClient);
export const fccApi = wrapperApi<FccApiClient>(FccApiClient);
export const channelProductApi = wrapperApi<ChannelProductClient>(ChannelProductClient);
export const productOperationApi = wrapperApi<ProductOperationClient>(ProductOperationClient);
export const dailyApi = wrapperApi<DailyClient>(DailyClient);
export const datamarketApi = wrapperApi<DatamarketClient>(DatamarketClient);
export const mediaApi = wrapperApi<MediaClient>(MediaClient);
export const evaluateApi = wrapperApi<EvaluateClient>(EvaluateClient);
export const studyApi = wrapperApi<StudyClient>(StudyClient);
export const dingApi = wrapperApi<DingClient>(DingClient);
export const financeApi = wrapperApi<FinanceClient>(FinanceClient);
export const financeSystemApi = wrapperApi<FinanceSystemClient>(FinanceSystemClient);
export const marketingApi = wrapperApi<MarketingApiClient>(MarketingApiClient);
export const mpcWeeklyReportApi = wrapperApi<MpcWeeklyReportApiClient>(MpcWeeklyReportApiClient);
export const afterSaleApi = wrapperApi<afterSaleApiClient>(afterSaleApiClient);
export const gtmApi = wrapperApi<gtmApiClient>(gtmApiClient);
export const budgetApi = wrapperApi<BudgetApiClient>(BudgetApiClient);
export const personalCenterApi = wrapperApi<PersonalCenterApiClient>(PersonalCenterApiClient);
export const biApi = wrapperApi<BiApiClient>(BiApiClient);
export const knowledgeApi = wrapperApi<knowledgeApiClient>(knowledgeApiClient);
export const aiApi = wrapperApi<AiApiClient>(AiApiClient);
export const aiStatisticsApi = wrapperApi<AiStatisticsApiClient>(AiStatisticsApiClient);
export const reconciliationApi = wrapperApi<ReconciliationClient>(ReconciliationClient);
export const newProductApi = wrapperApi<NewProductApiClient>(NewProductApiClient);
export const omsApi = wrapperApi<OmsApiClient>(OmsApiClient);
export const statisticalApi = wrapperApi<StatisticalApiClient>(StatisticalApiClient);
export const amazonApi = wrapperApi<AmazonApiClient>(AmazonApiClient);
export const cisApi = wrapperApi<CisApiClient>(CisApiClient);
export const productFileApi = wrapperApi<ProductFileApiClient>(ProductFileApiClient);
export const zoneConversionApi = wrapperApi<ZoneConversionApiClient>(ZoneConversionApiClient);
export const aiGenerateImageApi = wrapperApi<AiGenerateImageApiClient>(AiGenerateImageApiClient);

export const mdsApi = wrapperApi<MDSApiClient>(MDSApiClient);
// 视频素材管理相关
export const videoAnalysisApi = wrapperApi<VideoAnalysisApiClient>(VideoAnalysisApiClient);

// Api Route
export type {
  CommonApi,
  DataApi,
  MemberApi,
  MdpMemberApi,
  MetaApi,
  PdtApi,
  PlatformApi,
  ProductApi,
  SOPApi,
  ShopApi,
  ProcessApi,
  WorkflowApi,
  DesignApi,
  ErpApi,
  SupplierApi,
  PriceApi,
  FccApi,
  TmsApi,
  ChannelProductApi,
  ProductOperationApi,
  DailyApi,
  DatamarketApi,
  MediaApi,
  EvaluateApi,
  StudyApi,
  DingApi,
  FinanceApi,
  FinanceSystemApi,
  MarketingApi,
  MpcWeeklyReportApi,
  AfterSaleApi,
  GtmApi,
  BudgetApi,
  PersonalCenterApi,
  AiStatisticsApi,
  BiApi,
  ReconciliationApi,
  NewProductApi,
  OmsApi,
  StatisticalApi,
  AmazonApi,
  CisApi,
  KnowledgeApi,
  AiApi,
  VideoAnalysisApi,
  ProductFileApi,
  ZoneConversionApi,
  MDSApi,
  AiGenerateImageApi,
};

// Data Contracts
export type {
  CommonContracts,
  DataContracts,
  MemberContracts,
  MdpMemberContracts,
  MetaContracts,
  PdtContracts,
  PlatformContracts,
  ProductContracts,
  SOPContracts,
  ShopContracts,
  ProcessContracts,
  DesignContracts,
  WorkflowContracts,
  ErpContracts,
  SupplierContracts,
  PriceContracts,
  FccContracts,
  channelProductContracts,
  ProductOperationContracts,
  DailyContracts,
  DatamarketContracts,
  MediaContracts,
  EvaluateContracts,
  StudyContracts,
  TmsContracts,
  DingContracts,
  FinanceContracts,
  FinanceSystemContracts,
  MarketingContracts,
  MpcWeeklyReportContracts,
  AfterSaleContracts,
  gtmContracts,
  BudgetContracts,
  PersonalCenterContracts,
  KnowledgeContracts,
  AiContracts,
  AiStatisticsContracts,
  BiContracts,
  ReconciliationContracts,
  NewProductContracts,
  OmsContracts,
  StatisticalContracts,
  AmazonContracts,
  CisContracts,
  ProductFileContracts,
  VideoAnalysisContracts,
  ZoneConversionContracts,
  MDSContracts,
  AiGenerateImageContracts,
};

// Common
export type { ApiResponse };
export * from './product/http-client'; // FIXME all groups's "http-client" content is same.
