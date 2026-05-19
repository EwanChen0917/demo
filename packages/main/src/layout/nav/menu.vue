<template>
  <div class="nav-menu-container" ref="navMenuRef">
    <el-scrollbar class="layout-menu-scrollbar">
      <div class="nav-menu">
        <template v-for="(menu, menuIdx) in menuList" :key="menu.menuCode">
          <template v-if="menu.children?.length">
            <!--             @click="openSubmenu(menu)"
            @mouseenter="handleMouseEnter(menu)"
            @mouseleave="handleMouseLeave" -->
            <!-- <li :class="{ active: getActiveTopMenu(menu.children) }" class="nav-menu__item"> -->
            <template v-if="menu.externalLink">
              <a
                target="_blank"
                :href="menu.externalLink"
                :class="{ active: getActiveTopMenu(menu.children) }"
                class="nav-menu__item"
              >
                {{ menu.name }}
              </a>
            </template>
            <template v-else>
              <el-popover
                :ref="setPopoverRef"
                :offset="0"
                :show-arrow="false"
                :show-after="200"
                placement="bottom-start"
                trigger="hover"
                popper-class="nav-sub-menu"
              >
                <div class="sub-menu" :style="getMenuHeight(menu)">
                  <div
                    class="level-2-menu"
                    :class="{
                      'no-child': !submenu.children.length,
                      'seven-columns': getMenuHeight(menu).sevenColumns,
                    }"
                    v-for="(submenu, subIdx) in menu.children"
                    :key="submenu.menuCode"
                  >
                    <template v-if="submenu.children.length">
                      <div class="level-2-item">
                        <!-- <i class="iconfont" :class="submenu.icon"></i> -->
                        {{ submenu.name }}
                      </div>
                      <ul class="level-3-menu">
                        <li
                          class="level-3-item"
                          v-for="(level3, level3Idx) in submenu.children"
                          :key="level3.menuCode"
                          @click="handleToPage(level3.componentName, level3)"
                        >
                          <div class="collect" v-if="level3?.collectFlag">
                            <el-tooltip content="取消收藏" placement="top">
                              <i
                                class="iconfont"
                                :class="level3?.iconName"
                                @click.stop="handleCollect(level3)"
                              ></i>
                            </el-tooltip>
                          </div>
                          <div v-else class="uncollected">
                            <el-tooltip content="添加收藏" placement="top">
                              <i
                                class="iconfont"
                                :class="level3?.iconName"
                                @mouseenter="(e) => changeClass(e, 'icon-yishoucang')"
                                @mouseleave="(e) => changeClass(e, 'icon-shoucang')"
                                @click.stop="handleCollect(level3)"
                              ></i>
                            </el-tooltip>
                          </div>
                          <span class="level-3-name">{{ level3.name }}</span>
                        </li>
                      </ul>
                    </template>
                    <template v-else>
                      <div
                        class="level-2-item"
                        @click="handleToPage(submenu.componentName, submenu)"
                      >
                        {{ submenu.name }}
                      </div>
                    </template>
                  </div>
                </div>
                <template #reference>
                  <div :class="{ active: getActiveTopMenu(menu.children) }" class="nav-menu__item">
                    <template v-if="menu.name === '星图'">
                      <img
                        src="@/assets/images/system/xingtu.png"
                        alt="星图"
                        style="width: 43.1px"
                      />
                    </template>
                    <template v-else>
                      {{ menu.name }}
                    </template>
                  </div>
                </template>
              </el-popover>
            </template>
            <!-- </li> -->
          </template>
          <template
            v-else-if="!['personalCenter'].includes(menu.componentName)"
          >
            <!-- <router-link :to="{ name: menu.componentName }">
              {{ menu.name }}
            </router-link> -->
            <div
              :class="{ active: route.name === menu.componentName }"
              @click="handleToPage(menu.componentName, menu)"
              class="nav-menu__item"
            >
              {{ menu.name }}
            </div>
          </template>
        </template>
      </div>
    </el-scrollbar>
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

  const store = useStore();
  const { changeCollectFlag } = store;
  const router = useRouter();
  const route = useRoute();
  const settingMenuCode = import.meta.env.VITE_SettingMenuCode;
  const menuList = computed(() => {
    const filterMenus = (menus: any[]) => {
      return menus
        ?.filter(
          (item) =>
            ['menu', 'url', 'iframe'].includes(item.menuType) &&
            item.name !== '默认' &&
            item.menuCode !== settingMenuCode
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
            children: filterMenus(item?.children),
          };
        });
    };
    return filterMenus(store.getTotalMenus);
  });
  const collectList = computed(() => store.collectList);
  const showSubMenu = ref(false);
  const routeName = ref('');
  const clickName = ref('');
  const subMenuList = computed(() => {
    return menuList.value.find((item) => item.menuCode === routeName.value)?.children;
  });
  const openSubmenu = (menu) => {
    // clickedTopMenuCode.value = menu.menuCode;
    // currentTopMenuCode.value = menu.menuCode;
    // showSubMenu.value = true;
    if (routeName.value === menu.menuCode && menu.clickName === menu.menuCode) {
      handleClose();
      clickName.value = '';
    } else {
      routeName.value = menu.menuCode;
      clickName.value = menu.menuCode;
      showSubMenu.value = true;
    }
  };
  const navMenuRef = ref();
  const subMenuRef = ref();
  const timer = ref<any>(null);
  const popoverRefs = ref<any[]>([]);
  const setPopoverRef = (el: any) => {
    if (el && !popoverRefs.value.includes(el)) {
      popoverRefs.value.push(el);
    }
  };
  const hideAllPopovers = () => {
    popoverRefs.value.forEach((popover) => {
      popover?.hide?.();
    });
  };
  const handleMouseEnter = (menu) => {
    timer.value = setTimeout(() => {
      routeName.value = menu.menuCode;
    }, 150);
  };
  const handleMouseLeave = () => {
    if (!showSubMenu.value) {
      routeName.value = '';
      clickName.value = '';
    }
    clearTimeout(timer.value);
  };
  const handleClose = () => {
    subMenuRef.value?.classList.add('animation-end');

    const timeout = setTimeout(() => {
      routeName.value = '';
      showSubMenu.value = false;
      if (subMenuRef.value && subMenuRef.value.classList) {
        subMenuRef.value.classList.remove('animation-end');
      }
      clearTimeout(timeout);
    }, 180);
  };

  const report = async (item) => {
    await memberApi.luteosMemberSaveMenuVisit({
      menuCode: item.menuCode,
    });
  };

  const handleToPage = (name: string, menu) => {
    hideAllPopovers();
    report(menu);
    if (menu.menuType === 'iframe') {
      router.push(menu.path);
    } else if (menu.menuType === 'url') {
      openWindow(menu.path);
    } else if (
      menu.children?.length &&
      menu.children[0]?.children?.length &&
      !menu.componentName?.includes('app:')
    ) {
      const childrenPath = menu.children[0]?.children[0]?.path;
      childrenPath && router.push(childrenPath);
    } else {
      router.push({ name });
    }
    // handleClose();
  };
  const getActiveTopMenu = (m: any) => {
    const findMenu = (menus, key: string, target: string) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const menu of menus) {
        if (menu[key] === target) {
          return menu;
        }
        if (menu.children) {
          const found = findMenu(menu.children, key, target);
          if (found) {
            return menu;
          }
        }
      }
      return null;
    };
    const menuCode = route.params.menuCode as string;
    const activeMenu = findMenu(
      m,
      ...(menuCode
        ? (['menuCode', menuCode] as [string, string])
        : (['componentName', route.name] as [string, string]))
    );
    return activeMenu;
  };

  // 计算menu高度
  interface MenuItem {
    children?: MenuItem[];
  }

  const ITEM_PARENT_HEIGHT = 56; // 32 + 24
  const ITEM_CHILD_HEIGHT = 32;
  const MAX_MENU_HEIGHT = 376;

  const getMenuHeight = (menu: MenuItem) => {
    let totalHeight = 0;
    let maxChildGroupHeight = 0;
    const childGroupHeights: number[] = [];

    const parentHeight = (menu.children?.length ?? 0) * ITEM_PARENT_HEIGHT;
    totalHeight += parentHeight;

    menu.children?.forEach((item) => {
      if (Array.isArray(item.children)) {
        const childCount = item.children.length;
        const groupHeight = childCount * ITEM_CHILD_HEIGHT + ITEM_PARENT_HEIGHT;

        totalHeight += childCount * ITEM_CHILD_HEIGHT;
        childGroupHeights.push(groupHeight);
        maxChildGroupHeight = Math.max(maxChildGroupHeight, groupHeight);
      }
    });

    let accumulatedHeight = 0; // 从上往下布局，尽可能的铺满376px的高度,计算首列的高度
    // eslint-disable-next-line no-restricted-syntax
    for (const height of childGroupHeights) {
      if (accumulatedHeight + height > MAX_MENU_HEIGHT) {
        break;
      }
      accumulatedHeight += height;
    }
    let actualHeight = maxChildGroupHeight;
    // 总高度不超过376px，则返回总高度
    if (totalHeight < MAX_MENU_HEIGHT) {
      actualHeight = totalHeight;
    } else if (accumulatedHeight > maxChildGroupHeight) {
      // 首列超过最高列, 则返回首列的高度
      actualHeight = accumulatedHeight;
    }
    // 计算实际列数, 超过7列则固定7列
    let actualColumns = 1;
    childGroupHeights.reduce((acc, height) => {
      if (acc + height > actualHeight) {
        actualColumns += 1;
        return height;
      }
      return acc + height;
    });
    if (actualColumns > 7) {
      return {
        display: 'block',
        columnCount: 7,
        columnGap: '4px',
        writingMode: 'unset',
        sevenColumns: true,
      };
    }
    return {
      // 去掉列的最后一个24
      height: `${actualHeight - 24}px`,
      sevenColumns: false,
    };
  };

  // 收藏、取消收藏
  const handleCollect = async (level3) => {
    if (!level3?.collectFlag && collectList.value?.length === 10) {
      ElMessage.warning('最多可收藏10个菜单');
      return;
    }
    const res = await memberApi.luteosMemberSaveOrUpdateMemberCollect({
      collectFlag: level3.collectFlag ^ 1,
      itemCode: level3?.menuCode,
      menuType: level3?.menuType,
      path: level3?.path,
      collectScene: 'menu',
      source: 'lute_erp',
    });
    ElMessage.success(`${level3.collectFlag ? '已取消收藏' : '已收藏'}【${level3?.name}】`);
    // level3.collectFlag ^= 1;
    changeCollectFlag(level3.menuCode);
  };

  const changeClass = (e, className) => {
    e.target.setAttribute('class', `iconfont ${className}`);
  };

  // onMounted(() => {
  //   document.addEventListener('click', (event) => {
  //     const target = event.target as HTMLElement;
  //     if (!navMenuRef.value.contains(target)) {
  //       handleClose();
  //     }
  //   });
  // });
