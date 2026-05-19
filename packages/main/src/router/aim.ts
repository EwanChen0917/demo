export default [
  {
    path: '/aim',
    name: 'aim',
    meta: { title: '视频素材管理' },
    component: () => import('@/views/aim/index.vue'),
  },
  {
    path: '/aiGenImage',
    name: 'aiGenImage',
    meta: { title: 'AI广告创意及素材管理' },
    component: () => import('@/views/aiGenImage/index.vue'),
  },
];
