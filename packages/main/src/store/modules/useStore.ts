import { defineStore } from 'pinia';
import { logoutApi } from '@/apis/login';
import { useCache } from '@/hooks/web/useCache';
import { mdpMemberApi, memberApi, platformApi } from '@/api';
import { ElMessage } from 'element-plus';
import { getCookieToken, removeCookieToken } from '@/hooks/web/useCookie';
import { MemberCollectBean } from '@/api/member/data-contracts';
import { clearArmsUser, syncArmsUser } from '@/arms';

const { wsCache } = useCache('localStorage');

export type useStoreState = {
  isLogin: boolean;
  token: string | null;
  userInfo: {
    syncRsult: 0 | 1;
    avatar: string | null;
    email: string | null;
    memberCode: string | number | null;
    name: string;
    nickname: string | number | null;
    stateCode: string | number | null;
    token?: string | null;
    rootDeptId?: string | number;
    lastMenu?: string | number;
    source?: string | number;
    superAdmin?: string;
    unDefaultSystemFlag?: number;
    superAdminInRoleManagerMenu?: boolean;
    title?: string;
  };
  nativeMenus: any[];
  totalThirdMenus: any[];
  totalThirdFiveMenus: any[];
  menuCodeMap: { [key: string]: string };
  menuNameMap: { [key: string]: string };
  authList: string[];
  menuCollapse: boolean;
  collectList: MemberCollectBean[];
  fullscreen: boolean;
  systemUpdateFlag?: boolean;
};
type useStoreGetters = {
  getInfo?: (state: useStoreState) => any;
  getTotalMenus: (state: useStoreState) => any[];
  getTotalThirdMenus: (state: useStoreState) => any[];
  getTotalThirdFiveMenus: (state: useStoreState) => any[];
};

type useStoreAction = {
  getUserInfo: () => void;
  setUserInfo: (data: any) => void;
  getMenus: () => Promise<any>;
  doWorkerTask: () => void;
  login: (data: any) => void;
  logOut: () => void;
  toggleMenuCollapse: () => void;
  getCollectList: () => void;
  changeCollectFlag: (menuCode: string) => void;
  toggleFullscreen: () => void;
  getThirdMenus: (menus: any[]) => void;
  getThirdFiveMenus: (menus: any[]) => void;
};

