import { h } from 'vue';
import { stockCloumns } from '../../components/stockTable.vue';

export const baseShopifyStockCustomFields = [
  {
    title: '基础信息',
    propertyArr: [
      {
        key: 'msku',
        label: 'MSKU',
        checked: true,
        readonly: true,
        columnProps: { width: 240, fixed: 'left' },
      },
      {
        key: 'productName',
        label: '产品名称',
        checked: true,
        columnProps: { width: 240, showOverflowTooltip: true, slot: 'productName', fixed: 'left' },
      },
      {
        key: 'locationName',
        label: '库存地点',
        checked: true,
        readonly: true,
        columnProps: { width: 150 },
      },
      {
        key: 'locationId',
        label: '库存地点ID',
        checked: true,
        readonly: true,
        columnProps: { width: 130 },
      },
      {
        key: 'inventoryItemId',
        label: 'shopify存货编码',
        checked: true,
        columnProps: { width: 200 },
      },
      { key: 'shop', label: '店铺账号', checked: true, columnProps: { width: 150 } },
      {
        key: 'statusDesc',
        label: '平台在售状态',
        checked: true,
        columnProps: { width: 150 },
      },
      {
        key: 'productType',
        label: '产品类型',
        checked: true,
        columnProps: { width: 150, slot: 'productType' },
      },
      { key: 'productLine', label: '品线', checked: true, columnProps: { width: 150 } },
      {
        key: 'gtmProductLineName',
        label: 'GTM品线',
        checked: true,
        columnProps: { width: 150 },
        overflowTooltip: true,
      },
      { key: 'productCategory', label: '品类', checked: true, columnProps: { width: 150 } },
      { key: 'productOperatorName', label: '运营', checked: true, columnProps: { width: 150 } },
      {
        key: 'tracked',
        label: '跟踪状态',
        checked: true,
        columnProps: { width: 150, slot: 'tracked' },
      },
      {
        key: 'autoSyncStock',
        label: '库存同步',
        checked: true,
        columnProps: { width: 150, slot: 'autoSyncStock' },
      },
    ],
  },
  {
    title: '库存信息',
    propertyArr: [
      {
        key: 'inTransitStockQty',
        label: '在库在途库存',
        checked: true,
        columnProps: {
          width: 150,
          tips: () =>
            h('div', '当前MSKU+库存地点+inventory_item_id对应的实体仓库的供应链SKU的在库+在途库存'),
          sortable: true,
        },
      },
      // {
      //   key: 'inStockQuantitySummary',
      //   label: '在库库存',
      //   checked: true,
      //   columnProps: {
      //     width: 150,
      //     tips: () =>
      //       h('div', '当前MSKU+库存地点+inventory_item_id对应的实体仓库的供应链sku的可用+预占库存'),
      //   },
      // },

      {
        key: 'inTransitQty',
        label: '在途库存',
        checked: true,
        columnProps: {
          width: 150,
          tips: () =>
            h('div', '当前MSKU+库存地点+inventory_item_id对应的实体仓库的供应链SKU的在途库存'),
          sortable: true,
        },
      },
      {
        key: 'available',
        label: '可用库存',
        checked: true,
        columnProps: {
          width: 150,
          tips: () =>
            h('div', '当前MSKU+库存地点+inventory_item_id对应的可用的供应链SKU的可用库存'),
          sortable: true,
        },
      },
      {
        key: 'allowBackorder',
        label: '缺货售卖',
        checked: true,
        columnProps: { width: 150, slot: 'allowBackorder' },
      },
      {
        key: 'oversellLimit',
        label: '最大可允许超售量',
        checked: true,
        columnProps: { width: 180, slot: 'oversellLimit' },
      },
      {
        key: 'saleableStockQty',
        label: '可售库存',
        checked: true,
        columnProps: { width: 150, sortable: true },
      },
      {
        key: 'reservedQuantity',
        label: '预占库存',
        checked: true,
        columnProps: {
          width: 150,
          tips: () =>
            h('div', '当前MSKU+库存地点+inventory_item_id对应的可用的供应链SKU的预占库存'),
          sortable: true,
        },
      },
      {
        key: 'recent4wSaleAvg',
        label: '4周销售预测均值',
        checked: true,
        columnProps: { width: 150, sortable: true },
      },
      {
        key: 'sellableDays',
        label: '可售天数',
        checked: true,
        columnProps: {
          width: 150,
          tips: () => h('div', '(店铺可用库存+最大允许超售量-未配货)/最近4周预测均值'),
          sortable: true,
        },
      },
      {
        key: 'sellableDaysWithTransit',
        label: '在库在途可售天数',
        checked: true,
        columnProps: {
          width: 180,
          tips: () => h('div', '（店铺可用库存+店铺在途库存-未配货）/最近4周预测均值'),
          sortable: true,
        },
      },
      {
        key: 'unallocatedQuantity',
        label: '未配货数量',
        checked: true,
        columnProps: { width: 150, sortable: true },
      },
      { key: 'safetyStockDays', label: '安全库存天数', checked: true, columnProps: { width: 150 } },
      {
        key: 'generalShipDeliveryDays',
        label: '普船海运周期',
        checked: true,
        columnProps: { width: 150 },
      },
      {
        key: 'stockoutTransferQuantity',
        label: '缺货数量',
        checked: true,
        columnProps: {
          width: 150,
          slots: 'stockoutTransferQuantity',
          tips: () => h('div', '未配货（减去）可用库存'),
          sortable: true,
        },
      },
      {
        key: 'transferSuggestionQuantity',
        label: '调仓建议数量',
        checked: true,
        columnProps: { width: 150, tips: () => h('div', '最近4周预测均值*30-可用库存') },
      },
      {
        key: 'stockoutAlertFlag',
        label: '缺货预警',
        checked: true,
        columnProps: { width: 150, slot: 'stockoutAlertFlag' },
      },
      {
        key: 'slowMovingAlertFlag',
        label: '呆滞预警',
        checked: true,
        columnProps: { width: 150, slot: 'slowMovingAlertFlag' },
      },
      {
        key: 'oversellAlertFlag',
        label: '超售预警',
        checked: true,
        columnProps: { width: 150, slot: 'oversellAlertFlag' },
      },
      // { key: 'pushAvailable', label: '推送数量', checked: true, columnProps: { width: 150 } },
      // { key: 'pushTime', label: '最近推送时间', checked: true, columnProps: { width: 150 } },
    ],
  },
];

