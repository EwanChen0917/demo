<template>
  <el-dialog :title="title" v-model="visibility" width="600px" :before-close="close">
    <div class="import-container">
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
            @click.stop="downloadTemplate"
          >
            下载模板
          </el-button>
        </KeenFileUpload>
      </p>
      <div class="notice">
        <div class="label">注意：</div>
        <div class="value">
          <ul>
            <li>1、仅支持xls文件</li>
            <li>2、请根据模板字段填写</li>
          </ul>
        </div>
      </div>
      <div class="notice" v-if="notice">
        <div class="label">说明：</div>
        <div class="value">
          <ul>
            <li>{{ notice }}</li>
          </ul>
        </div>
      </div>
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
  import { urlDownload } from '@/utils/download';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';

  const props = defineProps<{
    downloadParams: any;
    title: string;
    notice?: string;
    type: 'batchUpdate';
  }>();

  const serviceMap = {
    batchUpdate: {
      template: erpApi.luteosErpPlanSupplyCycleDownTemplate,
      upload: erpApi.luteosErpPlanSupplyCycleUpload,
    },
  };

  const downloadLoading = ref(false);
  const file = ref<any[]>([]);
  const visibility = ref(false);
  const downloadTemplate = async () => {
    downloadLoading.value = true;
    const res = await serviceMap[props.type].template(props.downloadParams).finally(() => {
      downloadLoading.value = false;
    });
    urlDownload(res as string);
  };
  const uploadRef = ref();
  const emits = defineEmits<{
    (success: string);
  }>();
  const confirmUpload = async () => {
    await serviceMap[props.type].upload({
      fileName: file.value[0].name,
      ossKey: file.value[0].ossKey,
    });
    file.value = [];
    emits('success');
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