const getMenuCodeMap = (totalMenus) => {
  const result = {};
  const setMap = (menus) => {
    for (const menu of menus) {
      if (menu.componentName) result[menu.componentName] = menu.menuCode;
      if (menu.children && Array.isArray(menu.children)) {
        setMap(menu.children);
      }
    }
  };
  setMap(totalMenus);
  return result;
};
const getMenuNameMap = (totalMenus) => {
  const result = {};
  const setMap = (menus) => {
    for (const menu of menus) {
      if (menu?.menuType === 'iframe') {
        result[menu.menuCode] = menu.name;
      } else {
        result[menu.componentName] = menu.name;
      }
      if (menu.children && Array.isArray(menu.children)) {
        setMap(menu.children);
      }
    }
  };
  setMap(totalMenus);
  return result;
};
export const useStore = defineStore<string, useStoreState, useStoreGetters, useStoreAction>(
  'useStoreId',
  {
    state: () => {
      return {
        isLogin: false,
        token: getCookieToken(),
        userInfo: {
          syncRsult: 0,
          avatar: '',
          email: '',
          memberCode: '',
          name: '',
          nickname: '',
          stateCode: '',
          token: '',
          rootDeptId: '',
          lastMenu: '',
          superAdmin: '',
          source: 0,
          unDefaultSystemFlag: 0,
        },
        nativeMenus: [],
        totalThirdMenus: [],
        totalThirdFiveMenus: [],
        menuCodeMap: {},
        menuNameMap: {},
        authList: [],
        collectList: [],
        menuCollapse: wsCache.get('menuCollapse') || false,
        fullscreen: false,
        systemUpdateFlag: false,
      };
    },
    getters: {
      getInfo: (state) => {
        return state.userInfo;
      },
      getTotalMenus: (state) => {
        return state.nativeMenus;
      },
      isSuperAdmin: (state) => {
        return !!state.userInfo?.superAdmin;
      },
      getTotalThirdMenus: (state) => {
        return state.totalThirdMenus;
      },
      getTotalThirdFiveMenus: (state) => {
        return state.totalThirdFiveMenus;
      },
    },
    actions: {
      async login(data: any, isDD = true) {
        const res = await (isDD
          ? memberApi.luteosMemberAuthCallback(data)
          : memberApi.luteosMemberLogin(data));
        this.userInfo = {
          ...res,
        };
        syncArmsUser(res);
        this.isLogin = false;
        this.token = res.token as string;
        wsCache.set('userInfo', res);
        wsCache.set('token', res.token);
      },
      async getUserInfo() {
        const res = await memberApi.luteosMemberQueryCurrentUserInfo();
        this.userInfo = res || {};
        syncArmsUser(res);
        wsCache.set('userInfo', res);
        this.isLogin = true;
        await this.getMenus();
        await this.getCollectList();
      },
      setUserInfo(data: any) {
        this.userInfo = {
          ...data,
        };
        syncArmsUser(data);
      },
      async getMdpToken() {
        const mdpTokenStr = wsCache.get('mdpToken') || '';
        const [erpToken, mdpToken, tokenTime] = mdpTokenStr?.split('###') || [];
        if (mdpToken && erpToken === this.token && +tokenTime > Date.now()) {
          try {
            return mdpToken;
          } catch {
            // continue
          }
        }
        const code = await memberApi.luteosMemberQueryMdpCode();
        if (!code?.mdpSsoCode) {
          return Promise.reject(new Error('登录失败'));
        }
        const isLocalhost = false && window.location.hostname === 'localhost';
        let result;
        if (isLocalhost) {
          result = {
            token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJDb2RlIjoiMC1NMzA0NDY5MjQ2MzIwMzQ3ODc2LU0zMDQ0NjkyNDYzMjAzNDc4NzYiLCJpc3MiOiJsdXRlb3MiLCJleHAiOjE3NzI1MDMwOTIsImlhdCI6MTc3MTg5ODI5MiwianRpIjoiMjE5MSJ9.QgXHwGqN2_lxuqoHzZvVU9KpTsn1Enx8_sBS3K1TziQ',
          };
        } else {
          result = await mdpMemberApi.luteosMemberTokenExchange(
            {
              code: code.mdpSsoCode,
              source: 'ERP',
            },
            {
              baseURL: import.meta.env.VITE_CRM_BASE_URL,
            }
          );
        }
        const { token } = result;
        if (token) {
          wsCache.set('mdpToken', `${this.token}###${token}###${Date.now() + 30 * 60 * 1000}`);
          return token;
        }
        return Promise.reject(new Error('登录失败'));
      },
      getMenus() {
        return new Promise((resolve, reject) => {
          platformApi
            .platformMenuQueryMenuTree({ platform: 'lute_erp' })
            .then((res) => {
              if (res) {
                // res.authList=res.authList.filter((item: any) => item !== 'homeDashboard');
                // res.menuAuthList = res.menuAuthList.filter((item: any) => item !== 'homeDashboard' );
                // res.menuList = res.menuList.filter((item: any) => item.componentName !== 'homeDashboard' && item.name !== '统计' );
                // console.log(res)

                this.authList = [...(res.authList || [])];
                const totalMenus = [...(res.menuList || [])];
                if (totalMenus.length > 0) {
                  this.nativeMenus = totalMenus;
                  this.getThirdMenus(totalMenus);
                  this.getThirdFiveMenus(totalMenus);
                  this.menuCodeMap = getMenuCodeMap(totalMenus);
                  this.menuNameMap = getMenuNameMap(totalMenus);
                  resolve(totalMenus);
                } else {
                  ElMessage.error('用户菜单权限为空');
                  // reject(new Error('用户菜单权限为空'));
                  resolve({});
                }
              }
            })
            .catch((err) => {
              ElMessage.error('获取用户权限失败');
              reject(err);
            });
        });
      },
      async getCollectList() {
        const res = await memberApi.luteosMemberQueryMemberCollectList({
          collectScene: 'menu',
          source: 'lute_erp',
        });
        this.collectList = res.memberCollectList;
      },
      changeCollectFlag(menuCode: string) {
        const toggle = (menus: any[]): boolean => {
          for (const menu of menus) {
            if (menu.menuCode === menuCode) {
              menu.collectFlag ^= 1;
              return true;
            }
            if (menu.children?.length && toggle(menu.children)) return true;
          }
          return false;
        };
        toggle(this.nativeMenus);
        this.getCollectList();
      },
      async logOut() {
        const res = await logoutApi();
        if (+res.code === 200) {
          this.isLogin = false;
          this.token = null;
          this.userInfo = {
            avatar: '',
            email: '',
            memberCode: '',
            name: '',
            nickname: '',
            stateCode: '',
            token: '',
            rootDeptId: '',
          };
          clearArmsUser();
          this.nativeMenus = [];
          this.totalThirdMenus = [];
          this.totalThirdFiveMenus = [];
          wsCache.delete('userInfo');
          wsCache.delete('token');
          removeCookieToken();
          // 主动登出：回首页（与「会话失效 goLogin」区分，不强制进登录页）
          window.location.href = '/';
          // 不用清理其他数据，登录有记住密码功能
          // wsCache.clear();
        }
        // return new Promise((resolve, reject) => {

        //     .then((res: any) => {
        //       if (res.code === 200) {
        //         this.isLogin = false;
        //         this.token = null;
        //         this.userInfo = {
        //           avatar: '',
        //           email: '',
        //           memberCode: '',
        //           name: '',
        //           nickname: '',
        //           stateCode: '',
        //           token: '',
        //           rootDeptId: '',
        //         };
        //         this.nativeMenus = [];
        //         this.currentMenu = [];
        //         this.totalProject = [];
        //         wsCache.delete('userInfo');
        //         wsCache.delete('token');
        //         wsCache.clear();
        //         resolve(res);
        //       }
        //     })
        //     .catch((err) => {
        //       reject(err);
        //     });
        // });
      },
      doWorkerTask() {
        // initNoticeWorker(this.token as string);
      },
      toggleMenuCollapse() {
        console.log('toggleMenuCollapse');
        this.menuCollapse = !this.menuCollapse;
        console.log(this.menuCollapse);
        wsCache.set('menuCollapse', this.menuCollapse);
      },
      toggleFullscreen() {
        this.fullscreen = !this.fullscreen;
      },
      getThirdMenus(menus: Record<string, any>[], _currentLevel?: number) {
        const thirdLevelMenus: Record<string, any>[] = [];

        if (!Array.isArray(menus)) {
          return thirdLevelMenus;
        }

        const collectThirdLevelNodes = (node: Record<string, any>, currentLevel: number) => {
          if (!node || typeof currentLevel !== 'number') {
            return;
          }

          node._calcLevel = currentLevel;

          if (currentLevel === 3) {
            if (!node.children?.length) return;
            const matchData = node.children?.filter((item) => item.menuType === 'menu');
            if (!matchData.length) return;
            thirdLevelMenus.push({
              ...node,
              children: node.componentName?.includes('app:') ? [] : [...matchData],
            });

            // 赋值3级的menuCode
            const setMenuCode = (menu) => {
              menu.thirdMenuCode = node.menuCode;
              if (menu?.children?.length) {
                menu.children.map((node) => {
                  setMenuCode(node);
                });
              }
            };

            if (node?.children?.length) {
              node.children.map((node) => {
                setMenuCode(node);
              });
            }

            return;
          }
          const hasValidChildren = Array.isArray(node.children) && node.children.length > 0;
          if (currentLevel < 3 && hasValidChildren) {
            node.children.forEach((childNode: Record<string, any>) => {
              if (!childNode) return;
              collectThirdLevelNodes(childNode, currentLevel + 1);
            });
          }
        };

        menus.forEach((rootNode) => {
          collectThirdLevelNodes(rootNode, 1);
        });

        this.totalThirdMenus = thirdLevelMenus;
      },
      // 一级部分 三级 五级菜单合集
      getThirdFiveMenus(menus: Record<string, any>[]) {
        const thirdFiveLevelMenus: Record<string, any>[] = [];

        if (!Array.isArray(menus)) {
          return thirdFiveLevelMenus;
        }

        const collectThirdFiveLevelNodes = (node: Record<string, any>, currentLevel: number) => {
          if (!node || typeof currentLevel !== 'number') {
            return;
          }

          if (currentLevel === 1) {
            if (node.menuType == 'button') return;
            // 菜单类型 有componentName push
            if (node.menuType == 'menu' && node.componentName) {
              thirdFiveLevelMenus.push({ ...node });
            }
          }

          if (currentLevel === 3) {
            if (node.menuType == 'button') return;
            // 如果有五级菜单 三级不push
            if (
              node.children?.length &&
              node.children[0].children?.length &&
              !node.componentName?.includes('app:')
            ) {
              node.hidden = true;
            }
            // 内嵌菜单 app类的 三级被搜索 五级不被搜索
            if (node.componentName?.includes('app:')) {
              node.originChildren = node.children;
              node.children = [];
            }
            !node.hidden && thirdFiveLevelMenus.push({ ...node });
          }

          if (currentLevel === 5) {
            if (node.menuType == 'button') return;
            // 菜单类型 但没有componentName 不push
            if (node.menuType == 'menu' && !node.componentName) return;
            thirdFiveLevelMenus.push({ ...node });
          }

          const hasValidChildren = Array.isArray(node.children) && node.children.length > 0;
          if (hasValidChildren) {
            node.children.forEach((childNode: Record<string, any>) => {
              if (!childNode) return;
              collectThirdFiveLevelNodes(childNode, currentLevel + 1);
            });
          }
        };

        menus.forEach((rootNode) => {
          collectThirdFiveLevelNodes(rootNode, 1);
        });

        this.totalThirdFiveMenus = thirdFiveLevelMenus;
      },
    },
    // 开启数据缓存
    // persist: {
    //   enabled: true,
    //   strategies: [
    //     {
    //       key: 'my_use',
    //       storage: localStorage,
    //       paths: ['nativeMenus', 'currentMenu', 'totalProject'] //可以设置哪些是需要持久化的数据
    //     }
    //   ]
    // }
  }
);
