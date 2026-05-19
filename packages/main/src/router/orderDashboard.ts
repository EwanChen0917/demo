export default [
  // 售后管理
  {
    path: '/orderfullfillment/customer',
    meta: { title: '客户对接关系' },
    component: () =>
      import('@/views/fullfillmentDashbord/visualization/pages/customerIntegrationMapping.vue'),
    name: 'orderfullfillmentCustomer',
  },
  {
    path: '/orderfullfillment/orderVisualization',
    meta: { title: '订单履约可视化' },
    component: () =>
      import('@/views/fullfillmentDashbord/visualization/pages/orderFulfillmentVisualization.vue'),
    name: 'orderVisualization',
  },
  {
    path: '/orderfullfillment/planOrderFulfillment',
    meta: { title: '计划订单履约' },
    component: () =>
      import('@/views/fullfillmentDashbord/visualization/pages/plannerOrderFulfillment.vue'),
    name: 'planOrderFulfillment',
  },
  {
    path: '/orderfullfillment/warehouseFulfillment',
    meta: { title: '仓储订单履约' },
    component: () =>
      import('@/views/fullfillmentDashbord/visualization/pages/warehouseOrderFulfillment.vue'),
    name: 'warehouseFulfillment',
  },
  {
    path: '/orderfullfillment/logisticsOrderFulfillment',
    meta: { title: '物流订单履约' },
    component: () =>
      import('@/views/fullfillmentDashbord/visualization/pages/logisticsOrderFulfillment.vue'),
    name: 'logisticsOrderFulfillment',
  },
  {
    path: '/orderfullfillment/orderVisualizationDashboard',
    meta: { title: '订单履约可视化看板' },
    component: () =>
      import(
        '@/views/fullfillmentDashbord/visualization/pages/orderFullfillmentVisualizationDashboard.vue'
      ),
    name: 'orderFulfillmentVisualizationDashboard',
  },
];
