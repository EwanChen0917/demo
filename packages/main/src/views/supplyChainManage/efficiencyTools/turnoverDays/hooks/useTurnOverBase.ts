import { erpApi } from "@/api";


export const useTurnOverBase = () => {
  const stockSiteList = [
    {
      label: 'US',
      value: 'US',
    },
    {
      label: 'CA',
      value: 'CA',
    },
    {
      label: 'MX',
      value: 'MX',
    },
    {
      label: 'EU',
      value: 'EU',
    },
    {
      label: 'UK',
      value: 'UK',
    },
    {
      label: 'AU',
      value: 'AU',
    },
    {
      label: 'SA',
      value: 'SA',
    },
    {
      label: 'JP',
      value: 'JP',
    },
    {
      label: 'SG',
      value: 'SG',
    },
  ];
  const logisticsMap = ref()
  const getLogisticsMap = async(stockSite?)=>{
    const res = await erpApi.luteosErpLogisticsTransportQueryListV2({
      stockSite,
    });
    if(res?.recordList?.length){
          logisticsMap.value = res?.recordList
    }
  }
  return {
    stockSiteList,
    logisticsMap,
    getLogisticsMap
  };
};
