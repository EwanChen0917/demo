<template>
  <el-dialog :title="title" v-model="visible" @close="close()" align-center>
    <div>批量绑定B2B订单和三方仓订单，获取三方仓订单发货状态</div>
    <div class="mt-5 d-flex gap-5 align-items-center">
      <KeenFileUpload ref="upload" v-model="fileList" directory="product" accept=".xls,.xlsx">
        <el-button type="primary" size="small">选择文件</el-button>
      </KeenFileUpload>
      <el-button style="margin-bottom: 10px" type="text" @click="getTemplate">下载模板</el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取消</el-button>
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
  import { commonApi, erpApi, omsApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';

  const props = defineProps<{
    importScene: string;
    title: string;
  }>();
  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  const upload = ref<any>(null);
  const visible = ref(false);
  const open = () => {
    upload.value?.clearFile();
    visible.value = true;
  };

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const confirmUpload = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      loading.value = true;
      const res = await omsApi
        .omsWarehouseOrderUploadMarkShipped({
          fileUrl: fileList.value[0].url,
          fileName: fileList.value[0].name,
          ossKey: fileList.value[0].ossKey,
        })
        .finally(() => {
          loading.value = false;
        });
      /* ElMessage.info(
        `成功${res.succeededCount}条，失败${res.failedCount}条${
          res.failedCount > 0 ? '，请到上传日志查看' : ''
        }`
      ); */
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
      emit('success');
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  // https://dev.luteos.com/api/luteos/erp/warehouse/order/downMarkDeliveryTemplate
  const getTemplate = async () => {
    const res = await omsApi.omsWarehouseOrderDownMarkDeliveryTemplate();
    urlDownload(res as string);
  };
  const close = () => {
    visible.value = false;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
