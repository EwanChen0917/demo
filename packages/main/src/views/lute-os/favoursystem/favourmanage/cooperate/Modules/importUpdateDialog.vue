<template>
  <el-dialog title="批量操作" v-model="visibility" width="600px" :before-close="close">
    <div class="import-container">
      <KeenFileUpload
        accept=".xlsx,.xls"
        class="packing-upload"
        v-model="file"
        directory="erp/template"
        ref="uploadRef1"
        :uploadListStyle="{ width: '345px', minWidth: '345px' }"
      >
        <div class="w-350px">1.批量上传/修改上线数据</div>
        <el-button type="primary" size="small">选择文件</el-button>
        <el-button
          :loading="downloadLoading1"
          size="small"
          type="primary"
          link
          @click.stop="downloadTemplate(1)"
        >
          下载模板
        </el-button>
      </KeenFileUpload>
    </div>

    <div class="import-container">
      <KeenFileUpload
        accept=".xlsx,.xls"
        class="packing-upload"
        v-model="approvalFile"
        directory="erp/template"
        ref="uploadRef2"
      >
        <div class="w-350px">2.批量关联历史审批记录</div>
        <el-button type="primary" size="small">选择文件</el-button>
        <el-button
          :loading="downloadLoading2"
          size="small"
          type="primary"
          link
          @click.stop="downloadTemplate(2)"
        >
          下载模板
        </el-button>
      </KeenFileUpload>
    </div>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button
          type="primary"
          :disabled="!file.length && !approvalFile.length"
          @click="confirmUpload"
          :loading="submitLoading"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { commonApi, metaApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';
  import { download } from '@/utils/download';

  const props = defineProps<{
    downloadParams: any;
    notice?: string;
    type: 'label' | 'batchUpdate' | 'quotation';
  }>();

  const serviceMap = {
    batchUpdate: {
      template: metaApi.luteosMetaExportPartnerDataList,
      upload: commonApi.luteosCommonFileImportData,
    },
  };

  const downloadLoading1 = ref(false);
  const downloadLoading2 = ref(false);
  const router = useRouter();
  const file = ref<any[]>([]);
  const approvalFile = ref<any[]>([]);
  const visibility = ref(false);
  const downloadTemplate = async (index) => {
    let res: any = {};
    if (index === 1) {
      downloadLoading1.value = true;
      res = await downloadCooperate();
      const isExportConfirm = await swal.exportConfirm();
      if (!isExportConfirm) return;

      await nextTick();
      const path = router.resolve({
        path: '/downloadmanage',
        query: {
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
      openWindow(path.href);
    } else if (index === 2) {
      downloadLoading2.value = true;
      res = await downloadApproval();
      download(res.templateUrl);
    }
  };
  const downloadCooperate = async () => {
    const res = await serviceMap[props.type].template(props.downloadParams).finally(() => {
      downloadLoading1.value = false;
    });
    return res;
  };
  const downloadApproval = async () => {
    const res = await commonApi
      .luteosCommonFileQueryImportTemplate({
        importScene: 'ppr_old_import',
      })
      .finally(() => {
        downloadLoading2.value = false;
      });
    return res;
  };
  const submitLoading = ref(false)
  const uploadRef1 = ref();
  const uploadRef2 = ref();
  const emits = defineEmits<{
    (success: string);
  }>();
  const confirmUpload = async () => {
    let res1: any = {};
    let res2: any = {};
    submitLoading.value = true;
    if (file.value.length) {
      res1 = await commonApi.luteosCommonFileImportData({
        importScene: 'partner_data_import',
        fileName: file.value[0].name,
        key: file.value[0].ossKey,
      }).finally(() => {
        submitLoading.value = false;
      });
    }
    if (approvalFile.value.length) {
      res2 = await commonApi.luteosCommonFileImportData({
        importScene: 'ppr_old_import',
        fileName: approvalFile.value[0].name,
        key: approvalFile.value[0].ossKey,
      }).finally(() => {
        submitLoading.value = false;
      });
    }
    if (+res1.failedCount > 0 || +res2.failedCount > 0) {
      const isConfirmed = await swal.confirm({
        text: '有数据导入失败，具体请前往上传日志查看',
        icon: 'error',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
      });
      if (!isConfirmed) {
        close();
        return;
      }
      openWindow('/salesForecastingLog');
    } else {
      ElMessage.success('导入成功');
    }
    close();
  };
  const open = () => {
    visibility.value = true;
  };
  const close = () => {
    file.value = [];
    approvalFile.value = [];
    uploadRef1.value.uploadRef.clearFiles();
    uploadRef2.value.uploadRef.clearFiles();
    visibility.value = false;
  };
  defineExpose({ open });
</script>

<style scoped lang="scss">
  .import-container {
    margin-top: 10px;
  }
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
