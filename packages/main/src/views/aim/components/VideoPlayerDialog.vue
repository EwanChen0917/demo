<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="visible" class="video-player-overlay" @click.self="handleClose">
        <!-- 关闭按钮 -->
        <div class="close-btn" @click="handleClose">
          <i class="Root-tyicon icon-Root-tyguanbi"></i>
        </div>

        <!-- 视频播放区域 -->
        <div
          class="video-container"
          :class="{ 'is-transitioning': isTransitioning }"
          :style="{
            width: videoContainerWidth + 'px',
            height: videoContainerHeight + 'px',
          }"
        >
          <video
            ref="videoRef"
            type="video/mp4"
            :src="currentVideo?.fileKey"
            class="video-player"
            :class="{ 'video-fade-in': !isTransitioning }"
            preload="auto"
            @loadedmetadata="onVideoLoaded"
            @timeupdate="onTimeUpdate"
            @ended="onVideoEnded"
            @play="onVideoPlay"
            @pause="onVideoPause"
            @click="togglePlay"
          ></video>

          <!-- 视频控制条 -->
          <div class="video-controls">
            <!-- 进度条 -->
            <div class="progress-bar-container" @click="handleProgressClick">
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
              </div>
              <div
                class="progress-bar-thumb"
                :style="{ left: progressPercent + '%' }"
                @mousedown="startDrag"
              ></div>
            </div>

            <!-- 控制按钮行 -->
            <div class="controls-row">
              <div class="controls-left">
                <!-- 播放/暂停按钮 -->
                <div class="control-btn" @click="togglePlay">
                  <el-tooltip v-if="isPlaying" content="暂停" placement="top" :z-index="99999">
                    <i class="Root-tyicon icon-Root-tyzanting-mianxing"></i>
                  </el-tooltip>
                  <el-tooltip v-else content="播放" placement="top" :z-index="99999">
                    <i class="Root-tyicon icon-Root-tybofang-mianxing"></i>
                  </el-tooltip>
                </div>
                <!-- 当前时间/总时长 -->
                <span class="time-display">
                  {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                </span>
              </div>
              <div class="controls-right">
                <!-- 声音控制 -->
                <div
                  class="volume-control"
                  @mouseenter="showVolumeSlider = true"
                  @mouseleave="showVolumeSlider = false"
                >
                  <div class="control-btn" @click="toggleMute">
                    <i
                      class="Root-tyicon icon-Root-tyshengyinguanbi"
                      v-if="isMuted || volume === 0"
                    ></i>
                    <i class="Root-tyicon icon-Root-tyshengyinkaiqi" v-else></i>
                  </div>
                  <!-- 音量滑块容器 -->
                  <transition name="volume-fade">
                    <div v-if="showVolumeSlider" class="volume-slider-container">
                      <div class="volume-value">{{ volume }}</div>
                      <div class="volume-slider-track" @click="handleVolumeSliderClick">
                        <div class="volume-slider-fill" :style="{ height: volume + '%' }"></div>
                        <div
                          class="volume-slider-thumb"
                          :style="{ bottom: volume + '%' }"
                          @mousedown="startVolumeDrag"
                        ></div>
                      </div>
                    </div>
                  </transition>
                </div>
                <!-- 下载按钮 -->
                <div ref="downloadBtnRef" class="control-btn" @click="handleDownload">
                  <el-tooltip content="导出" placement="top" :z-index="99999">
                    <i class="Root-tyicon icon-Root-tyxiazai"></i>
                  </el-tooltip>
                </div>
                <!-- 加入候选按钮 -->
                <div
                  v-if="showCartBtn && !isInCart"
                  class="control-btn"
                  :class="{ 'is-disabled': addToCartLoading }"
                  @click="handleAddToCart"
                >
                  <el-tooltip content="加入候选" placement="top" :z-index="99999">
                    <el-icon :size="20">
                      <i class="Root-tyicon icon-Root-tyjiaruhouxuan"></i>
                    </el-icon>
                  </el-tooltip>
                </div>
                <!-- 移出候选按钮（带确认弹窗） -->
                <CancelCandidatePopconfirm
                  v-if="showCartBtn && isInCart"
                  placement="top-end"
                  @confirm="handleRemoveFromCart"
                >
                  <template #reference>
                    <div class="control-btn">
                      <el-tooltip content="移出候选" placement="top" :z-index="99999">
                        <el-icon :size="20">
                          <i class="Root-tyicon icon-Root-tyshanchu icon-remove"></i>
                        </el-icon>
                      </el-tooltip>
                    </div>
                  </template>
                </CancelCandidatePopconfirm>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部切换导航 -->
        <div v-if="videoList.length > 1" class="video-nav">
          <div class="nav-btn" :class="{ disabled: currentIndex <= 0 }" @click="handlePrev">
            <el-tooltip content="上一条" placement="top" :z-index="99999">
              <el-icon :size="12"><ArrowLeft /></el-icon>
            </el-tooltip>
          </div>
          <div class="nav-divider"></div>
          <div class="nav-index">{{ currentIndex + 1 }}/{{ videoList.length }}</div>
          <div class="nav-divider"></div>
          <div
            class="nav-btn"
            :class="{ disabled: currentIndex >= videoList.length - 1 }"
            @click="handleNext"
          >
            <el-tooltip content="下一条" placement="top" :z-index="99999">
              <el-icon :size="12"><ArrowRight /></el-icon>
            </el-tooltip>
          </div>
        </div>
      </div>
    </transition>

    <!-- 导出语言选择弹窗（仅分镜/候选视频使用） -->
    <LanguageSelectPopover
      ref="languageSelectPopoverRef"
      :trigger-ref="downloadBtnRef"
      :selected-list="currentExportList"
      placement="top"
      :is-candidate="videoSource === 'candidate'"
      @success="handleExportSuccess"
      @close="handleExportClose"
    />
  </teleport>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
  import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
  import { downloadWithNotification } from '@/utils/videoDownload';
  import LanguageSelectPopover from './LanguageSelectPopover.vue';
  import CancelCandidatePopconfirm from './CancelCandidatePopconfirm.vue';

  // 视频信息接口
  export interface VideoInfo {
    id: number | string;
    videoSplitId?: number | string; // 在候选列表调用本组件才有
    fileKey: string; // 视频URL
    title?: string;
    proportion?: string; // 视频比例，如 "横屏 16:9" 或 "竖屏 9:16"
    videoTime?: number; // 视频时长(秒)
    isInCart?: boolean; // 是否在购物车中
    [key: string]: any;
  }

  // Props
  const props = withDefaults(
    defineProps<{
      visible: boolean;
      videoList: VideoInfo[];
      initialIndex?: number;
      defaultAspectRatio?: number; // 默认宽高比
      showCartBtn?: boolean; // 是否显示购物车按钮
      videoSource?: 'main' | 'split' | 'candidate'; // 视频来源
      addToCartLoading?: boolean; // 加入候选按钮 loading 状态
    }>(),
    {
      initialIndex: 0,
      defaultAspectRatio: 9 / 16, // 默认竖屏
      showCartBtn: true, // 默认显示购物车按钮
      videoSource: 'split', // 默认为分镜视频
      addToCartLoading: false,
    }
  );

  // Emits
  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
    (e: 'close'): void;
    (e: 'addToCart', video: VideoInfo): void;
    (e: 'removeFromCart', video: VideoInfo): void;
    (e: 'download', video: VideoInfo): void;
    (e: 'change', index: number, video: VideoInfo): void;
  }>();

  // Refs
  const videoRef = ref<HTMLVideoElement | null>(null);
  const currentIndex = ref(props.initialIndex);
  const isPlaying = ref(false);
  const isMuted = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const isDragging = ref(false);
  const videoAspectRatio = ref<number | null>(null);
  const isTransitioning = ref(false);
  const animationFrameId = ref<number | null>(null);
  const showVolumeSlider = ref(false);
  // 直接从 localStorage 读取音量，确保跨组件实例同步
  const volume = ref(Number(localStorage.getItem('video-player-volume')) || 0);
  const isVolumeSliderDragging = ref(false);

  // 移出候选操作状态：记录即将被移除的视频索引，用于在 videoList 变化后处理自动切换
  const pendingRemovalIndex = ref<number | null>(null);

  // 当前视频
  const currentVideo = computed(() => {
    return props.videoList[currentIndex.value] || null;
  });

  // 是否在购物车中
  const isInCart = computed(() => {
    return currentVideo.value?.isInCart || false;
  });

  // 进度百分比
  const progressPercent = computed(() => {
    if (duration.value === 0) return 0;
    return (currentTime.value / duration.value) * 100;
  });

  // 判断视频是否为横屏
  const isLandscape = computed(() => {
    // 优先从 proportion 字段判断
    if (currentVideo.value?.proportion) {
      return currentVideo.value.proportion.includes('横屏');
    }
    // 然后从视频实际宽高比判断
    if (videoAspectRatio.value !== null) {
      return videoAspectRatio.value > 1;
    }
    // 使用默认值
    return props.defaultAspectRatio > 1;
  });

  // 视频容器尺寸
  // eslint-disable-next-line no-else-return
  const videoContainerWidth = computed(() => {
    if (isLandscape.value) {
      // 横屏: 最大高度640，根据视频实际比例计算宽度
      const aspectRatio = videoAspectRatio.value || 16 / 9;
      const maxWidth = 1138;
      const maxHeight = 640;
      const widthFromHeight = maxHeight * aspectRatio;
      return Math.min(maxWidth, Math.round(widthFromHeight));
    }
    // 竖屏: 360x640
    return 360;
  });

  // eslint-disable-next-line no-else-return
  const videoContainerHeight = computed(() => {
    if (isLandscape.value) {
      // 横屏: 根据实际宽度和比例计算高度，最大640
      const aspectRatio = videoAspectRatio.value || 16 / 9;
      const maxHeight = 640;
      const calculatedWidth = videoContainerWidth.value;
      const heightFromWidth = calculatedWidth / aspectRatio;
      return Math.min(maxHeight, Math.round(heightFromWidth));
    }
    // 竖屏: 固定640
    return 640;
  });

  // 初始化键盘事件
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
  });

  // Watch volume 变化时保存到本地存储并更新视频音量
  watch(volume, (newVolume) => {
    localStorage.setItem('video-player-volume', String(newVolume));
    if (videoRef.value) {
      videoRef.value.volume = newVolume / 100;
      // 如果音量大于0，自动取消静音
      if (newVolume > 0 && isMuted.value) {
        isMuted.value = false;
        videoRef.value.muted = false;
      } else if (newVolume === 0) {
        isMuted.value = true;
        videoRef.value.muted = true;
      }
    }
  });

  // Watch props.initialIndex
  watch(
    () => props.initialIndex,
    (newIndex) => {
      currentIndex.value = newIndex;
    }
  );

  // 监听 videoList 变化，处理移除候选后的自动切换逻辑
  watch(
    () => props.videoList,
    (newList, oldList) => {
      // 弹窗不可见时不处理
      if (!props.visible) {
        pendingRemovalIndex.value = null;
        return;
      }

      const newLength = newList.length;
      const oldLength = oldList?.length ?? newLength;

      // 如果列表为空，关闭弹窗
      if (newLength === 0) {
        pendingRemovalIndex.value = null;
        handleClose();
        return;
      }

      // 始终确保 currentIndex 在有效范围内（处理列表变化导致索引越界的情况）
      if (currentIndex.value >= newLength) {
        currentIndex.value = newLength - 1;
      }

      // 如果有待处理的移除操作且列表确实减少了
      if (pendingRemovalIndex.value !== null && oldLength > newLength) {
        pendingRemovalIndex.value = null; // 重置标志
        // 重新加载视频
        resetVideoState();
        nextTick(() => {
          autoPlayVideo();
        });
      }
    },
    { deep: false }
  );

  // Watch currentIndex 变化时通知父组件
  watch(currentIndex, (newIndex) => {
    if (props.videoList[newIndex]) {
      emit('change', newIndex, props.videoList[newIndex]);
    }
    // 重置视频状态
    resetVideoState();
    // 自动播放当前视频
    nextTick(() => {
      autoPlayVideo();
    });
  });

  // Watch visible 变化
  watch(
    () => props.visible,
    (newVisible) => {
      if (newVisible) {
        // 每次打开播放器时，从 localStorage 同步音量设置，确保跨组件实例的音量一致
        const savedVolume = localStorage.getItem('video-player-volume');
        if (savedVolume !== null) {
          volume.value = Number(savedVolume);
        }
        currentIndex.value = props.initialIndex;
        resetVideoState();
        // 自动播放当前视频
        nextTick(() => {
          autoPlayVideo();
        });
      } else {
        pauseVideo();
      }
    }
  );

  // 重置视频状态
  function resetVideoState() {
    currentTime.value = 0;
    duration.value = 0;
    isPlaying.value = false;
    videoAspectRatio.value = null;
  }

  // 视频加载完成
  function onVideoLoaded() {
    if (videoRef.value) {
      duration.value = videoRef.value.duration;
      // 获取视频实际宽高比
      const { videoWidth, videoHeight } = videoRef.value;
      if (videoWidth && videoHeight) {
        videoAspectRatio.value = videoWidth / videoHeight;
      }
      // 设置音量
      videoRef.value.volume = volume.value / 100;
      videoRef.value.muted = isMuted.value;
      // 结束过渡状态，淡入新视频
      isTransitioning.value = false;
      // 自动播放视频
      autoPlayVideo();
    }
  }

  // 自动播放视频
  function autoPlayVideo() {
    if (videoRef.value && props.visible) {
      videoRef.value.play().catch((error) => {
        // 浏览器可能阻止自动播放，静默处理
        console.log('Auto-play was prevented:', error);
      });
    }
  }

  // 时间更新（保留作为备用，主要使用 RAF 更新）
  function onTimeUpdate() {
    if (!isDragging.value && videoRef.value) {
      currentTime.value = videoRef.value.currentTime;
    }
  }

  // 使用 requestAnimationFrame 平滑更新进度条
  function startProgressAnimation() {
    const updateProgress = () => {
      if (!isDragging.value && videoRef.value && isPlaying.value) {
        currentTime.value = videoRef.value.currentTime;
      }
      if (isPlaying.value) {
        animationFrameId.value = requestAnimationFrame(updateProgress);
      }
    };
    // 取消之前的动画帧
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);
    }
    animationFrameId.value = requestAnimationFrame(updateProgress);
  }

  // 停止进度动画
  function stopProgressAnimation() {
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);
      animationFrameId.value = null;
    }
  }

  // 视频开始播放
  function onVideoPlay() {
    isPlaying.value = true;
    startProgressAnimation();
  }

  // 视频暂停
  function onVideoPause() {
    isPlaying.value = false;
    stopProgressAnimation();
  }

  // 视频播放结束
  function onVideoEnded() {
    isPlaying.value = false;
    stopProgressAnimation();
  }

  // 切换播放/暂停
  function togglePlay() {
    if (!videoRef.value) return;
    if (isPlaying.value) {
      videoRef.value.pause();
      stopProgressAnimation();
    } else {
      videoRef.value.play();
      startProgressAnimation();
    }
  }

  // 暂停视频
  function pauseVideo() {
    if (videoRef.value && !videoRef.value.paused) {
      videoRef.value.pause();
    }
    stopProgressAnimation();
  }

  // 切换静音
  function toggleMute() {
    if (!videoRef.value) return;
    isMuted.value = !isMuted.value;
    videoRef.value.muted = isMuted.value;
    // 静音时将音量置为 0
    if (isMuted.value) {
      volume.value = 0;
    } else if (volume.value === 0) {
      // 取消静音时，如果音量为 0，设置为默认音量
      volume.value = 60;
    }
  }

  // 音量滑块拖拽
  function startVolumeDrag(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    isVolumeSliderDragging.value = true;
    document.addEventListener('mousemove', onVolumeDrag);
    document.addEventListener('mouseup', stopVolumeDrag);
  }

  function onVolumeDrag(e: MouseEvent) {
    if (!isVolumeSliderDragging.value) return;
    const sliderTrack = document.querySelector('.volume-slider-track');
    if (!sliderTrack) return;
    const rect = sliderTrack.getBoundingClientRect();
    // 音量滑块是垂直的，从下到上增加
    const percent = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
    volume.value = Math.round(percent * 100);
  }

  function stopVolumeDrag() {
    isVolumeSliderDragging.value = false;
    document.removeEventListener('mousemove', onVolumeDrag);
    document.removeEventListener('mouseup', stopVolumeDrag);
  }

  // 点击音量滑块轨道
  function handleVolumeSliderClick(e: MouseEvent) {
    const sliderTrack = e.currentTarget as HTMLElement;
    const rect = sliderTrack.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
    volume.value = Math.round(percent * 100);
  }

  // 格式化时间
  function formatTime(seconds: number): string {
    if (!seconds || Number.isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // 处理进度条点击
  function handleProgressClick(e: MouseEvent) {
    if (!videoRef.value) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = percent * duration.value;
    videoRef.value.currentTime = newTime;
    currentTime.value = newTime;
  }

  // 开始拖拽
  function startDrag(e: MouseEvent) {
    e.preventDefault();
    isDragging.value = true;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  }

  // 拖拽中
  function onDrag(e: MouseEvent) {
    if (!isDragging.value || !videoRef.value) return;
    const progressContainer = document.querySelector('.progress-bar-container');
    if (!progressContainer) return;
    const rect = progressContainer.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    currentTime.value = percent * duration.value;
  }

  // 停止拖拽
  function stopDrag() {
    if (isDragging.value && videoRef.value) {
      videoRef.value.currentTime = currentTime.value;
    }
    isDragging.value = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  }

  // ============ 导出相关 ============
  const downloadBtnRef = ref<HTMLElement | null>(null);
  const languageSelectPopoverRef = ref();
  const currentExportList = ref<any[]>([]);

  // 处理下载/导出
  function handleDownload() {
    if (!currentVideo.value?.fileKey) return;

    if (props.videoSource === 'main') {
      // 主视频列表：直接下载
      downloadWithNotification(currentVideo.value.fileKey);
      emit('download', currentVideo.value);
    } else {
      // 分镜/候选视频：弹出语言选择弹窗
      currentExportList.value = [currentVideo.value];
      languageSelectPopoverRef.value?.show();
    }
  }

  /** 导出成功回调 */
  function handleExportSuccess() {
    currentExportList.value = [];
    emit('download', currentVideo.value!);
  }

  /** 导出弹窗关闭回调 */
  function handleExportClose() {
    // 无需额外处理
  }

  // 加入候选
  function handleAddToCart() {
    if (!currentVideo.value || props.addToCartLoading) return;
    emit('addToCart', currentVideo.value);
  }

  // 移出候选（确认后调用）
  function handleRemoveFromCart() {
    if (!currentVideo.value) return;
    // 记录当前要移除的视频索引，用于 videoList 变化后处理切换逻辑
    pendingRemovalIndex.value = currentIndex.value;
    emit('removeFromCart', currentVideo.value);
  }

  // 上一个视频
  function handlePrev() {
    if (currentIndex.value > 0) {
      switchToVideo(currentIndex.value - 1);
    }
  }

  // 下一个视频
  function handleNext() {
    if (currentIndex.value < props.videoList.length - 1) {
      switchToVideo(currentIndex.value + 1);
    }
  }

  // 切换到指定视频（带过渡动效）
  function switchToVideo(newIndex: number) {
    if (newIndex === currentIndex.value) return;

    // 开始过渡：淡出当前视频
    isTransitioning.value = true;
    pauseVideo();

    // 等待淡出动画完成后切换视频
    setTimeout(() => {
      currentIndex.value = newIndex;
    }, 150);
  }

  // 关闭弹窗
  function handleClose() {
    pauseVideo();
    emit('update:visible', false);
    emit('close');
  }

  // 键盘事件处理
  function handleKeydown(e: KeyboardEvent) {
    if (!props.visible) return;
    switch (e.key) {
      case 'Escape':
        handleClose();
        break;
      case ' ':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowLeft':
        handlePrev();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      case 'm':
      case 'M':
        toggleMute();
        break;
      default:
        // do nothing
        break;
    }
  }

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('mousemove', onVolumeDrag);
    document.removeEventListener('mouseup', stopVolumeDrag);
    stopProgressAnimation();
  });
