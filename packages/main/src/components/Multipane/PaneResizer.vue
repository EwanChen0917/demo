<template>
  <div class="multipane-resizer"><slot></slot></div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .multipane-resizer {
    display: block;
    position: relative;
    z-index: 2;
  }
</style>
