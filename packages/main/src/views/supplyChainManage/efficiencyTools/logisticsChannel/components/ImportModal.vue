<template>
  <el-dialog :title="title" v-model="visible" @close="close" align-center>
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
    <div>
      <p>1、支持新增货代渠道数据，每次仅支持导入一个文件</p>
      <p>2、请按照下载模板的格式导入，表头不可修改，基础信息内除生效日期外，其他信息不可修改</p>
      <p>3、支持导入格式为xlsx的文件（手动修改文件后缀无效）</p>
      <p style="color: red">
        4、报价信息所有栏位，清报关信息所有栏位，附加费用所有栏位，全部必填，含0正数，仅支持小数点后一位
      </p>
    </div>
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

  const props = defineProps<{
    title: string;
    supplierCode: string;
  }>();

  const emit = defineEmits<{
    (success: string);
  }>();

  const visible = ref(false);
  const uploadRef = ref();
  const downloadLoading = ref(false);
  const file = ref<any[]>([]);

  const loading = ref(false);
  const confirmUpload = async () => {
    await erpApi.luteosErpLogisticsChannelImport({
      fileName: file.value[0].name,
      ossKey: file.value[0].ossKey,
      supplierCode: props.supplierCode,
    });
    file.value = [];
    emit('success');
    close();
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
    if (isConfirmed) {
      openWindow('/salesForecastingLog');
    }
  };

  const getTemplate = async () => {
    downloadLoading.value = true;
    const res = await erpApi.luteosErpLogisticsChannelDownTemplate().finally(() => {
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
