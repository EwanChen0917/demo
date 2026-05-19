<script lang="ts" setup>
  import { useTabbarStore } from '@/store/modules/useTabbar';

  import { useTabs } from '@/hooks/tabs';

  import Tabs from '@/layout/tabbar/components/tabs.vue';
  import { useTabbar } from './use-tabbar';

  defineProps<{ showIcon?: boolean; theme?: string }>();

  const tabbarStore = useTabbarStore();
  const { unpinTab } = useTabs();

  const { createContextMenus, currentActive, currentTabs, handleClick, handleClose } = useTabbar();
</script>

<template>
  <Tabs
    :active="currentActive"
    :class="theme"
    contentClass="tabs-content"
    :context-menus="createContextMenus"
    :show-icon="showIcon"
    :tabs="currentTabs"
    @close="handleClose"
    @sort-tabs="tabbarStore.sortTabs"
    @unpin="unpinTab"
    @update:active="handleClick"
  />
</template>
