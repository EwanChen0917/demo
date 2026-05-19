import { ref } from 'vue';
import { platformApi } from '@/api';
import type { DemandSaveReq, DemandSaveResp } from '@/api/platform/data-contracts';

interface SaveDraftOptions {
  buildPayload: () => DemandSaveReq;
}

export function useProcurementDraftSave(options: SaveDraftOptions) {
  const loading = ref(false);

  const run = async (): Promise<DemandSaveResp> => {
    const payload = options.buildPayload();
    loading.value = true;
    try {
      return await platformApi.platformDemandSave({
        ...payload,
        operateType: 0,
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
