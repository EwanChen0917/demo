import { erpApi, shopApi, platformApi } from '@/api';

type baseOptions = {
  label: string;
  value: string;
};
export default () => {
  const companyList = ref<baseOptions[]>([]);
  const getCompanyList = async () => {
    const res = await shopApi.luteosShopBusinessQueryList({
      pageSize: 200,
      pageNum: 1,
    });
    companyList.value = res.recordList as [];
  };
  const channelList = ref<baseOptions[]>([]);
  const getChannelList = async () => {
    const res = await platformApi.platformAllList();
    channelList.value = res?.map((e: any) => {
      return {
        value: e.value,
        label: e.value || '',
      };
    });
  };
  const functionStatusList = ref<any>();
  const getFunctionStatusList = async () => {
    const res = await erpApi.luteosErpWarehouseQueryList({
      pageNum: 1,
      pageSize: 1000,
      status: 1,
    });
    functionStatusList.value = res?.warehouseList?.map((e: any) => {
      return {
        label: `${e.warehouseDesc}_${e.warehouseCode}`,
        value: {
          warehouseCode: e.warehouseCode,
          warehouseDesc: e.warehouseDesc,
        },
      };
    });
  };
  return {
    companyList,
    getCompanyList,
    channelList,
    getChannelList,
    functionStatusList,
    getFunctionStatusList,
  };
};
