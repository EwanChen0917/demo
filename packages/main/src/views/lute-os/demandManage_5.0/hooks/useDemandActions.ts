import { isNil, omitBy } from 'lodash-es';
import { interApproveDemand, operateDemand } from '../services/demandApi';

interface DemandBaseActionPayload {
  demandCode: string;
}

export const useDemandActions = () => {
  const loading = ref(false);

  const runOperate = async (operateType: string, payload: Record<string, unknown>) => {
    loading.value = true;
    try {
      const requestPayload = omitBy(
        {
          operateType,
          ...payload,
        },
        isNil
      );
      await operateDemand(requestPayload as any);
    } finally {
      loading.value = false;
    }
  };

  const approveDemand = (payload: DemandBaseActionPayload & { reason?: string; holdOn?: boolean }) =>
    runOperate('approved', {
      demandCode: payload.demandCode,
      approveInfo: {
        remark: payload.reason ?? '',
      },
      holdOn: payload.holdOn,
    });

  const rejectDemand = (payload: DemandBaseActionPayload & { reason: string; holdOn?: boolean }) =>
    runOperate('rejected', {
      demandCode: payload.demandCode,
      approveInfo: {
        remark: payload.reason,
      },
      holdOn: payload.holdOn,
    });

  const resubmitDemand = (payload: DemandBaseActionPayload & { remark?: string; demandSaveReq?: Record<string, any> }) =>
    runOperate('resubmit', payload);

  const scoreDemand = (payload: DemandBaseActionPayload & { score: number; scoreReason?: string }) =>
    runOperate('score', payload);

  const feedbackDemand = (
    payload: DemandBaseActionPayload & { implementFlag: number; implementRemark?: string }
  ) => runOperate('feedback', payload);

  const updateHandler = (payload: DemandBaseActionPayload & { handler: string }) =>
    runOperate('update_handler', payload);

  const cancelDemand = (payload: DemandBaseActionPayload) =>
    runOperate('demand_cancel', payload);

  const innerApproveDemandAction = async (
    payload: DemandBaseActionPayload & {
      approveFlag: 0 | 1;
      editFlag: 0 | 1;
      demandSaveReq?: Record<string, any>;
    }
  ) => {
    loading.value = true;
    try {
      await interApproveDemand(payload as any);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    approveDemand,
    rejectDemand,
    resubmitDemand,
    scoreDemand,
    feedbackDemand,
    updateHandler,
    cancelDemand,
    innerApproveDemandAction,
  };
};

