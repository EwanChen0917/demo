<template>
  <el-dialog
    title="调拨单导入"
    v-model="visible"
    align-center
    :close-on-click-modal="false"
    @close="close"
  >
    <KeenFileUpload
      accept=".xlsx,.xls"
      class="packing-upload"
      v-model="fileList"
      directory="erp/template"
      ref="uploadRef"
    >
      <el-button type="primary" size="small">选择文件</el-button>
      <el-button type="primary" text @click.stop="downloadTemplate" :loading="downloadLoading">
        <i class="iconfont icon-xiazai" />
        下载模板
      </el-button>
    </KeenFileUpload>
    <div class="notice">
      <div class="label">注意：</div>
      <div class="value">
        <ul>
          <li>1、仅支持xls文件</li>
          <li>2、请根据模板字段填写</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          type="primary"
          :disabled="!fileList.length"
          @click="save"
          v-loading="saveLoading"
        >
          导入
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { erpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { urlDownload } from '@/utils/download';
  import { openWindow } from '@/utils';

  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  const visible = ref(false);
  const uploadRef = ref();
  const fileList = ref<any[]>([]);
  const downloadLoading = ref(false);
  const saveLoading = ref(false);

  const downloadTemplate = async () => {
    try {
      downloadLoading.value = true;
      const res = await erpApi.luteosErpOrderTransferDownloadTemplate();
      urlDownload(res as string);
    } finally {
      downloadLoading.value = false;
    }
  };

  const save = async () => {
    saveLoading.value = true;
    try {
      await erpApi.luteosErpOrderTransferImportTransfer({
        fileName: fileList.value[0]?.name,
        ossKey: fileList.value[0]?.ossKey,
      });
      close();
      emit('success');
      const isConfirmed = await swal.confirm({
        title: '上传完成，是否去查看上传日志?',
        icon: 'success',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
      });
      if (!isConfirmed) return;
      openWindow('/salesForecastingLog');
    } finally {
      saveLoading.value = false;
    }
  };

  const open = () => {
    visible.value = true;
  };

  const close = () => {
    fileList.value = [];
    uploadRef.value?.uploadRef.clearFiles();
    visible.value = false;
  };

  defineExpose({
    open,
  });
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
