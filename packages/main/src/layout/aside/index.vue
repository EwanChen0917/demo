<template>
  <div class="aside-bar">
    <div class="aside-logo">
      <img src="@/assets/images/logos/aside-logo.svg" alt="" srcset="" @click="router.push('/')" />
    </div>
    <div class="aside-menu"><Menu /></div>
    <div class="aside-footer">
      <ToggleLayout :offset="22" placement="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Menu from './menu.vue';
  import ToggleLayout from '../toggleLayout.vue';

  const router = useRouter();
</script>

<style scoped lang="scss">
  .aside-bar {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    background: #02100f url('../images/aside-bg.svg') center top no-repeat;
    // background-size: cover;
    .aside-logo {
      text-align: center;
      flex-shrink: 0;
    }
    .aside-menu {
      flex: 1;
      overflow: hidden;
    }
    .aside-footer {
      flex-shrink: 0;
      margin-top: 40px;
      text-align: center;
      margin-bottom: 16px;
      padding: 10px;
      :deep(i) {
        font-size: 20px;
        color: #c5c5c5;
      }
    }
  }
</style>
