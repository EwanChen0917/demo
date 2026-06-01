<template>
  <system-app :option="option" />
</template>

<script setup lang="ts">
  import SystemApp from '@/views/system/components/systemApp.vue';
  import { useStore } from '@/store/modules/useStore';
  import { ElMessage } from "element-plus";

  const store = useStore();


  const handlerMessage = (event) => {
    const type = event.data?.type;
    const data = event.data?.data;
    if(type === 'after-route-change-event') {
      if(data?.url?.startsWith?.('/404')) {
        ElMessage.warning('您暂无该权限，请申请权限后刷新');
      }
    }
  }

  window.addEventListener('message', handlerMessage)

  onBeforeUnmount(()=>{
    window.removeEventListener('message', handlerMessage)
  })


  const isLocalhost = location.hostname === 'localhost';

  const option = computed(() => {
    return {
      prefix: '/kms-app',
      url: isLocalhost ? 'http://localhost:5173' : import.meta.env.VITE_KMS_BASE_URL,
      async init(config) {
        // const token = await store.token;
        // if (!token) {
        //   return Promise.reject(new Error('登录失败'));
        // }
        // const urlObj = new URL(config.url);
        // urlObj.searchParams.set('token', token);
        // config.url = urlObj.toString();
        console.log('config.url=', config.url);
      },
    };
  });
</script>

<style scoped lang="scss"></style>
