export default [
  // 采购订单
  {
    path: '/purchaseOrder',
    meta: { title: '采购订单' },
    component: () => import('@/views/purchase/order/index.vue'),
    name: 'purchaseOrderManagement',
  },
  {
    path: '/purchaseOrderList',
    meta: { title: '采购订单明细' },
    component: () => import('@/views/purchase/orderList/index.vue'),
    name: 'purchaseOrderList',
  },
];
