<template>
  <div>
    <el-button
      class="report-drawer-btn"
      type="primary"
      :icon="visible ? 'ArrowRightBold' : 'ArrowLeftBold'"
      @click="visible = !visible"
    />
  </div>
</template>

<script setup lang="ts">
  const visible = defineModel<boolean>();
  // watch(visible, (val) => {
  //   store.setMenuCollapse(!!val);
  // });
</script>

<style lang="scss" scoped>
  .report-drawer-btn {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    transform: translate(-100%, -50%);
    left: 0;
    z-index: 1;
    height: 113px;
    width: 20px;
    padding: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    opacity: 0.45;
  }
</style>
