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
        key: 'skuDesc',
        label: '产品名称',
        checked: true,
        readonly: true,
      },
      {
        key: 'warehouseDesc',
        label: '仓库',
        checked: true,
      },
      {
        key: 'warehouseTypeDesc',
        label: '仓库类型',
        checked: true,
      },
      { key: 'inProductionQuantity', label: '在制库存', checked: true },
      { key: 'inTransitQuantity', label: '在途库存', checked: true },
      { key: 'totalQuantity', label: '实物库存', checked: true },
      { key: 'goodQuantity', label: '良品库存', checked: true },
      { key: 'summaryQuantity', label: '在途在制数量', checked: true }, // 前端本地计算字段
      { key: 'unShelveQuantity', label: '收货未上架数量', checked: true },

      { key: 'availableQuantity', label: '可用数量', checked: true },
      { key: 'unsellableQuantity', label: '不良数量', checked: true },
      { key: 'reservedQuantity', label: '预占数量', checked: true },
      { key: 'lockedQuantity', label: '锁库数量', checked: true },
      { key: 'unit', label: '单位', checked: true },
    ],
  },
];
export default customFields;
