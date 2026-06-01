<template>
  <system-app :option="option" />
</template>

<script setup lang="ts">
  import SystemApp from '@/views/system/components/systemApp.vue';
  import { useStore } from '@/store/modules/useStore';
  import { getMenus } from "@/views/system/ad-app/menus";

  const store = useStore();

  const isLocalhost = location.hostname === 'localhost';

  const option = computed(() => {
    return {
      prefix: '/ad-app',
      url: isLocalhost ? 'http://localhost:5177' : import.meta.env.VITE_AD_BASE_URL,
      async init(config) {
        const token = await store.token;
        if (!token) {
          return Promise.reject(new Error('登录失败'));
        }
        const urlObj = new URL(config.url);
        urlObj.searchParams.set('token', token);
        config.url = urlObj.toString();
        console.log('config.url=', config.url);
      },
      async getMenus() {
        // return store.nativeMenus;
        return getMenus('lute-platform-ad');
      }
    };
  });
</script>

<style scoped lang="scss"></style>
