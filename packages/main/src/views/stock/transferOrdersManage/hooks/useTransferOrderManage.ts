/* eslint-disable import/prefer-default-export */

import { memberApi, omsApi } from '@/api';
import { EnumDictItemResp } from '@/api/common/data-contracts';
import * as swal from '@/utils/swal';

export const useTransOrderManage = () => {
  const statusList = ref<EnumDictItemResp[]>([]);
  const getStatusList = async () => {
    const res = (await omsApi.omsCommonBizEnumsGetEnumDict({
      enumDictCode: 'transferPlanOrderStatusEnum',
    })) as EnumDictItemResp[];
    statusList.value = res || [];
  };

  const abandonTransferPlanOrder = async (code: string) => {
    const validCode = code?.trim();
    if (!validCode) return false;
    const isConfirmed = await swal.confirm({
      title: '作废确认',
      text: '确认作废？',
    });
    if (!isConfirmed) return false;
    await omsApi.omsTransferPlanAbandon({ code: validCode });
    return true;
  };

  const auditTransferPlanOrder = async (code: string) => {
    const validCode = code?.trim();
    if (!validCode) return false;
    const isConfirmed = await swal.confirm({
      title: '审核确认',
      text: '确认审核？',
    });
    if (!isConfirmed) return false;
    await omsApi.omsTransferPlanAudit({ code: validCode });
    return true;
  };

  const submitTransferPlanOrder = async ({ code }) => {
    if (!code) return false;
    const isConfirmed = await swal.confirm({
      title: '提交确认',
      text: '确认提交吗？',
    });
    if (!isConfirmed) return false;
    await omsApi.omsTransferPlanSubmit({ code });
    return true;
  };
  const memberList = ref<any[]>([]);
  const queryMemberList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'supply_planer_dept',
    });
    memberList.value = res?.memberList as any[];
  };
  return {
    statusList,
    getStatusList,
    abandonTransferPlanOrder,
    auditTransferPlanOrder,
    submitTransferPlanOrder,
    memberList,
    queryMemberList,
  };
};
