<template>
  <el-dialog v-model="visible" title="备注">
    <div class="py-3">
      <el-input type="textarea" v-model="remark" :rows="5" />
    </div>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi, omsApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits('success');

  const visible = ref(false);
  const remark = ref('');
  const codeList = ref([]);
  const open = (list, data) => {
    remark.value = data;
    codeList.value = list;
    visible.value = true;
  };

  const close = () => {
    remark.value = '';
    visible.value = false;
  };

  const saveLoading = ref(false);
  const save = async () => {
    saveLoading.value = true;
    await omsApi.omsWarehouseOrderSaveRemark({
      codeList: codeList.value,
      remark: remark.value,
    });
    saveLoading.value = false;
    ElMessage.success('备注成功');
    emit('success');
    close();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
