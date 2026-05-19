<template>
  <div class="layout-container" :class="menuCollapse ? 'menu-left' : 'menu-top'">
    <div class="layout-header">
      <Narbar />
    </div>
    <div class="layout-sidebar">
      <Asidebar />
    </div>
    <div class="layout-main">
      <!--      <Header />-->
      <LayoutTabbar v-if="!menuCollapse" />
      <el-main
        :class="{ isFrame: route.name === 'frame' || route.meta?.isFrame, fullscreen: fullscreen }"
      >
        <el-watermark
          class="watermark"
          :content="config.content"
          :font="config.font"
          :z-index="config.zIndex"
          :rotate="config.rotate"
          :gap="config.gap"
          :offset="config.offset"
        >
          <div :style="{ height: '100%',display: 'flex' }" @click="btnReport">
            <leftMenu />
            <div style="flex: 1; overflow: auto;" class="layout-right-main">
              <router-view v-slot="{ Component, route }">
                <!--              <keep-alive v-if="!notKeepAlive">
                <component :is="Component" v-if="renderRouteView" :key="route.fullPath" />
              </keep-alive>
              <component :is="Component" v-else-if="renderRouteView" :key="route.fullPath" />-->
                <keep-alive v-if="renderRouteView && isScopedKeepAliveRoute(route.meta)">
                  <component :is="Component" :key="resolveScopedKeepAliveKey(route.meta)" />
                </keep-alive>
                <keep-alive
                  v-else-if="renderRouteView"
                  :include="getCachedTabs"
                  :exclude="getExcludeCashedTabs"
                >
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
              </router-view>
            </div>
          </div>
        </el-watermark>
      </el-main>
    </div>
    <!-- <el-container>
      <Sidebar />
      <el-container direction="vertical">
        <Narbar />
        <Header />
        <el-main>
          <el-watermark
            class="watermark"
            :content="config.content"
            :font="config.font"
            :z-index="config.zIndex"
            :rotate="config.rotate"
            :gap="config.gap"
            :offset="config.offset"
          >
            <router-view>
              <template #default="{ Component, route }">
                <keep-alive>
                  <component v-if="!notKeepAlive" :is="Component" :key="route.fullPath" />
                </keep-alive>
              </template>
            </router-view>
            <router-view v-if="notKeepAlive" />
          </el-watermark>
        </el-main>
        <Footer />
      </el-container>
    </el-container> -->
  </div>
  <TourDialog />
  <AiWidget v-if="aiWidgetApiKey" :apikey="aiWidgetApiKey" />
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';
  import { memberApi } from '@/api';
  import LayoutTabbar from '@/layout/tabbar/tabbar.vue';
  import { storeToRefs } from 'pinia';
  import { useTabbarStore } from '@/store/modules/useTabbar';
  import { computed } from 'vue';
  import AiWidget from '@/packages/ai/index.vue';
  import { getMenu } from '@/utils/menuTree';
  import Narbar from './nav/index.vue';
  import Header from './header.vue';
  import Sidebar from './sidebar.vue';
  import leftMenu from './leftMenu.vue';
  import Footer from './footer.vue';
  import Asidebar from './aside/index.vue';
  import TourDialog from './tourDialog.vue';

  const tabbarStore = useTabbarStore();

  const { renderRouteView, getCachedTabs, getExcludeCashedTabs } = storeToRefs(tabbarStore);

  const store = useStore();
  const menuCollapse = computed(() => store.menuCollapse);
  const fullscreen = computed(() => store.fullscreen);

  const route = useRoute();
  const isScopedKeepAliveRoute = (meta: Record<string, any> | undefined) =>
    meta?.keepAliveScope === 'demand-manage';
  const resolveScopedKeepAliveKey = (meta: Record<string, any> | undefined) => {
    const bucket = meta?.keepAliveBucket || 'default';
    return `keepalive-scope-demand-manage-${bucket}`;
  };

  const notKeepAlive = computed(() => {
    return (
      route.fullPath.includes('/add') ||
      route.fullPath.includes('/edit') ||
      route.fullPath.includes('/detail') ||
      route.fullPath.includes('/subOrder') ||
      (route.fullPath.includes('/audit') && !route.fullPath.includes('/auditRule'))
    );
  });
  const config = computed(() => ({
    content: `${store.userInfo.name} ${store.userInfo.memberCode?.substring(1)}`,
    font: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.1)',
    },
    zIndex: 9999, // 不需要显示水印时，z-index设置为负数，不显示水印
    rotate: -22,
    gap: [100, 100] as [number, number],
    offset: [] as unknown as [number, number],
  }));

  //   button a el-link点击事件上报
  const btnReport = (e) => {
    if (!e?.target) return;
    const ele = e.target;
    if (
      ele?.tagName === 'BUTTON' ||
      ele?.tagName === 'A' ||
      ele?.parentNode?.tagName === 'BUTTON' ||
      ele?.getAttribute('name') === 'BUTTON' ||
      ele?.parentNode?.getAttribute('class') === 'el-link__inner'
    ) {
      const menuCode = store.menuCodeMap?.[route?.name];
      memberApi.luteosMemberSysReport({
        platform: 'ERP',
        menuCode,
        eventName:
          route?.meta?.title +
          (ele.tagName === 'A' ? `跳转链接${ele?.getAttribute('href')}` : e?.target?.innerText),
        memberCode: store?.userInfo?.memberCode,
        type: ele.tagName === 'A' ? 'a' : 'button',
        pageUrl: route?.path,
      });
    }
  };

  const aiWidgetApiKey = computed(() => {
    const menu = getMenu(
      route.name === 'frame' ? route.params.menuCode : route.name,
      store.getTotalMenus,
      route.name === 'frame' ? 'menuCode' : 'componentName',
    );
    const extraInfo = menu?.extraInfo;

    if (extraInfo) {
      const obj = JSON.parse(extraInfo);
      return obj?.chat_api_key;
    }
    return null;
  });
</script>

<style scoped lang="scss">
  .el-main {
    padding: 0;
  }
  .layout-container {
    overflow: initial;
    display: flex;
    height: 100vh;
    flex-direction: column;
    background-color: #E9ECF0 !important;

    .layout-header {
      display: block;
    }
    &.menu-left {
      .layout-sidebar {
        display: block;
        top: 0;
      }

      .layout-main {
        padding: 38px 0 0 56px;
        min-height: 100%;

        .isFrame {
          padding: 0;
        }
      }

      .watermark {
        height: 100%;
        :deep(.iframe),
        :deep(.report-container) {
          height: calc(100vh - 40px);
        }
      }
    }

    &.menu-top {
      .layout-sidebar {
        display: none;
      }

      .layout-main {
        padding: 50px 0 0;
        min-height: 100%;

        .isFrame {
          padding: 0;
        }
      }

      .watermark {
        height: 100%;
        :deep(.iframe),
        :deep(.report-container) {
          height: calc(100vh - 90px);
        }
      }
    }

    .layout-header {
      position: fixed;
      left: 0;
      right: 0;
      z-index: 20;
    }

    .layout-sidebar {
      position: fixed;
      top: 50px;
      left: 0;
      bottom: 0;
      z-index: 100;
      width: 56px;
    }

    .layout-main {
      padding-top: 50px;
      padding-left: 56px;
      display: flex;
      flex-direction: column;
    }
  }

  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background-color: #f7f7f7;
  }
</style>
