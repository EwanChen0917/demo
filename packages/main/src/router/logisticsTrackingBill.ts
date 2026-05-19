export default [
  {
    path: '/fbaTrackingBill',
    meta: { title: 'FBA物流头程账单确认' },
    component: () => import('@/views/logisticsTrackingBill/fbaTrackingBill/index.vue'),
    name: 'fbaTrackingBill',
  },
];
