export default [
  {
    prop: 'inStockQuantitySummary',
    label: '在库库存',
    minWidth: 150,

    tips: <div>当前MSKU+库存地点+inventory_item_id对应的实体仓库的供应链SKU的可用+预占库存</div>,
  },
  {
    prop: 'inTransitStockQty',
    label: '在库在途库存',
    minWidth: 150,

    tips: <div>当前MSKU+库存地点+inventory_item_id对应的实体仓库的供应链SKU的在库+在途库存</div>,
  },
  {
    prop: 'inTransitStockQtySummary',
    label: '在途库存',
    minWidth: 150,

    tips: <div>当前MSKU+库存地点+inventory_item_id对应的实体仓库的供应链SKU的在途库存</div>,
  },
  {
    prop: 'availableSummary',
    label: '可用库存',
    minWidth: 150,

    tips: <div>当前MSKU+库存地点+inventory_item_id对应的可用的供应链SKU的可用库存</div>,
  },

  {
    prop: 'reservedQuantitySummary',
    label: '预占库存',
    minWidth: 150,
    tips: <div>当前MSKU+库存地点+inventory_item_id对应的可用的供应链SKU的预占库存</div>,
  },
];
