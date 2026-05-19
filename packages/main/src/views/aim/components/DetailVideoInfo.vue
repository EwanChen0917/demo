<template>
  <div class="detail-video-info">
    <!-- 视频预览区 -->
    <div
      class="video-preview"
      @click="handleVideoClick"
      :class="{ 'is-split-video': !isMainVideo }"
    >
      <video
        v-if="videoInfo.fileKey"
        :src="`${videoInfo.fileKey}#t=0.1`"
        class="video-player"
        preload="metadata"
      />
      <div class="play-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="14"
          viewBox="0 0 9 14"
          fill="none"
        >
          <path
            d="M2.32191 0.349C1.41668 -0.443069 0 0.199795 0 1.40261V12.11C0 13.3128 1.41669 13.9556 2.32191 13.1636L8.4404 7.8099C9.07786 7.25212 9.07786 6.26046 8.4404 5.70268L2.32191 0.349Z"
            fill="white"
          />
        </svg>
      </div>
    </div>

    <!-- 视频信息区 -->
    <div class="video-content">
      <!-- 视频标题 -->
      <div class="video-title">{{ videoInfo.title }}</div>
      <!-- 视频脚本 -->
      <div class="video-analysis" v-if="!isMainVideo">
        <span class="analysis-label">视频脚本：</span>
        <div class="analysis-content">
          <OverflowTooltip :content="videoInfo.videoScript || ''" :line="1" />
        </div>
      </div>
      <!-- 基础信息 -->
      <div class="video-meta">
        <div class="meta-item platform">
          <img
            v-if="platformIconSrc"
            :src="platformIconSrc"
            :alt="platformText"
            class="platform-icon"
          />
          <span class="platform-text">{{ platformText }}</span>
        </div>
        <div class="meta-divider"></div>
        <div class="meta-item">
          <span class="meta-text">作者：{{ videoInfo.author }}</span>
        </div>
        <div class="meta-divider"></div>
        <div class="meta-item">
          <span class="meta-text">
            视频ID：{{ isMainVideo ? videoInfo.itemId : videoInfo.videoId }}
          </span>
        </div>
        <div class="meta-divider"></div>
        <!-- 授权信息 -->
        <div class="meta-item">
          <span class="meta-text">授权类型：{{ authorizationText }}</span>
        </div>
        <template v-if="authorizationAreaText">
          <div class="meta-divider"></div>
          <div class="meta-item">
            <span class="meta-text">授权范围：{{ authorizationAreaText }}</span>
          </div>
        </template>
        <template v-if="authorizationDateText">
          <div class="meta-divider"></div>
          <div class="meta-item">
            <span class="meta-text">授权日期：{{ authorizationDateText }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, toRef } from 'vue';
  import {
    useAuthorizationInfo,
    type AuthorizationVideoData,
  } from '@/views/aim/hooks/useAuthorizationInfo';

  /** 视频信息类型定义 */
  export interface DetailVideoInfoData extends AuthorizationVideoData {
    /** 标题 */
    title?: string;
    /** 作者 */
    author?: string;
    /** 文件源ItemID */
    itemId?: string;
    /** 视频ID */
    videoId?: string;
    /** 文件地址 */
    fileKey?: string;
    /** 渠道 */
    source?: string;
    /** 视频脚本 */
    videoScript?: string;
  }

  /** 组件Props */
  interface Props {
    /** 视频信息 */
    videoInfo: DetailVideoInfoData;
    /** 是否主视频 */
    isMainVideo?: boolean;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: 'video-click'): void;
  }>();

  // 授权信息联动
  const videoDataRef = toRef(props, 'videoInfo');
  const { authorizationText, authorizationAreaText, authorizationDateText } =
    useAuthorizationInfo(videoDataRef);

  // 平台图标映射
  const platformIconMap: Record<string, string> = {
    tiktok: new URL('../assets/images/tiktok-icon.svg', import.meta.url).href,
    youtube: new URL('../assets/images/youtube-icon.svg', import.meta.url).href,
    facebook: new URL('../assets/images/facebook-icon.svg', import.meta.url).href,
    instagram: new URL('../assets/images/instagram-icon.svg', import.meta.url).href,
  };

  /** 平台展示文案 */
  const platformText = computed(() => props.videoInfo.source || '-');

  /** 平台图标 */
  const platformIconSrc = computed(() => {
    const source = props.videoInfo.source?.trim().toLowerCase();
    if (!source) return '';
    return platformIconMap[source] || '';
  });

  /**
   * 点击视频预览区域
   */
  const handleVideoClick = () => {
    emit('video-click');
  };
</script>

<style lang="scss" scoped>
  .detail-video-info {
    display: flex;
    gap: 16px;
    padding: 0 20px 20px;
  }

  /* 视频预览区 */
  .video-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-shrink: 0;
    width: 37px;
    height: 50px;
    border-radius: 6px;
    overflow: hidden;
    background: #000;
    &.is-split-video {
      width: 56px;
      height: 76px;
    }

    .play-button {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.3);
      cursor: pointer;

      svg {
        width: 10px;
        height: 10px;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }

    .video-player {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  /* 视频内容区 */
  .video-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  /* 视频标题 */
  .video-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    color: var(---N9, var(---N9, #262626));
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
  }
  .video-analysis {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    // gap: 4px;
    color: var(---N8, var(---N8, #585a5a));
    .analysis-label {
      flex-shrink: 0;
      white-space: nowrap;
    }
  }

  /* 基础信息 */
  .video-meta {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(---N6, var(---N6, #8a8f8d));

    .meta-item {
      display: flex;
      align-items: center;

      &.platform {
        gap: 4px;

        .platform-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .platform-text {
          font-size: 12px;
          line-height: 20px;
        }
      }

      .meta-text {
        font-size: 12px;
        line-height: 20px;
      }
    }

    .meta-divider {
      width: 1px;
      height: 10px;
    }
  }
</style>
