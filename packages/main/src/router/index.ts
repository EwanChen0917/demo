import { createRouter as createVueRouter, createWebHistory } from 'vue-router';
import constainRoute from './constantRoutes';

const router: any = createRouter();
function createRouter() {
  return createVueRouter({
    history: createWebHistory(),
    routes: [...constainRoute],
    scrollBehavior() {
      return { left: 0, top: 0 };
    },
  });
}
export function resetRouter() {
  const newRouter: any = createRouter();
  router.matcher = newRouter.matcher; // the relevant part
}
const obj: any = {};
function generateRouteMap(routes) {
  routes.forEach((route: any) => {
    if (route.children && route.children.length) {
      generateRouteMap(route.children);
    } else {
      obj[route.name] = {
        path: route.path,
        activeMenu: route.meta.activeMenu,
      };
    }
  });
}
generateRouteMap(constainRoute[1].children);
export const routeMap = obj;
export default router;
