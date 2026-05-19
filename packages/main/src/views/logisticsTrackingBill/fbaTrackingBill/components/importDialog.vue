<template>
  <el-dialog title="导入账单" v-model="visible" width="600px" :before-close="close">
    <div class="import-container">
      <p>
        <KeenFileUpload
          accept=".xlsx,.xls"
          v-model="file"
          :showOperate="false"
          directory="erp/template"
          ref="uploadRef"
        >
          <el-button type="primary">选择文件</el-button>
        </KeenFileUpload>
      </p>
    </div>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :disabled="!file.length" @click="confirmUpload">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';

  const file = ref<any[]>([]);
  const visible = ref(false);
  const searchParams = ref();
  const uploadRef = ref();
  const emits = defineEmits<{
    (success: string);
  }>();

  const handleFileSuccess = async (type) => {
    const routeName = type === '上传' ? '/salesForecastingLog' : '/downloadmanage';
    const isConfirmed = await swal.confirm({
      title: `${type}成功，是否去查看${type}日志?`,
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-active-light',
      },
    });
    if (isConfirmed) {
      openWindow(routeName);
    }
  };

  const confirmUpload = async () => {
    const res = await erpApi.luteosErpLogisticsReconciliationUpload({
      fileName: file.value[0].name,
      fileUrl: file.value[0].ossKey,
      ossKey: file.value[0].ossKey,
    });
    file.value = [];
    emits('success');
    close();
    if (res) {
      handleFileSuccess('上传');
    }
  };

  const open = (searchData) => {
    visible.value = true;
    searchParams.value = searchData || {};
  };

  const close = () => {
    uploadRef.value?.uploadRef.clearFiles();
    visible.value = false;
  };

  defineExpose({ open });
</script>

<style scoped lang="scss"></style>
