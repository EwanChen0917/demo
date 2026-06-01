<template>
  <el-dialog title="导出" :model-value="visible" @close="visible = false" align-center>
    <div>请选择导出信息</div>
    <el-radio-group v-model="sceneIndex">
      <el-radio :label="0" class="w-50">导出原始文件</el-radio>
      <el-radio :label="1" class="w-50">导出合并欧洲文件</el-radio>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleExport" :loading="loading">导出</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import axios from 'axios';
  import { useStore } from '@/store/modules/useStore';
  import { openWindow } from '@/utils';

  const user = useStore();
  const sceneIndex = ref<number>(0);

  const listParams = ref({});
  const loading = ref(false);

  const handleExport = async () => {
    try {
      loading.value = true;
      const res = await (sceneIndex.value === 0
        ? erpApi.luteosErpSaleForecastV2DownTemplate
        : erpApi.luteosErpSaleForecastV2DownTemplateV1)({
        ...listParams.value,
      });
      const isConfirmed = await swal.confirm({
        title: '下载中，请前往下载任务中心查看。',
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
    } finally {
      loading.value = false;
      visible.value = false;
    }
  };

  const visible = ref(false);
  const open = (params) => {
    console.log(params);
    listParams.value = params;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