</script>

<style lang="scss">
  .nav-sub-menu.el-popover.el-popper {
    width: auto !important;
    padding: 12px 8px;
    box-shadow: 0px 6px 36px 0px #06081b14;
    border-radius: 10px;
    max-width: 1440px;
    max-height: calc(100vh / 3 * 2);

    .sub-menu {
      //min-height: 188px;
      //max-height: 376px;
      min-width: 200px;
      max-height: calc(100vh / 3 * 2 - 24px);
      overflow-y: auto;
      background-color: #fff;
      display: flex;
      writing-mode: vertical-lr;
      flex-wrap: wrap;
      align-content: flex-start;
      // row-gap: 4px;
      gap: 4px 24px;

      .level-2-menu {
        break-inside: avoid;
        writing-mode: horizontal-tb;
        width: 200px;
        // padding-top: 14px;

        .level-2-item {
          font-weight: 400;
          font-family: 'PingFang SC Medium';
          font-size: 12px;
          line-height: 20px;
          display: flex;
          align-items: center;
          padding: 0 8px 0 24px;
          min-height: 32px;
          color: #02b96b;
          gap: 4px;
        }
        &.seven-columns {
          padding-bottom: 24px;
        }

        &.no-child {
          // padding-bottom: 0;
          .level-2-item {
            // padding-left: 40px;
            // padding-right: 12px;
            // display: flex;
            // align-items: center;
            // cursor: pointer;
            // min-height: 32px;
            // justify-content: space-between;
            // color: #1f1f1f;
            // font-weight: 400;
            // font-size: 13px;
            // line-height: 22px;

            // &:hover {
            //   background-color: #f5f5f5;
            // }

            // .collect {
            //   display: none;
            //   opacity: 0;
            //   color: #999;
            // }
          }
        }

        .level-3-menu {
          margin: 0;
          color: #000;
          font-weight: 400;
          font-size: 13px;
          line-height: 22px;
          padding: 0;

          .level-3-item {
            padding: 0 8px;
            display: flex;
            align-items: center;
            cursor: pointer;
            min-height: 32px;
            gap: 4px;
            width: 100%;
            .icon-yishoucang {
              color: #ff9f22;
            }
            .level-3-name {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            &:hover {
              border-radius: 4px;
              background-color: #f0f2f5;

              .uncollected {
                .icon-shoucang {
                  opacity: 1;
                }

                .icon-yishoucang {
                  opacity: 1;
                }
              }
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
            .iconfont {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>

<style scoped lang="scss">
  .nav-menu-container {
    height: 50px;
    position: relative;

    .nav-menu {
      display: flex;
      list-style: none;
      height: 50px;
      margin: 0;
      padding: 0;
      width: 100%;

      .nav-menu__item {
        height: 100%;
        color: #f0f2f5;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        padding: 0 16px;
        flex-shrink: 0;
        overflow: auto;
        cursor: pointer;
        display: flex;
        align-items: center;

        &.active,
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        &.active {
          color: #fff;
          font-weight: 600;
          background: var(---P10, #004d36);
        }
      }
    }
  }
</style>
