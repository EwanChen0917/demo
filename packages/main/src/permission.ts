import nprogress from 'nprogress';
import router from '@/router';
// @ts-ignore
import 'nprogress/nprogress.css';
import pinia from '@/store';
import { useStore } from '@/store/modules/useStore';
import { App } from 'vue';
import { checkPermission } from '@/utils/permission';
import { loginUrl } from '@/utils/authRedirect';

const userStore = useStore(pinia);
nprogress.configure({ showSpinner: false });
const whiteList = ['/teamsync', '/fastAuth', '/supplierRegister'];

/** 有 token 且权限校验通过则放行，否则 404 */
function navigateTo(to: any, _: any, next: any) {
  if (
    to.name === '404' ||
    (to.name !== 'frame' && checkPermission(to.name)) ||
    (to.name === 'frame' && userStore?.menuNameMap[to?.params?.menuCode])
  ) {
    next();
  } else {
    next('/404');
  }
}

/**
 * 未登录 / 会话已失效：已在登录页则 next()，否则跳到带 redirect 的登录页（与 goLogin() 拼出的 URL 一致）
 */
function guestNext(to: any, next: any) {
  if (to.path === '/login') {
    next();
  } else {
    next(loginUrl(to.fullPath));
  }
}

/**
 * 已确认登录态：访问 /login 时按业务回到 redirect 或首页；其它路由走菜单权限
 */
function userNext(to: any, next: any) {
  if (to.path === '/login') {
    if (to.query.redirect) {
      next(to.query.redirect as string);
    } else {
      next('/');
    }
  } else {
    navigateTo(to, null, next);
  }
}

// 白名单直过；有 token 则补全用户信息后按权限放行；无 token 或拉用户信息失败则 guestNext（与 axios 里 goLogin 同源规则）
router.beforeEach(async (to: any, _: any, next: any) => {
  const { token, isLogin, systemUpdateFlag } = userStore;
  if (systemUpdateFlag) {
    userStore.systemUpdateFlag = false;
    next();
    window.location.href = to.path;
    return;
  }
  nprogress.start();
  if (whiteList.some((item) => to.path.includes(item))) {
    return next();
  }
  if (token) {
    document.title = (to.meta?.title as any) || 'Cozy Power by Momcozy';
    if (isLogin) {
      userNext(to, next);
    } else {
      try {
        await userStore.getUserInfo();
        userNext(to, next);
      } catch (error) {
        guestNext(to, next);
      }
    }
  } else {
    guestNext(to, next);
  }
});
router.afterEach(() => {
  nprogress.done();
});
export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
export default router;
