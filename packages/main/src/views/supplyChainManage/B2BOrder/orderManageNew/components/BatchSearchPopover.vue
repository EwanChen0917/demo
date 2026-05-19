<template>
  <el-popover
    ref="batchSearchPopoverRef"
    trigger="click"
    placement="bottom-end"
    :offset="4"
    :show-arrow="false"
  >
    <template #default>
      <div class="batch-search">
        <el-input
          v-model="batchSearch"
          placeholder="一行一项，按回车键换行，最多支持100行"
          type="textarea"
          :rows="10"
        />
      </div>
      <div class="batch-search-footer">
        <div class="clear" @click="handleClear"><span v-if="batchSearch">清空</span></div>
        <el-space :size="6">
          <el-button size="small" @click="batchSearchPopoverRef?.hide()">取消</el-button>
          <el-button size="small" type="primary" @click="emit('search', batchSearch)">
            搜索
          </el-button>
        </el-space>
      </div>
    </template>
    <template #reference>
      <i class="iconfont icon-piliangsousuo"></i>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import { ElPopover } from 'element-plus';

  const visible = ref(false);

  const emit = defineEmits<{
    (event: 'search', val: string): void;
    (event: 'clear', val?: string): void;
  }>();

  const batchSearchPopoverRef = ref<InstanceType<typeof ElPopover> | null>(null);
  const batchSearch = ref<string>('');

  const clear = () => {
    batchSearch.value = '';
  };
  const handleClear = () => {
    batchSearch.value = '';
    emit('clear');
  };

  const open = () => {
    visible.value = !visible.value;
  };

  defineExpose({
    clear,
    open,
  });
</script>

<style scoped lang="scss">
  .batch-search {
    width: 282px;
    padding: 10px 12px;
  }

  .batch-search-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    border-top: 1px solid #f5f5f5;

    .clear {
      color: #999999;
      font-size: 12px;
      cursor: pointer;
    }
  }

  :deep(.el-textarea) {
    font-size: 12px;

    .el-textarea__inner {
      padding: 0;
      box-shadow: none;
    }
  }

  :deep(.el-button + .el-button) {
    margin-left: 0;
  }
  :deep(.el-space) {
    padding-right: 20px;
    .el-space__item {
      width: 4px;
      // margin-right: 6px !important;
    }
    .el-space__item:nth-child(1) {
      float: left;
    }
    .el-button {
      width: 44px !important;
      display: inherit !important;
    }
    .el-button:not(.el-button--primary) {
      position: relative;
      left: -41px;
      border-color: var(--el-border-color);
    }

    .el-button {
      --el-button-font-weight: var(--el-font-weight-primary);
      --el-button-border-color: var(--el-border-color);
      --el-button-bg-color: var(--el-fill-color-blank);
      --el-button-text-color: var(--el-text-color-regular);
      --el-button-disabled-text-color: var(--el-disabled-text-color);
      --el-button-disabled-bg-color: var(--el-fill-color-blank);
      --el-button-disabled-border-color: var(--el-border-color-light);
      --el-button-divide-border-color: rgba(255, 255, 255, 0.5);
      --el-button-hover-text-color: var(--el-color-primary);
      --el-button-hover-bg-color: var(--el-color-primary-light-9);
      --el-button-hover-border-color: var(--el-color-primary-light-7);
      --el-button-active-text-color: var(--el-button-hover-text-color);
      --el-button-active-border-color: var(--el-color-primary);
      --el-button-active-bg-color: var(--el-button-hover-bg-color);
      --el-button-outline-color: var(--el-color-primary-light-5);
      --el-button-hover-link-text-color: var(--el-text-color-secondary);
      --el-button-active-color: var(--el-text-color-primary);

      color: var(--el-button-text-color);
      background-color: var(--el-button-bg-color);
      border-color: var(--el-button-border-color);

      border-radius: 6px;
      height: 32px;
      padding: 5px 16px;
      &:hover {
        color: var(--el-button-hover-text-color);
        border-color: var(--el-button-hover-border-color);
        background-color: var(--el-button-hover-bg-color);
        outline: none;
      }
      &:active {
        color: var(--el-button-active-text-color);
        border-color: var(--el-button-active-border-color);
        background-color: var(--el-button-active-bg-color);
        outline: none;
      }
    }

    .el-button--small {
      height: 24px;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      line-height: 20px;
      font-weight: 400;
    }
    .el-button--primary {
      --el-button-text-color: var(--el-color-white);
      --el-button-bg-color: var(--el-color-primary);
      --el-button-border-color: var(--el-color-primary);
      --el-button-outline-color: var(--el-color-primary-light-5);
      --el-button-active-color: var(--el-color-primary-dark-2);
      --el-button-hover-text-color: var(--el-color-white);
      --el-button-hover-link-text-color: var(--el-color-primary-light-5);
      --el-button-hover-bg-color: var(--el-color-primary-light-3);
      --el-button-hover-border-color: var(--el-color-primary-light-3);
      --el-button-active-bg-color: var(--el-color-primary-dark-2);
      --el-button-active-border-color: var(--el-color-primary-dark-2);
      --el-button-disabled-text-color: var(--el-color-white);
      --el-button-disabled-bg-color: var(--el-color-primary-light-5);
      --el-button-disabled-border-color: var(--el-color-primary-light-5);

      color: var(--el-button-text-color);
      background-color: var(--el-button-bg-color);
      border-color: var(--el-button-border-color);
      &:hover {
        color: var(--el-button-hover-text-color);
        border-color: var(--el-button-hover-border-color);
        background-color: var(--el-button-hover-bg-color);
        outline: none;
      }
      &:active {
        color: var(--el-button-active-text-color);
        border-color: var(--el-button-active-border-color);
        background-color: var(--el-button-active-bg-color);
        outline: none;
      }
    }
  }
</style>
