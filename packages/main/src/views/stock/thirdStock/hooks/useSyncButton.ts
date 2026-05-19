import * as swal from '@/utils/swal';
import { ElMessage, ElNotification } from 'element-plus';

interface UseSyncButtonOptions {
  loadingButtonText?: string;
  confirmButtonText?: string;
  confirmTitle?: string;
  confirmText?: string;
  successMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
  services: (params?: any, config?: any) => Promise<any>;
  timeout?: number;
  onSuccess?: (result?: any) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
}
// eslint-disable-next-line import/prefer-default-export
export const useSyncButton = ({
  loadingButtonText = '更新中',
  confirmButtonText = '确定更新',
  confirmTitle = '确认',
  confirmText = '确定更新吗',
  successMessage = '更新完成',
  loadingMessage = '更新中',
  errorMessage = '更新失败',
  services,
  timeout = 300000,
  onSuccess,
  onError,
  onFinally,
}: UseSyncButtonOptions) => {
  const asyncLoading = ref(false);
  const syncButtonText = ref(confirmButtonText);
  const notificationInstance = ref<any>();
  const openSync = async (params?: any, config?: any) => {
    if (asyncLoading.value) return;
    try {
      if (typeof services !== 'function') {
        throw new Error('更新服务函数未确定');
      }
      const isConfirmed = await swal.confirm({
        title: confirmTitle,
        text: confirmText,
      });
      if (!isConfirmed) return;
      asyncLoading.value = true;
      syncButtonText.value = loadingButtonText;
      notificationInstance.value = ElNotification({
        title: loadingMessage,
        message: `${loadingMessage}，请稍候...`,
        type: 'info',
        duration: 0,
        showClose: true,
        position: 'top-right',
      });

      const requestConfig = timeout
        ? {
            ...config,
            timeout: config?.timeout ?? timeout,
          }
        : config;
      const result = await services(params, requestConfig);
      if (notificationInstance.value) {
        notificationInstance.value.close();
        notificationInstance.value = null;
      }
      ElNotification({
        title: '操作成功',
        message: successMessage,
        type: 'success',
        duration: 4500,
        position: 'top-right',
      });
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error: any) {
      if (notificationInstance.value) {
        notificationInstance.value.close();
        notificationInstance.value = null;
      }
      if (onError) {
        onError(error);
      }
    } finally {
      asyncLoading.value = false;
      syncButtonText.value = confirmButtonText;

      if (onFinally) {
        onFinally();
      }
    }
  };

  return {
    asyncLoading,
    syncButtonText,
    openSync,
  };
};
