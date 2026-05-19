<template>
  <div class="lute-assistant-container">
    <iframe
      id="aiassistant-app"
      ref="iframeRef"
      :src="luteAssistantUrl"
      frameborder="0"
      allow="clipboard-write; clipboard-read"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script setup lang="ts" name="LuteAssistantApp">
  import { useStore } from '@/store/modules/useStore';
  import { getCookieToken } from '@/hooks/web/useCookie';

  const store = useStore();
  const route = useRoute();
  const iframeRef = ref<HTMLIFrameElement | null>(null);

  // 各环境 AI 站点 origin
  const AI_ORIGIN_MAP: Record<string, string> = {
    dev: 'http://localhost:8888',
    test: 'https://ai.luteos.site',
    prod: 'https://ai.luteos.com',
  };

  // 默认路由路径（hash 模式）
  const AI_DEFAULT_PATH = '/#/chat';

  const AI_URL_MAP: Record<string, string> = {
    dev: `${AI_ORIGIN_MAP.dev}${AI_DEFAULT_PATH}`,
    test: `${AI_ORIGIN_MAP.test}${AI_DEFAULT_PATH}`,
    prod: `${AI_ORIGIN_MAP.prod}${AI_DEFAULT_PATH}`,
  };

  // 记录已消费的 questionWords 值（用于对比判断是否为新的提问）
  const consumedQuestionWords = ref('');

  // 生成带缓存清除参数的URL，每次组件挂载时生成新的时间戳以避免iframe页面缓存
  // 支持通过 url 的 redirect 参数跳转到指定路由
  // 支持通过 url 的 questionWords 参数自动发起对话
  const getUrlWithCacheBuster = () => {
    const origin = AI_ORIGIN_MAP[import.meta.env.MODE] || AI_ORIGIN_MAP.prod;

    // 从当前页面 URL 获取 redirect 参数并解码
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');

    // 仅当 questionWords 是新的（未消费过的）才拼入 URL
    const rawQuestionWords = (route.params.questionWords as string) || '';
    const questionWords =
      rawQuestionWords && rawQuestionWords !== consumedQuestionWords.value ? rawQuestionWords : '';

    let targetUrl: string;
    if (redirect) {
      // redirect 参数已做 URL 编码，URLSearchParams.get 会自动解码一次
      const decodedPath = decodeURIComponent(redirect);
      targetUrl = `${origin}${decodedPath}`;
    } else {
      targetUrl = AI_URL_MAP[import.meta.env.MODE] || AI_URL_MAP.prod;
    }

    // 在 hash 部分追加查询参数
    const hashParams: string[] = [];
    if (questionWords) {
      hashParams.push(`questionWords=${encodeURIComponent(questionWords)}`);
    }
    hashParams.push(`_t=${Date.now()}`);

    const separator = targetUrl.includes('?') ? '&' : '?';
    return `${targetUrl}${separator}${hashParams.join('&')}`;
  };

  const luteAssistantUrl = ref<string>(getUrlWithCacheBuster());

  // 记录是否已完成首次加载
  const hasInitialLoaded = ref(false);

  // 向 iframe 发送用户信息
  const sendUserInfoToIframe = () => {
    const iframe = iframeRef.value;
    if (!iframe?.contentWindow) return;

    const token = getCookieToken() || store.token;
    const memberCode = store.userInfo?.memberCode;

    // 只需要 token 存在就发送，memberCode 可选
    if (token) {
      const targetOrigin = AI_ORIGIN_MAP[import.meta.env.MODE] || AI_ORIGIN_MAP.prod;
      iframe.contentWindow.postMessage(
        {
          type: 'LUTE_OS_AUTH',
          token,
          memberCode: memberCode || '',
        },
        targetOrigin
      );
      console.log('[lute-os-view] 已向路小特发送用户信息');
    }
  };

  // iframe 加载完成后发送用户信息
  const onIframeLoad = () => {
    hasInitialLoaded.value = true;
    // 记录当前 questionWords 为已消费，防止 tab 切换时重复触发
    const currentQuestionWords = (route.params.questionWords as string) || '';
    if (currentQuestionWords) {
      consumedQuestionWords.value = currentQuestionWords;
    }
    sendUserInfoToIframe();
  };

  // 监听 store 变化，当用户信息更新时重新发送
  watch(
    () => [store.token, store.userInfo?.memberCode],
    () => {
      sendUserInfoToIframe();
    }
  );

  // 监听来自 lute-assistant 的消息
  const handleIframeMessage = (event: MessageEvent) => {
    // 处理来自 lute-assistant 的 token 请求（用于初始化）
    if (event.data?.type === 'LUTE_ASSISTANT_REQUEST_AUTH') {
      console.log('[lute-os-view] 收到 lute-assistant 请求认证信息');
      sendUserInfoToIframe();
    }

    // 处理来自 lute-assistant 的刷新请求（token 过期时）
    if (event.data?.type === 'LUTE_ASSISTANT_REFRESH_PARENT') {
      console.log('[lute-os-view] 收到 lute-assistant 刷新请求，刷新页面');
      window.location.reload();
    }
  };

  onMounted(() => {
    window.addEventListener('message', handleIframeMessage);
    sendUserInfoToIframe();
  });

  onUnmounted(() => {
    window.removeEventListener('message', handleIframeMessage);
  });

  onActivated(() => {
    // 组件激活时，重新发送 token 给 iframe
    sendUserInfoToIframe();

    // keep-alive 导致 DOM 重新挂载时，iframe 可能重新加载 src 中的 URL
    // 重新生成 URL：如果有新的 questionWords 则携带，否则使用干净 URL
    if (hasInitialLoaded.value) {
      luteAssistantUrl.value = getUrlWithCacheBuster();
    }
  });
</script>

<style scoped lang="scss">
  .lute-assistant-container,
  #aiassistant-app {
    width: 100%;
    height: calc(100vh - 92px);
  }
</style>
