<template>
  <div class="ai-result-gallery" :class="`is-${variant}`">
    <div v-for="group in groups" :key="group.title" class="ai-result-gallery__group">
      <div class="ai-result-gallery__title">
        <span>{{ group.title }}</span>
        <slot name="group-title-extra" :group="group"></slot>
      </div>
      <div v-if="group.images.length" class="ai-result-gallery__grid">
        <div
          v-for="(image, index) in group.images"
          :key="getGalleryImageKey(image, index)"
          class="ai-result-gallery__item"
          :class="{
            'is-placeholder': image.isPlaceholder || !image.imageUrl,
            'is-placeholder-animated':
              placeholderAnimated && (image.isPlaceholder || !image.imageUrl),
            'is-selectable': isImageSelectable(image),
            'is-selected': isImageSelected(image, index),
          }"
          :style="getImageStyle(image)"
          @click="handleToggleSelect(image, index)"
        >
          <el-image
            v-if="image.imageUrl"
            class="ai-result-gallery__image"
            :src="image.imageUrl"
            fit="cover"
            lazy
            :scroll-container="scrollContainer"
            :preview-src-list="selectable ? [] : previewList"
            :initial-index="selectable ? 0 : getPreviewIndex(image.imageUrl)"
            preview-teleported
          >
            <template #placeholder>
              <div class="ai-result-gallery__loading">
                <span class="ai-result-gallery__loading-spinner"></span>
                <!-- <em>加载中...</em> -->
              </div>
            </template>
          </el-image>
          <img
            v-else
            class="ai-result-gallery__placeholder-icon"
            :src="imageAiPlaceholder"
            alt=""
          />
          <span
            v-if="selectable && isImageSelectable(image)"
            class="ai-result-gallery__check"
          ></span>
          <span v-if="image.sizeSpec" class="ai-result-gallery__size">{{ image.sizeSpec }}</span>
        </div>
      </div>
      <el-empty v-else :image-size="72" description="暂无图片" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { ResultImageGroup, ResultImageItem } from '../../types';
  import { getResultImageKey, parseResultImageSizeSpec } from '../../utils/resultImage';

  const imageAiPlaceholder = new URL('../../assets/images/image-ai.svg', import.meta.url).href;

  const props = withDefaults(
    defineProps<{
      groups: ResultImageGroup[];
      selectable?: boolean;
      selectPlaceholder?: boolean;
      placeholderAnimated?: boolean;
      selectedKeys?: string[];
      scrollContainer?: string;
      variant?: 'result' | 'detail';
    }>(),
    {
      selectable: false,
      selectPlaceholder: false,
      placeholderAnimated: false,
      selectedKeys: () => [],
      scrollContainer: '.ai-image-drawer-shell__body',
      variant: 'result',
    }
  );

  const emit = defineEmits<{
    (e: 'toggleSelect', image: ResultImageItem, key: string): void;
  }>();

  const previewList = computed(() => {
    return props.groups.flatMap((group) =>
      group.images.map((image) => image.imageUrl || '').filter(Boolean)
    );
  });

  const getImageStyle = (image: ResultImageItem) => {
    const size = parseResultImageSizeSpec(image.sizeSpec);
    const ratio = size?.ratio || 1.56;
    return {
      aspectRatio: String(ratio),
    };
  };

  const getPreviewIndex = (imageUrl?: string) => {
    return Math.max(
      0,
      previewList.value.findIndex((item) => item === imageUrl)
    );
  };

  const getGalleryImageKey = (image: ResultImageItem, index: number) => {
    return getResultImageKey(image, `${image.channel || 'placeholder'}-${image.sizeSpec || index}`);
  };

  const isImageSelectable = (image: ResultImageItem) => {
    if (!props.selectable) return false;
    if (image.isPlaceholder) return props.selectPlaceholder;
    return Boolean(image.imageUrl);
  };

  const isImageSelected = (image: ResultImageItem, index: number) => {
    return props.selectedKeys.includes(getGalleryImageKey(image, index));
  };

  const handleToggleSelect = (image: ResultImageItem, index: number) => {
    if (!isImageSelectable(image)) return;
    emit('toggleSelect', image, getGalleryImageKey(image, index));
  };
</script>

<style scoped lang="scss">
  .ai-result-gallery {
    &__group + &__group {
      margin-top: 28px;
    }

    &__title {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      color: var(--ai-drawer-secondary-text);
      font-size: 12px;
      line-height: 20px;
    }

    &__grid {
      display: grid;
      max-width: 100%;
      align-items: flex-start;
      gap: 20px;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      overflow-x: hidden;
    }

    &__item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 96px;
      max-height: 240px;
      overflow: hidden;
      border-radius: 10px;
      background: var(--el-fill-color-light);

      &.is-placeholder {
        border: 1px dashed #d7dce2;
        background: #f5f7fa;
      }

      &.is-placeholder-animated {
        animation: ai-result-gallery-placeholder-breathe 1.8s ease-in-out infinite;

        .ai-result-gallery__placeholder-icon {
          animation: ai-result-gallery-placeholder-icon-breathe 1.8s ease-in-out infinite;
        }
      }

      &.is-selectable {
        cursor: pointer;
      }

      &.is-selected {
        .ai-result-gallery__check {
          border-color: var(--ai-drawer-primary);
          background: var(--ai-drawer-primary);

          &::after {
            position: absolute;
            left: 5px;
            top: 2px;
            width: 4px;
            height: 7px;
            content: '';
            border-right: 1px solid #fff;
            border-bottom: 1px solid #fff;
            transform: rotate(45deg);
          }
        }
      }
    }

    &__image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__loading {
      display: flex;
      width: 100%;
      height: 100%;
      min-height: 96px;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
      background: linear-gradient(135deg, #f7f9fc 0%, #eef3f9 100%);
      color: #8a9099;
      font-size: 12px;
      line-height: 20px;

      em {
        font-style: normal;
      }
    }

    &__loading-spinner {
      width: 22px;
      height: 22px;
      box-sizing: border-box;
      border: 2px solid rgba(2, 185, 107, 0.18);
      border-top-color: var(--ai-drawer-primary);
      border-radius: 50%;
      animation: ai-result-gallery-loading-spin 0.9s linear infinite;
    }

    &__size {
      position: absolute;
      right: 6px;
      top: 6px;
      height: 24px;
      padding: 0 8px;
      border-radius: 24px;
      background: rgba(0, 0, 0, 0.46);
      color: #fff;
      font-size: 12px;
      line-height: 24px;
    }

    &__placeholder-icon {
      display: block;
      width: 24px;
      height: 24px;
      object-fit: contain;
    }

    &__check {
      position: absolute;
      left: 10px;
      top: 10px;
      z-index: 1;
      width: 16px;
      height: 16px;
      box-sizing: border-box;
      border: 1px solid #fff;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.5);
    }

    &.is-detail {
      .ai-result-gallery__grid {
        gap: 20px;
      }
    }
  }

  @keyframes ai-result-gallery-placeholder-breathe {
    0%,
    100% {
      // background: #f5f7fa;
      // border-color: #d7dce2;
      // box-shadow: 0 0 0 rgba(64, 158, 255, 0);
      opacity: 0.65;
    }

    50% {
      // background: #eef3f9;
      // border-color: #c6d3e1;
      // box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.08);
      opacity: 1;
    }
  }

  @keyframes ai-result-gallery-placeholder-icon-breathe {
    0%,
    100% {
      opacity: 0.65;
      // transform: scale(1);
    }

    50% {
      opacity: 1;
      // transform: scale(1.06);
    }
  }

  @keyframes ai-result-gallery-loading-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
