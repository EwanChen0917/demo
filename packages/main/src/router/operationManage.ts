export default [
  // 运营管理-商品到期策略
  {
    path: '/tkweeklyanalysis',
    meta: {
      title: 'TK小店周报分析',
      menuPath: ['TikTok周报'],
    },
    component: () => import('@/views/operationManage/tkweekly/analysis.vue'),
    name: 'tkweeklyanalysis',
  },
  {
    path: '/tkweeklyexpert',
    meta: {
      title: '机构达人表现',
      menuPath: ['TikTok周报'],
    },
    component: () => import('@/views/operationManage/tkweekly/expert.vue'),
    name: 'tkweeklyexpert',
  },
  {
    path: '/tkweeklyad',
    meta: {
      title: 'TK广告明细表现',
      menuPath: ['TikTok周报'],
    },
    component: () => import('@/views/operationManage/tkweekly/ad.vue'),
    name: 'tkweeklyad',
  },
  {
    path: '/tkweeklymsku',
    meta: {
      title: '广告映射店铺SKU',
      menuPath: ['TikTok周报'],
    },
    component: () => import('@/views/operationManage/tkweekly/msku.vue'),
    name: 'tkweeklymsku',
  },
];
