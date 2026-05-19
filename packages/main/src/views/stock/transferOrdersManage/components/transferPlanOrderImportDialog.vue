<template>
  <el-dialog
    title="导入明细"
    v-model="visible"
    @close="onClose"
    align-center
    :close-on-click-modal="false"
  >
    <div class="import-header">
      <ImportUpload
        ref="uploadRef"
        v-model="fileList"
        directory="oms/transfer/plan"
        :showOperate="false"
        :limit="1"
      >
        <el-button type="primary">添加文件</el-button>
      </ImportUpload>
      <el-button
        type="primary"
        text
        @click="downloadTemplate"
        :loading="downloadLoading"
        v-if="importScene === 'transfer_plan_order_list_import'"
      >
        <i class="iconfont icon-xiazai"></i>
        下载模板
      </el-button>
    </div>

    <div class="requirement-title">导入校验规则：</div>
    <div class="requirement-list">
      <div v-for="(item, index) in requirementList" :key="index" class="requirement-item">
        {{ item }}
      </div>
    </div>

    <div class="file-list">
      <div class="file-item" v-for="(item, index) in fileList" :key="item?.ossKey">
        <div class="file-item-content">
          <div class="left">
            <SvgIcon class="el-icon el-icon--document unknown" :class="(item as any).suffix" />
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
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitImport" v-loading="submitLoading">导入</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus/es';
  import { urlDownload } from '@/utils/download';
  import { omsApi } from '@/api';
  import { useStore } from '@/store/modules/useStore';

  const store = useStore();
  type ImportResult = {
    recordCode?: string;
    succeededCount?: number;
    failedCount?: number;
    businessData?: unknown;
  };

  const emit = defineEmits<{
    (event: 'success', payload?: ImportResult): void;
  }>();
  const code = ref<string>('');
  // const memberCode = ref<string>('');
  const visible = ref(false);
  const submitLoading = ref(false);
  const downloadLoading = ref(false);
  const fileList = ref<any[]>([]);

  // 该组件为调拨计划单专用，不对外暴露 api/service 配置
  const importScene = ref<
    'transfer_plan_order_list_import' | 'transfer_plan_order_detail_audit_import'
  >('transfer_plan_order_list_import');
  const requirementList = computed(() => {
    return importScene.value === 'transfer_plan_order_list_import'
      ? listRequirementList
      : detailRequirementList;
  });
  const detailRequirementList = [
    '必填字段：供应链SKU、调出仓、调入仓、审核数量',
    '校验规则：',
    '1、供应链SKU + 调出仓 不允许重复；',
    '2、审核数量必须大于 0、小于等于申请数量；',
  ];
  const listRequirementList = [
    '必填字段：供应链SKU、调出仓、调入仓、申请数量',
    '校验规则：',
    '1、供应链SKU + 调出仓 不允许重复；',
    '2、申请数量必须大于 0；',
  ];
  watchEffect(() => {
    fileList.value?.forEach((item: any) => {
      item.suffix = 'unknown';
      const tmp = String(item?.name || '').split('.');
      if (tmp.length >= 2) {
        item.suffix = tmp[tmp.length - 1];
      }
    });
  });

  const handleDelFile = (index: number) => {
    fileList.value.splice(index, 1);
  };

  const downloadTemplate = async () => {
    try {
      downloadLoading.value = true;
      const res = await omsApi.omsCommonFileQueryImportTemplate({
        importScene: importScene.value,
      });
      urlDownload(res?.templateUrl as string);
    } finally {
      downloadLoading.value = false;
    }
  };

  const submitImport = async () => {
    if (!fileList.value.length) {
      ElMessage.warning('请先选择文件');
      return;
    }
    try {
      submitLoading.value = true;
      const res = await omsApi.omsCommonFileImportData({
        async: false,
        fileName: fileList.value[0].name,
        key: fileList.value[0].ossKey,
        importScene: importScene.value,
        extInfo: code.value ? { planCode: code.value } : undefined,
        importer: store.userInfo.memberCode,
      });
      const succeededCount = Number(res?.succeededCount ?? 0);
      const failedCount = Number(res?.failedCount ?? 0);
      if (failedCount > 0) {
        ElMessage.warning(`已提交处理：成功 ${succeededCount} 条，失败 ${failedCount} 条`);
      } else {
        ElMessage.success(`已提交处理：成功 ${succeededCount} 条，失败 ${failedCount} 条`);
      }

      visible.value = false;
      emit('success', res);
    } finally {
      submitLoading.value = false;
    }
  };
  const onClose = () => {
    code.value = '';
    visible.value = false;
  };
  const uploadRef = ref();
  const open = ({ type, targetCode = undefined }: { type: string; targetCode?: string }) => {
    fileList.value = [];
    uploadRef.value?.clearFile?.();
    visible.value = true;
    code.value = targetCode || '';

    importScene.value =
      type === 'list'
        ? 'transfer_plan_order_list_import'
        : 'transfer_plan_order_detail_audit_import';
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
