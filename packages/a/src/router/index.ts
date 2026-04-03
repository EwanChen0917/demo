import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

export const aRoute: RouteRecordRaw = {
  path: '/a',
  name: 'A',
  component: () => import('../AView.vue'),
  children: [
    { path: 'a1', name: 'A1', component: () => import('../views/A1View.vue') },
    { path: 'a2', name: 'A2', component: () => import('../views/A2View.vue') },
  ],
};

export const createARouter = () => {
  return createRouter({
    history: createWebHashHistory(),
    routes: [{ path: '/', redirect: '/a' }, aRoute],
  });
};
