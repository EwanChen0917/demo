import { erpApi, omsApi } from '@/api';
interface DictMap {
  label: string | undefined;
  value: any;
}
export const useSalesOrder = () => {
  const siteList = ref<DictMap[]>([]);
  const pushStatusMap = ref<DictMap[]>([]);
  const shopifyOrderPushStatusMap = ref<DictMap[]>([]);
  const shopifyOrderRiskMap = ref<DictMap[]>([]);
  const shopifyOrderFinancialStatusMap = ref<DictMap[]>([]);
  const shopifyOrderFulfillmentStatusMap = ref<DictMap[]>([]);
  const getSiteList = async () => {
    const res = await erpApi.luteosErpBaseSiteQueryList({
      pageNum: 1,
      pageSize: 1000,
      channel:'shopify'
    });
    siteList.value =
      res.recordList?.map((e) => {
        return {
          label: e.site,
          value: e.site,
        };
      }) || [];
  };
  const getDictMap = async (params: any) => {
    const res = await omsApi.omsCommonBizEnumsGetEnumDict({
      enumDictCode: params,
    });
    return res;
  };
  const getAllMap = async()=>{
    const [pushStatus,shopifyOrderPushStatus,shopifyOrderRisk,shopifyOrderFinancialStatus,shopifyOrderFulfillmentStatus] =  await Promise.all([
      getDictMap('pushStatus'),
      getDictMap('shopifyOrderPushStatus'),
      getDictMap('shopifyOrderRisk'),
      getDictMap('shopifyOrderFinancialStatus'),
      getDictMap('shopifyOrderFulfillmentStatus')
    ])
    pushStatusMap.value = pushStatus as DictMap[]
    shopifyOrderPushStatusMap.value = shopifyOrderPushStatus as DictMap[]
    shopifyOrderRiskMap.value = shopifyOrderRisk as DictMap[]
    shopifyOrderFinancialStatusMap.value = shopifyOrderFinancialStatus as DictMap[]
    shopifyOrderFulfillmentStatusMap.value = shopifyOrderFulfillmentStatus as DictMap[]
  };

  return {
    siteList,
    getSiteList,
    getAllMap,
    pushStatusMap,
    shopifyOrderPushStatusMap,
    shopifyOrderRiskMap,
    shopifyOrderFinancialStatusMap,
    shopifyOrderFulfillmentStatusMap
  };
};
