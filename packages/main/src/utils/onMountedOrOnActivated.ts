import { nextTick, onMounted, onActivated } from 'vue';
export const onMountedOrOnActivated = (hook: any) => {
  let mounted: any;
  onMounted(() => {
    hook();
    nextTick(() => {
      mounted = true;
    });
  });
  onActivated(() => {
    if (mounted) {
      hook();
    }
  });
};
