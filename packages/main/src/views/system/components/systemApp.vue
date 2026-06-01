<template>
  <div class="system-app">
    <Menus
      ref="menuRef"
      v-if="isShowLeftMenu"
      :active-menu="activeMenu"
      :get-menus="option.getMenus"
      @change="onMenuChange"
    />

    <iframe
      v-if="initUrl"
      :src="initUrl"
      frameborder="0"
      allowfullscreen
      ref="iframeRef"
      style="width: 100%; height: 100%"
    ></iframe>
    <div v-else style="min-width: 0; flex: 1">
      <el-empty description="暂无页面" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Menus from '@/views/system/components/leftMenus.vue';
  import { useIframe } from '@/views/system/components/useIframe';
  import { useRoute } from 'vue-router';
  import { ElMessage } from 'element-plus';

  const route = useRoute();

  const isShowLeftMenu = computed(() => {
    return !route.meta.isFull;
  });

  interface Option {
    prefix?: string; // 路径前缀, 例如 /crm-app
    url?: string; // 嵌入页面的地址
    init?: (config: { url: string }) => string | Promise<void>;
    getMenus?: () => Promise<any[]>;
  }

  const props = withDefaults(defineProps<{ option: Option }>(), {
    option: () => ({}),
  });

  const menuRef = ref(null);

  const initUrl = ref('');

  const findMenuByName = (menuList: any[], targetName: string): any | null => {
    let result: any = null;
    menuList.some((item) => {
      if (item.name === targetName) {
        result = item;
        return true;
      }
      if (item.children?.length) {
        result = findMenuByName(item.children, targetName);
        return result !== null;
      }
      return false;
    });
    return result;
  };

  const init = async (firstMenu?: any) => {
    // 从 hash 获取 url
    const code = route.meta.code || '';
    const { isIframe = false, title = '' } = route.meta;
    const appInitUrl = (route.meta.initUrl as string) || '';
    let extUrl = (location.pathname + (location.search || '')).replace(
      `${props.option.prefix}/${code}` || '',
      ''
    );
    if (!extUrl || extUrl === '/') {
      if (firstMenu) {
        const { componentName, redirect, menuCode } = firstMenu;
        extUrl = `?initName=${componentName}&frameUrl=${redirect}&menuCode=${menuCode}`;
      } else if (isIframe) {
        const menuList = props.option?.getMenus ? await props.option?.getMenus() : [];
        const currentMenu = findMenuByName(menuList, title as string);
        if (currentMenu) {
          extUrl = `?initName=${currentMenu.componentName}&frameUrl=${currentMenu.redirect}&menuCode=${currentMenu.menuCode}`;
        }
      } else if (appInitUrl) {
        extUrl = appInitUrl;
      }
    }
    const url = [props.option.url?.replace(/\/$/, ''), extUrl.replace(/^\//, '')].join('/');
    const config = {
      url,
    };
    if (typeof props.option.init === 'function') {
      await props.option.init(config);
    }
    initUrl.value = config.url;
  };

  onMounted(async () => {
    const { isFull } = route.meta;
    if (isFull) {
      init();
    } else {
      const firstMenu = await menuRef.value.getFirstMenu();
      if (firstMenu?.componentName && !firstMenu.componentName?.startsWith('app:')) {
        init(firstMenu);
      } else {
        ElMessage.warning('无菜单');
      }
    }
  });

  const activeMenu = ref({});

  const { iframeRef, postMessage } = useIframe((type, message) => {
    if (type === 'after-route-change') {
      console.log('message=', message);
      const { name, url, frameUrl } = message || {};
      if (name) {
        activeMenu.value = {
          name,
          url,
          frameUrl,
        };
      }
      const code = route.meta.code || '';
      history.replaceState(null, '', `${props.option.prefix}/${code}${url}`);
    }
  });

  const onMenuChange = (menu) => {
    const { componentName, redirect } = menu;
    if (!componentName) {
      return;
    }
    if (componentName === 'frame') {
      postMessage('change-route', { iframeUrl: redirect });
    } else {
      postMessage('change-route', { name: componentName });
    }
  };
</script>

<style scoped lang="scss">
  .system-app {
    width: 100%;
    height: 100%;
    display: flex;
  }
</style>
