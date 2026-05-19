<template>
  <div class="markdown-page">
    <FileViewer
      :markdown-content="fileMarkdownContent"
      :loading="fileLoading"
      :document-title="documentTitle"
      :node-execution-id="difyNodeExecutionId"
      :instance-code="instanceCode"
      :ext="`${fileExt}`"
      @back="handleBack"
    />
  </div>
</template>
<script lang="ts" setup name="markdownPage">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { newProductApi } from '@/api';
  import FileViewer from './components/FileViewer.vue';

  const route = useRoute();
  const difyNodeExecutionId = route.query?.difyNodeExecutionId as string;
  const instanceCode = route.query?.instanceCode as string;
  const documentTitle = route.query?.title as string;
  const fileExt = route.query?.ext as string;
  const fileMarkdownContent = ref('');
  const fileLoading = ref(false);

  const fetchMarkdownContent = async () => {
    try {
      fileLoading.value = true;
      const res = await newProductApi.luteosAiNpoProjectPhasedResultDetail({
        difyNodeExecutionId: difyNodeExecutionId,
      });
      fileMarkdownContent.value = res?.text || '';
    } catch (error) {
      console.error('获取文件详情失败:', error);
      fileMarkdownContent.value = '';
    } finally {
      fileLoading.value = false;
    }
  };
  fetchMarkdownContent();

  const handleBack = () => {
    history.go(-1);
  };

  onMounted(() => {});
</script>
<style lang="scss" scoped>
  .markdown-page {
    width: 100%;
    height: calc(100vh - 90px);
    background-color: #fff;
    display: flex;
    justify-content: center;
    // :deep(.viewer-header) {
    //   display: none;
    // }
    // :deep(.viewer-content) {
    //   border: none;
    // }
    :deep(.viewer-header .header-left .back-icon) {
      display: none;
    }
    :deep(.viewer-header) {
      padding: 16px 0px;
    }
  }
</style>
