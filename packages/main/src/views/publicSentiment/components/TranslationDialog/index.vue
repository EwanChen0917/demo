<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    width="800px"
    class="translation-dialog"
    modal-class="translation-dialog-modal"
    :close-on-click-modal="!loading"
    @open="syncLoading"
    @opened="syncLoading"
    @closed="closeLoading"
  >
    <template #header>
      <div class="dialog-header">
        <div class="title">翻译</div>
        <el-icon class="close-icon" @click="visible = false"><Close /></el-icon>
      </div>
    </template>
    <div ref="dialogBodyRef" class="dialog-body">
      <template v-if="!loading">
        <div v-if="errorMessage" class="translation-error-message">
          {{ errorMessage }}
        </div>
        <template v-else>
          <div class="translation-item">
            <div class="translation-label">原文</div>
            <div class="translation-content">{{ sourceText || '-' }}</div>
          </div>
          <div class="translation-item">
            <div class="translation-label">原文语言</div>
            <div class="translation-content">{{ sourceLang || '-' }}</div>
          </div>
          <div class="translation-item">
            <div class="translation-label">译文</div>
            <div class="translation-content">{{ translatedText || '-' }}</div>
          </div>
        </template>
      </template>
    </div>
  </el-dialog>
</template>

<script setup name="TranslationDialog">
  import { Close } from '@element-plus/icons-vue';
  import { ElLoading } from 'element-plus';

  const visible = defineModel({ type: Boolean, default: false });
  const dialogBodyRef = ref(null);
  const loadingInstance = shallowRef(null);

  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    sourceText: {
      type: String,
      default: '',
    },
    sourceLang: {
      type: String,
      default: '',
    },
    translatedText: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  });

  const closeLoading = () => {
    loadingInstance.value?.close();
    loadingInstance.value = null;
  };

  const waitFrame = () =>
    new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });

  const syncLoading = async () => {
    if (!visible.value || !props.loading) {
      closeLoading();
      return;
    }

    await nextTick();
    if (!dialogBodyRef.value) {
      await waitFrame();
    }
    if (!visible.value || !props.loading || !dialogBodyRef.value) return;
    if (loadingInstance.value) return;

    loadingInstance.value = ElLoading.service({
      target: dialogBodyRef.value,
    });
  };

  watch([visible, () => props.loading], syncLoading, { immediate: true, flush: 'post' });
  onBeforeUnmount(closeLoading);
</script>

<style scoped lang="scss">
  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    color: var(--el-text-color-primary);
    font-family: 'PingFang SC Medium';
    font-size: 14px;
    // font-weight: 500;
    line-height: 24px;
  }

  .close-icon {
    cursor: pointer;
    color: var(--el-text-color-placeholder);
  }

  .dialog-body {
    position: relative;
    min-height: 220px;
    max-height: 520px;
    overflow-y: auto;
  }

  .translation-item + .translation-item {
    margin-top: 16px;
  }

  .translation-label {
    margin-bottom: 6px;
    color: var(--el-text-color-secondary);
    font-size: 12px;
    line-height: 20px;
  }

  .translation-content {
    padding: 10px 12px;
    border-radius: 6px;
    background: #f8f8f8;
    color: var(--el-text-color-primary);
    font-size: 12px;
    line-height: 20px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .translation-error-message {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 220px;
    color: var(--el-text-color-primary);
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  }

  :global(.translation-dialog-modal .el-dialog) {
    min-height: 300px;
    border-radius: 12px;
    overflow: hidden;
  }
</style>
