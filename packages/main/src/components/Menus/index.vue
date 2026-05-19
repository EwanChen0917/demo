<template>
  <!--begin::Sidebar-->
  <div
    id="kt_app_sidebar"
    :class="['app-sidebar', 'flex-column', isForceShow ? 'is-force-show' : '']"
    :style="{ width: menuWidth + 'px' }"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <!--begin::Logo-->
    <div class="app-sidebar-logo px-6" id="lute_app_sidebar_logo">
      <!--begin::Logo image-->
      <template v-if="!isRetractMenu">
        <a href="#">
          <img alt="Logo" :src="getImg('logos/kenn.svg')" class="logo-svg" />
          <!-- <img alt="Logo" :src="getImg('logos/momcozy-logo.png')" class="app-sidebar-logo-default" /> -->
        </a>
        <span class="app-sidebar-logo-default">ROOT</span>
      </template>
      <!--end::Logo image-->
      <!--begin::Sidebar toggle-->
      <div
        id="kt_app_sidebar_toggle"
        class="app-sidebar-toggle btn btn-icon btn-sm h-30px w-30px rotate"
        @click="contractMenu"
      >
        <!--begin::Svg Icon | path: icons/duotune/arrows/arr079.svg-->
        <span class="svg-icon svg-icon-2 rotate-180" id="kt_app_sidebar_toggle_icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z"
              fill="currentColor"
            />
            <path
              d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <!--end::Svg Icon-->
      </div>
      <!--end::Sidebar toggle-->
    </div>
    <!--end::Logo-->
    <!--begin::sidebar menu-->
    <template v-if="menuList.length">
      <div
        class="app-sidebar-menu flex-column-fluid px-3 hover-scroll-overlay-y"
        :style="{ height: slidebarHeight + 'px', overflow: 'auto' }"
      >
        <!--begin::Menu wrapper-->
        <div id="kt_app_sidebar_menu_wrapper" class="app-sidebar-wrapper my-5">
          <!--begin::Menu-->
          <div class="menu menu-column menu-rounded menu-sub-indention fw-semibold">
            <!--begin:Menu item-->
            <div class="menu-item here show menu-accordion pt-5">
              <!--begin:Menu link-->
              <span
                class="menu-link"
                @click="handleMenuGuideClick('lute_menu_guide', 'menu_arrow_guide')"
              >
                <span class="menu-icon">
                  <!--begin::Svg Icon | path: icons/duotune/general/gen025.svg-->
                  <span class="svg-icon svg-icon-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
                      <rect
                        opacity="0.3"
                        x="13"
                        y="2"
                        width="9"
                        height="9"
                        rx="2"
                        fill="currentColor"
                      />
                      <rect
                        opacity="0.3"
                        x="13"
                        y="13"
                        width="9"
                        height="9"
                        rx="2"
                        fill="currentColor"
                      />
                      <rect
                        opacity="0.3"
                        x="2"
                        y="13"
                        width="9"
                        height="9"
                        rx="2"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <!--end::Svg Icon-->
                </span>
                <span class="menu-title" v-if="!isRetractMenu">项目导航</span>
                <span class="menu-arrow" id="menu_arrow_guide" v-if="!isRetractMenu"></span>
              </span>
              <div class="menu-sub menu-sub-accordion" id="lute_menu_guide">
                <!--begin:Menu item-->
                <template v-for="(nav, navIndex) in menuList" :key="navIndex">
                  <div
                    class="menu-item"
                    @click="handleSubMenuGuideClick(nav)"
                    v-if="nav.name !== '默认' && !isRetractMenu"
                  >
                    <span :class="['menu-link', curPath === nav.menuCode ? 'active' : '']">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{ nav.name }}</span>
                    </span>
                  </div>
                </template>
                <!--end:Menu item-->
              </div>
            </div>
          </div>
          <!--end::Menu-->

          <!--begin::Menu-->
          <div :class="['menu-item', 'pt-5']">
            <!--begin:Menu content-->
            <div class="menu-content">
              <span
                class="menu-heading fw-bold text-uppercase fs-7"
                :style="{ opacity: isRetractMenu ? 0 : 1 }"
              >
                {{ !isRetractMenu ? '应用集' : '应' }}
              </span>
            </div>
            <!--end:Menu content-->
          </div>
          <div
            class="menu menu-column menu-rounded menu-sub-indention fw-semibold"
            v-if="menuList && menuList.length"
          >
            <!--begin:Menu item-->
            <template v-for="(nav, navIndex) in menuList" :key="navIndex">
              <div
                data-kt-menu-trigger="click"
                class="menu-item here show menu-accordion"
                v-if="nav.name !== '默认' && nav.children && nav.displayStatus"
              >
                <!--begin:Menu link-->
                <span
                  class="menu-link"
                  @click="handleNavClick(`lute_menu_${navIndex}`, `menu_arrow_${navIndex}`)"
                >
                  <span class="menu-icon">
                    <!--begin::Svg Icon | path: icons/duotune/general/gen025.svg-->
                    <span class="svg-icon svg-icon-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="13"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          opacity="0.3"
                          x="2"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <!--end::Svg Icon-->
                  </span>
                  <span class="menu-title" v-if="!isRetractMenu">{{ nav.name }}</span>
                  <span
                    class="menu-arrow"
                    :id="`menu_arrow_${navIndex}`"
                    v-if="nav.children && nav.children.length && !isRetractMenu"
                  ></span>
                </span>
                <div
                  :id="`lute_menu_${navIndex}`"
                  class="menu-sub menu-sub-accordion"
                  v-if="nav.children && nav.children.length && !isRetractMenu"
                >
                  <!--begin:Menu item-->
                  <template v-for="(menu, menuIndex) in nav.children" :key="menuIndex">
                    <div class="menu-item" v-if="menu.menuType !== 'button' && menu.displayStatus">
                      <span
                        :class="[
                          'menu-link',
                          !menu.children && curPath === menu.toPath ? 'active' : ''
                        ]"
                        @click="
                          handleMenuClick(
                            `lute_menu_${navIndex}_${menuIndex}`,
                            menu,
                            `menu_arrow_${navIndex}_${menuIndex}`
                          )
                        "
                      >
                        <span class="menu-bullet">
                          <span class="bullet bullet-dot"></span>
                        </span>
                        <span class="menu-title" v-if="!isRetractMenu">{{ menu.name }}</span>
                        <span
                          class="menu-arrow"
                          :id="`menu_arrow_${navIndex}_${menuIndex}`"
                          v-if="menu.children && menu.children.length && !isRetractMenu"
                        ></span>
                      </span>
                      <div
                        class="menu-sub menu-sub-accordion"
                        :id="`lute_menu_${navIndex}_${menuIndex}`"
                        v-if="menu.children && menu.children.length"
                      >
                        <!--begin:Menu item-->
                        <template
                          v-for="(subMenu, subMenuIndex) in menu.children"
                          :key="subMenuIndex"
                        >
                          <div
                            class="menu-item"
                            v-if="subMenu.menuType !== 'button' && subMenu.displayStatus"
                            @click="handleSubMenuClick(subMenu)"
                          >
                            <span
                              :class="['menu-link', curPath === subMenu.toPath ? 'active' : '']"
                            >
                              <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                              </span>
                              <span class="menu-title" v-if="!isRetractMenu">
                                {{ subMenu.name }}
                              </span>
                              <!-- <span class="menu-arrow"></span> -->
                            </span>
                          </div>
                        </template>
                        <!--end:Menu item-->
                      </div>
                    </div>
                  </template>
                  <!--end:Menu item-->
                </div>
              </div>
            </template>
          </div>
          <!--end::Menu-->
          <div style="height: 50px; width: 220px"></div>
        </div>
        <!--end::Menu wrapper-->
      </div>
    </template>
  </div>
