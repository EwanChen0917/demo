<template>
  <el-dialog title="附件" v-model="visible">
    <KeenCard>
      <KeenFileUpload
        accept=".pdf,.xlsx,.xls,.doc,.docx"
        class="packing-upload"
        directory="erp/warehouseOrder/attachment"
        ref="uploadRef"
        v-model="fileList"
        :limit="null"
        :sizeLimit="5 * 1024 * 1024"
      >
        <el-button icon="plus" type="primary" size="small" />
      </KeenFileUpload>
      <div v-if="fileList.length === 0" class="text-gray-500">
        <span>文件大小≤5MB;文件格式仅支持xlsx,pdf,docx</span>
      </div>
    </KeenCard>
    <template #footer>
      <span>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits('success');

  const visible = ref(false);
  const codeList = ref([]);
  const fileList = ref([]);
  const uploadRef = ref();

  const open = (list) => {
    uploadRef.value?.uploadRef.clearFiles();
    visible.value = true;
    codeList.value = list;
  };

  const saveLoading = ref(false);
  const save = async () => {
    try {
      saveLoading.value = true;
      await erpApi.luteosErpWarehouseOrderAttachUpload({
        attachmentInfoList: fileList.value.map((item) => ({
          fileName: item.name,
          fileUrl: item.ossKey,
        })),
        orderCodeList: codeList.value,
      });
      ElMessage.success('上传成功');
      visible.value = false;
      emit('success');
    } finally {
      saveLoading.value = false;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
