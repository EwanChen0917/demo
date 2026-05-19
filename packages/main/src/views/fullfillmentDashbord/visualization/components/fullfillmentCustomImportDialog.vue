<!-- eslint-disable no-undef -->
<template>
  <el-dialog
    :title="title"
    v-model="visible"
    @close="handleDialogClose"
    align-center
    :close-on-click-modal="false"
  >
    <div class="import-header">
      <ImportUpload
        ref="uploadRef"
        v-model="fileList"
        directory="erp"
        :showOperate="false"
        :limit="1"
      >
        <el-button type="primary">添加文件</el-button>
      </ImportUpload>
      <el-button
        v-if="uploadOptions?.templateService"
        type="primary"
        text
        @click="downloadTemplate"
        :loading="downloadLoading"
      >
        <i class="iconfont icon-xiazai"></i>
        下载模板
      </el-button>
    </div>
    <!-- <div class="requirement-title">导入校验规则：</div>
    <div class="requirement-list">
      <div v-for="(item, index) in requirementList" :key="index" class="requirement-item">
        {{ item }}
      </div>
    </div> -->
    <div class="file-list">
      <div class="file-item" v-for="(item, index) in fileList" :key="item?.ossKey">
        <div class="file-item-content">
          <div class="left">
            <SvgIcon class="el-icon el-icon--document unknown" :class="item.suffix" />
            {{ item?.name }}
          </div>
          <i
            v-if="item?.percentage === 100"
            class="iconfont icon-shanchu"
            @click="handleDelFile(index)"
          ></i>
        </div>
        <el-progress
          v-if="item?.percentage < 100"
          :percentage="item?.percentage"
          :stroke-width="4"
          :show-text="false"
          class="process"
        />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">导入</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus/es';
  import { UploadFileType } from '@/components/ImportUpload/index.vue';
  // import { ImportDialogOption } from '../pages/baseFullfillment.vue';
  import {
    CommonRespImportDataResp,
    CommonRespImportTemplateQueryResp,
    UploadReq,
  } from '@/api/oms/data-contracts';

  export type UploadService = (params: UploadReq) => Promise<CommonRespImportDataResp>;
  export type TemplateService = () => Promise<CommonRespImportTemplateQueryResp>;
  export type ImportDialogOption = {
    title: string;
    importScene?: string;
    projectCode?: string;
    requirementList: string[];
    uploadService: UploadService;
    templateService?: TemplateService;
  };
  withDefaults(
    defineProps<{
      requirementList?: string[];
      type?: 'logistics' | 'order' | 'warehouse' | 'plan' | 'other';
    }>(),
    {
      requirementList: () => [],
      type: 'order',
    }
  );

  const emit = defineEmits<{
    (event: 'success'): void;
    (event: 'cancel'): void;
    (event: 'close'): void;
  }>();

  const visible = ref(false);
  const title = ref('');
  const uploadOptions = ref<ImportDialogOption>();

  const saveLoading = ref(false);
  const fileList = ref<UploadFileType[]>([]);

  type ImportResult = {
    recordCode?: string;
    succeededCount?: number;
    failedCount?: number;
    businessData?: unknown;
  };

  const save = async () => {
    if (!fileList.value.length) {
      ElMessage.warning('请先选择文件');
      return;
    }
    try {
      saveLoading.value = true;
      const res = (await uploadOptions.value?.uploadService({
        fileName: fileList.value[0].name,
        fileUrl: fileList.value[0].ossKey,
        ossKey: fileList.value[0].ossKey,
      })) as ImportResult;
      saveLoading.value = false;
      visible.value = false;
      ElMessage.success('成功提交处理，正在后台处理中，请稍后');
      // const succeededCount = Number(res?.succeededCount ?? 0);
      // const failedCount = Number(res?.failedCount ?? 0);
      // if (failedCount > 0) {
      //   ElMessage.warning(`已提交处理：成功 ${succeededCount} 条，失败 ${failedCount} 条`);
      // } else {
      //   ElMessage.success(`已提交处理：成功 ${succeededCount} 条，失败 ${failedCount} 条`);
      // }
      emit('success');
    } finally {
      saveLoading.value = false;
    }
  };

  watchEffect(() => {
    fileList.value?.forEach((item) => {
      item.suffix = 'unknown';
      const tmp = item.name.split('.');
      if (tmp.length >= 2) {
        item.suffix = tmp[tmp.length - 1];
      }
    });
  });

  const handleDelFile = (index: number) => {
    fileList.value.splice(index, 1);
  };

  const extractTemplateUrl = (res: unknown): string => {
    if (typeof res === 'string') {
      return res.trim();
    }
    if (res && typeof res === 'object' && 'templateUrl' in res) {
      const { templateUrl } = res as { templateUrl?: unknown };
      return typeof templateUrl === 'string' ? templateUrl.trim() : '';
    }
    return '';
  };

  const isValidDownloadUrl = (url: string): boolean => {
    if (!url) {
      return false;
    }
    if (/^(https?:)?\/\//.test(url) || url.startsWith('/')) {
      return true;
    }
    try {
      // 支持后端返回相对路径，基于当前站点补全后校验
      // eslint-disable-next-line no-new
      new URL(url, window.location.origin);
      return true;
    } catch {
      return false;
    }
  };

  const downloadLoading = ref(false);
  const downloadTemplate = async () => {
    try {
      downloadLoading.value = true;
      if (!uploadOptions.value?.templateService) {
        ElMessage.error('下载模板接口未配置');
        return;
      }
      const res = await uploadOptions.value.templateService();
      const templateUrl = extractTemplateUrl(res);
      if (!templateUrl) {
        ElMessage.error('模板下载地址为空');
        return;
      }
      if (!isValidDownloadUrl(templateUrl)) {
        ElMessage.error('模板下载地址格式不正确');
        return;
      }
      urlDownload(templateUrl);
    } finally {
      downloadLoading.value = false;
    }
  };

  const uploadRef = ref();
  const handleDialogClose = () => {
    emit('close');
  };
  const handleCancel = () => {
    visible.value = false;
    emit('cancel');
  };
  const open = (options: ImportDialogOption) => {
    title.value = options.title || '导入';
    uploadOptions.value = options;
    fileList.value = [];
    uploadRef.value?.clearFile();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .import-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .requirement-title {
    margin-top: 30px;
    margin-bottom: 6px;
    color: var(---N9, #1f1f1f);
    font-size: 13px;
    font-weight: 500;
    line-height: 22px;
    &:before {
      content: '*';
      color: var(---C7, #f53f3f);
      margin-right: 4px;
      font-size: 13px;
      line-height: 22px;
    }
  }

  .requirement-list {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .requirement-item {
      color: var(---N8, #666);
      font-size: 12px;
      line-height: 20px;
      &:before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: var(---N8, #666);
        margin-left: 2px;
        margin-right: 6px;
        line-height: 20px;
      }
    }
  }

  .file-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 300px;
    overflow: auto;
    margin-top: 30px;
    margin-bottom: 12px;

    .file-item {
      width: 100%;
      padding: 8px 12px;
      border-radius: 8px;
      background: var(---N2, #f5f5f5);
      color: var(---N9, #1f1f1f);
      font-size: 12px;
      line-height: 20px;

      &-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          align-items: center;
          gap: 4px;
          .unknown {
            background-size: 14px;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url('@/assets/images/icon_unknown.svg');
          }
          .xls,
          .xlsx {
            background-image: url('@/assets/images/icon_xlsx.svg');
          }
          .pptx,
          .ppt {
            background-image: url('@/assets/images/icon_pptx.svg');
          }
          .pdf {
            background-image: url('@/assets/images/icon_pdf.svg');
          }
          .txt {
            background-image: url('@/assets/images/icon_txt.svg');
          }
          .docx,
          .doc {
            background-image: url('@/assets/images/icon_docx.svg');
          }
          .jpg,
          .jpeg,
          .png,
          .svg {
            background-image: url('@/assets/images/icon_img.svg');
          }
          .zip,
          .gzip,
          .rar,
          .gz,
          .bz,
          .tar {
            background-image: url('@/assets/images/icon_yasuo.svg');
          }
        }

        .icon-shanchu {
          cursor: pointer;

          &:hover {
            color: var(--el-color-danger);
          }
        }
      }
    }
  }

  .el-progress {
    margin-left: 24px;
    margin-top: 8px;

    :deep(.el-progress-bar__outer) {
      border-radius: 29px;
      background-color: var(---N4, #dedede);
    }
  }
</style>
