export default [
  // 决策
  {
    path: '/bi/decisionAnalysis',
    meta: { title: '决策' },
    component: () => import('@/views/bi/decisionAnalysis/index.vue'),
    name: 'decisionAnalysis',
  },
  {
    path: '/bi/PMBoard',
    meta: { title: '产品经理看板' },
    component: () => import('@/views/bi/PMBoard/index.vue'),
    name: 'PMBoard',
  },
  {
    path: '/bi/PMDashboard',
    meta: { title: '产品经理驾驶舱' },
    component: () => import('@/views/bi/PDashboard/index.vue'),
    name: 'PMDashboard',
  },
  {
    path: '/bi/ad',
    meta: { title: '全渠道广告分析' },
    component: () => import('@/views/bi/ad/index.vue'),
    name: 'ad',
  },
  {
    path: '/bi/budgetAchieving',
    meta: { title: '周报&本月目标达成' },
    component: () => import('@/views/bi/budgetAchieving/index.vue'),
    name: 'budgetAchieving',
  },
  {
    path: '/bi/voc',
    meta: { title: 'VOC分析', hidden: true },
    component: () => import('@/views/bi/voc/index.vue'),
    name: 'BiVoc',
  },
];
