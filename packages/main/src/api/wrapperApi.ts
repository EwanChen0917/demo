import { getCookieToken, removeCookieToken } from '@/hooks/web/useCookie';
import { useCache } from '@/hooks/web/useCache';
import { downloadFileSteam } from '@/utils/download';
// import type { ApiResponse } from '@/types/api';
import { ElMessage, ElMessageBox, type Action } from 'element-plus';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
const { wsCache } = useCache('localStorage');

interface ApiResponse<T = unknown> {
  message?: string;
  code?: number | string;
  result?: T;
  traceId?: string;
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
/**
 * 用任意 HttpClient 子类（swagger-typescript-api 生成的 Api 类）创建带拦截器的实例。
 *
 * 用法:
 *   import { wrapperApi } from '@/api/wrapperApi';
 *   import { Api } from './product/Api';
 *   export const productApi = wrapperApi<InstanceType<typeof Api>>(Api);
 */
export function wrapperApi<T>(Api: new (...args: any[]) => T): T {
  const api = new (Api as any)({
    baseURL: '/',
    customCatch: false,
  });

  const { instance } = api;

  instance.interceptors.request.use(
    (config: AxiosRequestConfig = {}) => {
      if (!config.headers) config.headers = {};

      const token = getCookieToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: unknown) => {
      return Promise.reject(error);
    },
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

  instance.interceptors.response.use(
    async (response: AxiosResponse<ApiResponse>) => {
      if (response.status === 401) {
        return userLogout();
      }
      // blob 下载
      if (response.headers['content-disposition']) {
        downloadFileSteam(response);
      }
      let res = response.data;
      // 兼容没有外层包裹的响应
      if (typeof res.code === 'undefined' && typeof res.result === 'undefined') {
        res = { code: 0, message: '', result: res, traceId: '' };
      }
      if (![0, 200].includes(Number(res.code ?? 0))) {
        // token 失效
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
        const bizErr = new BusinessError(res.message, res.code, res.traceId);
        return Promise.reject(bizErr);
      }
      return { ...res, data: res.result || true };
    },
    (error: any) => {
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
    },
  );

  return api as T;
}
