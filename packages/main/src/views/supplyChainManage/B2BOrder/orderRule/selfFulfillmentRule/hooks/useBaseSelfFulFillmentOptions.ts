import { dataApi, omsApi, platformApi, shopApi } from '@/api';

// eslint-disable-next-line import/prefer-default-export
export const useBaseSelfFulFillmentOptions = () => {
  const orderRiskOptions = ref([
    {
      label: '高风险',
      key: 'HIGH',
    },
    {
      label: '中风险',
      key: 'MEDIUM',
    },
    {
      label: '无风险',
      key: 'NONE',
    },
  ]);
  const channelOptions: any = ref([]);
  const getChannelOptions = async () => {
    const res = await platformApi.platformAllList();
    channelOptions.value =
      res.map((item) => {
        return { label: item.desc, value: item };
        // return { label: item.desc, value: item.value};
      }) || [];
  };
  getChannelOptions();
  const shopOptions: any = ref([]);
  const queryShop = async () => {
    const res = await shopApi.luteosShopQueryShopCommonList({
      errorStatus: '1' as unknown as number,
      pageNum: 1,
      pageSize: 100000,
    });
    shopOptions.value = res?.shopListDetailResps?.map((item) => {
      return { label: item.shopCode, value: { value: item.shopCode, desc: item.shopCode } };
    });
  };
  queryShop();
  const countryOptions: any = ref([]);
  const queryCountry = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    countryOptions.value = res?.countryList?.map((item) => {
      return {
        label: `${item.countryCode} - ${item.countryName}`,
        value: { value: item.countryCode, desc: `${item.countryCode} - ${item.countryName}` },
        // value: item.countryCode,
      };
    });
  };
  const labelOptions: any = ref([]);
  const queryLabelOptions = async () => {
    const res = await omsApi.omsCommonSysQueryLabelList({
      pageNum: 1,
      pageSize: 100,
      module: 'L000008',
    });
    const labelList = (res as any)?.result || (Array.isArray(res) ? res : []);
    labelOptions.value = labelList.map((item: any) => ({
      value: item.name || '',
      label: item.name || '',
    }));
  };
  queryLabelOptions();
  queryCountry();
  return {
    orderRiskOptions,
    channelOptions,
    shopOptions,
    countryOptions,
    labelOptions,
  };
};
