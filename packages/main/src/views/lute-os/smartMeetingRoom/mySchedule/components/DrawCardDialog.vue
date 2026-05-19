<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    modal-class="smr-draw-card-modal"
    width="1267px"
    class="custom-dialog smr-draw-card-dialog"
  >
    <div class="smr-draw-card-container">
      <div class="smr-draw-card-header">
        <div class="title">今日卡牌抽取</div>
        <div class="subtitle">根据你的信息生成</div>
        <i class="iconfont icon-guanbi" @click="handleClose"></i>
      </div>

      <div class="smr-draw-card-content">
        <div class="card-scene" :class="{ 'is-flipped': isFlipped }" @click="handleFlip">
          <div class="float-layer">
            <div
              class="tilt-layer"
              :style="cardTransform"
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave"
            >
              <div class="card-inner">
                <div class="card-face card-back">
                  <img src="../../assets/card-back-copy.webp" class="back-bg" alt="card back" />
                  <div class="back-placeholder">
                    <span class="q-mark">?</span>
                    <p class="guide-text">点击卡牌获取今日指引</p>
                  </div>
                </div>

                <div class="card-face card-front">
                  <img
                    :src="fortuneCardLink || ''"
                    class="fortune-img"
                    :style="{ visibility: fortuneCardLink ? 'visible' : 'hidden' }"
                    @load="handleFortuneImageReady"
                    @error="handleFortuneImageReady"
                    alt="fortune card"
                  />
                  <div
                    class="custom-skeleton"
                    :style="{
                      opacity: showSkeleton ? 1 : 0,
                      pointerEvents: showSkeleton ? 'auto' : 'none',
                    }"
                  >
                    <div class="skeleton-glow"></div>
                    <div class="skeleton-content">
                      <i class="iconfont icon-card-loading"></i>
                      <p>生成中...</p>
                    </div>
                  </div>
                  <div class="card-glare"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="smr-draw-card-footer">
        <template v-if="isFlipped">
          <button class="btn-save" :disabled="loading" @click="handleSave">
            <i class="iconfont icon-xiazai"></i>
            保存日签
          </button>
        </template>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { isEmpty } from 'lodash-es';
  import { useStore } from '@/store/modules/useStore';
  import { getMyScheduleApi } from '../api';

  const blobCache = new Map<string, string>();

  const props = defineProps<{
    modelValue: boolean;
    date: string;
    hasDrawn?: boolean;
  }>();

  const emit = defineEmits(['update:modelValue', 'success']);

  const visible = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v),
  });

  const api = getMyScheduleApi();
  const store = useStore();
  const loading = ref(false);
  const isFlipped = ref(false);
  const fortuneCardLink = ref('');
  const fortuneImageReady = ref(false);
  const showSkeleton = computed(
    () => loading.value || (!!fortuneCardLink.value && !fortuneImageReady.value)
  );
  const currentMemberCode = computed(() => String(store?.userInfo?.memberCode || ''));
  const fortuneCardStorageKey = computed(
    () => `lute_smr_fortune_card_${currentMemberCode.value}_${props.date}`
  );
  const isValidFortuneCardLink = (link?: string | null) => {
    const normalized = String(link || '').trim();
    return !isEmpty(normalized) && !['undefined', 'null'].includes(normalized.toLowerCase());
  };
  const getCachedFortuneCardLink = () => {
    const link = localStorage.getItem(fortuneCardStorageKey.value) || '';
    if (isValidFortuneCardLink(link)) return link;
    localStorage.removeItem(fortuneCardStorageKey.value);
    return '';
  };
  watch(visible, async (newVal) => {
    if (newVal) {
      const cachedLink = getCachedFortuneCardLink();
      if (cachedLink) {
        isFlipped.value = true;
        loading.value = true;
        try {
          if (blobCache.has(cachedLink)) {
            fortuneImageReady.value = false;
            fortuneCardLink.value = blobCache.get(cachedLink)!;
            return;
          }
          const localUrl = await preloadImage(cachedLink);
          fortuneImageReady.value = false;
          fortuneCardLink.value = localUrl;
        } catch {
          localStorage.removeItem(fortuneCardStorageKey.value);
          isFlipped.value = false;
          fortuneCardLink.value = '';
          ElMessage.warning('今日运势卡片加载失败，请重新抽取');
        } finally {
          loading.value = false;
        }
      }
    } else {
      handleClose();
    }
  });

  const abortController = ref<AbortController | null>(null);

  const preloadImage = (url: string): Promise<string> => {
    if (blobCache.has(url)) {
      return Promise.resolve(blobCache.get(url)!);
    }

    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        blobCache.set(url, url);
        resolve(url);
      };
      img.onerror = () => {
        console.error('[DrawCard] 图片加载失败:', url);
        reject(new Error('FORTUNE_IMAGE_LOAD_FAILED'));
      };
      img.src = url;
    });
  };

  const handleFlip = async () => {
    if (isFlipped.value || loading.value) return;

    const cachedLink = getCachedFortuneCardLink();
    if (cachedLink) {
      loading.value = true;
      isFlipped.value = true;
      try {
        const localUrl = await preloadImage(cachedLink);
        fortuneImageReady.value = false;
        fortuneCardLink.value = localUrl;
      } catch {
        localStorage.removeItem(fortuneCardStorageKey.value);
        isFlipped.value = false;
        fortuneCardLink.value = '';
        ElMessage.warning('今日运势卡片加载失败，请重新抽取');
      } finally {
        loading.value = false;
      }
      return;
    }

    loading.value = true;
    isFlipped.value = true;
    abortController.value = new AbortController();

    try {
      const res = await api.drawFortuneCard(
        { memberCode: String(store?.userInfo?.memberCode || '') },
        {
          signal: abortController.value?.signal,
          customCatch: true,
        }
      );

      const link = String(res.fortuneCardLink || '').trim();
      if (!isValidFortuneCardLink(link)) {
        throw new Error('抽卡结果异常，请重试');
      }

      const localUrl = await preloadImage(link);
      fortuneImageReady.value = false;
      fortuneCardLink.value = localUrl;
      localStorage.setItem(fortuneCardStorageKey.value, link);
      emit('success');
    } catch (error: any) {
      if (
        error.name === 'CanceledError' ||
        error.name === 'AbortError' ||
        error.code === 'ERR_CANCELED'
      ) {
        console.log('[DrawCard] 请求已取消:', error.message);
        return;
      }
      localStorage.removeItem(fortuneCardStorageKey.value);
      fortuneCardLink.value = '';
      ElMessage.error(error?.message || '抽取失败');
      isFlipped.value = false;
    } finally {
      loading.value = false;
      abortController.value = null;
    }
  };

  const handleSave = () => {
    if (!fortuneCardLink.value) return;

    const link = document.createElement('a');
    link.href = fortuneCardLink.value;
    link.download = `今日运势_${props.date}.png`;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => {
    abortController.value?.abort();

    visible.value = false;
    setTimeout(() => {
      isFlipped.value = false;
      fortuneCardLink.value = '';
      fortuneImageReady.value = false;
      loading.value = false;
    }, 300);
  };

  const handleFortuneImageReady = () => {
    fortuneImageReady.value = true;
  };

  const rotateX = ref(0);
  const rotateY = ref(0);
  const isHovering = ref(false);

  const cardTransform = computed(() => {
    return {
      transform: `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
      transition: isHovering.value ? 'none' : 'all 0.5s ease',
    };
  });

  const handleMouseMove = (e: MouseEvent) => {
    isHovering.value = true;

    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateX.value = -((y - centerY) / centerY) * 12;
    rotateY.value = ((x - centerX) / centerX) * 12;
  };

  const handleMouseLeave = () => {
    isHovering.value = false;
    rotateX.value = 0;
    rotateY.value = 0;
  };
</script>

<style lang="scss" scoped>
  .smr-draw-card-container {
    padding: 24px 40px;
    background: url('../../assets/card-background2.webp') no-repeat center center;
    background-size: 100% 100%;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    aspect-ratio: 5404 / 3040;
    display: flex;
    flex-direction: column;

    .smr-draw-card-header {
      margin-bottom: 20px;
      position: relative;
      z-index: 10;
      .title {
        font-size: 24px;
        font-weight: 800;
        color: #fff;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
      .subtitle {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      }
      .icon-guanbi {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 24px;
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          color: #fff;
          transform: rotate(90deg) scale(1.1);
        }
      }
    }

    .smr-draw-card-content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      min-height: 0;
      position: relative;
      z-index: 5;

      .card-scene {
        width: 278px;
        height: 494px;
        perspective: 1500px;
        cursor: pointer;

        .float-layer {
          width: 100%;
          height: 100%;
          animation: float-y 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        &.is-flipped .float-layer {
          animation-play-state: paused;
        }

        .tilt-layer {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform: scale(0.95);
          transform-style: preserve-3d;
          transition: box-shadow 0.4s ease;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

          &::before {
            content: '';
            position: absolute;
            inset: -45px;
            background: radial-gradient(
              circle at 50% 50%,
              rgba(165, 55, 255, 0.5) 0%,
              rgba(165, 55, 255, 0) 80%
            );
            border-radius: 40px;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.8s ease;
            pointer-events: none;
            filter: blur(20px);
          }

          &:hover {
            box-shadow: 0 0 40px rgba(165, 55, 255, 0.4), 0 0 80px rgba(165, 55, 255, 0.2),
              0 0 120px rgba(165, 55, 255, 0.1);
            &::before {
              opacity: 1;
            }
          }
        }

        &.is-flipped .card-inner {
          animation: flip-and-settle 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .card-back {
          background: #02b96b;
          .back-bg {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .back-placeholder {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            .q-mark {
              font-size: 80px;
              font-weight: 800;
              margin-bottom: 20px;
            }
            .guide-text {
              position: absolute;
              bottom: 61px;
              left: 50%;
              transform: translateX(-50%);
              font-size: 14px;
              opacity: 0.8;
              white-space: nowrap;
            }
          }
        }

        .card-front {
          background: #111;
          transform: rotateY(180deg);
          .fortune-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background: #111;
          }

          .custom-skeleton {
            width: 100%;
            height: 100%;
            background: #111;
            position: absolute;
            inset: 0;
            z-index: 5;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            transition: opacity 0.4s ease;

            .skeleton-glow {
              position: absolute;
              inset: 0;
              background: linear-gradient(
                45deg,
                rgba(165, 55, 255, 0) 0%,
                rgba(165, 55, 255, 0.1) 45%,
                rgba(165, 55, 255, 0.2) 50%,
                rgba(165, 55, 255, 0.1) 55%,
                rgba(165, 55, 255, 0) 100%
              );
              background-size: 200% 200%;
              animation: fortune-scan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }

            .skeleton-content {
              position: relative;
              z-index: 2;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 16px;
              color: rgba(255, 255, 255, 0.5);

              i {
                font-size: 44px;
                animation: pulse-loading 1.5s ease-in-out infinite;
              }

              p {
                font-size: 14px;
                letter-spacing: 2px;
                margin: 0;
                animation: text-shimmer 2s linear infinite;
              }
            }
          }

          .card-glare {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0) 30%,
              rgba(255, 255, 255, 0.4) 50%,
              rgba(255, 255, 255, 0) 70%
            );
            background-size: 200% 200%;
            background-position: 200% 200%;
            pointer-events: none;
            z-index: 10;
          }
        }

        &.is-flipped .card-glare {
          animation: glare-once 1.5s ease-out forwards;
          animation-delay: 0.4s;
        }
      }
    }

    .smr-draw-card-footer {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      position: relative;
      z-index: 10;
      .btn-save {
        width: 100%;
        max-width: 176px;
        height: 42px;
        background: rgba(165, 55, 255, 0.15);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        color: #fff;
        border: 1px solid rgba(165, 55, 255, 0.3);
        border-radius: 21px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.1, 1);
        letter-spacing: 1px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

        i {
          font-size: 18px;
          opacity: 0.9;
        }

        &:hover:not(:disabled) {
          background: rgba(165, 55, 255, 0.3);
          border-color: rgba(165, 55, 255, 0.6);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(165, 55, 255, 0.3), 0 0 15px rgba(165, 55, 255, 0.2);
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }

        &:active:not(:disabled) {
          transform: translateY(-1px);
        }

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      }
    }
  }

  @keyframes flip-and-settle {
    0% {
      transform: rotateY(0) scale(0.95) translateY(0);
    }
    50% {
      transform: rotateY(180deg) scale(1.24) translateY(-10px);
    }
    100% {
      transform: rotateY(180deg) scale(1) translateY(-5px);
    }
  }

  @keyframes float-y {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }

  @keyframes glare-once {
    0% {
      background-position: 200% 200%;
    }
    100% {
      background-position: -100% -100%;
    }
  }

  @keyframes fortune-scan {
    0% {
      background-position: 200% 0%;
    }
    100% {
      background-position: -200% 0%;
    }
  }

  @keyframes pulse-loading {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
  }

  @keyframes text-shimmer {
    0%,
    100% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.9;
    }
  }
</style>

<style lang="scss">
  .el-dialog.smr-draw-card-dialog {
    background: transparent;
    box-shadow: none;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
  }

  .smr-draw-card-modal {
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
</style>
