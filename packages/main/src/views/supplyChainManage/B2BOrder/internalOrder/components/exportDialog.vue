<template>
  <el-dialog title="导出" :model-value="visible" @close="visible = false" align-center>
    <el-radio-group v-model="exportTemplate">
      <el-radio label="default" class="w-50">业务导出</el-radio>
      <el-radio label="finance" class="w-50">财务导出</el-radio>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <ExportBtn
          :service="erpApi.luteosErpOrderOrderDownload"
          :params="{ ...listParams, exportTemplate }"
          :plain="false"
          @success="visible = false"
        >
          导出
        </ExportBtn>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';

  const exportTemplate = ref('default');

  const listParams = ref({});

  const visible = ref(false);
  const open = (params) => {
    listParams.value = params;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
