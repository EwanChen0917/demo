import { platformApi } from '@/api';

const map = new Map();

export function getMenus(platform: string) {
  if (map.has(platform)) {
    return Promise.resolve(map.get(platform));
  }
  return platformApi
    .platformMenuQueryMenuTree({
      platform,
      // filterStatus: 0,
    })
    .then((res) => {
      map.set(platform, res.menuList);
      return res.menuList;
    });
}
