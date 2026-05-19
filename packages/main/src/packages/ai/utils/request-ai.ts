import axios from 'axios';
import { ElMessage } from 'element-plus';

const createRequest = (token: string) => {
  const request = axios.create({
    baseURL: `${import.meta.env.VITE_APP_AI_HOST}/v1`,
    timeout: 50000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  request.interceptors.request.use((config: any) => {
    // config.headers.Authorization = `Bearer app-LI2OyPDMX5kjYvLHu0R2LWJ4`;
    return config;
  });
  request.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error && error.response) {
        if (error.response.data) {
          error.ElMessage = error.response.data.msg;
        } else {
          switch (error.response.status) {
            case 400:
              error.ElMessage = '错误请求';
              break;
            case 401:
              // 此处可以进行退出登录操作
              error.ElMessage = '未授权，请重新登录';
              break;
            case 403:
              error.ElMessage = '拒绝访问';
              break;
            case 404:
              error.ElMessage = '请求错误，未找到该资源';
              break;
            case 405:
              error.ElMessage = '请求方法未允许';
              break;
            case 408:
              error.ElMessage = '请求超时';
              break;
            case 500:
              error.ElMessage = '服务器内部错误';
              break;
            case 501:
              error.ElMessage = '尚未实施';
              break;
            case 502:
              error.ElMessage = '错误网关';
              break;
            case 503:
              error.ElMessage = '服务不可用';
              break;
            case 504:
              error.ElMessage = '网关超时';
              break;
            case 505:
              error.ElMessage = 'http版本不支持该请求';
              break;
            default:
              error.ElMessage = navigator.onLine
                ? '网络异常，请稍后重试'
                : '网络中断，请注意您的网络连接';
          }
        }
      }
      if (!error.config?.customCatch) {
        ElMessage.error(error.ElMessage || 'Error 网络异常，请稍后重试');
      }
      return Promise.reject(error);
    }
  );
  return request;
};
export default createRequest;
