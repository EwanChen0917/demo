import { useStore } from '@/store/modules/useStore';
import { memberApi } from '@/api';

export const useReport = () => {
  const store = useStore();
  const route = useRoute();
  return {
    report: async (eventName: string, extraInfo: Record<string, unknown> = {}) => {
      const menuCode = store.menuCodeMap?.[route!.name! as string] || '';
      await memberApi.luteosMemberSysReport({
        platform: 'ERP',
        menuCode,
        eventName,
        memberCode: String(store?.userInfo?.memberCode || ''),
        type: 'button',
        pageUrl: route?.path,
        extraInfo: JSON.stringify(extraInfo),
      });
    },
  };
};

export default {};
