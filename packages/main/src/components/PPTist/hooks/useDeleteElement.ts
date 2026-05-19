import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/modules/main';
import { useSlidesStore } from '@/store/modules/slides';
import useHistorySnapshot from '@/components/PPTist/hooks/useHistorySnapshot';
import type { PPTElement } from '@/components/PPTist/types/slides';

export default () => {
  const mainStore = useMainStore();
  const slidesStore = useSlidesStore();
  const { activeElementIdList, activeGroupElementId } = storeToRefs(mainStore);
  const { currentSlide } = storeToRefs(slidesStore);

  const { addHistorySnapshot } = useHistorySnapshot();

  // 删除全部选中元素
  // 组合元素成员中，存在被选中可独立操作的元素时，优先删除该元素。否则默认删除所有被选中的元素
  const deleteElement = () => {
    if (!activeElementIdList.value.length) return;

    let newElementList: PPTElement[] = [];
    if (activeGroupElementId.value) {
      newElementList = currentSlide.value.elements.filter(
        (el) => el.id !== activeGroupElementId.value
      );
    } else {
      newElementList = currentSlide.value.elements.filter(
        (el) => !activeElementIdList.value.includes(el.id)
      );
    }

    mainStore.setActiveElementIdList([]);
    slidesStore.updateSlide({ elements: newElementList });
    addHistorySnapshot();
  };

  // 删除内面内全部元素(无论是否选中)
  const deleteAllElements = () => {
    if (!currentSlide.value.elements.length) return;
    mainStore.setActiveElementIdList([]);
    slidesStore.updateSlide({ elements: [] });
    addHistorySnapshot();
  };

  return {
    deleteElement,
    deleteAllElements,
  };
};
