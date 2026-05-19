<template>
  <div class="onlyoffice-editor">
    <div ref="container" class="editor-container"></div>
  </div>
</template>

<script setup lang="ts" name="onlyofficeEditor">
  // defineOptions({ name: 'onlyofficeEditor' });

  const route = useRoute();
  const container = ref<HTMLDivElement>();

  const dsBaseUrl = computed(
    () => (route.query.ds as string) || (import.meta.env.VITE_ONLYOFFICE_DS as string) || ''
  );
  const fileUrl = computed(() => (route.query.file as string) || '');
  const fileType = computed(() => (route.query.type as string) || 'pptx');
  const title = computed(() => (route.query.title as string) || '演示文稿');
  const mode = computed<'view' | 'edit'>(() => (route.query.mode as 'view' | 'edit') || 'view');
  const docKey = computed(() => (route.query.key as string) || `${Date.now()}`);
  const callbackUrl = computed(() => (route.query.callback as string) || '');
  const userId = computed(() => (route.query.uid as string) || 'guest');
  const userName = computed(() => (route.query.uname as string) || '访客');

  function loadScript(src: string) {
    return new Promise<void>((resolve, reject) => {
      if (!src) return reject(new Error('DocumentServer base url is empty'));
      const existed = document.querySelector(`script[src="${src}"]`);
      if (existed) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load OnlyOffice api.js'));
      document.body.appendChild(s);
    });
  }

  onMounted(async () => {
    try {
      await loadScript(`${dsBaseUrl.value}/web-apps/apps/api/documents/api.js`);
      const config: any = {
        document: {
          fileType: fileType.value,
          key: docKey.value,
          title: title.value,
          url: fileUrl.value,
        },
        documentType: 'presentation',
        editorConfig: {
          mode: mode.value,
          // callbackUrl 为空则只读或无持久化保存
          ...(callbackUrl.value ? { callbackUrl: callbackUrl.value } : {}),
          user: { id: userId.value, name: userName.value },
          customization: { autosave: true },
        },
        height: '100%',
        width: '100%',
      };
      // @ts-ignore DocsAPI 由 api.js 注入
      // eslint-disable-next-line no-undef
      const editor = new DocsAPI.DocEditor(container.value, config);
      // 可按需暴露给全局调试
      // @ts-ignore
      window.__onlyofficeEditor__ = editor;
    } catch (e) {
      console.error(e);
    }
  });
</script>

<style scoped lang="scss">
  .onlyoffice-editor {
    height: 100%;
    width: 100%;
  }
  .editor-container {
    height: calc(100vh - 90px);
    width: 100%;
    background: #f7f7f7;
  }
</style>
