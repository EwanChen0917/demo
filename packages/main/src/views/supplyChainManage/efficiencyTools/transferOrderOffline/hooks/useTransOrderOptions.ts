import { ref, onMounted } from 'vue';
import { erpApi, omsApi } from '@/api';

// eslint-disable-next-line import/prefer-default-export
export const useTransOrderOptions = () => {
  const inWarehouseMap = ref();
  const outWarehouseMap = ref();
  const logisticsTransportList = ref();
  const queryAllWarehouse = async () => {
    const res = await omsApi.omsTransferQueryWarehouse({
      type: 'IN',
    });
    inWarehouseMap.value = res || [];
  };
  const queryOutWareHouse = async () => {
    const res = await omsApi.omsTransferQueryWarehouse({
      type: 'OUT',
    });
    outWarehouseMap.value = res || [];
  };
  const getLogisticsTransportList = async () => {
    const res = await erpApi.luteosErpLogisticsTransportQueryList({
      shipperCountry: ['CN'],
      pageSize: 1000,
      pageNum: 1,
      status: 1, // 只查询启用的物流方式
    });
    logisticsTransportList.value = res?.recordList || [];
  };
  onMounted(() => {
    queryOutWareHouse();
    queryAllWarehouse();
    getLogisticsTransportList();
  });
  return {
    inWarehouseMap,
    outWarehouseMap,
    logisticsTransportList,
  };
};
