<template>
  <el-tooltip
    v-if="isShow"
    :effect="effect"
    :content="content"
    placement="top"
    popper-class="mw-700px"
  >
    <div
      class="content"
      @mouseenter="debouncedShowTips"
      :style="{ '-webkit-line-clamp': line, color: color }"
    >
      {{ content }}
    </div>
  </el-tooltip>

  <div
    v-else
    class="content"
    :style="{ '-webkit-line-clamp': line, color: color }"
    @mouseenter="debouncedShowTips"
  >
    {{ content }}
  </div>
</template>

<script setup lang="ts">
  import { debounce } from 'lodash-es';

  interface Props {
    content: string | number | null;
    effect?: 'dark' | 'light';
    line?: number;
    fontSize?: number;
    color?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    content: '',
    line: 2,
    effect: 'dark',
    fontSize: 12,
  });

  const isShow = ref<boolean>(false);

  const showTips = (e: MouseEvent) => {
    if (!props.content) {
      isShow.value = false;
      return;
    }

    const target = e.target as HTMLElement | null;
    if (!target) return;

    const cellWidth = target.offsetWidth || target.clientWidth;
    if (!cellWidth) return;

    // 通过测量“实际渲染后的高度”判断是否超过 line 行
    // 这样 content 中包含 \n（换行）或自动换行时也能正确判断
    const computedStyle = window.getComputedStyle(target);
    const tester = document.createElement('div');
    tester.style.position = 'absolute';
    tester.style.visibility = 'hidden';
    tester.style.left = '-99999px';
    tester.style.top = '0';
    tester.style.width = `${cellWidth}px`;
    tester.style.fontSize = `${props.fontSize}px`;
    tester.style.fontFamily = computedStyle.fontFamily;
    tester.style.fontWeight = computedStyle.fontWeight;
    tester.style.letterSpacing = computedStyle.letterSpacing;
    tester.style.lineHeight = computedStyle.lineHeight;
    tester.style.whiteSpace = 'pre-wrap'; // 保留 \n 并允许自动换行
    tester.style.wordBreak = 'break-all';
    tester.style.overflowWrap = 'anywhere';
    tester.textContent = props.content.toString();

    document.body.appendChild(tester);

    // 真实测量行高：先测一行字符，再测真实内容高度（避免 line-height: normal 无法解析）
    const originText = tester.textContent || '';
    tester.textContent = 'A';
    tester.style.padding = '0';
    tester.style.border = '0';
    tester.style.boxSizing = 'border-box';
    const singleLineHeight = tester.getBoundingClientRect().height || tester.offsetHeight;

    tester.textContent = originText;
    const contentHeight = tester.scrollHeight;

    // scrollHeight 是内容实际高度；超过 line 行即认为需要 tooltip
    isShow.value = contentHeight > singleLineHeight * (props.line || 1) + 1;

    document.body.removeChild(tester);
  };

  const debouncedShowTips = debounce(showTips, 100);

  onBeforeUnmount(() => {
    debouncedShowTips.cancel();
  });
</script>

<style scoped lang="scss">
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
</style>
