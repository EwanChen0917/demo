<template>
  <el-dialog v-model="visible" title="备注">
    <div class="py-3">
      <el-input type="textarea" v-model="remark" :rows="5" placeholder="请输入备注" />
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
  import { ElMessage } from 'element-plus';

  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  const visible = ref(false);
  const remark = ref('');
  const code = ref('');
  const service = ref('');
  const params = ref('');
  const open = (curCode, curRemark, api, options) => {
    code.value = curCode;
    remark.value = curRemark;
    service.value = api;
    params.value = options;
    visible.value = true;
  };

  const close = () => {
    remark.value = '';
    visible.value = false;
  };

  const saveLoading = ref(false);
  const save = async () => {
    try {
      saveLoading.value = true;
      await service.value({
        code: code.value,
        remark: remark.value,
        ...params.value,
      });
      ElMessage.success('备注成功');
      emit('success');
      close();
    } finally {
      saveLoading.value = false;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
