<template>
  <el-drawer
    class="ai-image-drawer"
    :class="{ 'is-fullscreen': isFullscreen }"
    :model-value="props.modelValue"
    :size="drawerSize"
    :with-header="false"
    :close-on-click-modal="props.closeOnClickModal"
    :close-on-press-escape="props.closeOnPressEscape"
    append-to-body
    destroy-on-close
    @close="handleDrawerClose"
  >
    <div class="ai-image-drawer-shell">
      <div class="ai-image-drawer-shell__header">
        <div class="ai-image-drawer-shell__title">{{ props.title }}</div>
        <div class="ai-image-drawer-shell__tools">
          <slot name="header-tools"></slot>
          <el-tooltip
            v-if="props.showFullscreenButton"
            :content="isFullscreen ? '退出全屏' : '全屏查看'"
            placement="top"
          >
            <button
              class="ai-image-drawer-shell__tool-button"
              type="button"
              :aria-label="isFullscreen ? '退出全屏' : '全屏查看'"
              @click="toggleFullscreen"
            >
              <i
                class="iconfont ai-image-drawer-shell__tool-icon"
                :class="isFullscreen ? 'icon-shouqiquanping' : 'icon-quanping'"
              ></i>
            </button>
          </el-tooltip>
          <el-tooltip v-if="props.showRefreshButton" content="刷新" placement="top">
            <button
              class="ai-image-drawer-shell__tool-button"
              type="button"
              aria-label="刷新"
              :disabled="props.refreshDisabled"
              @click="emit('refresh')"
            >
              <i
                class="Root-tyicon ai-image-drawer-shell__tool-icon"
                :class="['icon-Root-tyshuaxin', { 'is-disabled': props.refreshDisabled }]"
              ></i>
            </button>
          </el-tooltip>
          <slot name="header-close"></slot>
          <button
            v-if="props.showCloseButton"
            class="ai-image-drawer-shell__icon"
            type="button"
            @click="emit('close')"
          >
            <i class="Root-tyicon icon-Root-tyguanbi ai-image-drawer-shell__tool-icon"></i>
          </button>
        </div>
      </div>
      <div v-loading="props.loading" class="ai-image-drawer-shell__body" :class="props.bodyClass">
        <slot></slot>
      </div>
      <div v-if="$slots.footer" class="ai-image-drawer-shell__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';

  const props = withDefaults(
    defineProps<{
      modelValue: boolean;
      title: string;
      size?: string;
      loading?: boolean;
      bodyClass?: string;
      closeOnClickModal?: boolean;
      closeOnPressEscape?: boolean;
      showCloseButton?: boolean;
      showFullscreenButton?: boolean;
      showRefreshButton?: boolean;
      refreshDisabled?: boolean;
    }>(),
    {
      size: '860px',
      loading: false,
      bodyClass: '',
      closeOnClickModal: true,
      closeOnPressEscape: true,
      showCloseButton: true,
      showFullscreenButton: true,
      showRefreshButton: false,
      refreshDisabled: false,
    }
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void;
    (e: 'refresh'): void;
  }>();

  const isFullscreen = ref(false);

  const drawerSize = computed(() => {
    return isFullscreen.value ? '100vw' : props.size;
  });

  const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value;
  };

  const handleDrawerClose = () => {
    emit('update:modelValue', false);
    emit('close');
  };

  watch(
    () => props.modelValue,
    (value) => {
      if (!value) isFullscreen.value = false;
    }
  );
</script>

<style scoped lang="scss">
  .ai-image-drawer-shell {
    --ai-drawer-primary: #02b96b;
    --ai-drawer-text: #262626;
    --ai-drawer-secondary-text: #8a9099;
    --ai-drawer-border: #f4f5f5;
    --ai-drawer-input-border: #dfe2e6;
    --ai-drawer-fill: #fafafa;

    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
    background: #fff;
    color: var(--ai-drawer-text);
    font-size: 12px;
    line-height: 20px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding: 0 20px;
      flex-shrink: 0;
      border-bottom: 1px solid var(--ai-drawer-border);
    }

    &__title {
      color: var(--ai-drawer-text);
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
    }

    &__tools {
      display: inline-flex;
      align-items: center;
      gap: 12px;
    }

    &__tool-button,
    &__icon {
      position: relative;
      width: 16px;
      height: 16px;
      padding: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
      color: #666666;
      font-size: 16px;
    }

    &__tool-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;

      &:hover {
        color: var(--ai-drawer-secondary-text);
      }
    }

    &__tool-icon {
      line-height: 1;

      &.is-disabled {
        color: #c0c4cc;
      }
    }

    &__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;

      &:hover {
        color: var(--ai-drawer-secondary-text);
      }
    }

    &__body {
      min-height: 0;
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 64px;
      padding: 0 20px;
      flex-shrink: 0;
      border-top: 1px solid var(--ai-drawer-border);
      background: #fff;
      box-shadow: 0 -3px 16px rgba(0, 0, 0, 0.04);
    }

    .Root-tyicon,
    .iconfont {
      font-size: 14px !important;
      color: #999;
    }
  }
</style>

<style lang="scss">
  .ai-image-drawer.el-drawer {
    box-shadow: -6px 0 8px rgba(0, 0, 0, 0.04);

    .el-drawer__body {
      height: 100%;
      padding: 0;
      max-width: 1200px;
      min-width: 860px;
      margin: 0 auto;
    }
  }

  .ai-image-drawer .ai-image-drawer-shell__body {
    scrollbar-color: #b9c0c8 transparent;
  }

  .ai-image-drawer .ai-image-drawer-shell__body::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
  }

  .ai-image-drawer .ai-image-drawer-shell__body::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background-color: #ccc;
  }

  .ai-image-drawer .ai-image-drawer-shell__body::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .ai-image-drawer.el-drawer.is-fullscreen {
    max-width: 100vw;
  }
</style>
