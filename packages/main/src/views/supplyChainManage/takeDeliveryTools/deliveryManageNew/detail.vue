<template>
  <actions mode="detail" />
</template>

<script setup lang="ts" name="deliveryManageNewDetail">
  import { useRouter } from 'vue-router';
  import actions from './components/actions.vue';

  const router = useRouter();
</script>

<style scoped lang="scss"></style>
