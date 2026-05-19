<template>
  <div ref="targetRef" :class="classnames" :style="{ cursor, userSelect }" @mousedown="onMouseDown">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  const emit = defineEmits<{
    paneResizeStart: [pane: HTMLElement, resizer: HTMLElement, size: number];
    paneResize: [pane: HTMLElement, resizer: HTMLElement, size: number];
    paneResizeStop: [pane: HTMLElement, resizer: HTMLElement, size: number];
  }>();

  const props = withDefaults(
    defineProps<{
      layout: string;
    }>(),
    {
      layout: 'vertical',
    }
  );
  const isResizing = ref(false);
  const classnames = computed(() => [
    'multipane',
    `layout-${props.layout.slice(0, 1)}`,
    isResizing.value ? 'is-resizing' : '',
  ]);
  const cursor = computed(() => {
    if (!isResizing.value) return '';
    return props.layout === 'vertical' ? 'col-resize' : 'row-resize';
  });
  const userSelect = computed(() => (isResizing.value ? 'none' : ''));

  const targetRef = ref<HTMLDivElement | null>(null);

  const onMouseDown = ({ target: resizer, pageX: initialPageX, pageY: initialPageY }) => {
    if (typeof resizer.className === 'string' && resizer.className.match('multipane-resizer')) {
      const container = targetRef.value!;
      const pane = resizer.nextSibling; // 返还当前元素的前一个兄弟元素
      const { clientWidth: initialPaneWidth, offsetHeight: initialPaneHeight } = pane;

      const usePercentage = !!`${pane.style.width}`.match('%'); // 宽度是否使用百分比

      const { addEventListener, removeEventListener } = window;

      const resize = (initialSize: number, offset = 0): number => {
        // 垂直布局
        if (props.layout === 'vertical') {
          const containerWidth = container.clientWidth;
          const paneWidth = initialSize - offset;

          pane.style.width = usePercentage
            ? `${(paneWidth / containerWidth) * 100}%`
            : `${paneWidth}px`;
          return pane.style.width;
        }
        // 水平布局
        const containerHeight = container.clientHeight;
        const paneHeight = initialSize - offset;

        pane.style.height = usePercentage
          ? `${(paneHeight / containerHeight) * 100}%`
          : `${paneHeight}px`;
        return pane.style.height;
      };

      // This adds is-resizing class to container
      isResizing.value = true;

      // Resize once to get current computed size
      let size = resize(props.layout === 'vertical' ? initialPaneWidth : initialPaneHeight);

      // Trigger paneResizeStart event
      emit('paneResizeStart', pane, resizer, size);

      const onMouseMove = ({ pageX, pageY }) => {
        size =
          props.layout === 'vertical'
            ? resize(initialPaneWidth, pageX - initialPageX)
            : resize(initialPaneHeight, pageY - initialPageY);

        emit('paneResize', pane, resizer, size);
      };

      const onMouseUp = () => {
        console.log('onMouseUp');
        // Run resize one more time to set computed width/height.
        size = props.layout === 'vertical' ? resize(pane.clientWidth) : resize(pane.offsetHeight);

        // This removes is-resizing class to container
        isResizing.value = false;

        removeEventListener('mousemove', onMouseMove);
        removeEventListener('mouseup', onMouseUp);

        emit('paneResizeStop', pane, resizer, size);
      };

      addEventListener('mousemove', onMouseMove);
      addEventListener('mouseup', onMouseUp);
    }
  };
</script>

<style scoped lang="scss">
  .multipane {
    display: flex;

    &.layout-h {
      flex-direction: column;
    }

    &.layout-v {
      flex-direction: row;
    }
  }

  .multipane > div {
    position: relative;
    z-index: 1;
  }

  .layout-h > :deep(.multipane-resizer) {
    width: 100%;
    height: 10px;
    margin-top: -10px;
    top: 5px;
    cursor: row-resize;
  }

  .layout-v > :deep(.multipane-resizer) {
    width: 10px;
    height: 100%;
    margin-left: -10px;
    left: 5px;
    cursor: col-resize;
  }
</style>
