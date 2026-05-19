export default [
  {
    path: '/publicSentiment/list',
    name: 'sentimentList',
    meta: { title: '舆情列表', menuPath: ['舆情管理', '舆情列表'] },
    component: () => import('@/views/publicSentiment/sentimentList.vue'),
  },
  {
    path: '/publicSentiment/alarmOrder',
    name: 'alarmOrder',
    meta: { title: '舆情', menuPath: ['舆情管理', '报警工单'] },
    component: () => import('@/views/publicSentiment/sentimentOrder.vue'),
  },
  {
    path: '/publicSentiment/dataBoard',
    name: 'dataBoard',
    meta: { title: '舆情数据看板', menuPath: ['舆情管理', '舆情数据看板'] },
    component: () => import('@/views/publicSentiment/dataBoard.vue'),
  },
  {
    path: '/publicSentiment',
    name: 'publicSentiment',
    redirect: '/publicSentiment/list',
    meta: { hidden: true },
  },
];
