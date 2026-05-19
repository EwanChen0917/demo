<template>
  <div class="block-title">
    <div class="block-title-inner">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .block-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    color: var(---N9, #1F1F1F);

    /* 重要/Medium 16 */
    font-family: 'PingFang SC Medium';
    font-size: 16px;
    font-style: normal;
    line-height: 24px; /* 150% */

    &:before {
      content: '';
      display: block;
      width: 3px;
      height: 14px;
      border-radius: 15px;
      background: var(--el-color-primary);
    }

    .block-title-inner {
      color: var(---N9, #1f1f1f);
      font-size: 16px;
      flex: 1;
      min-width: 0;
    }
  }
</style>