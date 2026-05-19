import { dataApi, erpApi, productApi } from '@/api';
export const useShopifyStock = ()=>{
   const productLineOptions = ref<any>([]);
  const getProductLineOptions = async () => {
    const res = await productApi.luteosProductLineQueryList({
      pageNum: 1,
      pageSize: 100,
    })
    productLineOptions.value = res?.recordList?.map((item: any) => ({
      label: item.productLine,
      value: item.code,
    }));
  }
    return {
        productLineOptions,
        getProductLineOptions
    }
}