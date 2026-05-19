<template>
  <div class="nav-bar" :class="{ 'collapse-nav-bar': menuCollapse }">
    <LayoutTabbar v-if="menuCollapse" />
    <template v-else>
      <div class="nav__logo">
        <img src="@/assets/images/logos/nav-logo.svg" @click="router.push('/')" alt="" />
      </div>
      <div class="nav__menu">
        <Menu />
      </div>
    </template>
    <div class="nav__user">
      <div v-permission="'LuteAssistantApp'" class="ai-animation" @click="skip2Ai">
        <img src="@/assets/images/logos/IP.webp" alt="IP" draggable="false" />
        路小特
      </div>
      <div class="gap"></div>
      <ul class="tools">
        <li class="tool-item">
          <ToggleLayout :offset="24" placement="bottom" />
        </li>
        <li class="tool-item">
          <Search />
        </li>
        <li class="tool-item system-guide" v-if="!isExternalStaff">
          <System />
        </li>
        <li class="tool-item" v-if="existSettingMenu">
          <SettingPanel />
        </li>
        <li class="tool-item" @click="toTaskList">
          <el-tooltip content="任务列表" placement="bottom" :offset="22">
            <i class="Root-tyicon icon-Root-tyyewudanju" />
          </el-tooltip>
        </li>
        <li class="tool-item">
          <CloudPanel />
        </li>
      </ul>
      <div class="gap"></div>
      <UserMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';
  import { memberApi } from '@/api';
  import LayoutTabbar from '@/layout/tabbar/tabbar.vue';
  import Menu from './menu.vue';
  import UserMenu from '../user-menu.vue';
  import ToggleLayout from '../toggleLayout.vue';
  import Search from './search.vue';
  import System from './system.vue';
  import SettingPanel from './SettingPanel.vue';
  import CloudPanel from './CloudPanel.vue';

  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const isExternalStaff = computed(() => Number(store.userInfo.unDefaultSystemFlag) === 1);
  const luteOSUrl = ref(
    import.meta.env.VITE_ENV === 'DEV' ? 'https://os.luteos.site' : 'https://os.luteos.com'
  );

  const menuCollapse = computed(() => store.menuCollapse);

  const btnReport = () => {
    const menuCode = store.menuCodeMap?.[route?.name];
    memberApi.luteosMemberSysReport({
      platform: 'ERP',
      menuCode,
      eventName: '切换旧系统',
      memberCode: store?.userInfo?.memberCode || '',
      type: 'button',
      pageUrl: route?.path,
    });
  };
  const skip2Ai = () => {
    router.push('/luteAssistantApp');
  };
  const { nativeMenus } = store;
  const settingMenuCode = import.meta.env.VITE_SettingMenuCode;
  const existSettingMenu = computed(() => {
    return nativeMenus.some((menu) => menu.menuCode === settingMenuCode);
  });

  const toTaskList = () => {
    router.push('/taskDetail');
  }
</script>

<style scoped lang="scss">
  .nav-bar {
    background: #000;
    height: 50px;
    padding: 0 8px 0 12px;
    display: flex;
    align-items: center;
    .nav__logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 95px;
      margin-right: 12px;
      // padding: 0 28px 0 10px;
      img {
        height: 100%;
        display: block;
      }
    }

    .nav__menu {
      flex: 1;
      height: 100%;
      flex-shrink: 1;
      min-width: 200px;
    }

    .nav__user {
      display: flex;
      align-items: center;
      margin-left: 12px;

      .tools {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 0;
        color: #c5c5c5;
        list-style: none;
        gap: 8px;
        .tool-item {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          border-radius: 4px;
          cursor: pointer;
          color: #fff;
          &:hover {
            background: #1e2226;
          }
          &:has(.is-show) {
            background: #004d36;
          }
          :deep(.iconfont),
          :deep(.Root-tyicon),
          :deep(.icon-svg) {
            font-size: 18px;
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
  .gap {
    width: 1px;
    height: 12px;
    background-color: #1e2226;
    margin: 0 8px;
  }
  .collapse-nav-bar {
    height: 38px;
    padding-left: 56px;
  }
  .ai-animation {
    height: 28px;
    border-radius: 14px;
    cursor: pointer;
    -webkit-user-select: none;
    overflow: hidden;
    color: #fff;
    background-color: #006845;
    padding-right: 8px;
    display: flex;
    align-items: center;
    column-gap: 6px;
    word-break: keep-all;
    img {
      width: 28px;
      height: 28px;
      -webkit-user-select: none;
      -webkit-user-drag: none;
    }
  }
</style>

<style lang="scss">
  .nav-tooltip.el-popper {
    background-color: #404040;
    color: #fff;
    border: #404040;
    font-size: 12px;
    line-height: 20px;

    &.el-popper[data-popper-placement^='bottom'] > .el-popper__arrow::before {
      border-color: #404040;
      background-color: #404040;
    }

    // &.el-popper[data-popper-placement^='bottom'] > .el-popper__arrow::before {
    //   border-top-color: rgba(0, 0, 0, 0.75);
    // }
  }
</style>
