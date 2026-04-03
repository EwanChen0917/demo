import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

export const bRoute: RouteRecordRaw = {
  path: '/b',
  name: 'B',
  component: () => import('../BView.vue'),
};

export const createBRouter = () => {
  return createRouter({
    history: createWebHashHistory(),
    routes: [{ path: '/', redirect: '/b' }, bRoute],
  });
};
