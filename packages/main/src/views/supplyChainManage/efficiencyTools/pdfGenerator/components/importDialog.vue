<template>
  <el-dialog
    title="生成链接"
    v-model="visible"
    @close="visible = false"
    align-center
    :close-on-click-modal="false"
  >
    <div class="import-header">
      <ImportUpload
        ref="uploadRef"
        v-model="fileList"
        directory="erp"
        :showOperate="false"
        :limit="100"
        :multiple="true"
        accept=".pdf,.xml"
        :sizeLimit="50 * 1024 * 1024"
      >
        <el-button type="primary">选择文件</el-button>
      </ImportUpload>
      <!-- <el-button type="primary" text @click="downloadTemplate" :loading="downloadLoading">
        <i class="iconfont icon-xiazai"></i>
        下载模板
      </el-button> -->
    </div>
    <div class="requirement-title">上传说明</div>
    <div class="requirement-list">
      <div v-for="(item, index) in requirementList" :key="index" class="requirement-item">
        {{ item }}
      </div>
    </div>
    <!--    文件列表-->
    <div class="file-list">
      <div class="file-item" v-for="(item, index) in fileList" :key="item?.ossKey">
        <div class="file-item-content">
          <div class="left">
            <SvgIcon class="el-icon el-icon--document unknown" :class="(item as any).suffix" />
            <!-- <SvgIcon icon="excelIcon" class="svg-icon svg-icon-2" /> -->
            {{ item?.name }}
          </div>
          <i
            v-if="item?.percentage === 100"
            class="iconfont icon-shanchu"
            @click="handleDelFile(index)"
          ></i>
        </div>
        <!--        进度条-->
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
        <el-button type="primary" @click="save" v-loading="saveLoading">导入</el-button>
      </span>
    </template>
  </el-dialog>
  <ResultDialog ref="resultDialogRef"></ResultDialog>
</template>

<script setup lang="ts">
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { amazonApi } from '@/api';
  import { openWindow } from '@/utils';
  import ResultDialog from './ResultDialog.vue';

  const props = withDefaults(
    defineProps<{
      params?: any;
      requirementList?: string[];
    }>(),
    {
      requirementList: ['支持PDF和XML格式文件上传，单个文件最大50M', '支持多选文件'],
    }
  );
  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  const router = useRouter();
  const visible = ref(false);
  const title = ref('');

  const resultDialogRef = ref();
  const saveLoading = ref(false);
  const save = async () => {
    if (!fileList.value.length) {
      ElMessage.warning('请先选择文件');
      return;
    }
    try {
      saveLoading.value = true;
      const params = fileList.value.map((item) => {
        return {
          fileName: item.name,
          ossKey: item.ossKey,
          // key: item.ossKey,
          // importScene: 'multi_platform_price_import',
        };
      });
      // console.log('params', params);
      // return;
      const res = await amazonApi.luteosAmazonFileUpload({ uploadReqs: params });
      saveLoading.value = false;
      visible.value = false;
      if (res.failList?.length > 0) {
        // ElMessage.error('文件上传失败');
        resultDialogRef.value?.open(res?.failList, '文件生成链接失败列表');
        return;
      }
      ElMessage.success('链接已生成');
      emit('success');
      // const isConfirmed = await swal.confirm({
      //   title: '上传成功，是否去查看上传日志?',
      //   icon: 'success',
      //   confirmButtonText: '去查看',
      //   cancelButtonText: '知道了',
      // });
      // if (isConfirmed) {
      //   openWindow('/salesForecastingLog');
      // }
    } finally {
      saveLoading.value = false;
    }
  };

  const fileList = ref([]);
  watchEffect(() => {
    fileList.value?.forEach((item: any) => {
      item.suffix = 'unknown';
      const tmp = item.name.split('.');
      if (tmp.length >= 2) {
        item.suffix = tmp[tmp.length - 1];
      }
    });
    // console.log(fileList.value);
  });
  // 删除文件
  const handleDelFile = (index) => {
    fileList.value.splice(index, 1);
  };

  // 下载模板
  const downloadLoading = ref(false);
  const downloadTemplate = async () => {
    try {
      downloadLoading.value = true;
      const res = await commonApi.luteosCommonFileQueryImportTemplate({
        importScene: 'multi_platform_price_import',
      });
      const url = res?.templateUrl;
      if (url) {
        urlDownload(url as string);
      } else {
        ElMessage.warning('模板下载失败');
      }
    } finally {
      downloadLoading.value = false;
    }
  };

  const uploadRef = ref(null);
  const open = async () => {
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
    /* 常规/Medium 13 */
    font-size: 13px;
    font-weight: 500;
    line-height: 22px; /* 169.231% */
    &:before {
      content: '*';
      color: var(---C7, #f53f3f);
      /* 常规/Regular 13 */
      margin-right: 4px;
      font-size: 13px;
      line-height: 22px; /* 169.231% */
    }
  }

  .requirement-list {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .requirement-item {
      color: var(---N8, #666);
      /* 较弱/Regular 12 */
      font-size: 12px;
      line-height: 20px; /* 166.667% */
      &:before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: var(---N8, #666);
        margin-left: 2px;
        margin-right: 6px;
        line-height: 20px; /* 166.667% */
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
      line-height: 20px; /* 166.667% */

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
            // margin-left: 2px;
          }
          .xls,
          .xlsx {
            background-image: url('@/assets/images/icon_xlsx.svg');
          }
          .pptx,
          .pptx {
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
          .zip,
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
