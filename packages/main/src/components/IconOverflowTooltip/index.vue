<template>
  <div ref="containerRef" class="overflow-tooltips-container" :style="{ color: color }">
    <div ref="contentRef" class="content" :class="{ 'line-clamp': isShow }">
      {{ content }}
    </div>
    <el-tooltip :effect="effect" :content="content" placement="top-start" popper-class="mw-700px">
      <div><el-icon v-if="isShow" class="Root-tyicon icon-Root-tyxinxizhuangtai-1" /></div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
  import { debounce } from 'lodash-es';

  interface Props {
    content: string;
    effect?: 'dark' | 'light';
    fontSize?: number;
    color?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    content: '',
    line: 2,
    effect: 'dark',
    fontSize: 14,
  });

  const isShow = ref<boolean>(false);
  const containerRef = ref<HTMLElement | null>(null);
  const contentRef = ref<HTMLElement | null>(null);
  const showTips = () => {
    if (!props.content) {
      isShow.value = false;
      return;
    }
    const style = window.getComputedStyle(contentRef.value!);
    const lineHeight = parseFloat(style.lineHeight);
    const height = parseFloat(style.height);
    if (height > lineHeight) {
      isShow.value = true;
    }
  };

  onMounted(() => {
    showTips();
  });
  const debouncedShowTips = debounce(showTips, 100);

  onBeforeUnmount(() => {
    debouncedShowTips.cancel();
  });
</script>

<style scoped lang="scss">
  .overflow-tooltips-container {
    display: flex;
    align-items: center;
    gap: 4px;
    width: calc(100% - 20px);
    .el-tooltip__trigger {
      flex: none;
    }
  }
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }
</style>
