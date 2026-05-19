<template>
  <div
    class="affix-container"
    :style="{ '--ai-widget-width': `${width}px` }"
    @click="isVisible = !isVisible"
  >
    <AiAnimation ref="animation-json" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" />
  </div>
  <Transition>
    <ChatWindow v-if="isVisible" @close="isVisible = false" />
  </Transition>
</template>

<script lang="ts" setup>
  import { useTemplateRef } from 'vue';
  import AiAnimation from './components/AiAnimation.vue';
  import ChatWindow from './components/ChatWindow.vue';
  import { initRequestApiKey } from './api/chat';

  defineOptions({ name: 'AiWidget' });
  const props = defineProps<{ apikey: string }>();
  provide('apikey', props.apikey);
  initRequestApiKey(props.apikey);

  const width = ref(40);
  const animationJson = useTemplateRef('animation-json');
  const onMouseEnter = () => {
    animationJson.value?.onPlay();
  };
  const onMouseLeave = () => {
    animationJson.value?.onStop();
  };
  const isVisible = ref(false);
</script>

<style lang="scss" scoped>
  .affix-container {
    position: fixed;
    bottom: 80px;
    right: 12px;
    width: var(--ai-widget-width, '40px');
    z-index: 1000;
    overflow: hidden;
    cursor: pointer;

    .thumbnail {
      width: 40px;
      height: 40px;
      background: url('/images/ai-widget-thumbnail.png') no-repeat center center;
      background-size: contain;
      border-radius: 50%;
    }

    .window {
      display: none;
    }
  }
  .chat-window {
  }
</style>
