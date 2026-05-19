<template>
  <el-dialog
    title="上传截图"
    :destroy-on-close="true"
    :model-value="visible"
    width="830px"
    @close="onClose"
    align-center
  >
    <div style="display: flex; flex-wrap: wrap; gap: 6px; max-height: 100px; overflow: auto">
      已选{{ checkedRows.length }}个付款单号:
      <el-tag type="success" v-for="item in checkedRows">
        {{ item.code }}
      </el-tag>
    </div>
    <image-upload v-model:file-list="form.fileList" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">关闭</el-button>
        <el-button type="primary" @click="onOk">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import ImageUpload from './components/ImageUpload.vue';

  const visible = ref(false);

  const form = reactive({
    fileList: [],
  });

  const checkedRows = ref([]);
  const open = (_checkedRows, _initImages) => {
    checkedRows.value = _checkedRows;
    form.fileList = Array.isArray(_initImages) ? _initImages : [];
    visible.value = true;
  };

  defineExpose({
    open,
  });

  const emit = defineEmits(['success']);

  const onClose = () => {
    visible.value = false;
  };

  const onOk = async () => {
    const urls = form.fileList.map((x) => x.url).join(',');
    const ossKeys = form.fileList.map((x) => x.ossKey).join(',');
    const params = checkedRows.value.map((x) => {
      return {
        businessCode: x.code,
        businessId: x.id,
        fileUrl: urls || '',
        ossKey: ossKeys || '',
      };
    });

    await financeSystemApi.financeExpensePaymentSaveAttachment(params);
    ElMessage.success('保存成功');
    emit('success');

    visible.value = false;
  };
</script>

<style scoped lang="scss"></style>
