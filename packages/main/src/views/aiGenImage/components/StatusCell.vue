<template>
  <el-popover
    trigger="hover"
    placement="right"
    :width="177"
    :offset="8"
    :show-arrow="true"
    popper-class="ai-image-status-popper"
  >
    <template #default>
      <div class="ai-image-status-panel">
        <div class="ai-image-status-panel__title">生图状态</div>
        <div class="ai-image-status-panel__steps">
          <div
            v-for="(item, index) in options"
            :key="item.value"
            class="ai-image-status-panel__step"
            :class="getStepClass(index)"
          >
            <span class="ai-image-status-panel__indicator"></span>
            <span v-if="index < options.length - 1" class="ai-image-status-panel__line"></span>
            <span class="ai-image-status-panel__label">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #reference>
      <div class="ai-image-status-cell" :class="{ 'is-final': finalStatus }">
        <span class="ai-image-status-cell__dot"></span>
        <span class="ai-image-status-cell__label">{{ statusLabel }}</span>
        <span class="ai-image-status-cell__arrow"></span>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import {
    GENERATE_STATUS_OPTIONS,
    useGenerateStatusOptions,
  } from '../hooks/useGenerateStatusOptions';

  const props = defineProps<{
    status?: number;
    statusName?: string;
  }>();

  const { getStatusIndex, getStatusLabel, isFinalStatus } = useGenerateStatusOptions();

  const options = GENERATE_STATUS_OPTIONS;
  const currentIndex = computed(() => getStatusIndex(props.status, props.statusName));
  const statusLabel = computed(() => getStatusLabel(props.status, props.statusName));
  const finalStatus = computed(() => isFinalStatus(props.status, props.statusName));

  const getStepClass = (index: number) => {
    if (index < currentIndex.value) return 'is-done';
    if (index === currentIndex.value) {
      return statusLabel.value.includes('生成中') ? 'is-running' : 'is-done';
    }
    return 'is-pending';
  };
</script>

<style scoped lang="scss">
  .ai-image-status-cell {
    display: inline-flex;
    align-items: center;
    max-width: 150px;
    color: var(--el-text-color-primary);
    font-size: 12px;
    line-height: 20px;
    cursor: default;

    &__dot {
      width: 6px;
      height: 6px;
      margin-right: 8px;
      flex-shrink: 0;
      border-radius: 50%;
      background: #ff9f22;
    }

    &__label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__arrow {
      width: 6px;
      height: 6px;
      margin-left: 6px;
      flex-shrink: 0;
      border-right: 1px solid var(--el-text-color-secondary);
      border-bottom: 1px solid var(--el-text-color-secondary);
      transform: rotate(45deg) translateY(-2px);
    }

    &.is-final {
      .ai-image-status-cell__dot {
        background: var(--el-color-primary);
      }
    }
  }

  .ai-image-status-panel {
    width: 177px;
    height: 396px;
    padding: 16px;
    border-radius: 10px;
    background: #fff;

    &__title {
      color: var(--el-text-color-primary);
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
    }

    &__steps {
      margin-top: 16px;
    }

    &__step {
      position: relative;
      display: flex;
      align-items: center;
      height: 34px;
      color: var(--el-text-color-primary);
      font-size: 12px;
      line-height: 20px;
    }

    &__indicator {
      position: relative;
      z-index: 1;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      flex-shrink: 0;
      border-radius: 50%;
      border: 1px solid #dfe2e6;
      background: #fff;
    }

    &__line {
      position: absolute;
      left: 7.5px;
      top: 25px;
      width: 1px;
      height: 16px;
      background: #dfe2e6;
    }

    &__label {
      white-space: nowrap;
    }

    .is-done {
      .ai-image-status-panel__indicator {
        border-color: var(--el-color-primary);

        &::after {
          position: absolute;
          left: 4px;
          top: 2px;
          width: 5px;
          height: 8px;
          content: '';
          border-right: 1px solid var(--el-color-primary);
          border-bottom: 1px solid var(--el-color-primary);
          transform: rotate(45deg);
        }
      }
    }

    .is-running {
      .ai-image-status-panel__indicator {
        border-color: var(--el-color-primary);
        border-top-color: transparent;
        animation: ai-image-status-loading 0.8s linear infinite;
      }
    }
  }

  @keyframes ai-image-status-loading {
    to {
      transform: rotate(360deg);
    }
  }
</style>

<style lang="scss">
  .ai-image-status-popper.el-popper {
    padding: 0;
    border: 0;
    border-radius: 10px;
    box-shadow: 0 6px 36px rgba(6, 8, 27, 0.08);
  }
</style>
