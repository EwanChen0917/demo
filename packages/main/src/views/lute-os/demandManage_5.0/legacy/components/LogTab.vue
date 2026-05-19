<template>
  <div class="log-container">
    <div class="log-header">
      <div class="metric-card">
        <div class="metric-label">需求累计时长</div>
        <div class="metric-value">
          <span class="value-number">{{ formatDuration(demandDetail?.totalTime) }}</span>
        </div>
      </div>
      <el-button
        v-if="showCommentAction"
        type="primary"
        class="add-comment-btn"
        @click="addComment"
      >
        <el-icon class="mr-1"><Plus /></el-icon>
        添加评论
      </el-button>
    </div>

    <div class="log-content-wrapper-outer">
      <div ref="scrollContainer" class="log-content-wrapper" @click="handleLogClick">
        <el-timeline v-if="logs && logs.length > 0" class="compact-timeline">
          <el-timeline-item
            v-for="log in logs"
            :key="log.id"
            :type="getLogType(log)"
            hollow
            class="compact-item"
          >
            <div class="log-row">
              <span class="log-time">{{ log.operationTime }}</span>
              <div class="log-info">
                <div class="operator-meta" :class="{ 'is-system': getOperatorName(log) === '系统自动' }">
                  <el-avatar :size="20" :src="log.avatar" class="operator-avatar">
                    {{ getOperatorName(log).charAt(0) }}
                  </el-avatar>
                  <span class="operator-name">{{ getOperatorName(log) }}</span>
                </div>
                <div class="log-body" v-html="parseOperationContent(log.operationContent)" />
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>

        <el-empty
          v-else
          :image-size="160"
          description="暂无操作日志"
          class="empty-state"
        />
      </div>

      <Transition name="fade">
        <div v-if="!isAtBottom && canScroll" class="scroll-hint-wrapper">
          <div class="bottom-gradient-mask" />
          <div class="scroll-down-icon" @click="scrollToBottom">
            <el-icon><ArrowDown /></el-icon>
          </div>
        </div>
      </Transition>
    </div>

    <CommentDialog ref="commentDialogRef" @submit="handleCommentSubmit" />
    <FilesPreview
      v-if="previewVisible"
      :key="fileUrl"
      :fileUrl="fileUrl"
      :fileName="fileName"
      :extType="fileName.split('.').pop()"
      @close="previewVisible = false"
    />
  </div>
</template>

