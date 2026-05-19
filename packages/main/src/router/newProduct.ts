export default [
  {
    path: '/newProductAnalysis',
    meta: { title: '新品机会分析' },
    component: () => import('@/views/newProductAnalysis/index.vue'),
    name: 'newProductAnalysis',
  },
  {
    path: '/newProductAnalysis/workflowConfig',
    meta: { title: '工作流参数配置' },
    component: () => import('@/views/newProductAnalysis/workflowConfig.vue'),
    name: 'workflowConfig',
  },
  {
    path: '/newProductAnalysis/detail',
    meta: { title: '运行详情' },
    component: () => import('@/views/newProductAnalysis/detail.vue'),
    name: 'newProductAnalysisDetail',
  },
  {
    path: '/newProductAnalysis/ppt',
    meta: { title: 'ppt' },
    component: () => import('@/views/newProductAnalysis/ppt.vue'),
    name: 'newProductAnalysisPPT',
  },
  {
    path: '/newProductAnalysis/markdownPage',
    meta: { title: '文档详情' },
    component: () => import('@/views/newProductAnalysis/markdownPage.vue'),
    name: 'markdownPage',
  },
];
