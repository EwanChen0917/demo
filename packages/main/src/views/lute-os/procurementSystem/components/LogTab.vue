<template>
  <div class="log-tab">
    <div class="log-toolbar">
      <el-button type="primary" @click="addComment">添加评论</el-button>
    </div>
    <div class="log-list" @click="handleLogClick">
      <div class="log-item" v-for="log in logs" :key="log.id">
        <span class="log-time">{{ log.operationTime }}</span>
        <span class="log-operator">{{ log.operatorName }}</span>
        <span class="log-content" v-html="parseOperationContent(log.operationContent)"></span>
      </div>
      <el-empty v-if="!logs || logs.length === 0" description="暂无日志" />
    </div>
    <div v-if="total > 0" class="log-pagination">
      <KeenPagination
        :current="currentPage"
        :total="total"
        :pageSize="pageSize"
        :pageSizeOption="[10, 20, 50, 100]"
        @current-change="handlePageChange"
        @size-change="handlePageSizeChange"
      />
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
  import { ElMessage } from 'element-plus';
  import { platformApi } from '@/api';
  import CommentDialog from '@/views/lute-os/demandManage/components/CommentDialog.vue';
  import FilesPreview from '@/components/FilesPreview/index.vue';
  import { PROCUREMENT_DEMAND_MODULE } from '../constant';

  const props = defineProps({
    logs: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    detail: {
      type: Object,
      default: () => ({}),
    },
  });

  const emit = defineEmits(['refresh', 'page-change', 'size-change']);

  const commentDialogRef = useTemplateRef('commentDialogRef');
  const detail = computed(() => props.detail || {});

  const addComment = () => {
    commentDialogRef.value?.open();
  };

  const commentSubmitting = ref(false);
  const demandCode = computed(() => {
    const info = detail.value;
    const code =
      typeof info?.demandCode === 'string' && info.demandCode.trim() ? info.demandCode.trim() : '';
    if (code) return code;
    const id = typeof info?.id === 'string' ? info.id.trim() : '';
    return id;
  });

  const handleCommentSubmit = async (comment) => {
    const trimmed = typeof comment === 'string' ? comment.trim() : '';
    if (!trimmed || commentSubmitting.value) return;
    const code = demandCode.value;
    if (!code) {
      ElMessage.error('缺少需求编码，无法添加评论');
      return;
    }
    commentSubmitting.value = true;
    try {
      await platformApi.platformDemandPurchaseOperate({
        demandCode: code,
        demandModule: PROCUREMENT_DEMAND_MODULE,
        operateType: 'add_comment',
        comment: trimmed,
      });
      ElMessage.success('评论已提交');
      emit('refresh');
    } catch (error) {
      console.error('Failed to add procurement comment', error);
      ElMessage.error('添加评论失败，请稍后重试');
    } finally {
      commentSubmitting.value = false;
    }
  };

  const handlePageChange = (page) => {
    emit('page-change', page);
  };

  const handlePageSizeChange = (size) => {
    emit('size-change', size);
  };

  const fileUrl = ref('');
  const fileName = ref('');
  const previewVisible = ref(false);

  const handleLogClick = (event) => {
    const anchor = event.target.closest('a');
    if (anchor && anchor.href && anchor.href.startsWith('http')) {
      event.preventDefault();
      fileUrl.value = anchor.href;
      fileName.value = anchor.textContent?.trim() || '文件';
      previewVisible.value = true;
    }
  };

  const parseOperationContent = (content) => {
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
  };
</script>

<style scoped>
  .log-tab {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 12px;
    height: 100%;
  }

  .log-toolbar {
    display: flex;
    line-height: 36px;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    p {
      margin-bottom: 0;
    }
  }
  .duration {
    color: #f56c6c;
  }

  .log-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 8px;
    font-size: 14px;
    color: #303133;
    word-break: break-all;
  }

  .log-time {
    width: 150px;
    color: #909399;
    flex-shrink: 0;
  }

  .log-operator {
    width: 90px;
    font-weight: 600;
    flex-shrink: 0;
  }

  .log-content {
    flex: 1;
  }

  .log-pagination {
    display: flex;
    justify-content: center;
  }

  .log-list {
    flex: 1;
    overflow-y: auto;
    padding-right: 4px;
    padding-bottom: 4px;
  }
</style>
