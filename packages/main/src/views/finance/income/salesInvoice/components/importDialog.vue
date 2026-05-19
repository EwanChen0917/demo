<template>
  <el-dialog title="导入发票" v-model="visibility" width="600px" :before-close="close">
    <div class="import-container">
      <p>
        <KeenFileUpload
          accept=".xlsx,.xls"
          v-model="file"
          :showOperate="false"
          directory="erp/template"
          ref="uploadRef"
        >
          <el-button type="primary" size="small">选择文件</el-button>
          <el-button
            :loading="downloadLoading"
            size="small"
            type="primary"
            link
            @click.stop="downloadTemplate"
          >
            下载导入模板
          </el-button>
        </KeenFileUpload>
      </p>
      <div class="notice">
        <div class="value">
          <ul>
            <li>请按照模板格式填写数据，支持批量导入发票</li>
          </ul>
        </div>
      </div>
    </div>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :disabled="!file.length" @click="confirmUpload">
          开始导入
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { urlDownload } from '@/utils/download';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';

  const downloadLoading = ref(false);
  const file = ref<any[]>([]);
  const visibility = ref(false);
  const downloadTemplate = async () => {
    downloadLoading.value = true;
    const res = await financeSystemApi.financeInvoiceDownloadTemplate().finally(() => {
      downloadLoading.value = false;
    });
    urlDownload(res as string);
  };
  const uploadRef = ref();
  const emits = defineEmits<{
    (success: string);
  }>();
  const confirmUpload = async () => {
    await financeSystemApi.financeInvoiceImportData({
      fileName: file.value[0].name,
      ossKey: file.value[0].ossKey,
    });
    file.value = [];
    setTimeout(() => {
      emits('success');
    }, 1500);
    close();
    const isConfirmed = await swal.confirm({
      title: '上传成功，是否去查看上传日志?',
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-active-light',
      },
    });
    if (isConfirmed) {
      openWindow('/salesForecastingLog');
    }
  };
  const open = () => {
    visibility.value = true;
  };
  const close = () => {
    uploadRef.value?.uploadRef.clearFiles();
    visibility.value = false;
  };
  defineExpose({ open });
</script>

<style scoped lang="scss">
  .notice {
    display: flex;
    margin-top: 20px;
    color: #888c94;
    font-size: 12px;

    .value {
      flex: 1;
      margin-left: 10px;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
</style>
