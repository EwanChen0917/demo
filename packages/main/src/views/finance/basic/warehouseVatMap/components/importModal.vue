<template>
  <el-dialog title="导入" v-model="visible" @close="close" align-center>
    <p>
      <KeenFileUpload
        accept=".xlsx,.xls"
        class="packing-upload"
        v-model="file"
        directory="erp/template"
        ref="uploadRef"
      >
        <el-button type="primary" size="small">选择文件</el-button>
        <el-button
          :loading="downloadLoading"
          size="small"
          type="primary"
          link
          @click.stop="getTemplate"
        >
          下载模板
        </el-button>
      </KeenFileUpload>
    </p>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirmUpload" :loading="loading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';

  const emit = defineEmits<{
    (success: string);
  }>();

  const visible = ref(false);
  const uploadRef = ref();
  const downloadLoading = ref(false);
  const file = ref<any[]>([]);

  const loading = ref(false);
  const confirmUpload = async () => {
    await erpApi.luteosErpWarehouseVatUpload({
      fileName: file.value[0].name,
      ossKey: file.value[0].ossKey,
    });
    file.value = [];
    const isConfirmed = await swal.confirm({
      title: '文件已上传，是否去查看最终处理结果?',
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-active-light',
      },
    });
    close();
    emit('success');
    if (isConfirmed) {
      openWindow('/salesForecastingLog');
    }
  };

  const getTemplate = async () => {
    downloadLoading.value = true;
    const res = await erpApi.luteosErpWarehouseVatDownTemplate().finally(() => {
      downloadLoading.value = false;
    });
    urlDownload(res as string);
  };

  const open = () => {
    visible.value = true;
  };

  const close = () => {
    uploadRef.value?.uploadRef.clearFiles();
    visible.value = false;
  };

  defineExpose({ open });
</script>

<style scoped lang="scss"></style>