</template>

<script setup name="Menus" lang="ts">
  import { useCache } from '@/hooks/web/useCache';
  import { useRouter } from 'vue-router';
  import { useStore } from '@/store/modules/useStore';
  let { getTotalMenus } = useStore();

  const getImg = (name: string) => {
    return new URL(`../../assets/images/${name}`, import.meta.url).href;
  };

  const G_RETRACT_MENU_WIDTH = 75; // 收起菜单宽度
  const G_MENU_WIDTH = 220; // 菜单默认宽度
  const props = defineProps({
    // logo
    logo: {
      type: String,
      default: ''
    },
    // 宽度
    width: {
      type: String,
      default: () => '240px'
    }
  });

  const state = reactive<{
    menuList: any;
    curPath: any; // 当前路径
    menuPaths: any; // 收集的菜单路径
    slidebarHeight: any;
    menuWidth: any; // 菜单宽度
    isRetractMenu: any; // 菜单是否收起状态
    isRetactIcon: any; // icon是否收起状态
    isMenuClick: any;
    isActivePath: any;
    isForceShow: any; // 是否强制展开，当小屏幕时外部调用展开菜单
  }>({
    menuList: getTotalMenus,
    curPath: '',
    menuPaths: [],
    slidebarHeight: '',
    menuWidth: G_MENU_WIDTH,
    isRetractMenu: false,
    isRetactIcon: false,
    isMenuClick: false,
    isActivePath: false,
    isForceShow: false
  });
  const {
    menuList,
    curPath,
    menuPaths,
    slidebarHeight,
    menuWidth,
    isRetractMenu,
    isRetactIcon,
    isMenuClick,
    isActivePath,
    isForceShow
  } = toRefs(state);

  const { wsCache } = useCache('localStorage');

  // 监听当前路由变化
  const router = useRouter();
  const route = useRoute();
  watch(
    () => router.currentRoute.value.path,
    () => {
      if (isMenuClick.value) {
        isMenuClick.value = false;
      } else {
        setTimeout(() => {
          setActivePath();
        }, 100);
      }
    },
    { immediate: true, deep: true }
  );

  // 动态获取左边菜单栏高度
  let getSidebarHeight = () => {
    // 获取对应的div元素
    const divElement: any = document.getElementById('lute_app_sidebar_logo');

    // 获取元素相对于视口的位置信息
    const rect = divElement.getBoundingClientRect();

    // 计算得到元素距离底部窗口的距离
    const distanceToBottom = window.innerHeight - rect.bottom;

    // 输出距离值
    return distanceToBottom;
  };

  // 事件声明
  const emit = defineEmits<{
    (event: 'expand'): void;
    (event: 'fold'): void;
    (event: 'retractMenu', menuWidth: any, isRetractMenu: any): void;
  }>();

  // 菜单收缩
  const contractMenu = () => {
    let toggle_ele: any = document.getElementById('kt_app_sidebar_toggle_icon');

    // icon切换状态
    isRetactIcon.value = !isRetactIcon.value;

    // 展开状态
    if (!isRetactIcon.value) {
      // 菜单宽度
      menuWidth.value = G_MENU_WIDTH;

      // icon返回旋转动画
      toggle_ele.style.transform = 'rotate(0deg)';
      toggle_ele.style.transition = 'transform 0.15s';

      // 延迟设置菜单文案可见，优化交互体验
      setTimeout(() => {
        // 标志展开
        isRetractMenu.value = false;
        emit('retractMenu', menuWidth.value, isRetractMenu.value);
      }, 300);
    } else {
      // 收起状态
      // 设置菜单宽度
      menuWidth.value = G_RETRACT_MENU_WIDTH;

      // icon 180旋转动画
      toggle_ele.style.transform = 'rotate(180deg)';
      toggle_ele.style.transition = 'transform 0.15s';
      // 标志收起
      isRetractMenu.value = true;
      emit('retractMenu', menuWidth.value, isRetractMenu.value);
    }
  };

  const mouseenter = () => {
    if (!isRetactIcon.value) {
      return;
    }
    // 如果是收起状态
    if (isRetractMenu.value) {
      // 菜单宽度
      menuWidth.value = G_MENU_WIDTH;
      // 延迟设置菜单文案可见，优化交互体验
      setTimeout(() => {
        // 标志展开
        isRetractMenu.value = false;
      }, 300);
    }
  };

  const mouseleave = () => {
    if (!isRetactIcon.value) {
      return;
    }

    // 如果是展开状态
    if (!isRetractMenu.value) {
      // 菜单宽度
      menuWidth.value = G_RETRACT_MENU_WIDTH;
      isRetractMenu.value = true;
    }
  };

  // 展示菜单，外部调用，小屏幕是展示
  function showMenu() {
    isForceShow.value = true;
  }
  // 隐藏菜单，外部调用
  function hideMenu() {
    isForceShow.value = false;
  }

  // 项目导航展开折叠
  const handleMenuGuideClick = (id, arrowId) => {
    let ele: any = document.getElementById(id);
    let menu_arrow_ele: any = document.getElementById(arrowId);
    let menu_height = 40;
    let len = menuList.value.length;
    // ele.style.overflow = 'hidden';
    // ele.style.transition = 'height 0.4s';
    let expand_height = `${len * menu_height}px`;
    let fold_height = `${menu_height + 1}px`;
    // 折叠
    if (ele.style.height === '' || ele.style.height === 'auto') {
      ele.style.overflow = 'hidden';
      ele.style.height = '0px';
      menu_arrow_ele.style.transform = 'rotate(180deg)';
      menu_arrow_ele.style.transition = 'transform 0.4s ease';
    } else {
      // 展开
      ele.style.overflow = 'visiable';
      ele.style.height = 'auto';
      menu_arrow_ele.style.transform = 'rotate(0deg)';
      menu_arrow_ele.style.transition = 'transform 0.4s ease';
    }
  };

  // 项目导航点击触发下面的菜单下拉
  const handleSubMenuGuideClick = (nav) => {
    isMenuClick.value = true;
    curPath.value = nav.menuCode;
    wsCache.set('activePath', curPath.value);

    if (!nav.children && !nav.redirect) {
      router.push('/baseset/inset?rds=' + Math.random() * 10);
      return;
    }

    // 根据项目项目导航配置的重定向链接进行跳转
    let navs: any = menuList.value;
    for (let i = 0; i < navs.length; i++) {
      if (nav.menuCode === navs[i].menuCode) {
        handleNavClick(`lute_menu_${i}`, `menu_arrow_${i}`, true);
        let item = navs[i] || {};
        if (item.redirect) {
          router.push(item.redirect);
        } else {
          router.push('/baseset/inset?rds=' + Math.random() * 10);
        }
        return;
      }
    }
  };

  // 一级菜单点击
  const handleNavClick = (id, arrowId, is_flag) => {
    let ele: any = document.getElementById(id);
    let menu_arrow_ele: any = document.getElementById(arrowId);

    if (menu_arrow_ele) {
      if (!is_flag && (ele.style.height === '' || ele.style.height === 'auto')) {
        // ele.style.height = fold_height;
        ele.style.overflow = 'hidden';
        ele.style.height = '0px';
        ele.style.transition = 'height 0.4s';
        menu_arrow_ele.style.transform = 'rotate(180deg)';
        menu_arrow_ele.style.transition = 'transform 0.4s ease';
      } else {
        // 展开
        // ele.style.height = expand_height;
        ele.style.overflow = 'visible';
        ele.style.height = 'auto';
        ele.style.transition = 'height 0.4s';
        menu_arrow_ele.style.transform = 'rotate(0deg)';
        menu_arrow_ele.style.transition = 'transform 0.4s ease';
      }
    }
  };

  // 二级菜单点击
  const handleMenuClick = (id, menu, arrowId) => {
    // 有子菜单则展开，否则直接跳转
    if (menu.children) {
      handleNavClick(id, arrowId);
    } else {
      handleSubMenuClick(menu);
    }
  };

  // 三级菜单点击
  const handleSubMenuClick = (subMenu) => {
    curPath.value = subMenu.toPath;
    isMenuClick.value = true;
    wsCache.set('activePath', curPath.value);
    router.push({ path: subMenu.toPath });
  };

  // 初始化菜单
  function initMenus() {
    nextTick(() => {
      setMenuStyle();
      setActivePath();
    });
  }

  // 设置菜单样式
  function setMenuStyle() {
    let nav: any = menuList.value || [];
    let menus: any = [];
    let menu_ele: any = {};
    let nav_ele: any = {};
    let arrow_ele: any = {};
    menuPaths.value = [];

    // 动态计算每个菜单折叠的高度，设置path，收集path
    for (let i = 1; i < nav.length; i++) {
      menus = (nav[i] && nav[i].children) || [];
      nav_ele = document.getElementById(`lute_menu_${i}`);
      arrow_ele = document.getElementById(`menu_arrow_${i}`);
      if (nav_ele) {
        nav_ele.style.height = `0px`;
        nav_ele.style.overflow = 'hidden';
      }
      if (arrow_ele) {
        arrow_ele.style.transform = 'rotate(180deg)';
      }

      for (let j = 0; j < menus.length; j++) {
        menu_ele = document.getElementById(`lute_menu_${i}_${j}`);
        arrow_ele = document.getElementById(`menu_arrow_${i}_${j}`);
        let menu = menus[j] || {};
        menu.toPath = `/${nav[i].componentName ? nav[i].componentName : nav[i].componentPath}/${
          menu.componentName
        }`;
        menuPaths.value.push(menu.toPath);
        if (menu_ele) {
          let children = (menu.children && menu.children) || [];
          let len: any = 0;
          children.forEach((item) => {
            // 设置跳转路径
            item.toPath = `/${menu.componentName}/${item.componentName}`;

            if (item.menuType == 'menu') {
              len++;
              // 收集跳转路径
              menuPaths.value.push(item.toPath);
            }
          });
          menu_ele.style.height = `0px`;
          menu_ele.style.overflow = 'hidden';

          if (arrow_ele) {
            arrow_ele.style.transform = 'rotate(0deg)';
          }
        }
      }
    }
  }

  // 设置激活的path
  function setActivePath() {
    // 判断是否从根路径过来，是的话下面直接取缓存的激活数据
    let from_root = route.query.from_root;
    let active_path = wsCache.get('activePath');
    if (from_root) {
      curPath.value = active_path;
      return;
    }

    if (isActivePath.value) {
      isActivePath.value = false;
      return;
    }

    // 页面刷新情况下
    if (!isMenuClick.value) {
      isActivePath.value = true;
      if (menuPaths.value.includes(route.path)) {
        curPath.value = route.path;
      } else {
        curPath.value = active_path;
      }

      let nav: any = menuList.value || [];
      let menus: any = [];
      let flag = false;

      for (let i = 1; i < nav.length; i++) {
        menus = (nav[i] && nav[i].children) || [];
        for (let j = 0; j < menus.length; j++) {
          let menu = menus[j] || {};
          let children = (menu.children && menu.children) || [];

          // 展开一级
          if (!flag && curPath.value === menu.toPath) {
            flag = true;
            handleNavClick(`lute_menu_${i}`, `menu_arrow_${i}`, true);
            isActivePath.value = false;
            return;
          }
          for (let k = 0; k < children.length; k++) {
            let item: any = children[k];
            if (!flag && curPath.value === item.toPath) {
              flag = true;
              // 展开二级和三级
              handleNavClick(`lute_menu_${i}`, `menu_arrow_${i}`, true);
              nextTick(() => {
                handleNavClick(`lute_menu_${i}_${j}`, `menu_arrow_${i}_${j}`, true);
                isActivePath.value = false;
              });
              return;
            }
          }
        }
      }
    }

    isActivePath.value = false;
  }

  onMounted(() => {
    nextTick(() => {
      slidebarHeight.value = getSidebarHeight();
    });
    window.addEventListener('resize', function () {
      // 窗口大小变化后要执行的代码
      slidebarHeight.value = getSidebarHeight();
    });

    initMenus();
  });

  defineExpose({
    showMenu,
    hideMenu
  });
</script>

<style scoped>
  .is-force-show {
    display: block !important;
    transform: none;
    transition: transform 0.3s ease-in-out !important;
  }
  .app-sidebar-wrapper {
    top: -15px;
  }

  .app-sidebar {
    position: fixed;
    z-index: 105;
    top: 0;
    bottom: 0;
    left: 0;
    transition: width 0.4s;
  }

  .app-sidebar-logo-default {
    height: 20px !important;
    width: 88px !important;
    color: #fff;
    font-size: 25px;
    margin-bottom: 20px;
    font-family: 'FontAwesome';
  }

  .logo-svg {
    height: 35px;
  }

  .menu-arrow {
    transform: rotate(180deg);
  }

  .menu-sub {
    display: block;
  }

  .menu-sub-accordion {
    display: block;
  }
</style>
