import { useStore } from '@/store/modules/useStore';

export const useFullScreen = () => {
  const store = useStore();
  const { toggleFullscreen } = store;
  const isFullscreen = computed(() => store.fullscreen);
  return {
    toggleFullscreen,
    isFullscreen,
  };
};

export default {};
