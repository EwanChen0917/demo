<template>
  <!--begin::Sidebar-->
  <el-aside
    :width="menuCollapse ? '80px' : '208px'"
    class="sidebar"
    :class="menuCollapse ? 'is-collapse' : ''"
  >
    <!--begin::Logo-->
    <div class="sidebar-logo">
      <!--begin::Logo image-->
      <template v-if="menuCollapse">
        <img alt="Logo" src="@/assets/images/logos/RPE.png" class="logo-text" />
      </template>
      <template v-else>
        <img
          alt="Logo"
          src="@/assets/images/logos/lute-logo.svg"
          class="app-sidebar-logo-default"
        />
      </template>
      <!--end::Logo image-->
    </div>
    <!--      搜索菜单-->
    <el-autocomplete
      v-if="!menuCollapse"
      v-model="searchMenu"
      :fetch-suggestions="querySearch"
      clearable
      @select="handleSelect"
      placeholder="搜索菜单"
    >
      <template #prefix>
        <SvgIcon class-name="el-input__icon svg-icon-3" icon="general-gen021" />
      </template>
    </el-autocomplete>
    <!--end::Logo-->
    <el-scrollbar class="layout-menu-scrollbar">
      <!--      菜单-->
      <el-menu
        ref="menuRef"
        :collapse="menuCollapse"
        class="layout-menu"
        unique-opened
        text-color="#8D98AF"
        active-text-color="#ffffff"
        :collapse-transition="false"
        mode="vertical"
        :default-active="(activeMenu as string)"
        router
      >
        <Menu :level1="true" :menuList="menuList" />
      </el-menu>
    </el-scrollbar>
    <div class="collapse-icon">
      <SvgIcon :icon="menuCollapse ? 'MenuUnfold' : 'MenuFold'" @click="store.toggleMenuCollapse" />
    </div>
  </el-aside>
  <!--end::Sidebar-->
</template>

<script lang="tsx" setup>
  import { useStore } from '@/store/modules/useStore';
  import { routeMap } from '@/router';
  // import MenuLink from './menu-link.vue';
  import { arrayToTree, getAllNodes } from '@/utils/menuTree';
  import Menu from './menu.vue';

  const collapse = ref(false);
  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const menuList = computed(() => {
    const filterMenus = (menus: any[]) => {
      return menus
        ?.filter((item) => ['menu', 'url'].includes(item.menuType) && item.name !== '默认')
        ?.map((item) => {
          let path = '';
          if (item.menuType === 'url') {
            path = item.redirect;
          } else {
            path = item.componentName ? routeMap[item.componentName]?.path : '';
          }
          return {
            icon: item.icon,
            name: item.name,
            menuCode: item.menuCode,
            externalLink: item.menuType === 'url',
            path,
            componentName: item.componentName,
            activeMenu: item.componentName ? routeMap[item.componentName]?.activeMenu : '',
            children: filterMenus(item?.children),
          };
        });
      // return menus
      //   ?.filter((item) => ['menu', 'url'].includes(item.menuType) && item.name !== '默认')
      //   ?.map((item) => {
      //     // const routePath = item.componentName ? `${basePath}/${item.componentName}` : basePath;
      //     const routePath = item.redirect?.startsWith('http')
      //       ? item.redirect
      //       : `/${item.componentName}`;

      //     return {
      //       ...item,
      //       routePath,
      //       path: item.componentName ? routeMap[item.componentName]?.path : '',
      //       children: filterMenus(item?.children),
      //     };
      //   });
    };

    // const filterMenus = (menus) => {
    //   return menus
    //     ?.filter((item) => ['menu', 'url'].includes(item.menuType) && item.name !== '默认')
    //     ?.map((item) => {
    //       // const routePath = item.componentName ? `${basePath}/${item.componentName}` : basePath;
    //       const routePath = item.redirect?.startsWith('http')
    //         ? item.redirect
    //         : `/${item.componentName}`;

    //       return {
    //         ...item,
    //         routePath,
    //         path: item.path ? `/${item.path}` : '',
    //         children: filterMenus(item?.children),
    //       };
    //     });
    // };
    // return filterMenus(store.getTotalMenus);

    return filterMenus(store.getTotalMenus);
  });
  const activeMenu = computed(() => {
    console.log(route.path);
    return route.meta.activeMenu || route.path;
  });
  const menuCollapse = computed(() => store.menuCollapse);

  const searchMenu = ref('');
  const totalNodes = computed(() => {
    return getAllNodes(arrayToTree(store.getTotalMenus), (node) => {
      return node?.menuType !== 'button' && node?.componentName;
    });
  });
  const menuRef = ref();
  const querySearch = (queryString, cb) => {
    const results = queryString ? totalNodes.value.filter(createFilter(queryString)) : [];
    // call callback function to return suggestions
    cb(results);
  };
  const createFilter = (queryString: string) => {
    return (restaurant) => {
      return restaurant.value.toLowerCase().includes(queryString.toLowerCase());
    };
  };
  const handleSelect = (node) => {
    if (node?.componentName) {
      searchMenu.value = '';
      router.push({
        name: node?.componentName,
      });
    }
  };
