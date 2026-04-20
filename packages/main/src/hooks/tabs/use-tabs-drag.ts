import type { Sortable } from '@/hooks/event/useSortable';
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useSortable } from '@/hooks/event/useSortable';
// 可能会找到拖拽的子元素，这里需要确保拖拽的dom时tab元素

export function useTabsDrag(props, emit) {
  const sortableInstance = ref<null | Sortable>(null);
  async function initTabsSortable() {
    await nextTick();

    const el = document.querySelectorAll(`.${props.contentClass}`)?.[0] as HTMLElement;

    if (!el) {
      console.warn('Element not found for sortable initialization');
      return;
    }

    const resetElState = async () => {
      el.style.cursor = 'default';
      // el.classList.remove('dragging');
      // el.querySelector('.draggable')?.classList.remove('dragging');
    };

    const { initializeSortable } = useSortable(el, {
      filter: (_evt, target: HTMLElement) => {
        const draggable = target?.classList.contains('draggable');
        return !draggable;
      },
      onEnd(evt) {
        const { newIndex, oldIndex } = evt;
        // const fromElement = evt.item;
        const { srcElement } = (evt as any).originalEvent;

        if (!srcElement) {
          resetElState();
          return;
        }

        if (
          oldIndex !== undefined &&
          newIndex !== undefined &&
          !Number.isNaN(oldIndex) &&
          !Number.isNaN(newIndex) &&
          oldIndex !== newIndex
        ) {
          emit('sortTabs', oldIndex, newIndex);
        }
        resetElState();
      },

      onMove(evt) {
        const isCurrentAffix = evt.dragged.classList.contains('affix-tab');
        const isRelatedAffix = evt.related.classList.contains('affix-tab');
        // 不允许在固定的tab和非固定的tab之间互相拖拽
        return isCurrentAffix === isRelatedAffix;
      },

      /* onStart: () => {
        el.style.cursor = 'grabbing';
        el.querySelector('.draggable')?.classList.add('dragging');
      }, */
    });

    sortableInstance.value = await initializeSortable();
  }

  async function init() {
    await nextTick();
    initTabsSortable();
  }

  onMounted(init);

  onUnmounted(() => {
    sortableInstance.value?.destroy();
  });
}
