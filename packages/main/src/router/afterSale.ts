export default [
  // 售后管理
  {
    path: '/afterSaleOrder',
    meta: { title: '售后订单' },
    component: () => import('@/views/afterSale/order/index.vue'),
    name: 'afterSaleOrder',
  },

  {
    path: '/aiLabel',
    meta: { title: 'AI标签列表' },
    component: () => import('@/views/afterSale/aiLabel/index.vue'),
    name: 'aiLabel',
  },
  {
    path: '/vocLabelGroup',
    meta: { title: 'VOC标签组' },
    component: () => import('@/views/afterSale/vocLabelGroup/index.vue'),
    name: 'vocLabelGroup',
  },
];
