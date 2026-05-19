export default [
  {
    path: '/msrp',
    meta: { title: 'MSRP管理' },
    component: () => import('@/views/msrpManage/msrp/index.vue'),
    name: 'msrpManage',
  },
  {
    path: '/activityDiscountSchedule',
    meta: { title: '促销计划' },
    component: () => import('@/views/msrpManage/activityDiscountSchedule/index.vue'),
    name: 'activityDiscountSchedule',
  },
  {
    path: '/activityDiscountApplication',
    meta: { title: '促销计划申请' },
    component: () => import('@/views/msrpManage/activityDiscountApplication/index.vue'),
    name: 'activityDiscountApplication',
  },
  {
    path: '/priceCalculate',
    meta: { title: '定价测算' },
    component: () => import('@/views/msrpManage/priceCalculate/index.vue'),
    name: 'priceCalculate',
  },
  {
    path: '/priceCalculate/detail',
    meta: {
      title: '定价测算详情',
      activeMenu: '/priceCalculate',
    },
    component: () => import('@/views/msrpManage/priceCalculate/detail.vue'),
    name: 'priceCalculateDetail',
  },
  {
    path: '/priceCalculate/edit',
    meta: {
      title: '定价测算编辑',
      activeMenu: '/priceCalculate',
    },
    component: () => import('@/views/msrpManage/priceCalculate/edit.vue'),
    name: 'priceCalculateEdit',
  },
  {
    path: '/priceCalculate/add',
    meta: {
      title: '定价测算新增',
      activeMenu: '/priceCalculate',
    },
    component: () => import('@/views/msrpManage/priceCalculate/add.vue'),
    name: 'priceCalculateAdd',
  },
];
