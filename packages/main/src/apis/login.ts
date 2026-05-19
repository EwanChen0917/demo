// import { useAxios } from '@/config/axios/useAxios';
// const request = useAxios();
/* 在login设置请求方式,用上面的方式导致热更新失败 */
import { service } from '@/config/axios';

import type { AxiosPromise } from 'axios';

import { config } from '@/config/axios/axiosConfig';

const { default_headers } = config;

const request1 = <T>(option: AxiosConfig): AxiosPromise<T> => {
  const { url, method, params, data, headersType, responseType, noLoading } = option;
  const AxiosService = {
    url,
    method,
    params,
    data,
    responseType,
    headers: {
      'Content-Type': headersType || default_headers,
    },
  };

  if (noLoading) (AxiosService.headers as any).noLoading = noLoading;
  return service(AxiosService);
};

export function getFn<T = any>(option: AxiosConfig): AxiosPromise<T> {
  return request1<T>({ method: 'get', ...option });
}

export function postFn<T = any>(option: AxiosConfig): AxiosPromise<T> {
  return request1<T>({ method: 'post', ...option });
}

function deleteFn<T = any>(option: AxiosConfig): AxiosPromise<T> {
  return request1<T>({ method: 'delete', ...option });
}

function putFn<T = any>(option: AxiosConfig): AxiosPromise<T> {
  return request1<T>({ method: 'put', ...option });
}

export const useAxios = () => {
  return {
    get: getFn,
    post: postFn,
    delete: deleteFn,
    put: putFn,
  };
};
const request = useAxios();

export const logoutApi = () => {
  return request.post({ url: '/api/luteos/member/logout' });
};
