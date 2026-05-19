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
  // import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import axios from 'axios';
  import { useStore } from '@/store/modules/useStore';

  const props = defineProps<{
    visible: boolean;
    importScene: string;
    title: string;
    platformType?: any;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  let importScene = 'platform_operation_shopify_import';
  if (props.platformType === 2) {
    importScene = 'platform_operation_newPlatform_import';
  }

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const confirmUpload = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      loading.value = true;
      const res = await commonApi
        .luteosCommonFileImportData({
          importScene,
          fileName: fileList.value[0].name,
          key: fileList.value[0].ossKey,
        })
        .finally(() => {
          loading.value = false;
        });
      if (res?.succeededCount > 0 && res.failedCount === 0) {
        ElMessage.success(`成功${res.succeededCount}条，失败${res.failedCount}条`);
      } else {
        ElMessage.info(
          `成功${res.succeededCount}条，失败${res.failedCount}条${
            res.failedCount > 0 ? ',请注意检查空格换行，到上传日志查看' : ''
          }`
        );
      }

      emit('close', true);
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  // const getTemplate = async () => {
  //   let importScene = 'platform_operation_shopify_import';
  //   console.log(props);
  //   const res = await productOperationApi.luteosOpetationPlatformDownTemplate({
  //     platformType: 1,
  //     importScene: importScene,
  //   });
  //   urlDownload(res.templateUrl as string);
  // };
  const user = useStore();
  const downloadTemplate = async () => {
    const res = await axios.post(
      '/api/luteos/opetation/platform/downTemplate',
      {
        platformType: props.platformType,
        importScene,
      },
      {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const url = window.URL.createObjectURL(res?.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = props.platformType === 1 ? '独立站运营人员模板' : '新平台运营人员模板';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url); // 释放内存
      document.body.removeChild(link);
    }, 0);
  };
</script>

<style scoped lang="scss"></style>
