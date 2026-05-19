<template>
  <div class="left-menu" v-if="!menuCollapse && showMenu">
    <div class="btn-collapse" @click="menuCollapse = !menuCollapse">
      <span class="btn-icon"><i class="Root-tyicon icon-Root-tyshouqi"></i></span>
    </div>
    <div class="menu-list">
      <template v-for="(menu, menuIndex) in menuList" :key="menuIndex">
        <div
          class="level-4-menu"
          :class="{ 'no-child': !submenu.children?.length }"
          v-for="(submenu, subIdx) in menu.children"
          :key="submenu.menuCode"
        >
          <template v-if="submenu.children?.length">
            <div class="level-4-item">
              <i class="iconfont" :class="submenu.icon"></i>
              {{ submenu.name }}
            </div>
            <ul class="level-5-menu">
              <li
                class="level-5-item"
                v-for="(level5, level5Idx) in submenu.children"
                :key="level5.menuCode"
                :class="{ 'item-active': level5.path == route.path }"
                @click="handleToPage(level5.componentName, level5)"
              >
                <span class="level-name">{{ level5.name }}</span>
                <div class="collect" v-if="level5?.collectFlag">
                  <el-tooltip content="取消收藏" placement="top">
                    <i
                      class="iconfont"
                      :class="level5?.iconName"
                      @click.stop="handleCollect(level5)"
                    ></i>
                  </el-tooltip>
                </div>
                <div v-else class="uncollected">
                  <el-tooltip content="添加收藏" placement="top">
                    <i
                      class="iconfont"
                      :class="level5?.iconName"
                      @mouseenter="
                        (e) => {
                          changeClass(e, 'icon-yishoucang');
                        }
                      "
                      @mouseleave="
                        (e) => {
                          changeClass(e, 'icon-shoucang');
                        }
                      "
                      @click.stop="handleCollect(level5)"
                    ></i>
                  </el-tooltip>
                </div>
              </li>
            </ul>
          </template>
          <template v-else>
            <div class="level-4-item" @click="handleToPage(submenu.componentName, submenu)">
              {{ submenu.name }}
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
  <div v-if="menuCollapse && showMenu" class="fixed-menu" @click="menuCollapse = !menuCollapse">
    <span><i class="Root-tyicon icon-Root-tyzhankai-1"></i></span>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';
  import { routeMap } from '@/router';
  import { encryptByBase64 } from '@/utils/aesTils';
  import { memberApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { computed } from 'vue';
  import { openWindow } from '@/utils';
  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const { changeCollectFlag } = store;
  const collectList = computed(() => store.collectList);

  const lastMenus = ref<any>([]);
  const menuCollapse = ref(false);

  // 找到当前path对应的四五级菜单
  const filterMenus = (menus: any[]): object | false => {
    if (!Array.isArray(menus) || menus.length === 0) {
      return false;
    }
    // 遍历当前层级的菜单
    for (const item of menus) {
      const isValidMenu = ['menu', 'url', 'iframe'].includes(item.menuType) && item.name !== '默认';
      if (!isValidMenu) {
        continue;
      }
      // 计算当前菜单的 path
      let path = '';
      if (item.menuType === 'url') {
        path = item.redirect;
      } else if (item.menuType === 'iframe') {
        path =
          item.componentName && item.componentName !== 'frame'
            ? routeMap[item.componentName]?.path.replace(
                /:frameUrl$/,
                encryptByBase64(item.redirect)
              )
            : `/frame/${item.menuCode}/${encryptByBase64(item.redirect)}`;
      } else {
        path = item.componentName ? routeMap[item.componentName]?.path : '';
      }
      // 判断当前项是否匹配目标 path，匹配则直接返回构造好的对象
      if (path === route.path) {
        let params = item;
        if (!item._calcLevel) {
          // 四五级菜单
          params = store.getTotalThirdMenus?.filter(
            (node) => node.menuCode == item.thirdMenuCode
          )[0];
        }
        return {
          icon: params.icon,
          name: params.name,
          menuCode: params.menuCode,
          menuType: params.menuType,
          externalLink: params.menuType === 'url',
          path,
          componentName: params.componentName,
          collectFlag: params.collectFlag,
          iconName: params.collectFlag ? 'icon-yishoucang' : 'icon-shoucang',
          activeMenu: params.componentName ? routeMap[params.componentName]?.activeMenu : '',
          children: params?.children,
        };
      }
      // 当前项不匹配，但有子级，递归遍历子级 children
      if (item?.children && Array.isArray(item.children)) {
        const childMatchResult = filterMenus(item.children);
        // 子级递归找到匹配项，直接返回结果
        if (childMatchResult !== false) {
          return childMatchResult;
        }
      }
    }
    // 未找到匹配项，返回 false
    return false;
  };

  // 对菜单数据参数格式调整
  const menuList = computed(() => {
    const filterPathMenus = (menus: any[]) => {
      return menus
        ?.filter(
          (item) => ['menu', 'url', 'iframe'].includes(item.menuType) && item.name !== '默认'
        )
        ?.map((item) => {
          let path = '';
          if (item.menuType === 'url') {
            path = item.redirect;
          } else if (item.menuType === 'iframe') {
            path =
              item.componentName && item.componentName !== 'frame'
                ? routeMap[item.componentName]?.path.replace(
                    /:frameUrl$/,
                    encryptByBase64(item.redirect)
                  )
                : `/frame/${item.menuCode}/${encryptByBase64(item.redirect)}`;
          } else {
            path = item.componentName ? routeMap[item.componentName]?.path : '';
          }
          return {
            icon: item.icon,
            name: item.name,
            menuCode: item.menuCode,
            menuType: item.menuType,
            externalLink: item.menuType === 'url',
            path,
            componentName: item.componentName,
            collectFlag: item.collectFlag,
            iconName: item.collectFlag ? 'icon-yishoucang' : 'icon-shoucang',
            activeMenu: item.componentName ? routeMap[item.componentName]?.activeMenu : '',
            children: filterPathMenus(item?.children),
          };
        });
    };
    return filterPathMenus([lastMenus.value]);
  });

  const showMenu = computed(
    () => menuList.value?.[0]?.children?.length && menuList.value?.[0]?.children[0].children.length
  );

  // 监听路由 路由变化 四五级菜单重新获取
  watch(
    () => route.path,
    () => {
      lastMenus.value = filterMenus(store.getTotalThirdMenus);
    },
    {
      immediate: true,
    }
  );

  const report = async (item) => {
    await memberApi.luteosMemberSaveMenuVisit({
      menuCode: item.menuCode,
    });
  };

  const handleToPage = (name: string, menu) => {
    report(menu);
    if (menu.menuType === 'iframe') {
      router.push(menu.path);
    } else if (menu.menuType === 'url') {
      openWindow(menu.path);
    } else {
      router.push({ name });
    }
  };

  // 收藏、取消收藏
  const handleCollect = async (level5) => {
    if (!level5?.collectFlag && collectList.value?.length === 10) {
      ElMessage.warning('最多可收藏10个菜单');
      return;
    }
    const res = await memberApi.luteosMemberSaveOrUpdateMemberCollect({
      collectFlag: level5.collectFlag ^ 1,
      itemCode: level5?.menuCode,
      menuType: level5?.menuType,
      path: level5?.path,
      collectScene: 'menu',
      source: 'lute_erp',
    });
    ElMessage.success(`${level5.collectFlag ? '已取消收藏' : '已收藏'}【${level5?.name}】`);
    // level5.collectFlag ^= 1;
    changeCollectFlag(level5.menuCode);
  };

  const changeClass = (e, className) => {
    e.target.setAttribute('class', `iconfont ${className}`);
  };
</script>

<style scoped lang="scss">
  .left-menu {
    width: 180px;
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    gap: 8px;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    flex-wrap: wrap;
    align-content: flex-start;
    border-right: 1px solid var(---N3, #ededed);
    position: relative;

    .menu-list {
      // padding: 8px;
      width: calc(180px - 16px);
      height: calc(100% - 40px);
      overflow-y: auto;
      overflow-x: hidden;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .level-4-menu {
      break-inside: avoid;
      writing-mode: horizontal-tb;
      // padding-top: 14px;
      // padding-bottom: 8px;

      .level-4-item {
        font-weight: 400;
        font-size: 12px;
        line-height: 22px;
        height: 28px;
        display: flex;
        align-items: center;
        padding: 4px 8px;
        color: #8A9099;
        display: flex;
        align-items: center;
      }

      &.no-child {
        // padding-bottom: 0;
        // .level-4-item {
        //   padding-left: 40px;
        //   padding-right: 12px;
        //   display: flex;
        //   align-items: center;
        //   cursor: pointer;
        //   min-height: 32px;
        //   justify-content: space-between;
        //   color: #1f1f1f;
        //   font-weight: 400;
        //   font-size: 13px;
        //   line-height: 22px;

        //   &:hover {
        //     // background-color: #edfaf4;
        //   }

        //   .collect {
        //     display: none;
        //     opacity: 0;
        //     color: #999;
        //   }
        // }
      }

      .level-5-menu {
        margin: 0;
        color: #1e2226;
        font-weight: 400;
        font-size: 12px;
        line-height: 22px;
        padding: 0;

        .level-5-item {
          padding: 4px 8px;
          display: flex;
          align-items: center;
          cursor: pointer;
          // min-height: 32px;
          justify-content: space-between;
          border-radius: 4px;
          .level-name {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .icon-yishoucang {
            color: #ff9f22;
          }

          &:hover {
            background-color: #f5f7fa;
            // color: var(--el-color-primary);

            .uncollected {
              .icon-shoucang {
                opacity: 1;
              }

              .icon-yishoucang {
                opacity: 1;
              }
            }
          }
          &:active,
          &.item-active {
            background-color: #edfaf4;
            color: var(--el-color-primary);
          }

          .uncollected {
            .icon-yishoucang {
              color: #ff9f22;
              opacity: 0;
            }

            .icon-shoucang {
              opacity: 0;
              color: #666666;
            }
          }
        }
      }
    }

    .btn-collapse {
      padding: 8px;
      background-color: #fff;
      .btn-icon {
        display: flex;
        align-items: center;
        color: #262626;
        cursor: pointer;
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }
  .fixed-menu {
    width: 44px;
    padding: 8px;
    background-color: #fff;
    border-right: 1px solid #dfe2e6;
    display: flex;
    > span {
      width: 28px;
      height: 28px;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #262626;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
</style>
