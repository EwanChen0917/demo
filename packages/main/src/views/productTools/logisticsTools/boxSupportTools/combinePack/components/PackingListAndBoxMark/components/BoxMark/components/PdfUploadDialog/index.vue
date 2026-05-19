<template>
  <el-dialog :model-value="visible" @close="$emit('close')" title="箱唛上传" align-center>
    <div class="flex-wrap">
      <KeenFileUpload
        ref="upload"
        directory="erp/package"
        accept=".pdf"
        class="file-upload"
        v-model="fileList"
        :limit="1"
      >
        <el-button type="primary" size="small">选择文件</el-button>
      </KeenFileUpload>
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
  defineProps<{
    visible: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save', val?: any): void;
  }>();
  const fileList = ref<any[]>([]);
  const handleSave = () => {
    emit('save', fileList.value[0]);
  };
  const handleCancel = () => {
    emit('close');
  };
</script>

<style scoped lang="scss"></style>
