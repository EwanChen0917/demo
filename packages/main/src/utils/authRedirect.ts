/**
 * 登录跳转工具（与 permission 守卫中的 redirect 规则保持一致）
 *
 * 注意：axios 拦截器里没有 Vue Router，只能用 location 整页跳转；
 * 守卫里用 router next(路径)，二者最终 URL 应相同，避免「接口踢下线」和「前端无 token」行为不一致。
 */

/**
 * 登录页地址：非 /login 时在 query 上带 redirect，登录成功后可回到原页。
 * 已在 /login 时不重复带 redirect，防止 redirect 再指向 /login 形成嵌套。
 */
export function loginUrl(fullPath: string): string {
  if (fullPath === '/login' || fullPath.startsWith('/login?')) {
    return '/login';
  }
  return `/login?redirect=${encodeURIComponent(fullPath)}`;
}

/** 整页跳转到登录页，redirect 为当前浏览器地址（用于 401、token 失效码等） */
export function goLogin(): void {
  const fullPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.location.href = loginUrl(fullPath);
}
