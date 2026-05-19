<template>
  <div class="ai-product-material">
    <div class="ai-product-material__head">
      <div>
        <div class="ai-product-material__name">{{ group.title }}</div>
      </div>
      <div class="ai-product-material__pager">
        <button type="button" :disabled="group.pageNum <= 1" @click="emitPage(group.pageNum - 1)">
          ‹
        </button>
        <span>{{ group.pageNum }}</span>
        <span>/</span>
        <span>{{ group.pages || 1 }}</span>
        <button
          type="button"
          :disabled="group.pageNum >= (group.pages || 1)"
          @click="emitPage(group.pageNum + 1)"
        >
          ›
        </button>
      </div>
    </div>
    <div v-loading="group.loading" class="ai-product-material__images">
      <button
        v-for="image in group.images"
        :key="image.id"
        type="button"
        class="ai-product-material__image"
        :class="{ 'is-selected': group.selectedId === image.id }"
        @click="emit('select', image.id)"
      >
        <el-image :src="image.imageUrl" fit="cover" />
        <span class="ai-product-material__check">
          <i class="iconfont Root-tyicon icon-Root-tychenggongzhuangtai"></i>
        </span>
      </button>
      <div v-if="!group.images.length && !group.loading" class="ai-product-material__empty">
        暂未匹配到素材
      </div>
    </div>
    <button class="ai-product-material__upload" type="button" @click="emit('upload')">
      <i class="iconfont Root-tyicon icon-Root-tyjia ai-product-material__upload-icon"></i>
      <span class="ai-product-material__upload-text">添加图片</span>
      <em v-if="group.uploading" class="ai-product-material__upload-status">上传中</em>
    </button>
  </div>
</template>

<script setup lang="ts">
  import type { ProductMaterialGroup } from '../../types';

  const props = defineProps<{
    group: ProductMaterialGroup;
  }>();

  const emit = defineEmits<{
    (e: 'select', id: string): void;
    (e: 'upload'): void;
    (e: 'pageChange', pageNum: number): void;
  }>();

  const emitPage = (pageNum: number) => {
    if (pageNum < 1 || pageNum > (props.group.pages || 1)) return;
    emit('pageChange', pageNum);
  };
</script>

<style scoped lang="scss">
  .ai-product-material {
    & + & {
      margin-top: 18px;
      padding-top: 18px;
      border-top: 1px solid var(--ai-drawer-border);
    }

    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    &__name {
      color: var(--ai-drawer-text);
      font-size: 12px;
      line-height: 20px;
    }

    &__pager {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: var(--ai-drawer-secondary-text);
      font-size: 12px;

      button {
        width: 18px;
        height: 18px;
        padding: 0;
        border: 0;
        background: transparent;
        color: #a8afb8;
        cursor: pointer;

        &:disabled {
          opacity: 0.36;
          cursor: not-allowed;
        }
      }
    }

    &__images {
      display: grid;
      min-height: 116px;
      grid-template-columns: repeat(8, 1fr);
      gap: 12px;
    }

    &__image {
      position: relative;
      height: 116px;
      overflow: hidden;
      padding: 0;
      border: 0;
      border-radius: 4px;
      background: #f7f8fa;
      cursor: pointer;

      .el-image {
        width: 100%;
        height: 100%;
      }
    }

    &__check {
      position: absolute;
      left: 6px;
      top: 6px;
      display: inline-flex;
      width: 12px;
      height: 12px;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border: 0;
      border-radius: 50%;
      background: rgba(138, 144, 153, 0.75);

      .iconfont {
        display: none;
        width: 14px;
        height: 14px;
        align-items: center;
        justify-content: center;
        color: var(--ai-drawer-primary);
        font-size: 14px;
        line-height: 1;
      }
    }

    .is-selected {
      .ai-product-material__check {
        border-color: transparent;
        background: transparent;

        .iconfont {
          display: block;
        }
      }
    }

    &__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      grid-column: 1 / -1;
      border: 1px dashed #dfe2e6;
      border-radius: 4px;
      color: var(--ai-drawer-secondary-text);
    }

    &__upload {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--ai-drawer-secondary-text);
      font-size: 12px;
      line-height: 20px;
      cursor: pointer;

      &-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--ai-drawer-secondary-text);
        font-size: 14px;
        line-height: 1;
      }

      &-text {
        display: inline-flex;
        align-items: center;
        line-height: 20px;
      }

      &-status {
        display: inline-flex;
        align-items: center;
        margin-left: 6px;
        color: var(--ai-drawer-primary);
        font-style: normal;
        line-height: 20px;
      }

      &:hover {
        color: var(--ai-drawer-primary);
      }
    }
  }
</style>
