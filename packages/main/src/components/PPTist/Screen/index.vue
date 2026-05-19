<template>
  <div class="pptist-screen">
    <BaseView />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted } from 'vue';
  import { KEYS } from '@/components/PPTist/configs/hotkey';
  import useScreening from '@/components/PPTist/hooks/useScreening';

  import BaseView from './BaseView.vue';

  const { exitScreening } = useScreening();

  // 快捷键退出放映
  const keydownListener = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase();
    if (key === KEYS.ESC) exitScreening();
  };

  onMounted(() => document.addEventListener('keydown', keydownListener));
  onUnmounted(() => document.removeEventListener('keydown', keydownListener));
</script>

<style lang="scss" scoped>
  .pptist-screen {
    width: 100vw;
    height: 100vh;
  }
</style>
