<template>
  <div class="viewport-background" :style="backgroundStyle">
    <GridLines v-if="gridLineSize" />
  </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useMainStore } from '@/store/modules/main';
  import useSlideBackgroundStyle from '@/components/PPTist/hooks/useSlideBackgroundStyle';
  import type { SlideBackground } from '@/components/PPTist/types/slides';
  import GridLines from './GridLines.vue';

  const { gridLineSize } = storeToRefs(useMainStore());
  const props = defineProps<{
    background?: SlideBackground;
  }>();
  const curBackground = computed<SlideBackground | undefined>(() => props?.background);

  const { backgroundStyle } = useSlideBackgroundStyle(curBackground);
</script>

<style lang="scss" scoped>
  .viewport-background {
    width: 100%;
    height: 100%;
    background-position: center;
    position: absolute;
  }
</style>
