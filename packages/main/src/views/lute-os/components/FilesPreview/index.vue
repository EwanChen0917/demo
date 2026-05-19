<template>
  <el-image-viewer @close="handleClose" v-if="imgVisible" :url-list="[fileUrl]" />
  <el-dialog
    v-if="pdfVisible"
    :model-value="pdfVisible"
    custom-class="pdf-preview-dialog"
    width="1480px"
    top="40px"
    :show-close="true"
    :close-on-click-modal="true"
    :destroy-on-close="true"
    @close="handleClose"
    class="custom-dialog"
  >
    <template #header>
      <div class="pdf-header">
        <span class="pdf-title">{{ fileName || 'PDF 预览' }}</span>
        <!-- <el-button type="text" @click="handleClose">
          <el-icon><Close /></el-icon>
        </el-button> -->
      </div>
    </template>
    <div class="pdf-iframe-container">
      <iframe v-if="realPdfUrl" :src="realPdfUrl" frameborder="0" class="pdf-iframe" />
    </div>
  </el-dialog>
  <XlsPreview
    v-if="xlsVisible"
    :visible="xlsVisible"
    :url="fileUrl"
    :fileName="fileName"
    :hideDownload="hideDownLoad"
    @close="handleClose"
  />
  <DocPreview
    v-if="docVisible"
    :visible="docVisible"
    :url="fileUrl"
    :type="docType"
    @close="handleClose"
  />
  <VideoPreview
    v-if="videoVisible"
    :visible="videoVisible"
    :url="fileUrl"
    :hideDownload="hideDownLoad"
    @close="handleClose"
  />
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import XlsPreview from '../XlsPreview/index.vue';
  import DocPreview from '@/components/DocPreview/index.vue';
  import VideoPreview from '@/components/VideoPreview/index.vue';

  const props = withDefaults(
    defineProps<{
      fileName: string; // 第三方预览，下载的时候可以指定fileName
      fileUrl: string; // 文件完整路径
      hideDownLoad: boolean; // 是否隐藏下载按钮，使用场景，一些有下载权限控制的情况下需要传true
      extType: string;
    }>(),
    {
      fileName: '',
      fileUrl: '',
      extType: '',
      hideDownLoad: false,
    }
  );

  const emit = defineEmits<{
    (e: 'close');
  }>();

  onMounted(() => {
    previewFile();
  });

  // 预览文件
  const pdfVisible = ref<boolean>(false);
  const imgVisible = ref<boolean>(false);
  const xlsVisible = ref<boolean>(false);
  const docVisible = ref<boolean>(false);
  const videoVisible = ref<boolean>(false);
  const docType = ref<'doc' | 'docx'>('docx');
  const realPdfUrl = ref('');
  let pdfBlob: Blob | null = null;
  // 是否视频类型
  const isVideo = (extType) => {
    return ['mp4', 'mpeg', 'avi', 'asf', 'mov', 'wmv', '3gp', 'rm', 'rmvb', 'flv', 'f4v'].includes(
      extType
    );
  };
  const previewFile = async () => {
    const path = new URL(props.fileUrl).pathname;
    // 先取传进来的，取不到再取获取最后一个点之后的所有字符作为扩展名
    let extType = props.extType || path.split('.').pop();

    if (!extType) {
      return;
    }

    extType = extType.toLocaleLowerCase();

    if (['jpg', 'jpeg', 'png', 'jfif', 'webp'].includes(extType)) {
      imgVisible.value = true;
    } else if (extType === 'pdf') {
      try {
        const res = await fetch(props.fileUrl);
        pdfBlob = await res.blob();
        realPdfUrl.value = URL.createObjectURL(pdfBlob);
        pdfVisible.value = true;
      } catch {
        ElMessage.error('PDF 预览失败');
        realPdfUrl.value = '';
      }
    } else if (['xls', 'xlsx'].includes(extType)) {
      xlsVisible.value = true;
    } else if (['doc', 'docx', 'ppt', 'pptx'].includes(extType)) {
      docVisible.value = true;
      docType.value = extType as any;
    } else if (isVideo(extType)) {
      videoVisible.value = true;
    } else {
      ElMessage.info('暂不支持该文件类型的预览');
      return;
    }
    document.documentElement.style.overflow = 'hidden';
  };
  const cleanupBlob = () => {
    if (realPdfUrl.value) {
      URL.revokeObjectURL(realPdfUrl.value);
      realPdfUrl.value = '';
    }
    pdfBlob = null;
  };
  // 关闭预览
  const handleClose = () => {
    pdfVisible.value = false;
    imgVisible.value = false;
    docVisible.value = false;
    xlsVisible.value = false;
    videoVisible.value = false;
    document.documentElement.style.overflow = 'auto';
    emit('close');
  };
  onBeforeUnmount(() => {
    cleanupBlob();
  });
</script>

<style scoped lang="scss">
  .pdf-preview-dialog {
    border-radius: 16px !important;
    overflow: hidden;
    box-shadow: 0 8px 32px 0 rgba(60, 60, 60, 0.23), 0 1.5px 5px 0 rgba(60, 60, 60, 0.1);
    background: #f7f8fa !important;
  }
  .pdf-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px 8px 18px;
    border-bottom: 1px solid #e6e7ec;
    // background: #f7f8fa;
    font-size: 16px;
    font-weight: 600;
    color: #222;
  }
  .pdf-title {
    max-width: 550px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pdf-iframe-container {
    padding: 0;
    background: #222;
    border-radius: 0 0 16px 16px;
    min-height: 75vh;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
  }
  .pdf-iframe {
    width: 100%;
    height: 75vh;
    border: none;
    background: #222;
    border-radius: 0 0 16px 16px;
    box-shadow: none;
  }
</style>
