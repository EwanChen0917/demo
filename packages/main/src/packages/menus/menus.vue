<template>
  <!--begin::Sidebar-->
  <div
    id="kt_app_sidebar"
    class="app-sidebar flex-column"
    data-kt-drawer="true"
    data-kt-drawer-name="app-sidebar"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="225px"
    data-kt-drawer-direction="start"
    data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
  >
    <!--begin::Logo-->
    <div class="app-sidebar-logo px-6" id="lute_app_sidebar_logo">
      <!--begin::Logo image-->
      <a href="#">
        <img alt="Logo" :src="getImg('logos/root.png')" class="app-sidebar-logo-default" />
      </a>
      <!--end::Logo image-->
      <!--begin::Sidebar toggle-->
      <div
        id="kt_app_sidebar_toggle"
        class="app-sidebar-toggle btn btn-icon btn-sm h-30px w-30px rotate"
        data-kt-toggle="true"
        data-kt-toggle-state="active"
        data-kt-toggle-target="body"
        data-kt-toggle-name="app-sidebar-minimize"
      >
        <!--begin::Svg Icon | path: icons/duotune/arrows/arr079.svg-->
        <span class="svg-icon svg-icon-2 rotate-180">
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
    <template v-if="props.menuList.length">
      <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
        <!--begin::Menu wrapper-->
        <div
          id="kt_app_sidebar_menu_wrapper"
          class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
          :style="{ height: slidebarHeight + 'px' }"
        >
          <!--begin::Menu-->
          <template v-for="(nav, navIndex) in props.menuList" :key="navIndex">
            <div :class="['menu-item', 'pt-5']" v-if="nav.children && nav.children.length">
              <!--begin:Menu content-->
              <div class="menu-content">
                <span class="menu-heading fw-bold text-uppercase fs-7">{{ nav.name }}</span>
              </div>
              <!--end:Menu content-->
            </div>
            <div
              class="menu menu-column menu-rounded menu-sub-indention fw-semibold px-3"
              v-if="nav.children && nav.children.length"
            >
              <!--begin:Menu item-->
              <div
                data-kt-menu-trigger="click"
                class="menu-item here show menu-accordion"
                :id="`lute_menu_${navIndex}_${menuIndex}`"
                v-for="(menu, menuIndex) in nav.children"
                :key="menuIndex"
              >
                <!--begin:Menu link-->
                <span
                  class="menu-link"
                  @click="
                    handleMenuClick(
                      `lute_menu_${navIndex}_${menuIndex}`,
                      menu.children,
                      `menu_arrow_${navIndex}_${menuIndex}`
                    )
                  "
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
                  <span class="menu-title">{{ menu.name }}</span>
                  <span class="menu-arrow" :id="`menu_arrow_${navIndex}_${menuIndex}`"></span>
                </span>
                <div
                  class="menu-sub menu-sub-accordion"
                  v-if="menu.children && menu.children.length"
                >
                  <!--begin:Menu item-->
                  <div
                    class="menu-item"
                    v-for="(subMenu, subIndex) in menu.children"
                    :key="subIndex"
                    @click="handleSubMenuClick(subMenu, menu)"
                  >
                    <span :class="['menu-link', curPath === subMenu.componentPath ? 'active' : '']">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">{{ subMenu.name }}</span>
                    </span>
                  </div>
                  <!--end:Menu item-->
                </div>
              </div>
            </div>
          </template>
          <!--end::Menu-->
        </div>
        <!--end::Menu wrapper-->
      </div>
    </template>
  </div>
</template>

<script setup name="Menus" lang="ts">
  const getImg = (name: string) => {
    return new URL(`../../assets/images/${name}`, import.meta.url).href;
  };
  import { ref, computed, watch, onMounted, reactive, toRefs, nextTick } from 'vue';

  const props = defineProps({
    // 菜单信息
    menuList: {
      type: Array,
      require: true,
      default: () => []
    },
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
    curPath: any; // 当前路径
    slidebarHeight: any;
  }>({
    curPath: '',
    slidebarHeight: ''
  });
  const { curPath, slidebarHeight } = toRefs(state);

  let valueRef: any = ref(props.menuList);

  watch(
    () => valueRef.value,
    () => {
      initMenus();
    },
    {
      immediate: true
    }
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
    (event: 'menuClick', path: any, menu: any): void;
  }>();

  // 展开折叠
  const handleMenuClick = (id, menu_children, arrowId) => {
    let ele: any = document.getElementById(id);
    let menu_arrow_ele: any = document.getElementById(arrowId);
    if (!ele || !menu_children) {
      return;
    }
    let menu_len = menu_children && menu_children.length;
    let menu_height = 40;
    let len = menu_len + 1;

    let expand_height = `${len * menu_height}px`;
    let fold_height = `${menu_height}px`;
    // 折叠
    if (ele.style.height === '' || ele.style.height === expand_height) {
      ele.style.height = fold_height;
      menu_arrow_ele.style.transform = 'rotate(180deg)';
      menu_arrow_ele.style.transition = 'transform 0.4s ease';
    } else {
      // 展开
      ele.style.height = expand_height;
      menu_arrow_ele.style.transform = 'rotate(0deg)';
      menu_arrow_ele.style.transition = 'transform 0.4s ease';
    }
  };

  // 按钮点击
  const handleSubMenuClick = (subMenu, menu) => {
    console.log(subMenu);
    curPath.value = subMenu.componentPath;
    console.log(subMenu.componentPath);
    console.log(curPath.value);
    let path = `/${menu.componentName}/${subMenu.componentName}`;
    emit('menuClick', path, subMenu);
  };

  // 初始化菜单
  function initMenus() {
    nextTick(() => {
      setMenuStyle();
    });
  }

  function setMenuStyle() {
    let nav: any = props.menuList || [];
    let menus: any = [];
    let ele: any = {};
    let menu_children_len: any;
    for (let i = 0; i < nav.length; i++) {
      menus = (nav[i] && nav[i].children) || [];
      for (let j = 0; j < menus.length; j++) {
        ele = document.getElementById(`lute_menu_${i}_${j}`);
        if (ele) {
          menu_children_len = (menus[j].children && menus[j].children.length) || 0;
          ele.style.height = `${(menu_children_len + 1) * 40}px`;
          ele.style.overflow = 'hidden';
          ele.style.transition = 'height 0.4s';
        }
      }
    }
  }

  onMounted(() => {
    nextTick(() => {
      slidebarHeight.value = getSidebarHeight();
    });
    window.addEventListener('resize', function () {
      // 窗口大小变化后要执行的代码
      slidebarHeight.value = getSidebarHeight();
    });
  });
</script>

<style scoped>
  .app-sidebar-wrapper {
    top: -15px;
  }

  .app-sidebar {
    width: 15% !important;
    position: fixed;
    z-index: 105;
    top: 0;
    bottom: 0;
    left: 0;
  }

  .app-sidebar-logo-default {
    height: 50px !important;
    width: 100px !important;
  }
</style>
