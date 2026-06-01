<template>
  <el-dialog :title="title" v-model="visible" @close="close()" align-center>
    <p class="fs-xxl-4">绑定B2B订单和谷仓订单号，获取谷仓订单发货状态</p>
    <el-form :model="form" ref="formRef">
      <el-form-item
        label="谷仓订单号："
        prop="warehouseOrderNo"
        :rules="[{ required: true, message: '谷仓订单号必填', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="form.warehouseOrderNo" clearable :maxlength="30" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="confirm" :loading="loading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { WarehouseOrderBaseInfoBean } from '@/api/erp/data-contracts';
  import { ElMessage, type FormInstance } from 'element-plus';

  defineProps<{
    title: string;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  const visible = ref(false);
  let state: WarehouseOrderBaseInfoBean = {};
  const open = (data: WarehouseOrderBaseInfoBean) => {
    formRef.value?.resetFields();
    state = data;
    visible.value = true;
  };

  const form = reactive({
    warehouseOrderNo: '',
  });
  const loading = ref(false);
  const formRef = ref<FormInstance>();
  const confirm = async () => {
    const validateResult = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (validateResult) {
      loading.value = true;
      await erpApi
        .luteosErpWarehouseOrderMarkDelivery({
          code: state.code!,
          serviceCode: form.warehouseOrderNo,
        })
        .finally(() => {
          loading.value = false;
        });
      ElMessage.success('操作成功');
      visible.value = false;
      emit('close', true);
    }
  };

  const close = () => {
    visible.value = false;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
