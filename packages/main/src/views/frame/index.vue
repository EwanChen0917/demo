<template>
  <iframe
    class="iframe"
    crossorigin="anonymous"
    ref="frame"
    :src="authUrl"
    frameborder="0"
  ></iframe>
</template>

<script lang="ts" setup name="frame">
  import { decryptByBase64 } from '@/utils/aesTils';

  const authUrl = ref('');
  const route = useRoute();

  watch(
    () => route.params.frameUrl,
    (newUrl) => {
      if (newUrl) {
        authUrl.value = decryptByBase64(newUrl);
      }
    },
    { immediate: true }
  );
</script>

<style scoped lang="scss">
  .iframe {
    width: 100%;
    display: block;
    overflow: auto;
  }
</style>
