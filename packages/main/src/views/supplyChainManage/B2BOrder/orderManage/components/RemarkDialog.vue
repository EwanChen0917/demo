<template>
  <el-dialog v-model="visible" title="批量订单备注" :close-on-click-modal="false" align-center>
    <el-input type="textarea" v-model="remark" placeholder="请输入备注内容" :rows="10" />
    <template #footer>
      <el-button v-if="remark" class="left" @click="remark = ''">清空备注</el-button>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save" v-loading="saveLoading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits('success');

  const visible = ref(false);
  const remark = ref('');
  const erpCodes = ref([]);
  const open = (codeList) => {
    erpCodes.value = codeList;
    visible.value = true;
  };

  const close = () => {
    remark.value = '';
    visible.value = false;
  };

  const saveLoading = ref(false);
  const save = async () => {
    if (!remark.value) {
      ElMessage.warning('请输入备注');
      return;
    }
    saveLoading.value = true;
    await erpApi.luteosErpOrderSaveRemark({
      erpCodes: erpCodes.value,
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
