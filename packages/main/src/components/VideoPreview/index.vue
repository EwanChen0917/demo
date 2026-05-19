<template>
  <div v-if="visible" class="el-image-viewer__wrapper" style="z-index: 3050">
    <div class="el-image-viewer__mask"></div>
    <span class="el-image-viewer__btn el-image-viewer__close" @click="$emit('close')">
      <el-icon><Close /></el-icon>
    </span>
    <div class="el-image-viewer__canvas video-container">
      <video
        @contextmenu="onContextMenu"
        id="video-preview"
        :src="url"
        controls
        :controlslist="hideDownload ? 'nodownload' : ''"
      ></video>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Close } from '@element-plus/icons-vue';

  const props = defineProps<{
    visible: boolean;
    url: string;
    hideDownload: boolean;
  }>();

  const onContextMenu = (e) => {
    if (props.hideDownload) {
      e.preventDefault();
    }
  };
</script>

<style scoped lang="scss">
  .video-container {
    width: 80%;
    height: 100%;
    object-fit: contain;
    user-select: none; /* 不可选中,为了拖拽时不让文字高亮 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