// 处理出一个基础的给 table 的数据列（支持按可见字段过滤）
export const shopifyStockCustomFieldsMap = (visibleKeys?: string[]): stockCloumns[] => {
  const visibleSet = visibleKeys ? new Set(visibleKeys) : null;

  return baseShopifyStockCustomFields.flatMap((group) =>
    group.propertyArr
      // 如果传了 visibleKeys，就按 visibleKeys 过滤；否则按字段自身的 checked 作为默认显示规则
      .filter((field) => (visibleSet ? visibleSet.has(field.key) : field.checked))
      .map((field) => ({
        prop: field.key,
        label: field.label,
        ...(field as any).columnProps,
      }))
  );
};

// 用于自定义字段弹窗（KeenList），保留分组结构 + checked / readonly，与 queryCustomFieldList 消费方式兼容
export const shopifyStockCustomFields = baseShopifyStockCustomFields;

// eslint-disable-next-line import/prefer-default-export
// export const shopifyStockCustomFields = [
//   {
//     title: '基础信息',
//     propertyArr: [
//       { key: 'msku', label: 'MSKU', checked: true, readonly: true },
//       { key: 'locationCountryCode', label: '库存地点', checked: true, readonly: true },
//       { key: 'inventoryItemId', label: 'inventory_item_id', checked: true },
//       { key: 'productName', label: '产品名称', checked: true },
//       { key: 'shopAccount', label: '店铺账号', checked: true },
//       { key: 'status', label: '在售状态', checked: true },
//       { key: 'productType', label: '产品类型', checked: true },
//       { key: 'productLine', label: '品线', checked: true },
//       { key: 'productCategory', label: '品类', checked: true },
//       { key: 'tracked', label: '跟踪状态', checked: true },
//       { key: 'stockoutAlertFlag', label: '是否缺货售卖', checked: true },
//       { key: 'autoSyncStock', label: '是否同步', checked: true },
//       { key: 'productOperators', label: '运营', checked: true },
//     ],
//   },
//   {
//     title: '库存信息',
//     propertyArr: [
//       { key: 'pushAvailable', label: '推送数量', checked: true },
//       { key: 'pushTime', label: '最近推送时间', checked: true },
//       { key: 'inStockQuantitySummary', label: '在库库存', checked: true },
//       { key: 'inTransitStockQty', label: '在库在途库存', checked: true },
//       { key: 'inTransitStockQtySummary', label: '在途库存', checked: true },
//       { key: 'availableSummary', label: '可用库存', checked: true },
//       { key: 'reservedQuantitySummary', label: '预占库存', checked: true },
//       { key: 'oversellLimit', label: '最大可允许超售量', checked: true },
//       { key: 'sellableDays', label: '可售天数', checked: true },
//     ],
//   },
//   {
//     title: '仓库库存',
//     propertyArr: [
//       { key: 'warehouseName', label: '仓库', checked: true },
//       { key: 'supplySku', label: '供应链SKU', checked: true },
//       { key: 'skuAvailableMap', label: '可用库存', checked: true },
//     ],
//   },
// ];
