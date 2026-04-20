import Cookies from 'js-cookie';
/**
 * 配置浏览器本地存储的方式，可直接存储对象数组。
 */
function getRootDomain(url) {
  const parsedUrl = new URL(url);
  const { hostname } = parsedUrl;
  // 检查是否为IP地址
  const isIpAddress = /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);
  if (isIpAddress) {
    return hostname;
  }
  const domainParts = hostname.split('.');
  const rootDomain = domainParts.slice(Math.max(domainParts.length - 2, 0)).join('.');
  return rootDomain;
}
export function setCookieToken(token: string, expires?: number) {
  Cookies.set(`AUTH-${import.meta.env.VITE_ENV}-TOKEN`, token, {
    domain: `.${getRootDomain(window.location.href)}`,
    expires: expires || 20,
  });
  // if (import.meta.env.VITE_ENV === 'DEV') {
  //   Cookies.set(`AUTH-${import.meta.env.VITE_ENV}-TOKEN`, token, { expires: expires || 20 });
  // } else if (import.meta.env.VITE_ENV === 'TEST') {
  //   Cookies.set(`AUTH-${import.meta.env.VITE_ENV}-TOKEN`, token, {
  //     domain: '.luteos.site',
  //     expires: expires || 20,
  //   });
  // } else if (import.meta.env.VITE_ENV === 'PROD') {
  //   Cookies.set(`AUTH-${import.meta.env.VITE_ENV}-TOKEN`, token, {
  //     domain: '.luteos.com',
  //     expires: expires || 20,
  //   });
  // }
}
export function getCookieToken() {
  return Cookies.get(`AUTH-${import.meta.env.VITE_ENV}-TOKEN`);
}
/** 仅清除 token Cookie；跳登录用 goLogin()，主动登出回首页见 store logOut */
export function removeCookieToken() {
  Cookies.remove(`AUTH-${import.meta.env.VITE_ENV}-TOKEN`);
  Cookies.remove(`AUTH-${import.meta.env.VITE_ENV}-TOKEN`, {
    domain: `.${getRootDomain(window.location.href)}`,
  });
}
