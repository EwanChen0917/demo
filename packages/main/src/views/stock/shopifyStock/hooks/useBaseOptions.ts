import { cisApi, dataApi, erpApi, gtmApi, productApi } from '@/api';

// eslint-disable-next-line import/prefer-default-export
export const useBaseOptions = () => {
  const mappingStatusOptions = [
    {
      label: '已映射',
      value: '1',
    },
    {
      label: '未映射',
      value: '0',
    },
  ];
  const statusOptions = [
    {
      label: '有效',
      value: '1',
    },
    {
      label: '无效',
      value: '0',
    },
  ];
  const trackOptions = ref([
    {
      label: '跟踪',
      value: 1,
    },
    {
      label: '不跟踪',
      value: 0,
    },
  ]);
  const stockOutOperatorList = ref([
    {
      label: '预警',
      value: 1,
    },
    {
      label: '正常',
      value: 0,
    },
  ]);
  const autoSyncStockOptions = [
    {
      label: '是',
      value: 1,
    },
    {
      label: '否',
      value: 0,
    },
  ];
  const inventoryPolicyOptions = [
    {
      label: '允许缺货售卖',
      value: 'continue',
    },
    {
      label: '不允许缺货售卖',
      value: 'deny',
    },
  ];
  const productTypeOptions = [
    {
      label: '单商品',
      value: 0,
    },
    {
      label: '组合商品',
      value: 1,
    },
  ];
  const productLineOptions = ref<any>();
  const getProductLineOptions = async () => {
    const res = await productApi.luteosProductLineQueryList({
      pageNum: 1,
      pageSize: 100,
    });
    productLineOptions.value = res?.recordList?.map((item: any) => ({
      label: item.productLine,
      value: item.code,
    }));
  };
  const gtmProductLineOptions = ref<any>();
  const getGtmProductLineOptions = async () => {
    const res = await gtmApi.luteosGtmPlQueryList({ pageNum: 1, pageSize: 100 });
    gtmProductLineOptions.value =
      res?.gtmPlList?.map((item: any) => ({
        label: item.name,
        value: item.gtmPlCode,
      })) || [];
  };
  const warehouseOptions = ref<any[]>();
  const getWarehouseOptions = async () => {
    const res = await erpApi.luteosErpWarehouseQueryPlatformListByType({
      status: 1,
      platformCode: 'SHOPIFY',
    });
    warehouseOptions.value = res?.warehouseList?.map((item: any) => ({
      label: `${item.warehouseDesc}_${item.warehouseCode}`,
      value: item.warehouseCode,
    }));
  };
  const outSeaWarehouseOptions = ref<any[]>();
  const getOutSeaWarehouseOptions = async () => {
    const res = await dataApi.luteosDataQueryLuteWarehouse({
      pageSize: 1000,
      pageNum: 1,
      status: 1,
    });
    outSeaWarehouseOptions.value = res?.warehouseList?.map((item: any) => {
      return {
        label: item.warehouseDesc,
        value: item.warehouseCode,
      };
    });
  };
  const siteList = ref<any[]>([]);
  const getSiteList = async () => {
    try {
      const res = (await erpApi.luteosErpBaseSiteQueryList({
        pageNum: 1,
        pageSize: 500,
      })) as any;

      const mappedList = res.recordList.map((e) => ({
        value: e.site,
        label: e.site,
        name: e.site,
      }));
      siteList.value = Array.from(new Map(mappedList.map((item) => [item.value, item])).values());
    } catch (e) {
      /** empty */
    }
  };
  const shopifySiteList = ref<any[]>([]);
  const getShopifySiteList = async () => {
    const res = await cisApi.cisInventoryShopifyLocationQueryList({
      pageNum: 1,
      pageSize: 500,
    });
    shopifySiteList.value =
      res?.list?.map((e) => ({
        value: e.locationId,
        label: `${e?.name}`,
      })) || [];
  };
  onMounted(() => {
    getWarehouseOptions();
  });
  return {
    mappingStatusOptions,
    statusOptions,
    warehouseOptions,
    outSeaWarehouseOptions,
    getOutSeaWarehouseOptions,
    trackOptions,
    stockOutOperatorList,
    getProductLineOptions,
    productLineOptions,
    autoSyncStockOptions,
    inventoryPolicyOptions,
    siteList,
    getSiteList,
    productTypeOptions,
    shopifySiteList,
    getShopifySiteList,
    gtmProductLineOptions,
    getGtmProductLineOptions,
  };
};
