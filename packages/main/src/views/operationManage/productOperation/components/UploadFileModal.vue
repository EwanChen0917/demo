<template>
  <el-dialog :model-value="visible" @close="$emit('close')" title="导入" align-center>
    <p>请按照模板上传文件</p>
    <KeenFileUpload
      ref="upload"
      v-model="fileList"
      limit="100"
      directory="operation_project_week_target"
      accept=".xlsx,.xls"
    >
      <el-button type="primary" size="small">选择文件</el-button>
    </KeenFileUpload>
    <el-link class="link-txt" @click="downUrl">下载模板</el-link>
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
        importScene: 'operation_project_week_target',
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
  }
</style>
