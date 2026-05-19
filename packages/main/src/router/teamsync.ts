export default [
  // 供应链管理 - 效率工具
  {
    path: '/teamsync/privacy',
    meta: { title: 'Team Sync 隐私政策' },
    component: () => import('@/views/teamsync/privacy.vue'),
    name: 'teamsyncPrivacy',
  },
];
