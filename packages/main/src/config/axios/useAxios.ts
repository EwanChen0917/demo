import { service } from '@/config/axios';
import { useCache } from '@/hooks/web/useCache';
import type { AxiosPromise } from 'axios';

import { config } from '@/config/axios/axiosConfig';

const { wsCache } = useCache('localStorage');

const { default_headers } = config;

const request = <T>(option: AxiosConfig): AxiosPromise<T> => {
  const { url, method, params, data, headersType, responseType, noLoading } = option;
  const AxiosService = {
    url,
    method,
    params,
    data,
    responseType,
    headers: {
      'Content-Type': headersType || default_headers,
      // Authorization: `Bearer ${wsCache.get('token')}`,
    },
  };

  if (noLoading) (AxiosService.headers as any).noLoading = noLoading;
  return service(AxiosService);
};

export function getFn<T = any>(option: AxiosConfig): AxiosPromise<T> {
  return request<T>({ method: 'get', ...option });
}

export function postFn<T = any>(option: AxiosConfig): AxiosPromise<T> {
  return request<T>({ method: 'post', ...option });
}

function deleteFn<T = any>(option: AxiosConfig): AxiosPromise<T> {
  return request<T>({ method: 'delete', ...option });
}

function putFn<T = any>(option: AxiosConfig): AxiosPromise<T> {
  return request<T>({ method: 'put', ...option });
}

export const useAxios = () => {
  return {
    get: getFn,
    post: postFn,
    delete: deleteFn,
    put: putFn,
  };
};
