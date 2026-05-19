<template>
  <el-dialog :model-value="visible" @close="$emit('close')" title="资源排重" align-center>
    <div class="flex-wrap">
        <p class="title">红人资源排重</p>
        <KeenFileUpload
            ref="upload"
            v-model="fileList"
            limit="100"
            directory="meta_user_repeat_import"
            accept=".xlsx,.xls"
            class="file-upload"
        >
        <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
        <el-link class="link-txt" @click="downUrl">下载模板</el-link>
    </div>
    <template #footer>
    <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave" :disabled="!fileList.length">确认</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { commonApi } from '@/api/index';

  defineProps<{
    visible: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save', val?: any): void;
  }>();

  const fileList = ref<any[]>([]);

  const handleSave = () => {
    emit('save', fileList.value);
  };
  const handleCancel = () => {
    emit('close');
  };

  const downUrl = () => {
    commonApi
      .luteosCommonFileQueryImportTemplate({
        importScene: 'meta_user_repeat_import',
      })
      .then((res) => {
        window.location.href = res.templateUrl;
      });
  };
</script>

<style scoped lang="scss">
  .link-txt {
    color: #3e97ff;
    margin-left: 15px;
    position: absolute;
    left: 260px;
    top: 135px;
  }
  .flex-wrap {
    display: flex;

  }
  .title {
    margin-top: 8px;
    margin-right: 15px;
  }
  .file-upload {
    :deep(.el-upload-list--text) {
        min-width: 400px;
    }
  }
 
</style>
