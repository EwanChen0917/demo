<template>
  <el-dialog :title="title" :model-value="visible" @close="emit('close')" align-center>
    <div>请按照模板上传文件</div>
    <div class="mt-5 d-flex gap-5 align-items-center">
      <KeenFileUpload ref="upload" v-model="fileList" directory="oms/transfer">
        <el-button type="primary" size="small">选择文件</el-button>
      </KeenFileUpload>
      <el-button style="margin-bottom: 10px" type="text" @click="getTemplate">下载模板</el-button>
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
  import { commonApi, omsApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';

  const props = defineProps<{
    visible: boolean;
    importScene: string;
    title: string;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const confirmUpload = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      loading.value = true;
      const res = await omsApi
        .omsCommonFileImportData({
          importScene: props.importScene,
          fileName: fileList.value[0].name,
          key: fileList.value[0].ossKey,
        })
        .finally(() => {
          loading.value = false;
        });
      const isConfirmed = await swal.confirm({
        title: `导入完成，具体请前往上传日志查看`,
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
      emit('close', true);
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  const getTemplate = async () => {
    const res = await omsApi.omsCommonFileQueryImportTemplate({
      importScene: props.importScene,
    });
    urlDownload(res.templateUrl as string);
  };
</script>

<style scoped lang="scss"></style>
