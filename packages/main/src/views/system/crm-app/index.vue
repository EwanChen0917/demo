<template>
  <system-app :option="option" />
</template>

<script setup lang="ts">
  import SystemApp from '@/views/system/components/systemApp.vue';
  import { useStore } from '@/store/modules/useStore';
  import { platformApi } from "@/api";
  import { getMenus } from "@/views/system/crm-app/menus";
  const store = useStore();

  const isLocalhost =false && location.hostname === 'localhost';

  const option = computed(() => {
    return {
      prefix: '/crm-app',
      url: isLocalhost ? 'http://localhost:5176' : import.meta.env.VITE_CRM_BASE_URL,
      async init(config) {
        const token = await store.getMdpToken();
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
        return getMenus('lute_cms');
      }
    };
  });
</script>

<style scoped lang="scss"></style>
