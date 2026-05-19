<template>
  <el-dialog
    title="导入"
    :destroy-on-close="true"
    :model-value="visible"
    @close="onClose"
    align-center
  >
    <div class="requirement-title">上传说明</div>
    <div class="requirement-list">
      <div class="requirement-item">1. 支持导入格式为xlsx文件;</div>
      <div class="requirement-item">2. 限制导入文件大小不能超过50万行;</div>
      <div class="requirement-item">3. 模板中的表头不能修改、位置不能调换，不能删除;</div>
      <div class="requirement-item">4. 导入时付款单号必须存在。</div>
    </div>
    <div class="mt-5 d-flex gap-5 align-items-center">
      <input type="file" class="file-input" ref="fileInput" @change="onFileChange" />
      <el-button type="primary" @click="onSelectFile">选择文件</el-button>
      <el-button
        type="primary"
        text
        size="default"
        style="color: var(--el-color-primary) !important"
        @click="getTemplate"
      >
        <i class="iconfont icon-xiazai"></i>
        下载模板
      </el-button>
    </div>
    <div v-if="fileName" class="mt-5">已选择：{{ fileName }}</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="onOk">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';
  import { download } from '@/utils/download';
  import dayjs from 'dayjs';
  import { uploadFileToOss } from '@/views/finance/costControl/payManage/utils';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';

  const visible = ref(false);
  const open = () => {
    visible.value = true;
  };

  const msg = ref('');

  defineExpose({
    open,
  });

  const emit = defineEmits(['success']);

  const onClose = () => {
    visible.value = false;
  };

  const fileInput = ref();
  const fileName = ref('');

  const onSelectFile = () => {
    clearFile();
    msg.value = '';
    (fileInput.value as HTMLInputElement).click();
  };
  const onFileChange = (e: any) => {
    msg.value = '';
    fileName.value = e.target.files?.[0]?.name || '';
  };
  const clearFile = () => {
    fileName.value = '';
    msg.value = '';
    if (fileInput.value) {
      (fileInput.value as HTMLInputElement).value = '';
      (fileInput.value as HTMLInputElement).files = null;
    }
  };
  const getTemplate = async () => {
    const url = await financeSystemApi.financeExpensePaymentDownload();
    download(url, `费控支付单导入模板-${dayjs().format('YYYYMMDDHHmmss')}.xlsx`);
  };

  const onOk = async () => {
    const { ossKey } = await uploadFileToOss({
      fileName: fileName.value,
      file: (fileInput.value as HTMLInputElement).files?.[0],
      directory: 'costControlPayManage',
    });
    await financeSystemApi.financeExpensePaymentImport({
      fileName: fileName.value,
      fileType: fileName.value.split('.').pop(),
      ossKey,
    });
    ElMessage.success('导入成功');

    const isConfirmed = await swal.confirm({
      title: '导入操作完成，是否去查看上传日志?',
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-active-light',
      },
    });
    emit('success');
    clearFile();
    onClose();
    if (isConfirmed) {
      setTimeout(() => {
        openWindow('/salesForecastingLog');
      }, 500);
    }
  };
</script>

<style scoped lang="scss">
  .file-input {
    display: none;
  }

  .requirement-title {
    margin-bottom: 6px;
    color: var(---N9, #1f1f1f);
    /* 常规/Medium 13 */
    font-family: 'PingFang SC';
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
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
      font-size: 14px;
      line-height: 20px; /* 166.667% */
    }
  }
</style>
