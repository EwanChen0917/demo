<template>
  <div
    ref="animationContainer"
    :style="{ width: `${width}px`, height: `${height}px` }"
  ></div>
</template>

<script setup lang="ts">
  import lottie from 'lottie-web';
  // import emptyInfo from '@/assets/animations/emptyInfo.json';

  const props = withDefaults(
    defineProps<{
      width?: number; // 宽度
      height?: number; // 高度
      name: string; // 动画名称
      renderer?: 'svg' | 'canvas'; // 渲染方式：svg 或 canvas
      loop?: boolean; // 是否循环
      autoplay?: boolean; // 是否自动播放
    }>(),
    {
      renderer: 'svg',
      loop: true,
      autoplay: true,
    }
  );

  const animationContainer = ref(null);
  onMounted(async () => {
    const module = await import(`../../assets/animations/${props.name}.json`);
    lottie.loadAnimation({
      container: animationContainer.value, // 动画容器
      renderer: props.renderer,
      loop: props.loop,
      autoplay: props.autoplay,
      animationData: module.default, // 动画数据
    });
  });
</script>

<style scoped lang="scss">
  .lottie-container {
    width: 128px;
    height: 128px;
  }
</style>
