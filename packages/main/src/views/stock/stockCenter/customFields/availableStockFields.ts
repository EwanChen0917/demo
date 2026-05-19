const customFields = [
  {
    title: '列表',
    propertyArr: [
      {
        key: 'supplySku',
        label: '供应链SKU',
        checked: true,
        readonly: true,
      },
      {
        key: 'skuCode',
        label: '产品SKU',
        checked: true,
        readonly: true,
      },
      {
        key: 'skuName',
        label: '产品名称',
        checked: true,
        readonly: true,
      },
      {
        key: 'poolName',
        label: '分配池名称',
        checked: true,
      },
      {
        key: 'warehouseName',
        label: '仓库',
        checked: true,
      },
      {
        key: 'warehouseTypeDesc',
        label: '仓库类型',
        checked: true,
      },
      { key: 'unShelveQuantity', label: '收货未上架数量', checked: true },
      { key: 'unsellableQuantity', label: '不可售数量', checked: true },
      { key: 'availableQuantity', label: '可售数量', checked: true },
      { key: 'reservedQuantity', label: '预占数量', checked: true },
      { key: 'lockedQuantity', label: '锁库数量', checked: true },
      { key: 'unit', label: '单位', checked: true },
      { key: 'channelName', label: '平台', checked: true },
      { key: 'countryName', label: '国家', checked: true },
      { key: 'siteName', label: '店铺/站点', checked: true },
      { key: 'salesmanName', label: '业务员', checked: true },
      { key: 'isSharedDesc', label: '是否共享', checked: true },
      { key: 'statusDesc', label: '状态', checked: true },
    ],
  },
];
export default customFields;
