const customDetailFields = [
  {
    title: '可选',
    isSubtext: true, // 副标题,不加粗
    propertyArr: [
      { key: 'productImageUrl', label: '图片', checked: true },
      { key: 'productName', label: '产品名称', checked: true, readonly: true },
      { key: 'skuCode', label: '产品SKU', checked: true },
      { key: 'suggestPrice', label: '建议售价', checked: true },
      { key: 'postalPrice', label: '报价', checked: true },
      { key: 'price', label: '销售单价', checked: true },
      { key: 'priceTaxAmount', label: '税额', checked: true },
      { key: 'taxRateDesc', label: '税率', checked: true },
      { key: 'commission', label: '佣金', checked: true },

      { key: 'deliveryDesc', label: '发货方式', checked: true },
      { key: 'warehouseDesc', label: '发货仓库', checked: true },
      { key: 'supplySku', label: '供应链SKU', checked: true },
      { key: 'num', label: '数量 (件)', checked: true },
      { key: 'shippingDesc', label: '物流渠道', checked: true },
      { key: 'upcCode', label: 'UPC码', checked: true },
      { key: 'eanCode', label: 'EAN码', checked: true },
    ],
  },
];
export default customDetailFields;
