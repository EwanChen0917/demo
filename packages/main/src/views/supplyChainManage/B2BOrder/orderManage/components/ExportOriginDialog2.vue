<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false" align-center width="600">
    <el-form ref="formRef" :model="form" label-width="130px" label-position="left" :rules="rules">
      <el-form-item label="选择附件类型:" prop="downloadType">
        <el-select v-model="form.downloadType" multiple clearable>
          <el-option value="excel" label="Excel" key="Excel" />
          <el-option value="pdf" label="PDF" key="PDF" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  // import dayjs from 'dayjs';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus/es';
  import axios from 'axios';

  const router = useRouter();

  const visible = ref(false);
  const title = ref('一键下载附件');
  const rules = reactive({
    downloadType: [
      {
        required: true,
        message: '请选择附件类型',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const formRef = ref();
  const form = ref({
    downloadType: [],
  });

  const fileProgress: any = ref({});
  // 下载附件
  const downloadFile = async (fileUrl, fileName) => {
    const res = await axios.get(fileUrl, { responseType: 'blob' });
    const blob = new Blob([res.data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url); // 释放内存
      document.body.removeChild(link);
    }, 0);
  };

  const saveLoading = ref(false);
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const res = await erpApi.luteosErpOrderBatchDownloadAttachment({
        erpCodeList: codeListArr.value,
        attachmentTypeList: form.value.downloadType,
      });
      visible.value = false;
      const isConfirmed = await swal.confirm({
        title: '导出成功，具体请前往下载中心查看',
        icon: 'success',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
      });
      emit('close');
      if (isConfirmed) {
        router.push({
          path: '/downloadmanage',
          query: {
            app_code: res?.appCode,
            module_code: res?.moduleCode,
            record_type: 2,
          },
        });
      }
    } finally {
      saveLoading.value = false;
    }
  };
  const codeListArr = ref();
  const open = (codeList) => {
    visible.value = true;
    codeListArr.value = codeList;
    formRef.value?.resetFields();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
