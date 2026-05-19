export default [
  {
    path: '/fiveLevelMenu',
    meta: { title: '五级菜单' },
    component: () => import('@/views/goodscenter/goodsmanage/goodsdetail/index.vue'),
    name: 'fiveLevelMenu',
  },
  {
    path: '/fiveLevelMenuTwo',
    meta: { title: '五级菜单二' },
    component: () => import('@/views/goodscenter/goodsmanage/skugroup/index.vue'),
    name: 'fiveLevelMenuTwo',
  },
];
