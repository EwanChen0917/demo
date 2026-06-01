<template>
  <el-dialog title="批量编辑" v-model="visibility" width="600px" :before-close="close">
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
          <el-button size="small" type="primary" link @click.stop="downloadTemplate">
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
      <div class="notice">
        <div class="label">说明：</div>
        <div class="value">
          <ul>
            <li>上传用于生成需求建议，请认真检查文件数据</li>
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
  import { ref } from 'vue';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { openWindow } from '@/utils';
  import { urlDownload } from '@/utils/download';
  import * as swal from '@/utils/swal';

  const props = defineProps<{
    searchParams: any;
  }>();
  const router = useRouter();
  const file = ref<any[]>([]);
  const visibility = ref(false);
  const downloadTemplate = async () => {
    const res = await erpApi.luteosErpSpSkuConfigDownTemplate({ ...props.searchParams });
    urlDownload(res as string);
  };
  const uploadRef = ref();
  const emits = defineEmits<{
    (success: string);
  }>();
  const confirmUpload = async () => {
    await erpApi.luteosErpSpSkuConfigUpload({
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
