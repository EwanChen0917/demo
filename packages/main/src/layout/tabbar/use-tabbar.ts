import type { RouteLocationNormalized } from 'vue-router';

import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useTabs } from '@/hooks/tabs';
import { useTabbarStore } from '@/store/modules/useTabbar';
import { filterTree } from '@/utils/tree';
import { useAccessStore } from '@/store/modules/useAccess';
import { checkPermission } from '@/utils/permission';

type TabDefinition = RouteLocationNormalized;

export function useTabbar() {
  const router = useRouter();
  const route = useRoute();
  const accessStore = useAccessStore();
  const tabbarStore = useTabbarStore();
  // const { contentIsMaximize, toggleMaximize } = useContentMaximize();
  const {
    closeAllTabs,
    closeCurrentTab,
    closeLeftTabs,
    closeOtherTabs,
    closeRightTabs,
    closeTabByKey,
    getTabDisableState,
    openTabInNewWindow,
    refreshTab,
    toggleTabPin,
  } = useTabs();

  const currentActive = computed(() => {
    return route.fullPath;
  });

  // const { locale } = useI18n();
  const currentTabs = ref();
  watch([() => tabbarStore.getTabs, () => tabbarStore.updateTime], ([tabs]) => {
    currentTabs.value = tabs.map((item) => wrapperTabLocale(item));
  });

  /**
   * 初始化固定标签页
   */
  const initAffixTabs = () => {
    const affixTabs = filterTree(router.getRoutes(), (route) => {
      return !!route.meta?.affixTab && checkPermission(route?.name);
    });
    tabbarStore.setAffixTabs(affixTabs);
  };

  // 点击tab,跳转路由
  const handleClick = (key: string) => {
    router.push(key);
  };

  // 关闭tab
  const handleClose = async (key: string) => {
    await closeTabByKey(key);
  };

  function wrapperTabLocale(tab) {
    return {
      ...tab,
      meta: {
        ...tab?.meta,
        title: tab?.meta?.title as string,
      },
    };
  }


  watch(
    () => accessStore.accessMenus,
    () => {
      initAffixTabs();
    },
    { immediate: true }
  );

  watch(
    () => route.path,
    () => {
      // const meta = route.matched?.[route.matched.length - 1]?.meta;
      tabbarStore.addTab({
        ...route,
        // meta: meta || route.meta,
      });

    },
    { immediate: true }
  );

  const createContextMenus = (tab: TabDefinition) => {
    const {
      disabledCloseAll,
      disabledCloseCurrent,
      disabledCloseLeft,
      disabledCloseOther,
      disabledCloseRight,
      disabledCancelAffix,
      disabledRefresh,
    } = getTabDisableState(tab);

    const affixTab = tab?.meta?.affixTab ?? false;

    const menus = [
      {
        disabled: disabledCloseCurrent,
        handler: async () => {
          await closeCurrentTab(tab);
        },
        // icon: X,
        key: 'close',
        text: '关闭当前页面',
      },
      {
        disabled: disabledCancelAffix,
        handler: async () => {
          await toggleTabPin(tab);
        },
        // icon: affixTab ? PinOff : Pin,
        key: 'affix',
        text: affixTab ? '取消固定当前页面' : '固定当前页面',
      },
      {
        disabled: disabledRefresh,
        handler: refreshTab,
        // icon: RotateCw,
        key: 'reload',
        text: '刷新当前页面',
      },
      /* {
        handler: async () => {
          await openTabInNewWindow(tab);
        },
        // icon: ExternalLink,
        key: 'open-in-new-window',
        separator: true,
        text: '在新窗口打开',
      }, */

      {
        disabled: disabledCloseLeft,
        handler: async () => {
          await closeLeftTabs(tab);
        },
        // icon: ArrowLeftToLine,
        key: 'close-left',
        text: '关闭左侧页面',
      },
      {
        disabled: disabledCloseRight,
        handler: async () => {
          await closeRightTabs(tab);
        },
        // icon: ArrowRightToLine,
        key: 'close-right',
        separator: true,
        text: '关闭右侧页面',
      },
      {
        disabled: disabledCloseOther,
        handler: async () => {
          await closeOtherTabs(tab);
        },
        // icon: FoldHorizontal,
        key: 'close-other',
        text: '关闭其它页面',
      },
      {
        disabled: disabledCloseAll,
        handler: closeAllTabs,
        // icon: ArrowRightLeft,
        key: 'close-all',
        text: '关闭全部页面',
      },
    ];
    return menus;
  };

  return {
    createContextMenus,
    currentActive,
    currentTabs,
    handleClick,
    handleClose,
  };
}
