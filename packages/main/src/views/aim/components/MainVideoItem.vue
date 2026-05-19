<template>
  <div class="main-video-item" :class="itemType">
    <!-- 视频预览区 -->
    <div ref="videoPreviewRef" class="video-preview" @click="handleVideoClick">
      <video
        v-if="videoInfo.fileKey && isInViewport"
        :src="`${videoInfo.fileKey}#t=0.1`"
        class="video-player"
        preload="metadata"
      ></video>
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
      <template v-if="itemType === 'main'">
        <!-- 第一行:基础信息 + 业务标签 -->
        <div class="video-meta-row">
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
              <span class="meta-label">作者：</span>
              <span class="meta-value" v-html="highlightedAuthor"></span>
            </div>
            <div class="meta-divider"></div>
            <div class="meta-item">
              <span class="meta-label">视频ID：</span>
              <span class="meta-value" v-html="highlightedVideoId"></span>
            </div>
            <!-- <template v-if="videoInfo.itemId">
              <div class="meta-divider"></div>
              <div class="meta-item">
                <span class="meta-label">视频ID：</span>
                <span class="meta-value" v-html="highlightedVideoId"></span>
              </div>
            </template> -->
            <div class="meta-divider"></div>
            <div class="meta-item">
              <span class="meta-label">授权类型：</span>
              <span class="meta-value">
                {{ authorizationText || formatAuthorization(videoInfo.authorization) }}
              </span>
            </div>
            <template v-if="authorizationAreaText">
              <div class="meta-divider"></div>
              <div class="meta-item">
                <span class="meta-label">授权范围：</span>
                <span class="meta-value">{{ authorizationAreaText }}</span>
              </div>
            </template>
            <template v-if="videoInfo.authorization">
              <div class="meta-divider"></div>
              <div class="meta-item">
                <span class="meta-label">授权日期：</span>
                <span class="meta-value">
                  {{ formatAuthorizationDate(videoInfo) }}
                </span>
              </div>
            </template>
          </div>

          <!-- 业务标签 -->
          <div class="business-tags">
            <el-tag
              v-for="(tag, index) in videoInfo.business"
              :key="index"
              :type="getTagType(tag) || 'info'"
              size="small"
              class="business-tag"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </template>
      <!-- 第二行:视频标题 -->
      <div class="video-title">
        <OverflowTooltip :content="videoInfo.title" :line="1" />
      </div>

      <!-- 视频脚本 -->
      <div v-if="itemType !== 'main'" class="video-analysis" :class="itemType">
        <span class="analysis-label">视频脚本：</span>
        <div class="analysis-content">
          <OverflowTooltip :content="videoInfo.originalTranscript || '-'" :line="1" />
        </div>
      </div>

      <div v-if="itemType === 'split'" class="video-analysis">
        <span class="analysis-label">内容特征：</span>
        <div class="analysis-content">
          <ContentFeatureTags
            :features="videoInfo.contentFeature || []"
            :highlight-keywords="highlightKeywords.contentFeature"
            :max-rows="1"
          />
        </div>
      </div>

      <!-- 第三行:AI解析 -->
      <div v-if="itemType === 'main'" class="video-analysis">
        <span class="analysis-label">路小特解析：</span>
        <div class="analysis-content">
          <OverflowTooltip :content="videoInfo.description" :line="1" />
        </div>
      </div>

      <template v-if="itemType === 'main'">
        <!-- 第四行:视频属性 + 内容特征 -->
        <div class="video-attributes">
          <div class="attribute-item">
            <span class="attribute-label">视频分辨率</span>
            <span class="attribute-value">{{ videoInfo.resolutionRatio }}</span>
          </div>
          <div class="attribute-divider"></div>
          <div class="attribute-item">
            <span class="attribute-label">视频时长</span>
            <span class="attribute-value">{{ formatVideoTime(videoInfo.videoTime) }}</span>
          </div>
          <div class="attribute-divider"></div>
          <div class="attribute-item">
            <span class="attribute-label">视频比例</span>
            <span class="attribute-value">{{ videoInfo.proportion }}</span>
          </div>
          <div class="attribute-divider"></div>
          <div class="attribute-item">
            <span class="attribute-label">语言</span>
            <span class="attribute-value">{{ videoInfo.spokenLanguage }}</span>
          </div>
          <div class="attribute-divider"></div>
          <div class="attribute-item">
            <span class="attribute-label">叙事模式</span>
            <el-tooltip placement="top">
              <template #content>
                {{ videoInfo.type }}
              </template>
              <span class="attribute-value">{{ videoInfo.type }}</span>
            </el-tooltip>
            <!-- <span class="attribute-value">{{ videoInfo.type }}</span> -->
          </div>
          <div class="attribute-divider"></div>
          <div class="attribute-item content-features">
            <span class="attribute-label">内容特征</span>
            <div ref="featureTagsRef" class="feature-tags">
              <el-tag
                v-for="(feature, index) in highlightedFeatures"
                :key="index"
                size="small"
                class="feature-tag"
                type="info"
              >
                <span v-html="feature"></span>
              </el-tag>
              <el-tooltip
                v-if="hiddenFeaturesCount > 0"
                placement="top"
                popper-class="feature-tooltip"
                :popper-style="{ maxWidth: '500px' }"
              >
                <template #content>
                  <span v-html="highlightedHiddenFeaturesText"></span>
                </template>
                <el-tag size="small" class="feature-tag more-tag" type="info">
                  +{{ hiddenFeaturesCount }}
                </el-tag>
              </el-tooltip>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, watch, nextTick, onBeforeUnmount } from 'vue';
  import { highlightText, getFieldKeywords, type HighlightKeywords } from '@/utils/highlight';
  import {
    formatAuthorizationDate,
    formatAuthorization,
  } from '@/views/aim/hooks/useAuthorizationInfo';
  import ContentFeatureTags from '@/views/aim/components/ContentFeatureTags.vue';

  /** 视频信息类型定义 */
  export interface VideoInfo {
    /** 分析状态: 0=未解析,1=已解析,2=解析失败 */
    analysisStatus: number;
    /** 授权标签 */
    authLable?: string;
    /** 授权方式 0=未授权,2=免费授权,3=付费授权 */
    authorization?: number;
    /** 授权范围 */
    authorizationArea?: number;
    /** 作者 */
    author: string;
    /** 所属业务 */
    business: string[];
    /** 视频特征 */
    contentFeature: string[];
    /** 视频介绍/AI解析 */
    description: string;
    /** 文件地址 */
    fileKey: string;
    /** 视频ID */
    id: number;
    /** 文件源ItemID */
    itemId?: string;
    /** 角色信息 */
    mainCharacters?: string[];
    /** 产品名称 */
    productName?: string[];
    /** 语音 */
    originalTranscript?: string;
    /** 视频比例 */
    proportion: string;
    /** 分辨率 */
    resolutionRatio: string;
    /** 渠道来源 */
    source?: string;
    /** 分镜结束时间 */
    splitEndTime?: string;
    /** 分镜开始时间 */
    splitStartTime?: string;
    /** 分镜状态: 0=未切分,1=已切分,2=切分失败,3=切分已解析(全部) */
    splitStatus: number;
    /** 语言 */
    spokenLanguage: string;
    /** 标题 */
    title: string;
    /** 类型（叙事模式） */
    type: string;
    /** 授权截止日期 */
    validEndDate: string;
    /** 授权开始日期 */
    validStartDate: string;
    /** 视频ID */
    videoId: string;
    /** 视频分镜候选ID */
    videoSplitCandidateId: number;
    /** 视频时长(秒) */
    videoTime: number;
  }

  /** 组件Props */
  interface Props {
    /** 视频信息 */
    videoInfo: VideoInfo;
    itemType: 'main' | 'split' | 'cart';
    /** 高亮关键词配置 */
    highlightKeywords?: HighlightKeywords;
    /** 授权方式文本（由父组件根据选项解析） */
    authorizationText?: string;
    /** 授权范围文本（由父组件根据选项解析） */
    authorizationAreaText?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    highlightKeywords: () => ({}),
    authorizationText: '',
    authorizationAreaText: '',
  });

  // ============ 视频懒加载相关 ============
  /** 视频预览容器 ref */
  const videoPreviewRef = ref<HTMLElement | null>(null);
  /** 是否进入视口 */
  const isInViewport = ref(false);
  /** IntersectionObserver 实例 */
  let videoObserver: IntersectionObserver | null = null;

  /**
   * 初始化视频懒加载观察器
   * 当视频预览区域进入视口时才加载视频
   */
  const initVideoObserver = () => {
    if (!videoPreviewRef.value || isInViewport.value) return;

    videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInViewport.value = true;
            // 进入视口后停止观察
            videoObserver?.disconnect();
            videoObserver = null;
          }
        });
      },
      {
        // 提前 100px 开始加载，提升用户体验
        rootMargin: '100px',
        threshold: 0,
      }
    );

    videoObserver.observe(videoPreviewRef.value);
  };

  onMounted(() => {
    initVideoObserver();
  });

  onBeforeUnmount(() => {
    if (videoObserver) {
      videoObserver.disconnect();
      videoObserver = null;
    }
  });

  // ============ 高亮相关计算属性 ============

  /** 高亮后的视频ID */
  const highlightedVideoId = computed(() => {
    const keywords = getFieldKeywords('videoId', props.highlightKeywords || {});
    return highlightText(props.videoInfo.itemId, keywords);
  });

  /** 高亮后的作者 */
  const highlightedAuthor = computed(() => {
    const keywords = getFieldKeywords('author', props.highlightKeywords || {});
    return highlightText(props.videoInfo.author, keywords);
  });

  /** 高亮后的内容特征 */
  const highlightedFeatures = computed(() => {
    const features = visibleFeatures.value;
    const keywords = getFieldKeywords('contentFeature', props.highlightKeywords || {});
    return features.map((feature) => highlightText(feature, keywords));
  });

  /** 平台展示文案 */
  const platformText = computed(() => props.videoInfo.source || '-');

  const platformIconMap: Record<string, string> = {
    tiktok: new URL('../assets/images/tiktok-icon.svg', import.meta.url).href,
    youtube: new URL('../assets/images/youtube-icon.svg', import.meta.url).href,
    facebook: new URL('../assets/images/facebook-icon.svg', import.meta.url).href,
    instagram: new URL('../assets/images/instagram-icon.svg', import.meta.url).href,
  };

  /** 平台图标 */
  const platformIconSrc = computed(() => {
    const source = props.videoInfo.source?.trim().toLowerCase();
    if (!source) return '';
    return platformIconMap[source] || '';
  });

  /** 高亮后的隐藏特征文本 */
  const highlightedHiddenFeaturesText = computed(() => {
    const keywords = getFieldKeywords('contentFeature', props.highlightKeywords || {});
    return highlightText(hiddenFeaturesText.value, keywords);
  });

  const emit = defineEmits<{
    (e: 'video-click'): void;
  }>();

  /** 内容特征容器 ref */
  const featureTagsRef = ref<HTMLElement | null>(null);
  /** 可显示的特征数量，-1 表示未计算，显示全部用于测量 */
  const visibleCount = ref(-1);
  /** "+x" tag 的宽度 */
  const MORE_TAG_WIDTH = 36;
  /** tag 之间的间距 */
  const TAG_GAP = 4;

  /** 可见的特征列表 */
  const visibleFeatures = computed(() => {
    const features = props.videoInfo.contentFeature;
    if (!features || !Array.isArray(features)) return [];
    // 未计算时显示全部，用于测量实际宽度
    if (visibleCount.value < 0 || visibleCount.value >= features.length) {
      return features;
    }
    return features.slice(0, visibleCount.value);
  });

  /** 隐藏的特征数量 */
  const hiddenFeaturesCount = computed(() => {
    const features = props.videoInfo.contentFeature;
    if (!features || !Array.isArray(features)) return 0;
    const total = features.length;
    // 未计算完成时不显示 +x
    if (visibleCount.value < 0 || visibleCount.value >= total) return 0;
    return total - visibleCount.value;
  });

  /** 隐藏的特征文本（逗号分隔） */
  const hiddenFeaturesText = computed(() => {
    const features = props.videoInfo.contentFeature;
    if (!features || !Array.isArray(features)) return '';
    if (visibleCount.value < 0) return '';
    if (visibleCount.value === 0) return features.join(', ');
    return features.slice(visibleCount.value).join(', ');
  });

  /** 计算可显示的 tag 数量（基于实际 DOM 宽度） */
  const calculateVisibleCount = async () => {
    if (!featureTagsRef.value) return;
    const features = props.videoInfo.contentFeature;
    if (!features || !Array.isArray(features) || features.length === 0) {
      visibleCount.value = 0;
      return;
    }

    // 先重置为 -1 显示全部，等待 DOM 更新后测量
    visibleCount.value = -1;
    await nextTick();

    if (!featureTagsRef.value) return;
    const containerWidth = featureTagsRef.value.offsetWidth;
    const tagElements = featureTagsRef.value.querySelectorAll('.feature-tag:not(.more-tag)');

    if (tagElements.length === 0) {
      visibleCount.value = features.length;
      return;
    }

    const totalTags = features.length;
    let usedWidth = 0;
    let count = 0;

    for (let i = 0; i < tagElements.length && i < totalTags; i++) {
      const tagWidth = (tagElements[i] as HTMLElement).offsetWidth;
      const gapWidth = count > 0 ? TAG_GAP : 0;
      const nextWidth = usedWidth + gapWidth + tagWidth;

      // 检查是否需要预留 "+x" 的空间
      const needMoreTag = i < totalTags - 1;
      const reservedWidth = needMoreTag ? MORE_TAG_WIDTH + TAG_GAP : 0;

      if (nextWidth + reservedWidth > containerWidth) {
        break;
      }

      usedWidth = nextWidth;
      count++;
    }

    visibleCount.value = Math.max(1, count);
  };

  let resizeObserver: ResizeObserver | null = null;

  onMounted(() => {
    if (featureTagsRef.value) {
      resizeObserver = new ResizeObserver(() => {
        calculateVisibleCount();
      });
      resizeObserver.observe(featureTagsRef.value);
      calculateVisibleCount();
    }
  });

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  });

  watch(
    () => props.videoInfo.contentFeature,
    () => {
      calculateVisibleCount();
    }
  );

  /**
   * 点击视频预览区域
   */
  const handleVideoClick = () => {
    emit('video-click');
  };

  /**
   * 格式化视频时长
   */
  const formatVideoTime = (seconds: number): string => {
    if (!seconds && seconds !== 0) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  /**
   * 获取业务标签类型
   */
  const getTagType = (tag: string): '' | 'success' | 'info' | 'warning' | 'danger' => {
    const tagTypeMap: Record<string, '' | 'success' | 'info' | 'warning' | 'danger'> = {
      广告: 'danger',
      红人: 'info',
      tiktok运营: 'success',
      快销: 'warning',
    };
    return tagTypeMap[tag] || '';
  };
</script>

<style lang="scss" scoped>
  .main-video-item {
    display: flex;
    gap: 16px;
    &.split {
      .video-preview {
        width: 56px;
        height: 76px;
      }
    }
    &.cart {
      .video-preview {
        width: 38px;
        height: 52px;
      }
    }
  }

  /* 视频预览区 */
  .video-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-shrink: 0;
    width: 96px;
    height: 130px;
    border-radius: 6px;
    overflow: hidden;
    background: #000;

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
      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }

    .video-player {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .video-placeholder {
      width: 100%;
      height: 100%;
      background: #f5f5f5;
    }
  }

  /* 视频内容区 */
  .video-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    // gap: 10px;
    min-width: 0;
    line-height: 20px;
  }

  /* 第一行:基础信息 + 业务标签 */
  .video-meta-row {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    overflow: hidden;
  }

  /* 基础信息 */
  .video-meta {
    display: flex;
    align-items: center;
    gap: 8px;

    .meta-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 12px;

      &.platform {
        gap: 4px;

        .platform-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .platform-text {
          color: #909399;
        }
      }

      .meta-label,
      .meta-value {
        color: #909399;
      }
    }

    .meta-divider {
      width: 1px;
      height: 12px;
      background: #dcdfe6;
    }
  }

  /* 业务标签 */
  .business-tags {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    margin-left: 4px;

    .business-tag {
      font-size: 12px;
      line-height: 12px;
      height: auto;
      padding: 4px 8px;
      border: none;
      border-radius: 4px;

      :deep(.el-tag__content) {
        line-height: 12px;
      }
    }
  }

  /* 视频标题 */
  .video-title {
    // margin-top: 12px;
    font-size: 14px;
    font-family: 'PingFangSC-Medium';
    line-height: 22px;
    font-weight: 500;
    color: #303133;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
    :deep(.content) {
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
    }
  }

  /* AI解析 */
  .video-analysis {
    margin: 2px 0 12px;
    font-size: 12px;
    line-height: 18px;
    display: flex;
    align-items: center;
    overflow: hidden;
    &.cart {
      margin: 2px 0 0px;
    }
    :deep(.content) {
      color: inherit;
    }

    .analysis-label {
      color: #606266;
      flex-shrink: 0;
    }

    .analysis-content {
      color: #606266;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  /* 视频属性 + 内容特征 */
  .video-attributes {
    display: flex;
    align-items: flex-start;
    gap: 12px;

    .attribute-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 12px;
      line-height: 20px;

      .attribute-label {
        color: #909399;
        white-space: nowrap;
      }

      .attribute-value {
        color: #606266;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 80px;
      }

      &.content-features {
        flex: 1;
        min-width: 0;

        .feature-tags {
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          overflow: hidden;

          .feature-tag {
            font-size: 12px;
            line-height: 12px;
            height: auto;
            padding: 4px 6px;
            background: #f2f3f5;
            color: #606266;
            border: none;
            border-radius: 4px;
            flex-shrink: 0;

            :deep(.el-tag__content) {
              line-height: 12px;
            }

            &.more-tag {
              cursor: pointer;
            }
          }
        }
      }
    }

    .attribute-divider {
      width: 1px;
      height: 14px;
      background: #eff0f0;
      flex-shrink: 0;
      align-self: center;
    }
  }

  .feature-tooltip {
    max-width: 500px;
  }
</style>
