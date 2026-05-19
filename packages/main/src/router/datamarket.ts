export default [
  // 数据集市
  {
    path: '/datamarketReport',
    meta: { title: '数据报表', menuPath: ['数据集市'] },
    component: () => import('@/views/datamarket/report/index.vue'),
    name: 'datamarketReport',
  },
  {
    path: '/datamarketTag',
    meta: { title: '标签管理', menuPath: ['数据集市'] },
    component: () => import('@/views/datamarket/base/tag/index.vue'),
    name: 'datamarketTag',
  },
  {
    path: '/dataSheetManage',
    meta: { title: '数据表管理' },
    component: () => import('@/views/datamarket/base/dataSheetManage/index.vue'),
    name: 'dataSheetManage',
  },
  {
    path: '/dashboardManage',
    meta: { title: '看板管理' },
    component: () => import('@/views/datamarket/base/dashboardManage/index.vue'),
    name: 'dashboardManage',
  },
];
