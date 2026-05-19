<template>
  <div class="animation-wrapper" ref="animation-wrapper"></div>
</template>

<script lang="ts" setup>
  import { useTemplateRef } from 'vue';
  import lottie, { AnimationItem } from 'lottie-web';

  defineOptions({ name: 'AiAnimation' });
  const props = withDefaults(
    defineProps<{
      autoPlay?: boolean;
    }>(),
    {
      autoPlay: false,
    }
  );

  const animationWrapperRef = useTemplateRef('animation-wrapper');

  let animation: AnimationItem;

  onMounted(async () => {
    const module = await import('@/assets/animations/ai-thumbnail.json');
    animation = lottie.loadAnimation({
      container: animationWrapperRef.value as Element, // 动画容器
      renderer: 'svg',
      loop: true,
      autoplay: props.autoPlay,
      animationData: module.default, // 动画数据
    });
  });
  const onPlay = () => {
    animation?.play();
  };
  const onPause = () => {
    animation?.pause();
  };
  const onStop = () => {
    animation?.stop();
  };
  onUnmounted(() => {
    animation?.destroy();
  });
  defineExpose({
    onPlay,
    onPause,
    onStop,
  });
</script>
