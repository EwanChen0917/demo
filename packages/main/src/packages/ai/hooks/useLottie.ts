import lottie from 'lottie-web';
import type { AnimationConfigWithData, AnimationConfigWithPath, AnimationItem } from 'lottie-web';
import { ShallowRef } from 'vue';

export const useLottie = () => {
  let animationInstance: AnimationItem | null = null;
  let containerRef: HTMLElement | null = null;
  const initLottie = async (
    target: ShallowRef<HTMLElement | null> | HTMLElement,
    options?: Partial<AnimationConfigWithPath>
  ) => {
    nextTick(() => {
      containerRef = isRef(target) ? target.value : target;
      // const module = await import(uri);
      if (containerRef) {
        animationInstance = lottie.loadAnimation({
          container: containerRef,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          ...options,
        });
      }
    });
  };

  onBeforeUnmount(() => {
    animationInstance?.destroy();
  });

  return {
    containerRef,
    initLottie,
  };
};

export default {};
