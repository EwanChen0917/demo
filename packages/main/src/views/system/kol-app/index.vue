<template>
  <system-app :option="option" />
</template>

<script setup lang="ts">
  import SystemApp from '@/views/system/components/systemApp.vue';

  const isLocalhost = location.hostname === 'localhost';

  const option = {
    prefix: '/kol-app',
    url: isLocalhost ? 'http://localhost:5175' : 'https://dev.grootuser.com',
  };
</script>

<style scoped lang="scss"></style>
