<template>
  <el-dialog
    :title="title"
    :destroy-on-close="true"
    :model-value="visible"
    @close="emit('close')"
    align-center
  >
    <div>请按照模板上传文件</div>
    <div class="mt-5 d-flex gap-5 align-items-center">
      <KeenFileUpload
        accept=".xlsx,.xls,.csv"
        :showOperate="false"
        ref="upload"
        v-model="fileList"
        directory="product"
      >
        <el-button type="primary" size="small">选择文件</el-button>
      </KeenFileUpload>
      <el-button
        v-if="needCustomUpload"
        style="margin-bottom: 10px"
        type="text"
        @click="getTemplate"
      >
        下载模板
      </el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button
          type="primary"
          @click="confirmUpload"
          :loading="loading"
          :disabled="fileList?.length === 0"
        >
          导入
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { commonApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      importScene: string;
      title: string;
      isCustomTemplate?: boolean;
      isCustomUpload?: boolean;
      needCustomUpload?: boolean;
      isAsync?: boolean;
      importDesc?: string;
    }>(),
    {
      needCustomUpload: true,
      isAsync: false,
      importDesc: '',
    }
  );
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'getCustomTemplate'): void;
    (event: 'customUpload', fileList: any[]): void;
  }>();

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const confirmUpload = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      if (props.isCustomUpload) {
        emit('customUpload', fileList.value);
      } else if (props.isAsync) {
        asyncUpload();
      } else {
        syncUpload();
      }
    } else {
      ElMessage.error('请先选择文件');
    }
  };

  const syncUpload = async () => {
    loading.value = true;
    const res = await commonApi
      .luteosCommonFileImportData({
        importScene: props.importScene,
        fileName: fileList.value[0].name,
        key: fileList.value[0].ossKey,
      })
      .finally(() => {
        loading.value = false;
      });
    ElMessage.info(
      `成功${res.succeededCount}条，失败${res.failedCount ?? 0}条${
        (res.failedCount ?? 0) > 0 ? '，请到上传日志查看' : ''
      }`
    );
    emit('close', true);
  };

  const asyncUpload = async () => {
    loading.value = true;
    commonApi.luteosCommonFileImportData({
      importScene: props.importScene,
      fileName: fileList.value[0].name,
      key: fileList.value[0].ossKey,
    });
    const isConfirmed = await swal.confirm({
      title: `${props.importDesc}导入完成，具体请前往上传日志查看`,
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
    });
    loading.value = false;
    if (!isConfirmed) {
      emit('close', true);
    } else {
      emit('close', true);
      openWindow('/salesForecastingLog');
    }
  };
  const getTemplate = async () => {
    if (props.isCustomTemplate) {
      return emit('getCustomTemplate');
    }
    const res = await commonApi.luteosCommonFileQueryImportTemplate({
      importScene: props.importScene,
    });
    return urlDownload(res.templateUrl as string);
  };
  defineExpose({
    loading,
  });
</script>

<style scoped lang="scss"></style>
