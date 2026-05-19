<template>
  <el-drawer
    v-model="visible"
    direction="rtl"
    :size="1080"
    :with-header="false"
    :close-on-click-modal="true"
    class="video-detail-drawer"
  >
    <!-- 自定义头部 -->
    <div class="drawer-header">
      <div class="header-left">
        <span class="header-title">{{ isMainVideo ? '主视频报告详情' : '分镜视频详情' }}</span>
      </div>
      <div class="header-right">
        <div class="nav-buttons">
          <el-tooltip content="上一条" placement="bottom">
            <button class="nav-btn" :disabled="currentIndex <= 0" @click="handlePrev">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12.5L10 7.5L5 12.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </el-tooltip>
          <el-tooltip content="下一条" placement="bottom">
            <button class="nav-btn" :disabled="currentIndex >= totalCount - 1" @click="handleNext">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </el-tooltip>
        </div>
        <button class="close-btn" @click="handleClose">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 视频信息区域 -->
    <div class="video-info-section">
      <DetailVideoInfo
        v-if="detailData"
        :video-info="videoItemData"
        @video-click="handleVideoClick"
        :isMainVideo="isMainVideo"
      />
    </div>

    <!-- 主体内容区域 -->
    <div class="content-wrapper">
      <!-- 左侧导航 -->
      <div class="left-nav">
        <div
          v-for="(nav, index) in navItems"
          :key="nav.key"
          class="nav-item"
          :class="{ active: activeNavKey === nav.key }"
          @click="handleNavClick(nav.key)"
        >
          {{ nav.label }}
        </div>
      </div>

      <!-- 右侧内容 -->
      <div ref="contentRef" class="right-content" @scroll="handleScroll">
        <!-- 基本信息 -->
        <div ref="basicInfoRef" class="section" data-section="basicInfo">
          <div class="section-title">基本信息</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">视频分辨率：</span>
              <span class="info-value">{{ detailData?.videoMetadata?.resolution || '-' }}</span>
            </div>
            <div class="info-item" v-if="isMainVideo">
              <span class="info-label">视频时长：</span>
              <span class="info-value">{{ detailData?.videoMetadata?.videoDuration || '-' }}</span>
            </div>
            <div class="info-item" v-else>
              <span class="info-label">时间范围：</span>
              <span class="info-value">
                {{ detailData?.splitStartTime + 's' || '' }} ~
                {{ detailData?.splitEndTime + 's' || '' }}
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">视频比例：</span>
              <span class="info-value">{{ detailData?.videoMetadata?.aspectRatio || '-' }}</span>
            </div>
            <div class="info-item full-width" v-if="isMainVideo">
              <span class="info-label">业务类型：</span>
              <div class="tag-list">
                <template v-if="detailData?.business?.length > 0">
                  <el-tag
                    v-for="(tag, idx) in detailData?.business"
                    :key="idx"
                    type="info"
                    size="small"
                    class="business-tag"
                  >
                    {{ tag }}
                  </el-tag>
                </template>
                <template v-else>
                  <span class="info-value">-</span>
                </template>
              </div>
            </div>
          </div>
        </div>

        <div class="section-divider"></div>

        <!-- 角色分析 -->
        <div ref="characterRef" class="section" data-section="character">
          <div class="section-title">角色分析</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">主要角色：</span>
              <span class="info-value">
                {{ detailData?.characterAnalysis?.mainCharacters?.join('、') || '-' }}
              </span>
            </div>
            <div class="info-item" v-if="isMainVideo">
              <span class="info-label">角色特点：</span>
              <span class="info-value">
                {{ detailData?.characterAnalysis?.characterCharacteristics?.join('、') || '-' }}
              </span>
            </div>
          </div>
        </div>

        <div class="section-divider"></div>

        <!-- 场景分析 -->
        <div ref="sceneRef" class="section" data-section="scene">
          <div class="section-title">场景分析</div>
          <div class="info-grid">
            <div class="info-item" v-if="isMainVideo">
              <span class="info-label">场景数量：</span>
              <span class="info-value">{{ detailData?.sceneAnalysis?.sceneCount || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">包含场景：</span>
              <span class="info-value">
                {{ detailData?.sceneAnalysis?.scenesIncluded?.join('、') || '-' }}
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">特殊场景：</span>
              <span class="info-value">
                {{
                  detailData?.sceneAnalysis?.specialScenesPresent?.specialScenes?.join('、') || '无'
                }}
              </span>
            </div>
            <div class="info-item" v-if="!isMainVideo">
              <span class="info-label">情感基调：</span>
              <div class="tag-list feature-tags">
                <el-tag
                  v-for="(tag, idx) in detailData?.emotionalTone"
                  :key="idx"
                  type="info"
                  size="small"
                  class="feature-tag"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
            <div class="info-item" v-if="!isMainVideo">
              <span class="info-label">整体氛围：</span>
              <div class="tag-list feature-tags">
                <el-tag
                  v-for="(tag, idx) in detailData?.atmosphere"
                  :key="idx"
                  type="info"
                  size="small"
                  class="feature-tag"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>

        <div class="section-divider"></div>

        <!-- 内容分析 -->
        <div ref="contentAnalysisRef" class="section" data-section="contentAnalysis">
          <div class="section-title">内容分析</div>
          <div class="content-analysis-wrapper">
            <div class="info-item full-width" v-if="!isMainVideo">
              <span class="info-label">内容特征：</span>
              <div class="tag-list feature-tags">
                <el-tag
                  v-for="(tag, idx) in detailData?.contentFeature"
                  :key="idx"
                  type="info"
                  size="small"
                  class="feature-tag"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
            <div class="info-item full-width" v-if="isMainVideo">
              <span class="info-label">路小特解析：</span>
              <span class="info-value multiline">
                {{ detailData?.contentBreakdown?.mainContentSummary || '-' }}
              </span>
            </div>
            <div class="info-item full-width">
              <span class="info-label">视觉高光点：</span>
              <span class="info-value multiline">
                {{ detailData?.contentBreakdown?.contentElements?.contents?.join('；') || '-' }}
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">叙事模式：</span>
              <span class="info-value">
                {{ detailData?.narrativeStructureAnalysisBean?.coreNarrativeParadigm || '-' }}
              </span>
            </div>
            <div class="info-item full-width" v-if="isMainVideo">
              <span class="info-label">其他特点：</span>
              <span class="info-value">{{ detailData?.otherFeatures?.join('、') || '-' }}</span>
            </div>
          </div>
        </div>

        <div class="section-divider"></div>

        <!-- 动作分析 -->
        <div ref="actionRef" class="section" data-section="action">
          <div class="section-title">动作分析</div>
          <div class="info-grid">
            <!-- <div class="info-item">
              <span class="info-label">核心动作：</span>
              <span class="info-value">
                {{
                  detailData?.contentBreakdown?.dynamicActivities?.activities
                    ?.slice(0, 2)
                    .join('、') || '-'
                }}
              </span>
            </div> -->
            <div class="info-item" v-if="isMainVideo">
              <span class="info-label">动态活动：</span>
              <span class="info-value">
                {{ detailData?.contentBreakdown?.dynamicActivities?.activities?.join('、') || '-' }}
              </span>
            </div>
            <div class="info-item" v-if="isMainVideo">
              <span class="info-label">手势动作：</span>
              <span class="info-value">
                {{ detailData?.characterAnalysis?.gestureRecognition?.gestures?.join('、') || '-' }}
              </span>
            </div>
            <div class="info-item full-width">
              <span class="info-label">争议手势：</span>
              <span class="info-value">
                {{
                  detailData?.characterAnalysis?.gestureRecognition?.hasControversialGestures
                    ? detailData?.characterAnalysis?.gestureRecognition?.gestures?.join('、')
                    : '无'
                }}
              </span>
            </div>
            <div class="info-item" v-if="!isMainVideo">
              <span class="info-label">主要动作：</span>
              <span class="info-value">
                {{ detailData?.mainAction || '-' }}
              </span>
            </div>
          </div>
        </div>
        <div class="section-divider"></div>
        <template v-if="isMainVideo">
          <!-- 产品信息 -->
          <div ref="productRef" class="section" data-section="product">
            <div class="section-title">产品信息</div>
            <el-table :data="detailData?.products || []" border class="product-table">
              <el-table-column label="序号" width="64" align="center">
                <template #default="{ $index }">{{ $index + 1 }}</template>
              </el-table-column>
              <el-table-column label="产品名称" min-width="180">
                <template #default="{ row }">
                  <div class="product-name-cell">
                    <!-- <div class="product-img"></div> -->
                    <span class="product-name-text">{{ row.productName }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="model" label="产品型号" width="120">
                <template #default="{ row }">{{ row.model || '未提及' }}</template>
              </el-table-column>
              <el-table-column prop="productHighlight" label="产品亮点" min-width="200">
                <template #default="{ row }">{{ row.productHighlight || '-' }}</template>
              </el-table-column>
            </el-table>
          </div>

          <div class="section-divider"></div>

          <!-- 技术信息 -->
          <div ref="techRef" class="section" data-section="tech">
            <div class="section-title">技术信息</div>
            <div class="info-grid tech-grid">
              <div class="info-item">
                <span class="info-label">转场效果：</span>
                <span class="info-value">
                  {{ detailData?.productionTechniques?.transitionEffect || '-' }}
                </span>
              </div>
              <div class="info-item">
                <span class="info-label">字幕风格：</span>
                <span class="info-value">
                  {{ detailData?.productionTechniques?.subtitleStyle || '-' }}
                </span>
              </div>
              <div class="info-item">
                <span class="info-label">光线质量：</span>
                <span class="info-value">
                  {{ detailData?.productionTechniques?.lightingQuality || '-' }}
                </span>
              </div>
              <div class="info-item">
                <span class="info-label">机位设置</span>
                <span class="info-value">
                  {{ detailData?.cameraWork?.cameraSetup || '-' }}
                </span>
              </div>
              <div class="info-item">
                <span class="info-label">语音语言：</span>
                <span class="info-value">
                  {{
                    detailData?.textAndSpeechRecognition?.languageRecognition?.spokenLanguage || '-'
                  }}
                </span>
              </div>
              <div class="info-item">
                <span class="info-label">字幕语言：</span>
                <span class="info-value">
                  {{
                    detailData?.textAndSpeechRecognition?.languageRecognition?.writtenLanguage ||
                    '-'
                  }}
                </span>
              </div>
            </div>
          </div>

          <div class="section-divider"></div>
        </template>

        <!-- 视频脚本 -->
        <div ref="scriptRef" class="section" data-section="script">
          <div class="section-title">视频脚本</div>
          <div class="script-wrapper">
            <!-- 完整OCR -->
            <div class="script-block">
              <div class="script-label">完整OCR：</div>
              <div class="script-content-box">
                <div class="script-item">
                  <div class="script-sub-label">视频原文：</div>
                  <div class="script-text">
                    {{ detailData?.textAndSpeechRecognition?.fullOcrResult?.originalText || '-' }}
                  </div>
                </div>
                <div class="script-divider"></div>
                <div class="script-item">
                  <div class="script-sub-label">中文翻译：</div>
                  <div class="script-text">
                    {{
                      detailData?.textAndSpeechRecognition?.fullOcrResult?.chineseTranslation || '-'
                    }}
                  </div>
                </div>
              </div>
            </div>
            <!-- 语音识别 -->
            <div class="script-block" v-if="isMainVideo">
              <div class="script-label">语音识别：</div>
              <div class="script-content-box">
                <div class="script-item">
                  <div class="script-sub-label">原始转录：</div>
                  <div class="script-text">
                    {{
                      detailData?.textAndSpeechRecognition?.fullSpeechResult?.originalTranscript ||
                      '-'
                    }}
                  </div>
                </div>
                <div class="script-divider"></div>
                <div class="script-item">
                  <div class="script-sub-label">中文翻译：</div>
                  <div class="script-text">
                    {{
                      detailData?.textAndSpeechRecognition?.fullSpeechResult?.chineseTranslation ||
                      '-'
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section-divider"></div>
        <template v-if="isMainVideo">
          <!-- 叙事结构分析 -->
          <div ref="narrativeRef" class="section" data-section="narrative">
            <div class="section-title">叙事结构分析</div>
            <div class="narrative-timeline">
              <div
                v-for="(item, index) in detailData?.narrativeStructureAnalysisBean
                  ?.structuralBreakdown"
                :key="index"
                class="timeline-item"
              >
                <div class="timeline-left">
                  <span class="timeline-time">{{ item.time_range?.split('-')[0] }}</span>
                  <div class="timeline-line-wrapper">
                    <div class="timeline-dot"></div>
                    <div
                      v-if="
                        index <
                        (detailData?.narrativeStructureAnalysisBean?.structuralBreakdown?.length ||
                          0) -
                          1
                      "
                      class="timeline-line"
                    ></div>
                  </div>
                </div>
                <div class="timeline-content">
                  <div class="timeline-title">{{ item.narrative_function }}</div>
                  <div class="timeline-desc">{{ item.content_summary }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="section-divider"></div>

          <!-- AIDA营销模型 -->
          <div ref="aidaRef" class="section" data-section="aida">
            <div class="section-title">AIDA营销模型分析</div>
            <div class="aida-list">
              <div class="aida-item">
                <div class="aida-header">
                  <div class="aida-dot"></div>
                  <span class="aida-label">吸引注意</span>
                </div>
                <div class="aida-content">
                  {{
                    detailData?.narrativeStructureAnalysisBean?.aidaModelApplication?.attention ||
                    '-'
                  }}
                </div>
              </div>
              <div class="aida-item">
                <div class="aida-header">
                  <div class="aida-dot"></div>
                  <span class="aida-label">激发兴趣</span>
                </div>
                <div class="aida-content">
                  {{
                    detailData?.narrativeStructureAnalysisBean?.aidaModelApplication?.interest ||
                    '-'
                  }}
                </div>
              </div>
              <div class="aida-item">
                <div class="aida-header">
                  <div class="aida-dot"></div>
                  <span class="aida-label">创造欲望</span>
                </div>
                <div class="aida-content">
                  {{
                    detailData?.narrativeStructureAnalysisBean?.aidaModelApplication?.desire || '-'
                  }}
                </div>
              </div>
              <div class="aida-item">
                <div class="aida-header">
                  <div class="aida-dot"></div>
                  <span class="aida-label">促成行动</span>
                </div>
                <div class="aida-content">
                  {{
                    detailData?.narrativeStructureAnalysisBean?.aidaModelApplication?.action || '-'
                  }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </el-drawer>

  <!-- 视频播放器弹窗 -->
  <VideoPlayerDialog
    v-model:visible="videoPlayerVisible"
    :video-list="videoListForPlayer"
    :initial-index="0"
    :show-cart-btn="!isMainVideo"
    :video-source="isMainVideo ? 'main' : 'split'"
    @close="handlePlayerClose"
    @add-to-cart="handleAddToCart"
    @remove-from-cart="handleRemoveFromCart"
  />
</template>

<script setup lang="ts">
  import { ref, computed, watch, nextTick } from 'vue';
  import { ElMessage, ElLoading } from 'element-plus';
  import DetailVideoInfo, { type DetailVideoInfoData } from './DetailVideoInfo.vue';
  import VideoPlayerDialog, { type VideoInfo } from './VideoPlayerDialog.vue';
  import { videoAnalysisApi } from '@/api/index';
  import { useCandidateVideoStore } from '@/store/modules/candidateVideo';
  import type {
    VideoAnalysisDetailResp,
    VideoSplitDetailResp,
  } from '@/api/videoAnalysis/data-contracts';

  // 候选视频 store
  const candidateStore = useCandidateVideoStore();

  /** 导航项类型 */
  interface NavItem {
    key: string;
    label: string;
    mainOnly?: boolean; // 是否仅主视频显示
  }

  /** Props定义 */
  interface Props {
    /** 是否显示 */
    modelValue: boolean;
    /** 是否为主视频（主视频有更多模块） */
    isMainVideo?: boolean;
    /** 视频ID，用于请求详情接口 */
    videoId?: number;
    /** 当前索引 */
    currentIndex?: number;
    /** 总数量 */
    totalCount?: number;
  }

  /** Emits定义 */
  interface Emits {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'prev'): void;
    (e: 'next'): void;
    (e: 'close'): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    isMainVideo: true,
    videoId: undefined,
    currentIndex: 0,
    totalCount: 1,
  });

  const emit = defineEmits<Emits>();

  // 抽屉可见状态
  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  });

  // 当前激活的导航项
  const activeNavKey = ref('basicInfo');

  // 内容区域引用
  const contentRef = ref<HTMLElement | null>(null);

  // 各模块引用
  const basicInfoRef = ref<HTMLElement | null>(null);
  const characterRef = ref<HTMLElement | null>(null);
  const sceneRef = ref<HTMLElement | null>(null);
  const contentAnalysisRef = ref<HTMLElement | null>(null);
  const actionRef = ref<HTMLElement | null>(null);
  const productRef = ref<HTMLElement | null>(null);
  const techRef = ref<HTMLElement | null>(null);
  const scriptRef = ref<HTMLElement | null>(null);
  const narrativeRef = ref<HTMLElement | null>(null);
  const aidaRef = ref<HTMLElement | null>(null);

  // 所有导航项
  const allNavItems: NavItem[] = [
    { key: 'basicInfo', label: '基本信息' },
    { key: 'character', label: '角色分析' },
    { key: 'scene', label: '场景分析' },
    { key: 'contentAnalysis', label: '内容分析' },
    { key: 'action', label: '动作分析' },
    { key: 'product', label: '产品信息', mainOnly: true },
    { key: 'tech', label: '技术分析', mainOnly: true },
    { key: 'script', label: '视频脚本' },
    { key: 'narrative', label: '叙事结构分析', mainOnly: true },
    { key: 'aida', label: 'AIDA营销模型', mainOnly: true },
  ];

  // 根据是否为主视频过滤导航项
  const navItems = computed(() => {
    if (props.isMainVideo) {
      return allNavItems;
    }
    return allNavItems.filter((item) => !item.mainOnly);
  });

  // 模块引用映射
  const sectionRefs = computed(() => ({
    basicInfo: basicInfoRef.value,
    character: characterRef.value,
    scene: sceneRef.value,
    contentAnalysis: contentAnalysisRef.value,
    action: actionRef.value,
    product: productRef.value,
    tech: techRef.value,
    script: scriptRef.value,
    narrative: narrativeRef.value,
    aida: aidaRef.value,
  }));

  // 转换为DetailVideoInfo需要的格式
  const videoItemData = computed<DetailVideoInfoData>(() => {
    const data = detailData.value;
    return {
      title: data?.title || '',
      author: data?.author || '',
      itemId: data?.itemId || '',
      videoId: (data as any)?.videoId || '',
      authorization: data?.authorization,
      authorizationArea: data?.authorizationArea,
      validStartDate: data?.validStartDate || '',
      validEndDate: data?.validEndDate || '',
      fileKey: data?.fileKey || '',
      source: data?.source || '',
      videoScript: data?.videoScript || '-',
    };
  });

  // ============ 视频播放器相关 ============
  const videoPlayerVisible = ref(false);

  // 获取已加入候选的 videoSplitId 集合（用于判断当前视频是否已加入候选）
  const candidateSplitIds = computed(() => candidateStore.getCandidateVideoSplitIds());

  // 将详情数据转换为播放器需要的格式
  const videoListForPlayer = computed<VideoInfo[]>(() => {
    const data = detailData.value;
    if (!data) return [];
    // 对于分镜视频，props.videoId 就是 videoSplitId
    const videoSplitId = !props.isMainVideo ? props.videoId : undefined;
    return [
      {
        id: props.videoId,
        fileKey: data.fileKey ?? '',
        title: data.title,
        proportion: data.videoMetadata?.aspectRatio,
        videoTime: data.videoMetadata?.videoDuration
          ? parseFloat(data.videoMetadata.videoDuration)
          : undefined,
        // 分镜视频才需要判断是否在候选列表中
        isInCart: videoSplitId ? candidateSplitIds.value.has(videoSplitId) : false,
      },
    ];
  });

  // 点击视频预览区域打开播放器
  function handleVideoClick() {
    videoPlayerVisible.value = true;
  }

  // 播放器关闭
  function handlePlayerClose() {
    videoPlayerVisible.value = false;
  }

  // 加入候选（播放器内操作）
  async function handleAddToCart() {
    if (!props.videoId || props.isMainVideo) return;
    const success = await candidateStore.updateCandidate('add', props.videoId);
    if (success) {
      ElMessage({
        type: 'success',
        message: '已加入视频候选列表',
        customClass: 'video-player-message',
      });
    }
  }

  // 移出候选（播放器内操作）
  async function handleRemoveFromCart() {
    if (!props.videoId || props.isMainVideo) return;
    const success = await candidateStore.updateCandidate('remove', props.videoId);
    if (success) {
      ElMessage({
        type: 'success',
        message: '已从候选列表移除',
        customClass: 'video-player-message',
      });
    }
  }

  /**
   * 点击导航项
   */
  function handleNavClick(key: string) {
    activeNavKey.value = key;
    const targetRef = sectionRefs.value[key as keyof typeof sectionRefs.value];
    if (targetRef && contentRef.value) {
      targetRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * 滚动时更新激活的导航项
   */
  function handleScroll() {
    if (!contentRef.value) return;

    const scrollTop = contentRef.value.scrollTop;
    const containerTop = contentRef.value.getBoundingClientRect().top;

    let activeKey = 'basicInfo';
    let minDistance = Infinity;

    for (const nav of navItems.value) {
      const ref = sectionRefs.value[nav.key as keyof typeof sectionRefs.value];
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerTop);
        if (distance < minDistance) {
          minDistance = distance;
          activeKey = nav.key;
        }
      }
    }

    activeNavKey.value = activeKey;
  }

  /**
   * 上一个
   */
  function handlePrev() {
    emit('prev');
  }

  /**
   * 下一个
   */
  function handleNext() {
    emit('next');
  }

  /**
   * 关闭抽屉
   */
  function handleClose() {
    visible.value = false;
    emit('close');
  }

  // 详情数据
  const detailData = ref<VideoAnalysisDetailResp | null>(null);

  /**
   * 获取主视频详情
   */
  async function fetchMainVideoDetail(videoId: number) {
    const loadingInstance = ElLoading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.7)',
      target: '.video-detail-drawer',
    });

    try {
      const res = await videoAnalysisApi.luteosAiVideoAnalysisVideoDetail({ videoId });
      if (res) {
        detailData.value = res;
      }
    } catch (error) {
      console.error('获取主视频详情失败:', error);
      ElMessage.error('获取详情失败');
    } finally {
      loadingInstance.close();
    }
  }

  /**
   * 获取分镜视频详情
   */
  async function fetchSplitVideoDetail(videoId: number) {
    const loadingInstance = ElLoading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.7)',
      target: '.video-detail-drawer',
    });
    try {
      const res = await videoAnalysisApi.luteosAiVideoAnalysisVideoSplitDetail({ videoId });
      if (res) {
        // 将分镜视频详情数据转换为与主视频详情兼容的格式
        const splitData = res as VideoSplitDetailResp;
        const analysisResult = splitData.splitAnalysisResult;
        detailData.value = {
          id: splitData.videoId,
          itemId: splitData.itemId,
          videoId: splitData.videoId,
          title: splitData.splitTitle || splitData.title,
          author: splitData.author,
          source: splitData.source,
          authLable: splitData.authLable,
          authorization: splitData.authorization,
          authorizationArea: splitData.authorizationArea,
          validStartDate: splitData.validStartDate,
          validEndDate: splitData.validEndDate,
          fileKey: splitData.splitFileKey || splitData.fileKey,
          videoMetadata: splitData.videoMetadata,
          splitStartTime: splitData.splitStartTime,
          splitEndTime: splitData.splitEndTime,
          contentFeature: splitData?.contentFeature || [],
          textAndSpeechRecognition: analysisResult?.textAndSpeechRecognition,
          videoScript:
            analysisResult?.textAndSpeechRecognition?.fullSpeechResult?.originalTranscript || '',
          // 分镜视频特有字段映射
          otherFeatures: analysisResult?.emotionalTone || [],
          characterAnalysis: {
            mainCharacters: analysisResult?.characters || [],
            characterCharacteristics: [],
            gestureRecognition: analysisResult?.specialGestureRecognition,
          },
          sceneAnalysis: {
            sceneCount: '-',
            scenesIncluded: analysisResult?.sceneSetting ? [analysisResult.sceneSetting] : [],
            specialScenesPresent: {
              isSpecialScenes: false,
              specialScenes: [],
            },
          },
          contentBreakdown: {
            mainContentSummary: analysisResult?.briefDescription || '',
            contentElements: {
              hasFollowedContents: !!analysisResult?.highlightDescription,
              contents: analysisResult?.highlightDescription
                ? [analysisResult.highlightDescription]
                : [],
            },
            dynamicActivities: {
              hasActivities: !!analysisResult?.mainAction,
              activities: analysisResult?.mainAction ? [analysisResult.mainAction] : [],
            },
          },
          emotionalTone: analysisResult?.emotionalTone,
          atmosphere: analysisResult?.atmosphere,
          mainAction: analysisResult?.mainAction,
        };
      }
    } catch (error) {
      console.error('获取分镜视频详情失败:', error);
      ElMessage.error('获取详情失败');
    } finally {
      loadingInstance.close();
    }
  }

  /**
   * 获取详情数据
   */
  async function fetchDetail() {
    if (!props.videoId) {
      detailData.value = null;
      return;
    }

    if (props.isMainVideo) {
      await fetchMainVideoDetail(props.videoId);
    } else {
      await fetchSplitVideoDetail(props.videoId);
    }
  }

  // 监听modelValue变化，重置导航状态并获取数据
  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        activeNavKey.value = 'basicInfo';
        nextTick(() => {
          if (contentRef.value) {
            contentRef.value.scrollTop = 0;
          }
          // 在 nextTick 后获取详情数据，确保 videoId 已更新
          fetchDetail();
        });
      } else {
        // 关闭时清空数据
        detailData.value = null;
      }
    }
  );

  // 监听videoId变化，重新获取数据（仅在抽屉已打开且videoId有旧值时触发，避免初次打开时重复请求）
  watch(
    () => props.videoId,
    (newVal, oldVal) => {
      // oldVal存在说明不是初次打开，而是切换视频（如上/下一条）
      if (props.modelValue && newVal && oldVal && newVal !== oldVal) {
        fetchDetail();
      }
    }
  );
