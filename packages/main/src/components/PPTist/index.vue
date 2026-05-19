<template>
  <template v-if="slides.length">
    <Screen v-if="screening" />
    <Editor v-else />
  </template>
  <FullscreenSpin tip="数据加载中，请稍等 ..." v-else loading :mask="false" />
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useScreenStore, useMainStore, useSnapshotStore, useSlidesStore } from '@/store/modules';
  import { LOCALSTORAGE_KEY_DISCARDED_DB } from '@/components/PPTist/configs/storage';
  import { deleteDiscardedDB } from '@/components/PPTist/utils/database';

  import Editor from '@/components/PPTist/editor.vue';
  // import Screen from './views/Screen/index.vue'
  // import FullscreenSpin from '@/components/FullscreenSpin.vue'

  const mainStore = useMainStore();
  const slidesStore = useSlidesStore();
  const snapshotStore = useSnapshotStore();
  const { databaseId } = storeToRefs(mainStore);
  const { slides } = storeToRefs(slidesStore);
  const { screening } = storeToRefs(useScreenStore());

  if (import.meta.env.MODE !== 'development') {
    window.onbeforeunload = () => false;
  }

  // 应用注销时向 localStorage 中记录下本次 indexedDB 的数据库ID，用于之后清除数据库
  window.addEventListener('beforeunload', () => {
    const discardedDB = localStorage.getItem(LOCALSTORAGE_KEY_DISCARDED_DB);
    const discardedDBList: string[] = discardedDB ? JSON.parse(discardedDB) : [];

    discardedDBList.push(databaseId.value);

    const newDiscardedDB = JSON.stringify(discardedDBList);
    localStorage.setItem(LOCALSTORAGE_KEY_DISCARDED_DB, newDiscardedDB);
  });
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>
