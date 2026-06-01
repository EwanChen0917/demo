const customFields = [
  {
    title: '基础信息',
    propertyArr: [
      { key: 'skuCode', label: '产品SKU', checked: true, readonly: true },
      { key: 'productName', label: '产品名称', checked: true },
      { key: 'customerDesc', label: '客户名称/客户汇总名称', checked: true },
      { key: 'warehouseDesc', label: '发货仓库', checked: true },
      { key: 'organizationDeptIdDesc', label: '所属组织', checked: true },
      { key: 'salerName', label: '销售', checked: true },
      { key: 'salesStatusDesc', label: '产品状态', checked: true },
      { key: 'statusDesc', label: '预测状态', checked: true },
      { key: 'updateTime', label: '预测更新时间', checked: true },
      { key: 'operatorName', label: '运营', checked: true },
      { key: 'plannerName', label: '计划', checked: true },
    ],
  },
  {
    title: '销量信息',
    mode: 'single',
    propertyArr: [
      {
        key: 'sale-3',
        label: '最近三个月销量',
      },
      {
        key: 'sale-6',
        label: '最近六个月销量',
      },
      {
        key: 'sale-12',
        label: '最近一年销量',
        checked: true,
        defaultChecked: true,
      },
    ],
  },
  {
    title: '库存水位',
    mode: 'single',
    propertyArr: [
      { key: 'inv-3', label: '未来三个月库存水位' },
      { key: 'inv-6', label: '未来六个月库存水位', checked: true, defaultChecked: true },
    ],
  },
  {
    title: '预测信息',
    mode: 'single',
    propertyArr: [
      { key: 'pred-3', label: '未来三个月预测' },
      { key: 'pred-6', label: '未来六个月预测', checked: true, defaultChecked: true },
    ],
  },
];
export default customFields;
