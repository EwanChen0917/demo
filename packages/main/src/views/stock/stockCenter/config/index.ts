export const taskTypeConfigs = {
  POC_: {
    name: '采购创建任务',
    searchPlaceholder: '请输入采购单号、供应商名称',
    searchTypes: [
      { label: '采购单号', value: 'poNo' },
      { label: '供应商', value: 'vendor' },
      { label: '创建人', value: 'createBy' },
    ],
    additionalFilters: [
      {
        key: 'vendors',
        placeholder: '供应商',
        multiple: true,
        options: [
          { label: '佛山市顺德区锐腾电器制造股份有限公司', value: '10102' },
          { label: '深圳市路特佳成供应链有限公司', value: '10103' },
        ],
      },
      {
        key: 'destWarehouses',
        placeholder: '目的仓',
        multiple: true,
        options: [
          { label: '中仓', value: 'CK-SZ' },
          { label: '海外仓', value: 'CK-OS' },
        ],
      },
      {
        key: 'statuses',
        placeholder: '执行状态',
        multiple: true,
        options: [
          { label: '未开始', value: 'pending' },
          { label: '成功', value: 'success' },
          { label: '失败', value: 'failed' },
        ],
      },
    ],
    tableColumns: [
      { prop: 'taskNo', label: '任务单号', minWidth: 140, fixed: 'left' },
      { prop: 'taskType', label: '任务类型', minWidth: 120 },
      { prop: 'priority', label: '任务优先', minWidth: 100 },
      { prop: 'poNo', label: '采购单号', minWidth: 150 },
      { prop: 'vendor', label: '供应商', minWidth: 200 },
      { prop: 'destWarehouse', label: '目的仓', minWidth: 120 },
      { prop: 'company', label: '公司', minWidth: 150 },
      { prop: 'orderDate', label: '下单日期', minWidth: 120, sortable: true },
      { prop: 'status', label: '执行状态', minWidth: 100, slot: true },
      { prop: 'callbackStatus', label: '回传状态', minWidth: 100, slot: true },
      { prop: 'executeTime', label: '执行时间', minWidth: 150 },
    ],
    showCreateButton: false,
    tooltipContent: '采购单创建任务管理，支持查看执行状态和明细',
  },
  INBC_: {
    name: '入库通知任务',
    searchPlaceholder: '请输入入库单号、供应商名称',
    searchTypes: [
      { label: '入库单号', value: 'inboundNo' },
      { label: '供应商', value: 'vendor' },
      { label: '采购单号', value: 'poNo' },
      { label: '销售单号', value: 'soNo' },
    ],
    additionalFilters: [
      {
        key: 'vendors',
        placeholder: '供应商',
        multiple: true,
        options: [],
      },
      {
        key: 'destWarehouses',
        placeholder: '目的仓',
        multiple: true,
        options: [],
      },
      {
        key: 'statuses',
        placeholder: '执行状态',
        multiple: true,
        options: [
          { label: '未开始', value: 'pending' },
          { label: '成功', value: 'success' },
          { label: '失败', value: 'failed' },
        ],
      },
    ],
    tableColumns: [
      { prop: 'taskNo', label: '任务单号', minWidth: 140, fixed: 'left' },
      { prop: 'taskType', label: '任务类型', minWidth: 120 },
      { prop: 'priority', label: '任务优先', minWidth: 100 },
      { prop: 'inboundNo', label: '入库单号', minWidth: 150 },
      { prop: 'vendor', label: '供应商', minWidth: 200 },
      { prop: 'destWarehouse', label: '目的仓', minWidth: 120 },
      { prop: 'poNo', label: '采购单号', minWidth: 150 },
      { prop: 'soNo', label: '销售单号', minWidth: 150 },
      { prop: 'orderDate', label: '下单日期', minWidth: 120, sortable: true },
      { prop: 'status', label: '执行状态', minWidth: 100, slot: true },
      { prop: 'callbackStatus', label: '回传状态', minWidth: 100, slot: true },
      { prop: 'executeTime', label: '执行时间', minWidth: 150 },
    ],
    showCreateButton: false,
    tooltipContent: '入库通知任务管理，支持查看执行状态和明细',
  },
  RECEIVE_: {
    name: '收货任务',
    searchPlaceholder: '请输入收货单号、供应商名称',
    searchTypes: [
      { label: '收货单号', value: 'receiveNo' },
      { label: '供应商', value: 'vendor' },
    ],
    additionalFilters: [
      {
        key: 'vendors',
        placeholder: '供应商',
        multiple: true,
        options: [],
      },
      {
        key: 'destWarehouses',
        placeholder: '目的仓',
        multiple: true,
        options: [],
      },
      {
        key: 'statuses',
        placeholder: '执行状态',
        multiple: true,
        options: [
          { label: '未开始', value: 'pending' },
          { label: '成功', value: 'success' },
          { label: '失败', value: 'failed' },
        ],
      },
    ],
    tableColumns: [
      { prop: 'taskNo', label: '任务单号', minWidth: 140, fixed: 'left' },
      { prop: 'taskType', label: '任务类型', minWidth: 120 },
      { prop: 'priority', label: '任务优先', minWidth: 100 },
      { prop: 'receiveNo', label: '收货单号', minWidth: 150 },
      { prop: 'vendor', label: '供应商', minWidth: 200 },
      { prop: 'destWarehouse', label: '目的仓', minWidth: 120 },
      { prop: 'orderDate', label: '下单日期', minWidth: 120, sortable: true },
      { prop: 'status', label: '执行状态', minWidth: 100, slot: true },
      { prop: 'executeTime', label: '执行时间', minWidth: 150 },
    ],
    showCreateButton: false,
    tooltipContent: '收货任务管理，支持查看执行状态和明细',
  },
  SN_: {
    name: 'SN码回传任务',
    searchPlaceholder: '请输入SN码、产品SKU',
    searchTypes: [
      { label: 'SN码', value: 'snCode' },
      { label: '产品SKU', value: 'sku' },
      { label: '供应链SKU', value: 'scSku' },
    ],
    additionalFilters: [
      {
        key: 'statuses',
        placeholder: '执行状态',
        multiple: true,
        options: [
          { label: '未开始', value: 'pending' },
          { label: '成功', value: 'success' },
          { label: '失败', value: 'failed' },
        ],
      },
    ],
    tableColumns: [
      { prop: 'taskNo', label: '任务单号', minWidth: 140, fixed: 'left' },
      { prop: 'taskType', label: '任务类型', minWidth: 120 },
      { prop: 'priority', label: '任务优先', minWidth: 100 },
      { prop: 'snCode', label: 'SN码', minWidth: 150 },
      { prop: 'sku', label: '产品SKU', minWidth: 150 },
      { prop: 'scSku', label: '供应链SKU', minWidth: 150 },
      { prop: 'orderDate', label: '下单日期', minWidth: 120, sortable: true },
      { prop: 'status', label: '执行状态', minWidth: 100, slot: true },
      { prop: 'executeTime', label: '执行时间', minWidth: 150 },
    ],
    showCreateButton: false,
    tooltipContent: 'SN码回传任务管理，支持查看执行状态和明细',
  },
};

