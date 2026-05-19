import { useScreenStore, useSlidesStore } from '@/store/modules';
import {
  enterFullscreen,
  exitFullscreen,
  isFullscreen,
} from '@/components/PPTist/utils/fullscreen';
import { useStore } from '@/store/modules/useStore';

export default () => {
  const screenStore = useScreenStore();
  const slidesStore = useSlidesStore();
  const { toggleFullscreen } = useStore();

  // 进入放映状态（从当前页开始）
  const enterScreening = () => {
    enterFullscreen();
    toggleFullscreen();
    screenStore.setScreening(true);
  };

  // 进入放映状态（从第一页开始）
  const enterScreeningFromStart = () => {
    slidesStore.updateSlideIndex(0);
    enterScreening();
  };

  // 退出放映状态
  const exitScreening = () => {
    toggleFullscreen();
    screenStore.setScreening(false);
    if (isFullscreen()) exitFullscreen();
  };

  return {
    enterScreening,
    enterScreeningFromStart,
    exitScreening,
  };
};