</script>

<style lang="scss" scoped>
  .video-detail-drawer {
    :global(.el-drawer__body) {
      padding: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  }

  /* 头部样式 */
  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    // border-bottom: 1.5px solid #f4f5f5;
    background: #fff;
    flex-shrink: 0;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .header-title {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #262626;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-buttons {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-btn,
  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    color: #8a8f8d;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background: #f4f5f5;
      color: #262626;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  /* 视频信息区域 */
  .video-info-section {
    background: #fff;
    border-bottom: 1.5px solid #f4f5f5;
    flex-shrink: 0;
  }

  /* 主体内容区域 */
  .content-wrapper {
    display: flex;
    flex: 1;
    overflow: hidden;
    background: #f8f8f8;
  }

  /* 左侧导航 */
  .left-nav {
    flex-shrink: 0;
    padding: 12px 16px;
    background: #f8f8f8;
    border-right: 1px solid #f4f5f5;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .nav-item {
    width: 112px;
    height: 30px;
    padding: 1px 8px;
    font-size: 13px;
    line-height: 22px;
    color: #585a5a;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      background: rgba(2, 185, 107, 0.05);
      color: #02b96b;
    }

    &.active {
      background: #f0fff6;
      color: #02b96b;
    }
  }

  /* 右侧内容 */
  .right-content {
    flex: 1;
    padding: 16px 20px 20px;
    overflow-y: auto;
    background: #fff;
  }

  /* 模块样式 */
  .section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    color: #262626;
  }

  .section-divider {
    height: 1px;
    background: #f4f5f5;
    margin: 12px 0;
  }

  /* 信息网格 - 三列布局 */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .info-item {
    display: flex;
    flex-direction: column;

    &.full-width {
      grid-column: 1 / -1;
    }
  }

  .info-label {
    font-size: 12px;
    line-height: 20px;
    color: #8a8f8d;
  }

  .info-value {
    font-size: 12px;
    line-height: 20px;
    color: #262626;

    &.multiline {
      line-height: 20px;
    }
  }

  /* 标签列表 */
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 2px 0;
  }

  .business-tag {
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    padding: 0 6px;
    border: none;
    border-radius: 4px;
    background: #f4f5f5;
    color: #262626;

    :deep(.el-tag__content) {
      line-height: 20px;
    }
  }

  .feature-tags {
    .feature-tag {
      font-size: 12px;
      line-height: 20px;
      height: auto;
      padding: 0 6px;
      background: #f4f5f5;
      color: #262626;
      border: none;
      border-radius: 4px;

      :deep(.el-tag__content) {
        line-height: 20px;
      }
    }
  }

  /* 内容分析 */
  .content-analysis-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* 技术信息网格 - 三列布局 */
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  /* 产品表格 */
  .product-table {
    margin-top: 8px;

    :deep(.el-table__header th) {
      background: #f7f7f7;
      font-size: 12px;
      font-weight: 500;
      color: #262626;
    }

    :deep(.el-table__row td) {
      font-size: 12px;
      color: #262626;
      vertical-align: top;
    }
  }

  .product-name-cell {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .product-img {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #f0f0f0;
    flex-shrink: 0;
  }

  .product-name-text {
    font-size: 12px;
    line-height: 18px;
    color: #262626;
  }

  /* 视频脚本 */
  .script-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .script-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .script-label {
    font-size: 12px;
    line-height: 20px;
    color: #585a5a;
  }

  .script-content-box {
    background: #f8f8f8;
    border: 1px solid #f4f5f5;
    border-radius: 6px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .script-item {
    display: flex;
    flex-direction: column;
  }

  .script-sub-label {
    font-size: 12px;
    line-height: 20px;
    color: #8a8f8d;
  }

  .script-text {
    font-size: 12px;
    line-height: 20px;
    color: #262626;
    text-align: justify;
    // white-space: pre-line;
  }

  .script-divider {
    height: 0;
    border-top: 1px dashed #e7e9e8;
  }

  /* 叙事结构分析 - 时间线 */
  .narrative-timeline {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 4px 0;
  }

  .timeline-item {
    display: flex;
    gap: 16px;
  }

  .timeline-left {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    padding-top: 8px;
  }

  .timeline-time {
    width: 27px;
    margin-top: -7px;
    font-size: 13px;
    line-height: 20px;
    color: #585a5a;
  }

  .timeline-line-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 8px;
  }

  .timeline-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #bec0bf;
    flex-shrink: 0;
  }

  .timeline-line {
    width: 0;
    flex: 1;
    min-height: 60px;
    border-left: 1px dashed #eff0f0;
    margin-bottom: -14px; // 延伸到下一个timeline-item覆盖gap(6px)和padding-top(8px)
  }

  .timeline-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 12px;
    background: #f8f8f8;
    border: 1px solid #eff0f0;
    border-radius: 6px;
  }

  .timeline-title {
    font-size: 13px;
    line-height: 22px;
    font-weight: 400;
    color: #262626;
  }

  .timeline-desc {
    font-size: 12px;
    line-height: 20px;
    color: #585a5a;
  }

  /* AIDA营销模型 */
  .aida-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .aida-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .aida-header {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .aida-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    background: #bec0bf;
  }

  .aida-label {
    font-size: 12px;
    line-height: 20px;
    color: #262626;
  }

  .aida-content {
    font-size: 12px;
    line-height: 20px;
    color: #8a8f8d;
    padding-left: 12px;
  }
</style>
