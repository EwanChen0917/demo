<template>
  <el-dialog :title="title" v-model="visible" @close="close()" align-center>
    <div>批量绑定B2B订单和谷仓订单，获取谷仓订单发货状态</div>
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
  import { commonApi, erpApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    importScene: string;
    title: string;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
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
      const res = await erpApi
        .luteosErpWarehouseOrderAddUpload({
          fileUrl: fileList.value[0].url,
          fileName: fileList.value[0].name,
          ossKey: fileList.value[0].ossKey,
        })
        .finally(() => {
          loading.value = false;
        });
      ElMessage.info(
        `成功${res.succeededCount}条，失败${res.failedCount}条${
          res.failedCount > 0 ? '，请到上传日志查看' : ''
        }`
      );
      emit('close', true);
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  // https://dev.luteos.com/api/luteos/erp/warehouse/order/downMarkDeliveryTemplate
  const getTemplate = async () => {
    const res = await erpApi.luteosErpWarehouseOrderDownMarkDeliveryTemplate();
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
