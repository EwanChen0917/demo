import { dataApi, erpApi, memberApi, omsApi, productApi } from '@/api';

// eslint-disable-next-line import/prefer-default-export
export const usePoolOwnerShipData = (options?: { autoLoad?: string[] }) => {
  const channelList = ref<any[]>([]);
  const countryList = ref<any[]>([]);
  const regionList = ref<any[]>([]);
  const siteList = ref<any[]>([]);
  const salesmanList = ref<any[]>([]);
  const storeList = ref<any[]>([]);
  const warehouseTypeList = ref<any[]>([]);
  const warehouseList = ref<any[]>([]);
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
  const getRegionList = async () => {
    const res = await productApi.luteosProductSaleSkuQueryDictSalesChannelList({
      lutePlatform: '新平台',
      pageNum: 1,
      pageSize: 100,
    });
    if (!res || !res.dictSalesChannelList) return;

    regionList.value = res?.dictSalesChannelList?.map((e) => {
      return {
        value: e.luteChannel,
        label: e.luteChannel,
        name: e.luteChannel,
      };
    });
  };
  const getCountryList = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    if (!res || !res.countryList) return;
    countryList.value = res?.countryList?.map((e) => {
      return {
        value: e.countryCode,
        label: `${e.countryCode} - ${e.countryName}`,
        name: e.countryName,
      };
    });
  };
  const getSalesmanList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
      deptId: '65717209',
      searchChildDept: true,
    });
    if (!res || !res.memberList) return;
    salesmanList.value = res.memberList.map((e) => {
      return {
        value: e.memberCode,
        label: e.name,
        name: e.name,
        ...e,
      };
    });
  };
  const getChannelList = async () => {
    const res = await productApi.luteosProductSaleSkuQueryDictSalesChannelList({
      lutePlatform: '新平台',
      pageNum: 1,
      pageSize: 100,
    });
    if (!res || !res.dictSalesChannelList) return;
    channelList.value = res.dictSalesChannelList.map((e) => {
      return {
        value: e.luteChannel,
        label: e.luteChannel,
        name: e.luteChannel,
      };
    });
  };
  type WarehouseType = 'SELF' | 'PLATFORM' | 'THIRD' | any | 'ALL';
  const getWarehouseList = async (type: WarehouseType = 'ALL') => {
    let warehouseType = type;
    if (type === 'ALL') {
      warehouseType = undefined;
    }
    const res = (await omsApi.omsCommonWarehouseList({
      warehouseType,
    })) as any;
    if (!res) return;
    warehouseList.value = res.map((e) => {
      return {
        label: e.warehouseName,
        value: e.warehouseCode,
      };
    });
  };
  /**
   * 根据 value 查找对应的 name
   * @param list 选项列表
   * @param values 单个值或多个值（code/value）
   * @returns 匹配项的 name 数组
   */
  const findNamesByValues = (list: any[], values: string | string[]) => {
    if (!values) return [];

    // 统一转为数组处理
    const valueArray = Array.isArray(values) ? values : [values];

    // 在 list 中查找所有匹配项
    const matched = list.filter(
      (item) => valueArray.includes(item.value) || valueArray.includes(item.code)
    );

    // 返回匹配项的 name
    return matched.map((item) => item.name || item.label);
  };
  onMounted(() => {
    const { autoLoad } = options || {};
    if (autoLoad && autoLoad.length > 0) {
      const methodMap: Record<string, () => Promise<void>> = {
        getSiteList,
        getRegionList,
        getCountryList,
        getSalesmanList,
        getChannelList,
        getWarehouseList,
      };
      autoLoad.forEach((method) => {
        if (methodMap[method]) {
          methodMap[method]();
        }
      });
    } else {
      getSiteList();
      getRegionList();
      getCountryList();
      getSalesmanList();
      getChannelList();
      getWarehouseList();
    }
  });
  return {
    channelList,
    countryList,
    regionList,
    siteList,
    salesmanList,
    storeList,
    warehouseTypeList,
    getSiteList,
    getRegionList,
    getCountryList,
    getSalesmanList,
    getChannelList,
    findNamesByValues,
    warehouseList,
  };
};