export const STOCK_MISSION_TYPE = [
  { label: '采购创建', value: '1' },
  { label: '采购更新', value: '2' },
  { label: '采购关闭', value: '3' },
];

export const STOCK_EXECUTE_TYPE = [
  { label: '未开始', value: '1' },
  { label: '成功', value: '2' },
  { label: '失败', value: '3' },
];
export const STOCK_TYPE = [
  { label: '三方仓', value: 'THIRD' },
  { label: '自营仓', value: 'SELF' },
  { label: '平台仓', value: 'PLATFORM' },
];
export const SKU_TYPE = [
  { label: '产品SKU', value: 'productSku' },
  { label: '供应链SKU', value: 'supplySku' },
];
export const ORDERNUMBER_TYPE = [
  { label: '销售单号', value: 'saleOrderNumber' },
  { label: '采购单号', value: 'buyOrderNumber' },
  { label: '入库单号', value: 'receivingNumber' },
];
export const searchPrepend = {
  stockSearchTypes: [
    // {
    //   label: '分配池编码',
    //   value: 'poolCodeList',
    // },
    {
      label: '产品SKU',
      value: 'skuCodeList',
    },
    {
      label: '供应链SKU',
      value: 'supplySkuList',
    },
    {
      label: '产品名称',
      value: 'skuNameList',
    },
    // {
    //   label: '仓库编码',
    //   value: 'warehouseCodeList',
    // },
  ],
  availableStockSearchTypes: [
    // {
    //   label: '分配池',
    //   value: 'poolCodeList',
    // },
    {
      label: '产品SKU',
      value: 'skuCodeList',
    },
    {
      label: '供应链SKU',
      value: 'supplySkuList',
    },
    // {
    //   label: '仓库编码',
    //   value: 'warehouseCodeList',
    // },
  ],
  inventoryBookSearchTypes: [
    {
      label: '入库单号',
      value: 'inboundNo',
    },
    {
      label: '采购单号',
      value: 'poNumber',
    },
  ],
  purchaseOrderTypes: [
    {
      label: '产品SKU',
      value: 'skuCodeList',
    },
    {
      label: '供应链SKU',
      value: 'supplySkuList',
    },
    {
      label: '供应商',
      value: 'supplierCodeList',
    },
  ],
};
