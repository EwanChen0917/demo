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
        <el-button
          type="primary"
          :disabled="!file.length"
          @click="confirmUpload"
          v-loading="loading"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import axios from 'axios';
  import { useStore } from '@/store/modules/useStore';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      searchParams: any;
      notice?: string;
    }>(),
    {
      notice: '请注意标黄必填字段，未填写必填字段将上传失败',
    }
  );

  /*  const serviceMap = {
    batchAddNew: {
      template: erpApi.luteosErpPlanPsfpcDownTemplate,
      upload: erpApi.luteosErpPlanPsfpcUpload,
    },
  }; */

  const user = useStore();
  const downloadLoading = ref(false);
  const file = ref<any[]>([]);
  const visibility = ref(false);

  const downloadTemplate = async () => {
    downloadLoading.value = true;
    const res = await erpApi
      .luteosErpPlanPsfpcDownTemplate({
        ...props.searchParams,
      })
      .finally(() => {
        downloadLoading.value = false;
      });
    urlDownload(res as string);
  };

  /* const downloadTemplate = async () => {
    const res = await axios.post(
      '/api/luteos/erp/plan/psfpc/downTemplate',
      { ...props.searchParams },
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
    link.download = '预测商品匹配批量更新数据模板';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url); // 释放内存
      document.body.removeChild(link);
    }, 0);
  }; */
  const uploadRef = ref();
  const emits = defineEmits<{
    (success: string, data: any);
  }>();

  const loading = ref(false);
  const confirmUpload = async () => {
    try {
      loading.value = true;
      const res = await erpApi.luteosErpPlanPsfpcUpload({
        fileName: file.value[0].name,
        ossKey: file.value[0].ossKey,
      });
      file.value = [];
      console.log(res);
      ElMessage.success('上传成功');
      emits('success', res);
      close();
    } finally {
      loading.value = false;
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
