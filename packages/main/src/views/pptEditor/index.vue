<template>
  <div class="ppt-editor-container">
    <PPTistEditor />
  </div>
</template>

<script lang="ts" setup>
  import PPTistEditor from '@/components/PPTist/index.vue';
</script>

<style lang="scss" scoped>
  .ppt-editor-container {
    width: 100%;
    height: calc(100vh - 86px);
    //overflow: hidden;
  }
</style>
