import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/a/a1" },
  {
    path: "/a",
    name: "A",
    component: () => import("@app/a").then((module) => module.AView),
    children: [
      {
        path: "a1",
        name: "A1",
        component: () => import("@app/a").then((module) => module.A1View),
      },
      {
        path: "a2",
        name: "A2",
        component: () => import("@app/a").then((module) => module.A2View),
      },
    ],
  },
  {
    path: "/b",
    name: "B",
    component: () => import("@app/b").then((module) => module.BView),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
