<template>
  <el-config-provider :locale="locale">
    <router-view />
    <!--    <div v-if="showBack" @click="$router.go(-1)" class="svg-icon float-back">
          <SvgIcon icon="back" className="back-svg" />
        </div>-->
    <div
      id="kt_app_toolbar_actions"
      class="engage-toolbar d-flex flex-column justify-content-center position-fixed fw-bold top-0 end-0 gap-2"
      style="z-index: 9999999999"
    ></div>
    <!-- <KeenToolbarActions v-if="showBack" use-router-back /> -->
    <!--    <Feedback />-->

    <!--    <el-button v-if="showBack" class="float-back" type="primary" @click="$router.go(-1)">
          返回
        </el-button>-->
  </el-config-provider>
</template>

<script setup lang="ts">
  import { ElConfigProvider, ElMessageBox } from 'element-plus';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import version from '@/version.json';
  import { createVersionPolling } from 'version-polling';
  import { useStore } from './store/modules/useStore';

  /* window.onload = () => {
    setZoom();
  };
  window.onresize = () => {
    setZoom();
  }; */

  window.version = version;
  const locale = zhCn;
  const route = useRoute();
  const userStore = useStore();
  /* const setZoom = () => {
    if (window.innerWidth < 1500) {
      document.body.style.zoom = 0.9;
    } else if (window.innerWidth < 1700) {
      document.body.style.zoom = 0.95;
    } else document.body.style.zoom = 1;
  }; */
  const showBack = computed(() => {
    return (
      route.fullPath.includes('/add') ||
      route.fullPath.includes('/edit') ||
      route.fullPath.includes('/detail') ||
      (route.fullPath.includes('/audit') && !route.fullPath.includes('/auditRule'))
    );
  });
  // 监听页面更新事件
  createVersionPolling({
    appETagKey: '__APP_ETAG__',
    pollingInterval: 60 * 1000, // 单位为毫秒,1分钟
    silent: process.env.NODE_ENV === 'development', // 开发环境下不检测
    onUpdate: (self) => {
      // 当检测到有新版本时，执行的回调函数，可以在这里提示用户刷新页面
      ElMessageBox.confirm(
        '检测到系统功能已升级，点击“确定”完成更新，若当前在执行操作可以点击“暂缓更新”，系统会在后续刷新页面时自动更新',
        '更新提示',
        {
          // if you want to disable its autofocus
          // autofocus: false,
          type: 'warning',
          showClose: false,
          confirmButtonText: '确定',
          cancelButtonText: '暂缓更新',
        }
      )
        .then(() => {
          self.onRefresh();
        })
        .catch(() => {
          console.log('用户选择了暂缓更新');
          userStore.systemUpdateFlag = true;
          self.onCancel();
        });
      // const result = confirm("页面有更新，点击确定刷新页面！");
      // if (result) {
      //   self.onRefresh();
      // } else {
      //   self.onCancel();

      // 强制更新可以用alert
      // alert('有新版本，请刷新页面');
    },
  });
</script>

<style lang="scss" scoped>
  #kt_app_toolbar_actions {
    height: 100vh;

    :deep(.el-button) {
      writing-mode: vertical-rl;
      height: fit-content;
      padding: 16px 5px;
    }
  }
  :deep(.el-cascader) {
    min-width: 200px;
  }
</style>
