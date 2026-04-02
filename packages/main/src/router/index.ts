import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { aRoute } from "@app/a/router";
import { bRoute } from "@app/b/router";
import HomeView from "@/views/HomeView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: HomeView },
  aRoute,
  bRoute,
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
