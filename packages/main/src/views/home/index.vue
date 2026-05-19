<template>
  <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
    <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
      <HeaderBar :menuWidth="menuWidth" @retract-menu-click="handleRetractMenuClick" />
      <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
        <Menus @retract-menu="handleRetractMenu" ref="menuRef" />
        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
          <ToolBar class="app-toolbar" v-if="$route.meta.menuType === 'menu'" />
          <div id="kt_app_content" class="app-content flex-column-fluid">
            <!-- 内容 -->
            <div class="app-container container-xxl rt_container h-100">
              <div class="container-bg card rt_card h-100">
                <router-view>
                  <template #default="{ Component, route }">
                    <keep-alive>
                      <component :is="Component" :key="route.fullPath" />
                    </keep-alive>
                  </template>
                </router-view>
              </div>
            </div>
          </div>
          <!-- 底部 -->
          <div class="app-footer">
            <div
              class="app-container container-xxl d-flex flex-column flex-md-row flex-center flex-md-stack py-3"
            >
              <div class="text-dark order-2 order-md-1">
                <span class="text-muted fw-semibold me-1">2023©</span>
                <span class="text-gray-800 text-hover-primary">深圳市路特创新科技有限公司</span>
                <span class="text-gray-800 text-hover-primary ms-8 cursor-pointer" @click="toPath">
                  粤ICP备2023047099号
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-overlay" v-if="isShowMask" @click="hideMask"></div>
  </div>
  <!-- 全局通知 -->
  <Notification
    ref="notification"
    placement="topRight"
    :duration="4500"
    :top="70"
    @close="onClose"
  />
</template>

<script setup lang="ts">
  import HeaderBar from '@/components/HeaderBar/index.vue';
  import ToolBar from '@/components/ToolBar/index.vue';
  import Menus from '@/components/Menus/index.vue';
  import Notification from '@/components/Toast/index.vue';
  import { useCar } from '@/store/modules/notificationStore';
  import { useRouter } from 'vue-router';

  const state = reactive<{
    menuWidth: any;
    isShowMask: any;
  }>({
    menuWidth: 220,
    isShowMask: false,
  });
  const { menuWidth, isShowMask } = toRefs(state);

  const notification = ref();
  const notificationInfo = useCar();
  const menuRef: any = ref(null);
  const route = useRoute();
  // 监听当前路由变化
  const router = useRouter();
  watch(
    () => router.currentRoute.value.path,
    () => {
      nextTick(() => {
        hideMask();
      });
    },
    { immediate: true, deep: true }
  );

  const toPath = () => {
    window.open('https://beian.miit.gov.cn');
  };

  const onClose = () => {
    // 点击默认关闭按钮时触发的回调函数
    console.log('关闭notification');
  };

  // 菜单收缩事件
  const handleRetractMenu = (val) => {
    setAppWrapperStyle(val, true);
    menuWidth.value = val;
  };

  const handleRetractMenuClick = () => {
    menuRef.value.showMenu();
    isShowMask.value = true;
  };

  function hideMask() {
    menuRef.value.hideMenu();
    isShowMask.value = false;
  }

  // 设置容器样式
  const setAppWrapperStyle = (val, isAnimation) => {
    const wrapper_ele: any = document.getElementById('kt_app_wrapper');
    wrapper_ele.style = `padding-left: ${val}px`;
    if (isAnimation) {
      wrapper_ele.style.transition = 'padding 0.2s';
    }
  };

  onMounted(() => {
    watch(
      () => notificationInfo.notificationInfo,
      (val: any) => {
        // notification.value.error({ notification: '下载中', title: '通知' });
        notification.value.error(val);
      },
      // 初次加载页面不需要触发通知故设置false
      { immediate: false }
    );
    setAppWrapperStyle(menuWidth.value, false);
  });
</script>

<style lang="scss" scoped>
  .app-container {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .app-content {
    margin-left: 1%;
    width: 98%;
  }

  .container-bg {
    background-color: #fff;
  }

  .flex-md-stack {
    justify-content: flex-start;
  }

  @media (min-width: 992px) {
    .app-wrapper {
      transition: margin 0.3s ease;
    }
  }

  @media (max-width: 991.98px) {
    .app-wrapper {
      padding-left: 0 !important;
      padding-right: 0;
    }
  }

  .drawer-overlay {
    z-index: 104;
  }
</style>
