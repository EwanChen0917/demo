<template>
  <el-dialog v-model="visible" title="导入附件" width="1200px" @close="handleClose">
    <div class="upload-wrapper">
      <div class="upload-inner">
        <div class="upload-inner-item">
          <KeenDragUpload
            ref="uploadRef"
            v-model="fileList"
            :directory="directory"
            :accept="accept"
            :size-limit="sizeLimit"
            :limit="limit"
            @success="handleUploadSuccess"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽文件到此处
              <em>或点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">支持上传单个文件，文件大小不超过10M</div>
            </template>
          </KeenDragUpload>
        </div>
        <div class="upload-inner-tips">
          <ul>
            <li>附件格式：用户需要确保服务商支持导入文件的格式</li>
            <li>附件大小：单个文件小于10M</li>
            <li>数量限制：仅支持上传1个面单/每个订单</li>
          </ul>
        </div>
      </div>
      <div class="upload-itemlist"></div>
    </div>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :disabled="!fileList.length">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import KeenDragUpload from '@/components/KeenDragUpload/index.vue';
  import { omsApi } from '@/api';

  interface Props {
    directory?: string;
    accept?: string;
    sizeLimit?: number;
    limit?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    directory: 'shopify-order-import',
    accept: '',
    sizeLimit: 10 * 1024 * 1024,
    limit: 10,
  });

  const emit = defineEmits<{
    (e: 'success'): void;
  }>();

  const visible = ref(false);
  const fileList = ref<any[]>([]);
  const uploadRef = ref();
  const code = ref<string | string[]>([]);
  const handleUploadSuccess = (ossKey: string, file: any) => {
    console.log('文件上传成功', ossKey, file);
  };

  const handleCancel = () => {
    visible.value = false;
  };
  const submitLoading = ref(true);
  const handleConfirm = async () => {
    submitLoading.value = true;
    if (!code.value) return;
    if (!fileList.value.length) {
      ElMessage.warning('请先上传文件');
      return;
    }
    const ossKeys = fileList.value.filter((f) => f.ossKey).map((f) => f.ossKey);
    if (ossKeys.length === 0) {
      ElMessage.warning('文件未上传成功，请重试');
      return;
    }
    const itemList = fileList.value.map((e) => {
      return {
        attachmentType: 5,
        fileName: e.name,
        fileUrl: e.ossKey,
      };
    });
    try {
      const res = await omsApi.omsFulfillmentOrderUploadAttachment({
        attachmentList: itemList,
        code: code.value,
      });
      ElMessage.success('上传成功');
      emit('success');
      visible.value = false;
    } catch (e) {
    } finally {
      submitLoading.value = false;
    }
  };
  const handleClose = () => {
    uploadRef.value?.clearFiles();
  };
  const open = (codes: string | string[]) => {
    code.value = codes;
    fileList.value = [];
    visible.value = true;
  };
  defineExpose({ open });
</script>

<style scoped lang="scss">
  .upload-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .upload-inner {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }
  .upload-inner-item {
    flex: 1;
    width: 50%;
    flex-shrink: 0;
  }
  .upload-inner-tips {
    flex: 1;
    width: 50%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>
