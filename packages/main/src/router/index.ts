import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { aRoute } from '@app/a';
import { bRoute } from '@app/b';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
  aRoute,
  bRoute,
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
