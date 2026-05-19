// eslint-disable-next-line import/prefer-default-export
export const useFactoryConfig = () => {
  const deliveryTypeMap = [
    {
      label: '需要物流安排提货',
      value: 'logistics',
    },
    {
      label: '工厂自送货',
      value: 'factory',
    },
    {
      label: '工厂自送物流商仓',
      value: 'factory_self_logistics',
    },
  ];
  const isExportTaxMap = [
    {
      label: '正式报关（需要出口退税）',
      value: 'Y',
    },
    {
      label: '买单出口（不需要退税）',
      value: 'N',
    },
  ];
  const businessInspectionMap = [
    {
      label: '是',
      value: 'Y',
    },
    {
      label: '否',
      value: 'N',
    },
  ];
  // 0待质检、1待入库、2待出库、3已出库、4废弃
  const srmOrderStatusMap = [
    {
      label: '待质检',
      value: '0',
    },
    {
      label: '待入库',
      value: '1',
    },
    {
      label: '待出库',
      value: '2',
    },
    {
      label: '已出库',
      value: '3',
    },
    {
      label: '废弃',
      value: '4',
    },
  ];
  //	状态 0-新建 1-发货在途 2-已到货 3-部分收货 4-全部收货 5-已关闭 6-废弃
  const srmDeliveryStatusMap = {
    0: '新建',
    1: '发货在途',
    2: '已到货',
    3: '部分收货',
    4: '全部收货',
    5: '已关闭',
    6: '废弃',
  };
  return {
    deliveryTypeMap,
    isExportTaxMap,
    businessInspectionMap,
    srmOrderStatusMap,
    srmDeliveryStatusMap,
  };
};
