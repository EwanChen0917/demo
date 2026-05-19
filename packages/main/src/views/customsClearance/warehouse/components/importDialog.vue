<template>
  <el-dialog title="导入入库单" v-model="visibility" width="600px" :before-close="close">
    <div class="import-container">
      <div>选择公司主体：</div>
      <div class="select-box">
        <el-select placeholder="公司主体" class="w-350px" v-model="declarationEntity">
          <el-option
            v-for="(item, key) in props.declarationEntityList"
            :key="item.code"
            :label="item.companyName"
            :value="item.code"
          />
        </el-select>
      </div>
      <p>
        <KeenFileUpload
          accept=".xlsx,.xls"
          v-model="file"
          :showOperate="false"
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
      <div class="notice">
        <div class="label">说明：</div>
        <div class="value">
          <ul>
            <li>请注意标黄必填字段，未填写必填字段将上传失败</li>
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
          :loading="importLoading"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { urlDownload } from '@/utils/download';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';

  const props = defineProps<{
    declarationEntityList: any[];
  }>();

  const downloadLoading = ref(false);
  const declarationEntity = ref('');
  const file = ref<any[]>([]);
  const visibility = ref(false);
  const downloadTemplate = async () => {
    downloadLoading.value = true;
    const res = await erpApi.luteosErpCustomsDownloadCustomsTemplate().finally(() => {
      downloadLoading.value = false;
    });
    urlDownload(res as string);
  };
  const uploadRef = ref();
  const emits = defineEmits<{
    (success: string);
  }>();
  const importLoading = ref(false);
  const confirmUpload = async () => {
    importLoading.value = true;
    await erpApi
      .luteosErpCustomsImportCustoms({
        declarationEntity: declarationEntity.value,
        fileName: file.value[0].name,
        ossKey: file.value[0].ossKey,
      })
      .finally(() => {
        importLoading.value = false;
      });
    file.value = [];
    setTimeout(() => {
      emits('success');
    }, 2000);
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
    if (props.declarationEntityList.length) {
      declarationEntity.value = props.declarationEntityList[0].code;
    }
    // querydeclarationEntityList();
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
  .select-box {
    margin: 15px 0;
  }
</style>
