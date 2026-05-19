export default [
  // 报关管理
  {
    path: '/customsClearanceProduct',
    meta: { title: '报关产品' },
    component: () => import('@/views/customsClearance/product/index.vue'),
    name: 'customsClearanceProduct',
  },
  {
    path: '/customsClearanceElement',
    meta: { title: '报关要素' },
    component: () => import('@/views/customsClearance/element/index.vue'),
    name: 'customsClearanceElement',
  },
  {
    path: '/customsClearanceSubject',
    meta: { title: '报关主体' },
    component: () => import('@/views/customsClearance/subject/index.vue'),
    name: 'customsClearanceSubject',
  },
  {
    path: '/customsClearanceWarehouse',
    meta: { title: '报关入库' },
    component: () => import('@/views/customsClearance/warehouse/index.vue'),
    name: 'customsClearanceWarehouse',
  },
];