<script setup>
  import { Plus, ArrowDown } from '@element-plus/icons-vue';
  import { useScroll, useResizeObserver } from '@vueuse/core';
  import CommentDialog from './CommentDialog.vue';
  import { useDemandOperation } from '@/views/lute-os/demandManage_5.0/legacy/composables/useDemandOperation';
  import { formatDuration } from '@/views/lute-os/demandManage_5.0/legacy/utils/timeParams';
  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';

  const { submitOperation } = useDemandOperation();

  const props = defineProps({
    logs: Array,
    demandDetail: Object,
    showCommentAction: { type: Boolean, default: true },
  });

  const emit = defineEmits(['refresh']);
  const commentDialogRef = ref();

  const scrollContainer = ref();
  const { y } = useScroll(scrollContainer);
  const canScroll = ref(false);

  const isAtBottom = computed(() => {
    if (!scrollContainer.value || !canScroll.value) return true;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
    return y.value + clientHeight >= scrollHeight - 20;
  });

  const checkScrollable = () => {
    if (scrollContainer.value) {
      const { scrollHeight, clientHeight } = scrollContainer.value;
      canScroll.value = scrollHeight > clientHeight + 5;
    }
  };

  useResizeObserver(scrollContainer, () => {
    checkScrollable();
  });

  watch(() => props.logs, () => {
    nextTick(checkScrollable);
  }, { deep: true, immediate: true });

  const scrollToBottom = () => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTo({
        top: scrollContainer.value.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const addComment = () => {
    commentDialogRef.value.open();
  };

  const handleCommentSubmit = async (comment) => {
    if (!comment) return;
    await submitOperation('add_comment', {
      demandCode: props.demandDetail?.demandCode,
      comment,
    });
    emit('refresh');
  };

  const getOperatorName = (log) => {
    if (log.operatorName) return log.operatorName;
    if (log.operationContent && log.operationContent.includes('已离职')) {
      return '系统自动';
    }
    return '未知用户';
  };

  const getLogType = (log) => {
    const name = getOperatorName(log);
    if (name === '系统自动') return 'info';
    if (log.operationContent?.includes('驳回') || log.operationContent?.includes('拒绝')) return 'danger';
    if (log.operationContent?.includes('通过') || log.operationContent?.includes('完成')) return 'success';
    return 'primary';
  };

  function parseOperationContent(content) {
    if (!content) return '';
    try {
      let html = content;
      html = html.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      if (html.startsWith('"') && html.endsWith('"')) {
        html = html.slice(1, -1);
      }
      return html;
    } catch {
      return content;
    }
  }

  const fileUrl = ref('');
  const fileName = ref('');
  const previewVisible = ref(false);

  function handleLogClick(e) {
    const aTag = e.target.closest('a');
    if (aTag && aTag.href && aTag.href.startsWith('http')) {
      e.preventDefault();
      fileUrl.value = aTag.href;
      fileName.value = aTag.textContent?.trim() || '文件';
      previewVisible.value = true;
    }
  }
</script>

<style scoped>
  .log-container {
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px dashed var(--el-border-color-lighter);
  }

  .metric-card {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .metric-label {
    font-size: 13px;
    color: var(--el-text-color-secondary);
    font-weight: 500;
  }

  .metric-value {
    display: flex;
    align-items: baseline;
    gap: 2px;
    background: var(--el-color-primary-light-9);
    padding: 2px 10px;
    border-radius: 6px;
  }

  .value-number {
    font-size: 20px;
    font-weight: 700;
    color: var(--el-color-primary);
    font-family: 'Inter', system-ui, sans-serif;
  }

  .value-unit {
    font-size: 11px;
    color: var(--el-color-primary-light-3);
    font-weight: 600;
  }

  .add-comment-btn {
    height: 32px;
    border-radius: 6px;
    font-weight: 500;
    padding: 0 16px;
  }

  .log-content-wrapper-outer {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
  }

  .log-content-wrapper {
    min-height: auto;
    max-height: min(700px, 70vh); /* More dynamic and spacious to fill the layout */
    overflow-y: auto;
    padding: 4px 12px 12px 4px;
    margin-right: -8px;
    scroll-behavior: smooth;
  }

  .scroll-hint-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 45px;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 4px;
    z-index: 100;
  }

  .bottom-gradient-mask {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
    pointer-events: none;
  }

  .scroll-down-icon {
    width: 32px;
    height: 32px;
    background: var(--el-color-primary);
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 4px 12px rgba(var(--el-color-primary-rgb), 0.4);
    animation: bounce 2s infinite;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .scroll-down-icon:hover {
    transform: scale(1.1);
    background: var(--el-color-primary-light-3);
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
    60% { transform: translateY(-3px); }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }

  .log-content-wrapper::-webkit-scrollbar {
    width: 6px;
  }

  .log-content-wrapper::-webkit-scrollbar-track {
    background: transparent;
  }

  .log-content-wrapper::-webkit-scrollbar-thumb {
    background: var(--el-border-color-lighter);
    border-radius: 10px;
    transition: all 0.3s;
  }

  .log-content-wrapper::-webkit-scrollbar-thumb:hover {
    background: var(--el-text-color-placeholder);
  }

  .compact-timeline {
    padding-left: 4px;
  }

  .compact-item {
    padding-bottom: 16px;
  }

  .log-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .log-time {
    width: 140px;
    flex-shrink: 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--el-text-color-placeholder);
    padding-top: 2px;
  }

  .log-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .operator-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    padding: 2px 8px 2px 2px;
    background: var(--el-fill-color-light);
    border-radius: 12px;
    border: 1px solid var(--el-border-color-lighter);
  }

  .operator-avatar {
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    font-weight: 600;
    font-size: 10px;
    border: 1px solid var(--el-border-color-lighter);
  }

  .operator-name {
    font-size: 12px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  .operator-meta.is-system {
    background: var(--el-color-info-light-9);
  }

  .operator-meta.is-system .operator-avatar {
    background: var(--el-color-info-light-7);
    color: var(--el-text-color-secondary);
  }

  .operator-meta.is-system .operator-name {
    color: var(--el-text-color-secondary);
    font-weight: 400;
  }

  .log-body {
    font-size: 14px;
    line-height: 1.5;
    color: var(--el-text-color-regular);
    word-break: break-all;
    padding-left: 4px;
  }

  :deep(.log-body a) {
    color: var(--el-color-primary);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
  }

  :deep(.log-body a:hover) {
    text-decoration: underline;
    opacity: 0.8;
  }

  :deep(.el-timeline-item__node--normal) {
    left: -1px;
    width: 10px;
    height: 10px;
  }

  :deep(.el-timeline-item__wrapper) {
    padding-left: 24px;
    top: -2px;
  }

  .empty-state {
    padding: 40px 0;
  }
</style>
