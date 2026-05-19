<template>
  <div class="mt-5 mb-5 d-flex align-items-center">
    <p>
      需求累计时长：
      <span style="color: red">{{ formatDuration(demandDetail?.totalTime) }}</span>
    </p>
    <el-button
      class="ml-5"
      type="primary"
      @click="addComment"
      v-if="demandDetail?.status !== 8 && demandDetail?.status !== 101"
    >
      添加评论
    </el-button>
  </div>
  <div class="log-list" @click="handleLogClick">
    <div class="log-item" v-for="log in logs" :key="log.id">
      <span class="log-time">{{ log.operationTime }}</span>
      <span class="log-operator">{{ log.operatorName }}</span>
      <span class="log-content" v-html="parseOperationContent(log.operationContent)" />
    </div>
    <el-empty v-if="!logs || logs.length === 0" description="暂无日志" />
  </div>
  <div class="mt-4 mb-4 d-flex justify-center">
    <KeenPagination
      :current="currentPage"
      :total="total || logs?.length"
      :pageSize="pageSize"
      @current-change="handlePageChange"
      @size-change="handlePageSizeChange"
      :pageSizeOption="[10, 20, 50, 100]"
    />
  </div>
  <CommentDialog ref="commentDialogRef" @submit="handleCommentSubmit" />
  <FilesPreview
    v-if="previewVisible"
    :fileUrl="fileUrl"
    :key="fileUrl"
    :fileName="fileName"
    :extType="fileName.split('.').pop()"
    @close="previewVisible = false"
  />
</template>

<script setup>
  import CommentDialog from '@/views/lute-os/demandManage/components/CommentDialog.vue';
  import { formatDuration } from '@/views/lute-os/demandManage/utils/timeParams';
  import { useDemandOperation } from '../composables/useDemandOperation';
  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  const { submitOperation } = useDemandOperation();
  const props = defineProps({
    logs: Array,
    total: Number,
    pageSize: Number,
    currentPage: Number,
    demandDetail: Object,
  });
  const emit = defineEmits(['refresh', 'page-change']);
  const commentDialogRef = ref();

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
  const handlePageChange = (page) => {
    emit('page-change', page);
  };
  const handlePageSizeChange = (size) => {
    emit('size-change', size);
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
  .ml-5 {
    margin-left: 10px;
  }
  .log-list {
    min-height: 340px;
  }
  .log-item {
    font-size: 14px;
    margin-bottom: 8px;
    white-space: pre-line;
    display: flex;
    align-items: baseline;
  }
  .log-time {
    width: 150px;
    color: #888;
    margin-right: 10px;
    font-size: 13px;
    flex-shrink: 0;
    text-align: left;
  }
  .log-operator {
    width: 90px;
    font-weight: bold;
    margin-right: 10px;
    flex-shrink: 0;
    text-align: left;
  }
  .log-content {
    flex: 1;
    word-break: break-all;
  }
  .log-pagination {
    margin-top: 25px;
    display: flex;
    justify-content: flex-end;
  }
</style>
