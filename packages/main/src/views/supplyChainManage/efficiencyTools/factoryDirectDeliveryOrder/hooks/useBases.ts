import { omsApi } from '@/api';
//
// eslint-disable-next-line import/prefer-default-export
export const useFactoryBase = () => {
  const supplierList = ref<any[]>();
  const getSupplierList = async () => {
    try {
      const res = (await omsApi.omsDirectFactoryWorkOrderQuerySupplierList({})) as any;
      supplierList.value = res
        .filter((item: any) => item.supplierCode)
        .map((item: any) => {
          return {
            label: `${item.supplierName}-${item.toElsAccount}`,
            value: item.supplierCode,
          };
        });
    } catch (error) {
      supplierList.value = [];
    }
  };
  return {
    supplierList,
    getSupplierList,
  };
};
