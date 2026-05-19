<template>
  <div class="ai-image-task-info">
    <el-image
      v-if="row.spuImage"
      class="ai-image-task-info__image"
      :src="row.spuImage"
      fit="cover"
      lazy
    >
      <template #placeholder>
        <div class="ai-image-task-info__fallback">
          <img class="ai-image-task-info__fallback-image" :src="defaultImage" alt="" />
        </div>
      </template>
      <template #error>
        <div class="ai-image-task-info__fallback">
          <img class="ai-image-task-info__fallback-image" :src="defaultImage" alt="" />
        </div>
      </template>
    </el-image>
    <div v-else class="ai-image-task-info__image ai-image-task-info__fallback">
      <img class="ai-image-task-info__fallback-image" :src="defaultImage" alt="" />
    </div>
    <div class="ai-image-task-info__content">
      <el-tooltip :content="taskName" placement="top-start" :offset="4">
        <div class="ai-image-task-info__title">
          <div class="ai-image-task-info__title-text">
            <template v-for="(segment, index) in titleSegments" :key="`${segment.text}-${index}`">
              <span :class="{ 'is-highlight': segment.highlight }">{{ segment.text }}</span>
            </template>
          </div>
          <span v-if="taskName" class="ai-image-task-info__arrow"></span>
        </div>
      </el-tooltip>
      <el-tooltip
        :content="description"
        placement="top-start"
        :disabled="!description || description === '-'"
        :offset="4"
      >
        <div class="ai-image-task-info__description">{{ description }}</div>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { AiGenerateImageContracts } from '@/api';
  import defaultImage from '../assets/images/default-image.svg';

  const props = defineProps<{
    row: AiGenerateImageContracts.TaskListItemBean;
    keyword?: string;
  }>();

  const taskName = computed(() => props.row.taskName || '-');
  const description = computed(() => props.row.description || '-');

  const titleSegments = computed(() => {
    const keyword = props.keyword?.trim();
    if (!keyword || !props.row.taskName) {
      return [{ text: taskName.value, highlight: false }];
    }

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const reg = new RegExp(`(${escapedKeyword})`, 'gi');
    return taskName.value
      .split(reg)
      .filter(Boolean)
      .map((text) => ({
        text,
        highlight: text.toLowerCase() === keyword.toLowerCase(),
      }));
  });
</script>

<style scoped lang="scss">
  .ai-image-task-info {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    height: 44px;

    &__image {
      width: 44px;
      height: 44px;
      flex-shrink: 0;
      overflow: hidden;
      border-radius: 6px;
      background: var(--el-fill-color-light);
    }

    &__fallback {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: #f5f7fa;
      color: #b6babf;
    }

    &__fallback-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__content {
      min-width: 0;
      flex: 1;
    }

    &__title {
      display: inline-flex;
      align-items: center;
      max-width: 100%;
      min-width: 0;
      color: var(--el-text-color-primary);
      font-size: 13px;
      font-weight: 500;
      line-height: 22px;

      .is-highlight {
        color: var(--el-color-primary);
      }
    }

    &__title-text {
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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

    &__description {
      display: block;
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      color: var(--el-text-color-secondary);
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
