import { ref } from 'vue';

export const useIframe = (messageCallback) => {
  const iframeRef = ref<HTMLIFrameElement | null>(null);

  const postMessage = (type: string, data: any) => {
    iframeRef.value?.contentWindow?.postMessage({ type, data }, '*');
  };

  const handleMessage = (event) => {
    const type = event.data?.type;
    const data = event.data?.data;
    if (!type) {
      return;
    }
    messageCallback?.(type, data);
  };

  window.addEventListener('message', handleMessage);
  onUnmounted(() => window.removeEventListener('message', handleMessage));

  return {
    postMessage,
    iframeRef,
  };
};