</script>

<style lang="scss" scoped>
  .video-player-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  // 关闭按钮
  .close-btn {
    position: absolute;
    top: 32px;
    right: 32px;
    width: 46px;
    height: 46px;
    background: #585a5a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #fff;
    transition: background 0.2s;

    &:hover {
      background: #6a6c6c;
    }
    .Root-tyicon {
      font-size: 28px;
      color: #fff;
    }
  }

  // 视频容器
  .video-container {
    position: relative;
    background: rgba(0, 0, 0, 0);
    border-radius: 10px;
    overflow: hidden;
    transition: width 0.2s ease, height 0.3s ease;
  }

  .video-player {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #000;
    opacity: 1;
    transition: opacity 0.2s ease;
    cursor: pointer;
  }

  .video-player.video-fade-in {
    opacity: 1;
  }

  .video-container.is-transitioning .video-player {
    opacity: 0;
  }

  // 视频控制条
  .video-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 52px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
    padding: 12px 12px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .Root-tyicon {
      font-size: 18px;
      color: #fff;
    }
  }

  // 进度条
  .progress-bar-container {
    position: relative;
    width: 100%;
    height: 3px;
    cursor: pointer;
  }

  .progress-bar-bg {
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.35);
    border-radius: 20px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: #fff;
    border-radius: 20px;
    // 移除 transition，使用 RAF 实现平滑更新
  }

  .progress-bar-thumb {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    border: 2px solid #fff;
    background: var(---P6, #02b96b);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: grab;
    // box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

    &:active {
      cursor: grabbing;
    }
  }

  // 控制按钮行
  .controls-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .controls-left,
  .controls-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  // 音量控制
  .volume-control {
    position: relative;
    display: flex;
    align-items: center;
  }

  .volume-slider-container {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 12px;
    width: 32px;
    height: 120px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .volume-value {
    font-size: 12px;
    color: #fff;
    font-weight: 500;
    line-height: 16px;
  }

  .volume-slider-track {
    position: relative;
    width: 3px;
    height: 80px;
    background: rgba(255, 255, 255, 0.35);
    border-radius: 20px;
    cursor: pointer;
  }

  .volume-slider-fill {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #02b96b;
    border-radius: 20px;
    transition: height 0.1s ease;
  }

  .volume-slider-thumb {
    position: absolute;
    left: 50%;
    width: 12px;
    height: 12px;
    background: #02b96b;
    border-radius: 50%;
    transform: translate(-50%, 50%);
    cursor: grab;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    &:active {
      cursor: grabbing;
    }
  }

  // 音量滑块动画
  .volume-fade-enter-active,
  .volume-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .volume-fade-enter-from,
  .volume-fade-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
  }

  .volume-fade-enter-to,
  .volume-fade-leave-from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .control-btn {
    color: #fff;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover:not(.is-disabled) {
      opacity: 1;
    }

    &.is-disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .icon-remove {
      color: var(---C8, #f53f3f);
    }
  }

  .time-display {
    font-size: 12px;
    color: #fff;
    line-height: 20px;
  }

  // 底部导航
  .video-nav {
    display: flex;
    align-items: center;
    height: 36px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 40px;
    margin-top: 24px;
  }

  .nav-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: color 0.2s;

    &:hover:not(.disabled) {
      color: #fff;
    }

    &.disabled {
      color: rgba(255, 255, 255, 0.3);
      cursor: not-allowed;
    }
  }

  .nav-divider {
    width: 1px;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
  }

  .nav-index {
    padding: 12px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 20px;
  }

  // 过渡动画
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  // 当视频播放器遮罩层存在时，提升 ElMessage 层级使其高于遮罩层（z-index: 9999）
  // ElMessage 通过内联样式设置 z-index（~2000），需要 !important 覆盖
  :global(.video-player-overlay ~ .el-message) {
    z-index: 99999 !important;
  }
</style>
