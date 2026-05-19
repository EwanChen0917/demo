import { nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus/es';
import * as swal from '@/utils/swal';

export interface StockExportResult {
  appCode?: string;
  moduleCode?: string;
}

export interface UseStockExportOptions<TParams = unknown> {
  /** 构建导出请求参数（通常与列表筛选一致） */
  getParams: () => TParams;
  /** 调用后端导出接口 */
  exportRequest: (params: TParams) => Promise<StockExportResult>;
  /** 导出前确认标题 */
  confirmTitle?: string;
  /** 导出前确认文案 */
  confirmText?: string;
  /** 成功后提示标题 */
  successTitle?: string;
  successConfirmText?: string;
  successCancelText?: string;
  /** 下载中心路由路径 */
  downloadPath?: string;
  /** 跳转 query：record_type */
  recordType?: number | string;
  /** 接口失败时的兜底提示 */
  errorMessage?: string;
  /** 为 true 时不弹出导出前确认 */
  skipConfirm?: boolean;
}

export function useStockExport<TParams = unknown>(options: UseStockExportOptions<TParams>) {
  const router = useRouter();
  const exportLoading = ref(false);

  const {
    getParams,
    exportRequest,
    confirmTitle = '确认',
    confirmText = '确定要导出吗？',
    successTitle = '导出成功，具体请前往下载中心查看',
    successConfirmText = '去查看',
    successCancelText = '知道了',
    downloadPath = '/downloadmanage',
    recordType = 2,
    errorMessage = '导出失败，请重试',
    skipConfirm = false,
  } = options;

  const handleExport = async () => {
    try {
      if (exportLoading.value) return;

      if (!skipConfirm) {
        const isConfirmed = await swal.confirm({
          title: confirmTitle,
          text: confirmText,
        });
        if (!isConfirmed) return;
      }

      exportLoading.value = true;
      const res = await exportRequest(getParams());

      const isConfirmedExport = await swal.confirm({
        icon: 'success',
        title: successTitle,
        confirmButtonText: successConfirmText,
        cancelButtonText: successCancelText,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (!isConfirmedExport) return;

      await nextTick();
      router.push({
        path: downloadPath,
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: recordType,
        },
      });
    } catch (error: any) {
      ElMessage.error(error?.message || errorMessage);
    } finally {
      exportLoading.value = false;
    }
  };

  return {
    exportLoading,
    handleExport,
  };
}
