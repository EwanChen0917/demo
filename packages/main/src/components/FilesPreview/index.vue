<template>
  <el-image-viewer
    crossorigin="anonymous"
    @close="handleClose"
    v-if="imgVisible"
    :url-list="[fileUrl]"
  />
  <PdfPreview
    v-if="pdfVisible"
    :visible="pdfVisible"
    :url="fileUrl"
    :hideDownLoad="hideDownLoad"
    @close="handleClose"
  />
  <XlsPreview
    v-if="xlsVisible"
    :visible="xlsVisible"
    :url="fileUrl"
    :fileName="fileName"
    :hideDownLoad="hideDownLoad"
    @close="handleClose"
  />
  <DocPreview
    v-if="docVisible"
    :visible="docVisible"
    :url="fileUrl"
    :type="docType"
    :hideDownLoad="hideDownLoad"
    @close="handleClose"
  />
  <VideoPreview
    v-if="videoVisible"
    :visible="videoVisible"
    :url="fileUrl"
    :hideDownLoad="hideDownLoad"
    @close="handleClose"
  />
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';

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
  // 是否视频类型
  const isVideo = (extType) => {
    return ['mp4', 'mpeg', 'avi', 'asf', 'mov', 'wmv', '3gp', 'rm', 'rmvb', 'flv', 'f4v'].includes(
      extType
    );
  };
  const previewFile = () => {
    const path = new URL(props.fileUrl).pathname;
    // 先取传进来的，取不到再取获取最后一个点之后的所有字符作为扩展名
    let extType = props.extType || path.split('.').pop();

    if (!extType) {
      return;
    }

    extType = extType.toLocaleLowerCase();

    if (['jpg', 'jpeg', 'png'].includes(extType)) {
      imgVisible.value = true;
    } else if (extType === 'pdf') {
      pdfVisible.value = true;
    } else if (['xls', 'xlsx'].includes(extType)) {
      xlsVisible.value = true;
    } else if (['doc', 'docx', 'ppt', 'pptx'].includes(extType)) {
      docVisible.value = true;
      docType.value = extType;
    } else if (isVideo(extType)) {
      videoVisible.value = true;
    } else {
      ElMessage.info('暂不支持该文件类型的预览');
      return;
    }
    document.documentElement.style.overflow = 'hidden';
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
</script>

<style scoped lang="scss"></style>