</script>

<style lang="scss" scope>
  :root {
    --el-menu-base-level-padding: 16px;
    --el-menu-level-padding: 24px;
    --el-menu-item-height: 40px;
    --el-menu-icon-width: 14px;
  }
  .sidebar {
    // background: #0c1d3b;
    background-color: #001529;
    display: flex;
    flex-direction: column;
    transition: width 0.3s;
    user-select: none;
    overflow: hidden;
    .logo-text {
      font-size: 22px;
      font-weight: bold;
      display: block;
      color: #85b436;
      width: 50%;
    }
    .app-sidebar-logo-default {
      width: 88%;
    }
    &.is-collapse {
      // .sidebar-logo img {
      //   width: 0;
      //   height: 0;
      //   visibility: hidden;
      // }

      .sidebar-logo .menu-collapse-icon .svg-icon {
        transform: rotateZ(180deg);
      }
    }
    .sidebar-logo {
      border-bottom: 1px solid #33446c;
      min-height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      flex-shrink: 0;
      // margin: 0 16px;
      .menu-collapse-icon {
        background-color: #323c55;
        padding: 2px;
        border-radius: 4px;
        transition: all 0.3s;
        cursor: pointer;
        .svg-icon {
          display: inline-block;
          transition: all 0.3s ease !important;
          color: #b5b5c3;
          transform: rotateZ(0deg);
          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
  .layout-menu-scrollbar {
    padding: 8px 0px;
    flex: 1;
    & > .el-menu {
      padding: 0 8px;
    }
    .el-menu {
      background-color: transparent;
      // color: #fff;
      border-right: none;
      margin: 0px auto;
      > * {
        margin-bottom: 8px;
      }
      & > :last-child {
        margin-bottom: 0;
      }
      .el-sub-menu.is-active.is-opened > .el-sub-menu__title {
        color: #fff !important;
      }
      &.el-menu--collapse {
        .el-menu-item.is-active {
          &::after {
            left: -12px;
            right: -12px;
            // background-color: transparent;
          }
        }
      }

      .el-sub-menu__title:hover,
      .el-menu-item:hover {
        background-color: transparent;
        color: #fff;
        .svg-icon {
          color: #fff;
        }
      }

      .el-menu-item.is-active {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 8px;
          right: 8px;
          padding-left: 20px;
          height: 40px;
          background-color: #4372ff;
          z-index: 0;
          border-radius: 4px;
        }
      }

      .el-sub-menu__title {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        line-height: 22px;
      }
      // 处理icon
      .el-sub-menu .el-icon {
        margin-right: 10px;
      }
      .el-menu-item .svg-icon,
      .el-sub-menu__title .svg-icon {
        transition: color 0.3s linear;
      }
      .el-menu-item [class^='el-icon'] {
        margin-right: 10px;
      }
      .el-menu-item.is-active,
      .el-sub-menu.is-active.is-opened {
        position: relative;
        .el-icon {
          color: #fff;
          // position: relative;
          z-index: 1;
          .svg-icon {
            color: #fff;
          }
        }
        span {
          position: relative;
          z-index: 1;
        }
      }
      > .el-menu-item {
        padding: 0 8px;
      }
      .el-menu-item {
        height: 40px;
        line-height: 40px;
      }

      .el-menu-item *,
      .el-sub-menu__title * {
        vertical-align: middle;
      }

      .menu-bullet {
        width: 18px;
      }
      .el-sub-menu .el-menu {
        background-color: #000e1b;
      }
    }
  }
  .collapse-icon {
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 1px 0 0 #ffffff1a inset;
  }
  .el-autocomplete {
    width: unset !important;
    margin: 12px 14px 0 14px;
    .el-input {
      height: 36px;
      .el-input__wrapper {
        background-color: #1d263e;
        box-shadow: unset;
        .el-input__inner {
          height: 34px;
          color: #ffffff;
        }
      }
    }
  }
</style>

<style lang="scss">
  .el-menu--vertical.el-menu--collapse {
    .el-sub-menu.is-active {
      .el-icon .svg-icon {
        color: #fff;
      }
    }
  }
  .el-menu--vertical.el-menu--popup-container {
    .el-icon {
      line-height: 0;
    }
  }
  .menu-popper {
    &.el-popper.is-light {
      border: none;
    }
  }
</style>
