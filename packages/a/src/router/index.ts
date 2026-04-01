import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import AView from "../AView.vue";
import A1View from "../views/A1View.vue";
import A2View from "../views/A2View.vue";

export const aRoute: RouteRecordRaw = {
  path: "/a",
  name: "A",
  component: AView,
  children: [
    { path: "a1", name: "A1", component: A1View },
    { path: "a2", name: "A2", component: A2View },
  ],
};

export const createARouter = () => {
  return createRouter({
    history: createWebHashHistory(),
    routes: [{ path: "/", redirect: "/a" }, aRoute],
  });
};
