<template>
  <el-dialog :title="title" :model-value="visible" @close="emit('close')" align-center>
    <div>请按照模板上传文件</div>
    <div class="mt-5 d-flex gap-5 align-items-center">
      <KeenFileUpload ref="upload" v-model="fileList" directory="product">
        <el-button type="primary" size="small">选择文件</el-button>
      </KeenFileUpload>
      <el-button style="margin-bottom: 10px" type="text" @click="downloadTemplate">
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
  // import axios from 'axios';
  import { useStore } from '@/store/modules/useStore';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';

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
      const res = await commonApi
        .luteosCommonFileImportData({
          importScene: props.importScene,
          fileName: fileList.value[0].name,
          key: fileList.value[0].ossKey,
        })
        .finally(() => {
          loading.value = false;
        });
      if (+res.failedCount > 0) {
        const isConfirmed = await swal.confirm({
          title: '有部分数据导入失败，具体请前往上传中心查看',
          icon: 'error',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
        });
        if (!isConfirmed) return;
        openWindow('/salesForecastingLog');
      } else if (res?.succeededCount > 0 && res.failedCount === 0) {
        ElMessage.success(`成功${res.succeededCount}条，失败${res.failedCount}条`);
      } else {
        ElMessage.info(
          `成功${res.succeededCount}条，失败${res.failedCount}条${
            res.failedCount > 0 ? ',请注意检查空格换行，到上传中心查看' : ''
          }`
        );
      }

      emit('close', true);
    } else {
      ElMessage.error('请先选择文件');
    }
  };

  const user = useStore();
  // const downloadTemplate = async () => {
  //   const res = await axios.post(
  //     '/api/luteos/opetation/platform/downTemplate',
  //     {
  //       importScene: props.importScene,
  //     },
  //     {
  //       responseType: 'blob',
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     }
  //   );
  //   const url = window.URL.createObjectURL(res?.data);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = props.title + '模板';
  //   document.body.appendChild(link);
  //   link.click();
  //   setTimeout(() => {
  //     window.URL.revokeObjectURL(url); // 释放内存
  //     document.body.removeChild(link);
  //   }, 0);
  // };
  const downloadTemplate = async () => {
    const res = await commonApi.luteosCommonFileQueryImportTemplate({
      importScene: props.importScene,
    });
    urlDownload(res.templateUrl as string);
  };
</script>

<style scoped lang="scss"></style>
