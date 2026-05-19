import { erpApi } from '@/api';

// eslint-disable-next-line import/prefer-default-export
export const useStockOptions = () => {
  const stockOptions = ref<any[]>([]);
  const getStockOptions = async () => {
    const res = await erpApi.luteosErpWarehouseQueryList({
      pageSize: 1000,
      pageNum: 1,
    });
    stockOptions.value = res?.warehouseList
      .filter((item: any) => item.warehouseCode)
      .map((item: any) => ({
        label: `${item.warehouseDesc}-${item.warehouseCode}`,
        value: item.warehouseCode,
      }));
  };
  return {
    stockOptions,
    getStockOptions,
  };
};
