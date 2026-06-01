<template>
  <el-dialog
    :title="title"
    :destroy-on-close="true"
    :model-value="visible"
    :before-close="close"
    align-center
  >
    <div class="import-header">
      <ImportUpload
        ref="uploadRef"
        v-model="fileList"
        directory="erp"
        accept=".xlsx,.xls"
        :showOperate="false"
        :limit="1"
        :multiple="false"
      >
        <el-button type="primary">添加文件</el-button>
      </ImportUpload>
      <el-button type="primary" text @click="getTemplate" :loading="downloadLoading">
        <i class="iconfont icon-xiazai"></i>
        下载模板
      </el-button>
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
            <SvgIcon icon="excelIcon" class="svg-icon svg-icon-2" />
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
        <el-button @click="close">取消</el-button>
        <el-button
          type="primary"
          @click="confirmUpload"
          :loading="loading"
          :disabled="fileList?.length === 0"
        >
          导入
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import axios from 'axios';
  import { useStore } from '@/store/modules/useStore';

  const props = withDefaults(
    defineProps<{
      params?: any;
      requirementList?: string[];
    }>(),
    {
      requirementList: () => [
        '仅支持上传EXCL表格xls、xlsx格式',
        '请根据表格字段填写，请不要删除或变更表格字段',
        '上传后可在上传中心查看上传进度',
      ],
    }
  );

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  const user = useStore();
  const visible = ref(false);
  const uploadRef = ref();
  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const title = ref('');

  const open = (val: string) => {
    visible.value = true;
    title.value = val;
  };
  // 删除文件
  const handleDelFile = (index) => {
    fileList.value.splice(index, 1);
  };
  const confirmUpload = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      try {
        loading.value = true;
        const api =
          title.value === '批量添加预测商品'
            ? erpApi.luteosErpRetailSaleForecastUploadSaveSku
            : erpApi.luteosErpRetailSaleForecastUpload;
        await api({
          fileName: fileList.value[0].name,
          fileUrl: fileList.value[0].fileUrl,
          ossKey: fileList.value[0].ossKey,
        });
        emit('close', true);
        close();
        const isConfirmed = await swal.confirm({
          text: `导入完成，具体请前往上传日志查看`,
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
        });

        if (isConfirmed) {
          openWindow('/salesForecastingLog');
        }
      } finally {
        loading.value = false;
      }
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  const downloadLoading = ref(false);
  const getTemplate = async () => {
    downloadLoading.value = true;
    try {
      if (title.value === '上传更新预测') {
        const res = await erpApi.luteosErpRetailSaleForecastExportTemplate({
          pageNum: 1,
          pageSize: 10,
          ...props.params,
        });
        const isConfirmed = await swal.confirm({
          text: '下载中，请前往下载任务中心查看。',
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-active-light',
          },
        });
        if (!isConfirmed) return;
        openWindow('/downloadmanage');
      } else {
        const res = await axios.post(
          '/api/luteos/erp/retail/sale/forecast/exportSaveSkuTemplate',
          {},
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
        link.download = title.value;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url); // 释放内存
          document.body.removeChild(link);
        }, 0);
      }
    } catch (error) {
      ElMessage.error('下载模板失败，请稍后再试');
    } finally {
      downloadLoading.value = false;
    }
  };

  const close = () => {
    uploadRef.value?.uploadRef.clearFiles();
    visible.value = false;
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
