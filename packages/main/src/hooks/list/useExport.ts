import { useRequest } from 'vue-request';
import { omit } from 'lodash-es';

import * as swal from '@/utils/swal';

const useExport = (
  service: Parameters<typeof useRequest>[0],
  options?: Parameters<typeof useRequest>[1] & {
    preventConfirm?: boolean;
  }
) => {
  const router = useRouter();
  const { loading: exportLoading, run: exportRun } = useRequest(service, {
    manual: true,
    async onSuccess(d) {
      const isConfirmed = await swal.exportConfirm();
      if (!isConfirmed) return;

      router.push({
        path: '/downloadmanage',
        query: {
          app_code: d?.appCode,
          module_code: d?.moduleCode,
          record_type: 2,
        },
      });
    },
    onError(e) {
      swal.error(`导出失败: ${e.message}`);
    },
    ...omit(options ?? {}, ['preventConfirm']),
  });
  const handleExport = async (...args: Parameters<typeof exportRun>) => {
    if (!options?.preventConfirm) {
      const isConfirmed = await swal.confirm('确定要导出吗？');
      if (!isConfirmed) return;
    }

    exportRun(...args);
  };

  return {
    exportLoading,
    handleExport,
  };
};

export default useExport;
