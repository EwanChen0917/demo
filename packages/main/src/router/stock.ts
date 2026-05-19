export default [
  // 积加
  {
    path: '/productStock',
    meta: { title: '产品库存' },
    component: () => import('@/views/stock/jjStockSync/productStock/index.vue'),
    name: 'productStock',
  },
  {
    path: '/jjFbaStock',
    meta: { title: '积加fba库存' },
    component: () => import('@/views/stock/jjStockSync/fbaStock/index.vue'),
    name: 'jjFbaStock',
  },
  {
    path: '/walmartStock',
    meta: { title: 'walmart库存' },
    component: () => import('@/views/stock/jjStockSync/walmartStock/index.vue'),
    name: 'walmartStock',
  },
  {
    path: '/tripartiteStock',
    meta: { title: '三方库存' },
    component: () => import('@/views/stock/jjStockSync/tripartiteStock/index.vue'),
    name: 'tripartiteStock',
  },
  // 平台-fbt库存
  {
    path: '/fbtStock',
    meta: { title: 'FBA库存' },
    component: () => import('@/views/stock/platformStockSync/index.vue'),
    name: 'fbtStock',
  },
  // 计划业务库存
  {
    path: '/planCenterStock',
    meta: { title: '中仓库存' },
    component: () => import('@/views/stock/planBusinessSync/centerStock/index.vue'),
    name: 'planCenterStock',
  },
  {
    path: '/planFbaStock',
    meta: { title: 'fba库存' },
    component: () => import('@/views/stock/planBusinessSync/fbaStock/index.vue'),
    name: 'planFbaStock',
  },
  {
    path: '/planShopifyStock',
    meta: { title: 'shopify库存' },
    component: () => import('@/views/stock/planBusinessSync/shopifyStock/index.vue'),
    name: 'planShopifyStock',
  },

  {
    path: '/planWalmartStock',
    meta: { title: 'walmart库存' },
    component: () => import('@/views/stock/planBusinessSync/walmartStock/index.vue'),
    name: 'planWalmartStock',
  },
  {
    path: '/planTiktokStock',
    meta: { title: 'tikTok库存' },
    component: () => import('@/views/stock/planBusinessSync/tiktokStock/index.vue'),
    name: 'planTiktokStock',
  },
  {
    path: '/planRetailStock',
    meta: { title: '零售与渠道库存' },
    component: () => import('@/views/stock/planBusinessSync/retailStock/index.vue'),
    name: 'planRetailStock',
  },
  {
    path: '/thirdInventorySync',
    meta: { title: '三方仓同步库存' },
    component: () => import('@/views/stock/thirdStock/thirdInventorySync/index.vue'),
    name: 'thirdInventorySync',
  },
  {
    path: '/inventoryDiscrepancyHandle',
    meta: { title: '库存差异处理' },
    component: () => import('@/views/stock/thirdStock/InventoryDiscrepancyHandle/index.vue'),
    name: 'inventoryDiscrepancyHandle',
  },
  {
    path: '/taskDocumentManagement',
    meta: { title: '任务单据管理' },
    component: () => import('@/views/stock/stockCenter/taskDocumentManagement/index.vue'),
    name: 'taskDocumentManagement',
  },
  {
    path: '/stockQuery',
    meta: { title: '库存查询' },
    component: () => import('@/views/stock/stockCenter/stockQuery/index.vue'),
    name: 'stockQuery',
  },
  {
    path: '/taskManagement',
    meta: { title: '任务列表管理' },
    component: () => import('@/views/stock/stockCenter/taskManagement/index.vue'),
    name: 'taskManagement',
  },
  {
    path: '/stockPoolManagement',
    meta: { title: '库存分配池管理' },
    component: () => import('@/views/stock/stockCenter/stockPool/stockPool.vue'),
    name: 'stockPoolManagement',
  },
  {
    path: '/stockPoolManagement/owner',
    meta: { title: '库存分配池货权管理' },
    component: () => import('@/views/stock/stockCenter/stockPool/stockPoolOwnership.vue'),
    name: 'stockPoolOwnerManagement',
  },
  // {
  //   path: '/preAllocate',
  //   meta: { title: '预占释放任务查询' },
  //   component: () => import('@/views/stock/stockCenter/preAllocate/index.vue'),
  //   name: 'preAllocate',
  // },
  {
    path: '/shopifyStock/shippableSku',
    meta: { title: '可发货SKU' },
    component: () => import('@/views/stock/shopifyStock/page/shopifyShippableSku.vue'),
    name: 'shopifyShippableSku',
  },
  {
    path: '/shopifyStock/stockSyncLog',
    meta: { title: 'shopify库存同步' },
    component: () => import('@/views/stock/shopifyStock/page/shopifyStockSync.vue'),
    name: 'shopifyStockSync',
  },
  {
    path: '/shopifyStock/shopifyStockLocation',
    meta: { title: 'shopify库存地点' },
    component: () => import('@/views/stock/shopifyStock/page/shopifyStockLocation.vue'),
    name: 'shopifyStockLocation',
  },
  {
    path: '/warehousedata',
    meta: { title: '仓库列表' },
    component: () => import('@/views/stock/baseInfo/warehouseData/index.vue'),
    name: 'warehouseData',
  },
  {
    path: '/stock/stockDifference/snapshot',
    meta: { title: '库存快照数据' },
    component: () => import('@/views/stock/stockDifference/page/stockDifferenceSnapshot.vue'),
    name: 'stockDifferenceSnapshot',
  },
  {
    path: '/stock/stockDifference/report',
    meta: { title: '中仓库存差异报表' },
    component: () => import('@/views/stock/stockDifference/page/stockDifferenceReport.vue'),
    name: 'stockDifferenceReport',
  },
  {
    path: '/stock/stockDifference/handle',
    meta: { title: '库存差异处理' },
    component: () => import('@/views/stock/stockDifference/page/stockDifferenceHandle.vue'),
    name: 'stockDifferenceHandle',
  },
  {
    path: '/stock/transferorder',
    meta: { title: '调拨计划单' },
    component: () => import('@/views/stock/transferOrdersManage/page/index.vue'),
    name: 'stockTransferOrderManage',
  },
];
