<template>
  <div class="aside-menu-container" ref="asideMenuRef">
    <el-scrollbar class="aside-menu-scrollbar">
      <ul class="aside-menu">
        <template v-for="menu in menuList" :key="menu.menuCode">
          <template v-if="menu.children?.length">
            <li
              @click="openSubmenu(menu)"
              @mouseenter="handleMouseEnter(menu)"
              @mouseleave="handleMouseLeave"
              :class="{ active: getActiveTopMenu(menu.children) }"
              class="aside-menu__item"
            >
              <i
                :class="[menu.icon, menu.icon.includes('Root') ? 'Root-menuicon' : 'iconfont']"
              ></i>
              {{ menu.shortName || menu.name }}
            </li>
          </template>
          <template
            v-else-if="!['personalCenter'].includes(menu.componentName)"
          >
            <li
              @click="router.push({ name: menu.componentName })"
              :class="{ active: getActiveTopMenu(menu.children) }"
              class="aside-menu__item"
            >
              <i
                :class="[menu.icon, menu.icon.includes('Root') ? 'Root-menuicon' : 'iconfont']"
              ></i>
              {{ menu.shortName || menu.name }}
            </li>
          </template>
        </template>
      </ul>
    </el-scrollbar>
    <div class="sub-menu" v-show="showSubMenu" ref="subMenuRef">
      <div class="level-2-menu" v-for="(menu, subIdx) in subMenuList" :key="menu.menuCode">
        <div class="level-2-item">
          <!-- <i class="iconfont" :class="menu.icon"></i> -->
          {{ menu.name }}
        </div>
        <ul class="level-3-menu">
          <li
            class="level-3-item"
            v-for="(level3, level3Idx) in menu.children"
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
      </div>
    </div>
    <div
      class="sub-menu-modal"
      v-show="showSubMenu"
      ref="subMenuModalRef"
      @click="handleClose"
    ></div>
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
  const menuList = computed(() => {
    const filterMenus = (menus: any[]) => {
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
  const asideMenuRef = ref();
  const subMenuRef = ref();
  const timer = ref<any>(null);
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
  const subMenuModalRef = ref();
  const handleClose = () => {
    subMenuRef.value.classList.add('animation-end');
    subMenuModalRef.value.classList.add('animation-end');
    const timeout = setTimeout(() => {
      routeName.value = '';
      showSubMenu.value = false;
      if (subMenuRef.value && subMenuRef.value.classList) {
        subMenuRef.value.classList.remove('animation-end');
        subMenuModalRef.value.classList.remove('animation-end');
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
    handleClose();
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
  const menuCollapse = computed(() => store.menuCollapse);
  onMounted(() => {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (asideMenuRef.value && !asideMenuRef.value.contains(target)) {
        if (menuCollapse.value) {
          handleClose();
        }
      }
    });
  });

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
</script>

<style scoped lang="scss">
  .aside-menu-container {
    height: 100%;
    .aside-menu-scrollbar {
      height: 100%;
    }
    .aside-menu {
      list-style: none;
      margin: 0;
      overflow: auto;
      padding: 0;
      position: relative;
      z-index: 0;
      .aside-menu__item {
        text-align: center;
        color: #c5c5c5;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        padding: 10px 0;
        flex-shrink: 0;
        overflow: auto;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        i {
          font-size: 20px;
          margin-bottom: 2px;
        }
        &.active,
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        &.active {
          color: #fff;
          font-weight: 600;
        }
      }
    }
    .sub-menu {
      padding: 12px 8px;
      box-shadow: 6px 0px 10px 0px #0000000f;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 56px;
      width: auto;
      background-color: #fff;
      z-index: -1;
      display: flex;
      writing-mode: vertical-lr;
      flex-wrap: wrap;
      align-content: flex-start;
      animation: menu-translate 0.2s;
      gap: 4px 24px;
      &.animation-end {
        animation: menu-translate-end 0.2s;
      }
      .level-2-menu {
        writing-mode: horizontal-tb;
        width: 200px;
        // padding-top: 12px;
        .level-2-item {
          font-weight: 400;
          font-family: 'PingFang SC Medium';
          font-size: 12px;
          line-height: 20px;
          padding: 0 8px 0 24px;
          display: flex;
          align-items: center;
          height: 32px;
          color: #02b96b;
          gap: 8px;
          > i {
            font-size: 18px;
          }
        }
        .level-3-menu {
          margin: 0;
          padding-left: 0;
          color: #000;
          font-weight: 400;
          font-size: 13px;
          line-height: 22px;
          .level-3-item {
            padding: 0 8px;
            display: flex;
            align-items: center;
            cursor: pointer;
            height: 32px;
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
            .uncollected {
              line-height: 22px;
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
                opacity: 0;
                color: #ff9f22;
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
    .sub-menu-modal {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 56px;
      right: 0;
      background-color: rgba(0, 0, 0, 0.25);
      animation: modal-animation 0.2s;
      z-index: -2;
      &.animation-end {
        animation: modal-animation-end 0.2s;
      }
    }
    @keyframes menu-translate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(0);
      }
    }
    @keyframes menu-translate-end {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    @keyframes modal-animation {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes modal-animation-end {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
</style>
