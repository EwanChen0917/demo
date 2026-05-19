import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
} from 'axios';
import qs from 'qs';
import { downloadFileSteam } from '@/utils/downloadFileSteam';
// import router from '@/router';
// import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

import { useNProgress } from '@/hooks/web/useNProgress';
import { useCache } from '@/hooks/web/useCache';

import { clearArmsUser } from '@/arms';
import { getCookieToken, removeCookieToken } from '@/hooks/web/useCookie';
import { goLogin } from '@/utils/authRedirect';
import { config } from './axiosConfig';

const { start, done } = useNProgress();
const { wsCache } = useCache('localStorage');

const { result_code, base_url } = config;
export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH as keyof typeof base_url];
export const DEVELOPMENT = import.meta.env.NODE_ENV;

// 创建axios实例
// 类型“AxiosResponse<any, any>”上不存在属性code、msg、success
declare module 'axios' {
  interface AxiosResponse {
    // 增加axios的AxiosResponse不存在的参数
    code: string | number;
    msg: any;
    success?: any;
    result?: any;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout, // 请求超时时间
});

const pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let invalid = false; // token失效flag
const cancelToken = axios.CancelToken;

const removePending = (config: InternalAxiosRequestConfig) => {
  const dataStr = JSON.stringify(config.data);
  pending.forEach((item, index) => {
    if (item.tag == `${config.url}?${config.method}${dataStr}`) {
      item.func();
      pending.splice(index, 1);
    }
  });
};

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 进度条
    start();
    // 在一个ajax发送前执行一下取消操作
    removePending(config);
    config.cancelToken = new cancelToken((func) => {
      const dataStr = JSON.stringify(config.data);
      pending.push({ tag: `${config.url}?${config.method}${dataStr}`, func });
    });
    if (
      config.method === 'post' &&
      (config.headers as AxiosRequestHeaders)['Content-Type'] ===
        'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data);
    }
    const profile = getCookieToken();

    // 判断是否有 token
    if (profile) {
      // 设置 token
      // config.headers.Authorization = profile;
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${profile}`;
    }
    (config.headers as AxiosRequestHeaders).Platform = 'lute_erp';
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string;
      url += '?';
      const keys = Object.keys(config.params);
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`;
        }
      }
      url = url.substring(0, url.length - 1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

let elMsg: any = null;
// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
    removePending(response.config);
    if (elMsg) {
      elMsg.close();
      elMsg = null;
    }
    done();
    // 处理文件流下载
    if (response.config.responseType == 'blob') {
      downloadFileSteam(response);
      return;
    }
    if (response.data.code == result_code) {
      return response.data;
    }
    if (response.data.code == 10001003 || response.data.code == 10001002) {
      elMsg = ElMessage({
        type: 'error',
        message: response.data.message,
        duration: 5000,
      });
      if (!invalid) {
        invalid = true;
        wsCache.clear();
        // const router = useRouter();
        // const route = useRoute();
        // if (route.name !== 'login') {
        //   router.push('/login');
        // }
        // 服务端判定 token 失效：清本地态后整页跳登录（redirect 与 permission 中 guestNext 一致）
        clearArmsUser();
        removeCookieToken();
        goLogin();
      }
      return Promise.reject(
        `${response.data.code} ${response.data.message}` || '请求失败，请重试！'
      );
    }
    if (response.data.code === '200032') {
      return Promise.reject(response.data);
    }
    console.log(response.data); // for debug
    elMsg = ElMessage({
      type: 'error',
      message: response.data.message,
      duration: 5000,
    });
    return Promise.reject(response.data);
  },
  (error: AxiosError) => {
    done();
    if (elMsg) {
      elMsg.close();
      elMsg = null;
    }

    if (error.code != 'ERR_CANCELED') {
      console.log(`err${error}`); // for debug
      // tryHideFullScreenLoading();
      elMsg = ElMessage({
        type: 'error',
        message: error.message,
        duration: 5000,
      });
      if (error.message.indexOf('401') > -1) {
        // HTTP 401：与业务码失效同样走 goLogin，避免只清 cookie 仍停在受保护页
        wsCache.delete('userInfo');
        clearArmsUser();
        removeCookieToken();
        goLogin();
      }
      return Promise.reject(error);
    }
  }
);

export { service };
