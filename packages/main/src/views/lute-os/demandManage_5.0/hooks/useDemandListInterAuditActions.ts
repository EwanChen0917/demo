import { isEmpty } from 'lodash-es';
import { ElMessage } from 'element-plus';
import { platformApi } from '@/api';
import type { DemandURQueryBean } from '@/api/platform/data-contracts';

type InterAuditActionType = 'submitInterAudit' | 'resubmitInterAudit' | '';

export const useDemandListInterAuditActions = ({
  runWithLoading,
  refreshAll,
  openDetail,
}: {
  runWithLoading: <T>(key: string, runner: () => Promise<T>) => Promise<T>;
  refreshAll: () => Promise<void>;
  openDetail: (demandCode: string) => void;
}) => {
  const pendingInterAuditAction = ref<InterAuditActionType>('');

  const validateUserResearchRequired = (detail: any) => {
    const userResearch = detail?.userResearch || {};
    const missingFields = [
      { key: 'planStartDate', label: '预计开始时间' },
      { key: 'planFinishDate', label: '预计完成时间' },
      { key: 'reportConclusion', label: '报告结论' },
      { key: 'userResearchFile', label: '用研附件' },
    ]
      .filter((item) => !userResearch?.[item.key])
      .map((item) => item.label);
    if (!isEmpty(missingFields)) {
      ElMessage.error(`${missingFields.join('、')}未填写，请填写后再提交`);
      return false;
    }
    return true;
  };

  const submitInterAudit = async (row: DemandURQueryBean) => {
    try {
      const detail = await platformApi.platformDemandDetail({
        demandCode: row.demandCode,
        demandModule: 'user_research',
      });
      if (!validateUserResearchRequired(detail)) {
        return false;
      }
      const userResearch = detail?.userResearch || {};
      await runWithLoading('interApprove', () =>
        platformApi.platformDemandInterApprove({
          ...row,
          demandCode: row.demandCode,
          editFlag: 1,
          approveFlag: 1,
          planStartDate: userResearch?.planStartDate,
          planFinishDate: userResearch?.planFinishDate,
          reportConclusion: userResearch?.reportConclusion,
          userResearchFile: userResearch?.userResearchFile || null,
        } as any)
      );
      ElMessage.success('提交内审成功');
      await refreshAll();
      return true;
    } catch (error) {
      console.error('提交内审失败', error);
      return false;
    }
  };

  const resubmitInterAudit = async (row: DemandURQueryBean) => {
    try {
      const detail = await platformApi.platformDemandDetail({
        demandCode: row.demandCode,
        demandModule: 'user_research',
      });
      const userResearch = detail?.userResearch || {};
      await runWithLoading('interApprove', () =>
        platformApi.platformDemandInterApprove({
          ...row,
          demandCode: row.demandCode,
          editFlag: 0,
          approveFlag: 1,
          userResearchFile: userResearch?.userResearchFile || null,
        } as any)
      );
      ElMessage.success('重新提交成功');
      await refreshAll();
      return true;
    } catch (error) {
      console.error('重新提交失败', error);
      return false;
    }
  };

  const onInterAuditActionClick = (key: InterAuditActionType) => {
    pendingInterAuditAction.value = key;
  };

  const onInterAuditConfirmSubmit = async (row: DemandURQueryBean) => {
    if (pendingInterAuditAction.value === 'submitInterAudit') {
      const success = await submitInterAudit(row);
      if (success) {
        pendingInterAuditAction.value = '';
      }
      return success;
    }
    if (pendingInterAuditAction.value === 'resubmitInterAudit') {
      const success = await resubmitInterAudit(row);
      if (success) {
        pendingInterAuditAction.value = '';
      }
      return success;
    }
    return false;
  };

  const onInterAuditConfirmModify = (row: DemandURQueryBean) => {
    pendingInterAuditAction.value = '';
    openDetail(row.demandCode);
  };

  const onInterAuditConfirmCancel = () => {
    pendingInterAuditAction.value = '';
  };

  return {
    pendingInterAuditAction,
    onInterAuditActionClick,
    onInterAuditConfirmSubmit,
    onInterAuditConfirmModify,
    onInterAuditConfirmCancel,
  };
};
