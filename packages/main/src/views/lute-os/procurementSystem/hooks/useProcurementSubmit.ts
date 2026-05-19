import { ref } from 'vue';
import { platformApi } from '@/api';
import type { DemandSaveReq, DemandSaveResp } from '@/api/platform/data-contracts';

interface SubmitOptions {
  buildPayload: () => DemandSaveReq;
}

export function useProcurementSubmit(options: SubmitOptions) {
  const loading = ref(false);

  const run = async (): Promise<DemandSaveResp> => {
    const payload = options.buildPayload();
    loading.value = true;
    try {
      return await platformApi.platformDemandSave({
        ...payload,
        operateType: 1,
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    run,
  };
}

export type { DemandSaveReq, DemandSaveResp } from '@/api/platform/data-contracts';
