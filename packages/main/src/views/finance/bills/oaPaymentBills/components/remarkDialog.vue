<template>
  <el-dialog :title="title" :model-value="visibility" @close="close">
    <div>
      <el-input
        v-model="remark"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10 }"
        show-word-limit
        maxlength="100"
        placeholder="请输入备注"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visibility = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { financeSystemApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const title = ref('修改备注');
  const remark = ref();
  const orderCode = ref();
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'success'): void;
  }>();
  const close = () => {
    visibility.value = false;
    emit('close');
  };
  const visibility = ref(false);
  const save = async () => {
    if (!remark.value) {
      ElMessage.error('请输入备注');
      return;
    }
    const res = await financeSystemApi.financeOaPaymentOrderUpdateListData({
      orderCode: orderCode.value,
      remark: remark.value,
    });
    if (res) {
      ElMessage.success('保存成功');
      close();
      emit('success');
    }
  };
  const open = (row) => {
    orderCode.value = row.orderCode;
    remark.value = ''
    title.value = `【${row.processName}-${row.orderCode}】修改备注`;
    visibility.value = true;
  };
  defineExpose({ open });
</script>

<style scoped lang="scss">
  .text {
    color: var(---N9, #1f1f1f);
    line-height: 26px;
  }
</style>
