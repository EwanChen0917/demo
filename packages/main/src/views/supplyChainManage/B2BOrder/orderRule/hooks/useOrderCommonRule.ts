import { dataApi, erpApi, platformApi, shopApi, productApi, omsApi } from '@/api';

/* eslint-disable import/prefer-default-export */
export const useOrderCommonRule = () => {
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
    // console.log('获取店铺', res);
    shopOptions.value = res?.shopListDetailResps?.map((item) => {
      return { label: item.shopCode, value: { value: item.shopCode, desc: item.shopCode } };
      // return { label: item.name, value: item.shopCode };
    });
    // console.log(shopArr.value);
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
  queryCountry();
  const shipmentArr: any = ref([]);
  const queryShipment = async () => {
    const res = await erpApi.luteosErpOrderShipmentQuerySpList({
      smStatus: 1,
      pageNum: 1,
      pageSize: 100,
    });
    // console.log('获取物流渠道', res);
    shipmentArr.value = res?.recordList?.map((item) => {
      return {
        label: item.spName,
        value: { label: item.spName, value: item.spCode },
        children: (item.smWarehouseParamBeanList || []).map((c) => {
          return {
            label: c.smName,
            value: { label: c.smName, value: c.smCode },
          };
        }),
      };
    });
  };
  queryShipment();
  // 获取仓库
  const warehouseArr: any = ref([]);
  const queryWarehouse = async () => {
    // 启用状态 0-禁用 1-启用
    const res = await omsApi.omsCommonWarehouseList({
      status: 1,
      pageNum: 1,
      pageSize: 100000,
    });
    // console.log('获取仓库', res);
    warehouseArr.value = res?.map((item) => {
      return {
        label: item.warehouseName,
        value: { value: item.warehouseCode, desc: item.warehouseName },
      };
    });
  };
  queryWarehouse();
  // 产品品类
  const categoryList: any = ref([]);
  const getProductCategory = async () => {
    const res = await productApi.luteosProductCategoryQueryCategoryList({
      status: 1,
      pageNum: 1,
      pageSize: 1000,
    });
    categoryList.value = renameChildrenToData(res.categoryBeanList);
  };
  // 递归更换字段名
  function renameChildrenToData(arr) {
    return arr.map((item) => {
      // 如果当前项是一个对象，并且包含 'children' 字段
      if (item && typeof item === 'object' && item.hasOwnProperty('categoryBeanList')) {
        // 递归处理 'children' 字段
        const newItem = {
          label: item.categoryName,
          value: { label: item.categoryName, value: item.categoryCode },
          children: renameChildrenToData(item.categoryBeanList),
        };
        return newItem;
      }
      // 如果当前项不是对象或者不包含 'children' 字段，直接返回原项
      return {
        label: item.categoryName,
        value: { label: item.categoryName, value: item.categoryCode },
        children: [],
      };
    });
  }
  getProductCategory();

  // 产品品牌
  const productBrand: any = ref([]);
  const getProductBrandList = async () => {
    const result = await productApi.luteosProductBrandQueryBrandList({
      pageNum: 1,
      pageSize: 500,
    });
    productBrand.value = result.brandBeanList?.map((item) => {
      return { label: item.brandName, value: { desc: item.brandName, value: item.brandCode } };
    });
  };
  getProductBrandList();

  // 获取敏感类型
  const specialPropertyOptions: any = ref([]);
  const querySpecialProperty = async () => {
    // 启用状态 0-禁用 1-启用
    const res = await productApi.luteosProductSensitiveTypeQuerySensitiveTypeList({
      pageNum: 1,
      pageSize: 100,
    });
    // console.log('获取敏感类型', res);
    specialPropertyOptions.value = res?.sensitiveTypeBeanList?.map((item) => {
      return {
        label: item.sensitiveTypeName,
        value: item.sensitiveTypeCode,
      };
    });
  };
  querySpecialProperty();

  // 获取订单标签
  const labelsList: any = ref([]);
  const queryLabels = async () => {
    const res = await omsApi.omsCommonSysQueryLabelList({
      pageNum: 1,
      pageSize: 100,
      moduleList: ['oms_order_shopify', 'oms_order'],
    });
    labelsList.value = res?.map((item) => {
      return {
        label: item.name,
        value: { desc: item.name, value: item.labelCode },
      };
    }) || [];
  };
  queryLabels();

  return {
    orderRiskOptions,
    channelOptions,
    getChannelOptions,
    shopOptions,
    queryShop,
    countryOptions,
    queryCountry,
    shipmentArr,
    queryShipment,
    warehouseArr,
    queryWarehouse,
    productBrand,
    getProductBrandList,
    querySpecialProperty,
    specialPropertyOptions,
    getProductCategory,
    categoryList,
    labelsList,
  };
};
