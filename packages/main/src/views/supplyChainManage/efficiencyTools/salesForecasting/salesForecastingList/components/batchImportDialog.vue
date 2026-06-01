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
  import axios from 'axios';
  import { useStore } from '@/store/modules/useStore';

  const props = withDefaults(
    defineProps<{
      notice?: string;
      type: 'batchAddNew';
    }>(),
    {
      notice: '请注意标黄必填字段，未填写必填字段将上传失败',
    }
  );

  const serviceMap = {
    batchAddNew: {
      template: erpApi.luteosErpSaleForecastV2DownAddTemplate,
      upload: erpApi.luteosErpSaleForecastV2UploadAddTemplate,
    },
  };

  const user = useStore();
  const forecastType = ref();
  const downloadLoading = ref(false);
  const file = ref<any[]>([]);
  const visibility = ref(false);
  /* const downloadTemplate = async () => {
    downloadLoading.value = true;
    const res = await serviceMap[props.type]
      .template({
        forecastType: forecastType.value,
      })
      .finally(() => {
        downloadLoading.value = false;
      });
    urlDownload(res as string);
  }; */
  const downloadTemplate = async () => {
    const res = await axios.post(
      '/api/luteos/erp/sale/forecast/v2/downAddTemplate',
      {
        type: forecastType.value,
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
    link.download =
      forecastType.value === 1 ? '批量添加商品模板(产品SKU)' : '批量添加商品模板(在线商品)';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url); // 释放内存
      document.body.removeChild(link);
    }, 0);
  };
  const uploadRef = ref();
  const emits = defineEmits<{
    (success: string, data: any);
  }>();
  const confirmUpload = async () => {
    const res = await serviceMap[props.type].upload({
      fileName: file.value[0].name,
      ossKey: file.value[0].ossKey,
      type: forecastType.value,
    });
    file.value = [];
    console.log(res);
    emits('success', res);
    close();
  };

  const open = (type) => {
    forecastType.value = type;
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
