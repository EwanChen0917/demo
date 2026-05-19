<template>
  <el-dialog title="编辑" v-model="visible" @close="visible = false" align-center>
    <el-form :model="form" ref="formRef" label-width="0" :rules="rules">
      <el-table :data="form.saveBeanList" max-height="60vh">
        <el-table-column label="供应链SKU" prop="sku">
          <template #default="{ row, $index }">
            <el-form-item :prop="'saveBeanList.' + $index + '.productSku'">
              <span>{{ row?.productSku }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="quantity">
          <template #default="{ row, $index }">
            <el-form-item :prop="'saveBeanList.' + $index + '.quantity'">
              <span>{{ row?.quantity }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="平台签收数量" prop="receiptQuantity">
          <template #default="{ row }">
            <el-form-item>
              <NumberInput v-model="row.receiptQuantity" :min="0" :precision="0" />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);
  const visible = ref(false);

  const fbaId = ref();
  const form = ref({});
  const formRef = ref();

  const rules = reactive({
    quantity: [{ required: true, message: '请输入数量', trigger: 'blur' }],
    receiptQuantity: [
      { required: true, message: '请输入平台签收数量', trigger: ['blur', 'change'] },
    ],
  });

  const saveLoading = ref(false);
  const save = async () => {
    /* const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return; */
    if (form.value.saveBeanList?.filter((item) => item.receiptQuantity >= 1)?.length === 0) {
      ElMessage.warning('至少填写一个平台签收数量');
      return;
    }
    try {
      saveLoading.value = true;
      const res = await erpApi.luteosErpV2FirstLogisticsSaveSkuDetail({
        fbaId: fbaId.value,
        saveBeanList: form.value.saveBeanList,
      });
      ElMessage.success('新增成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (id, data) => {
    fbaId.value = id;
    form.value.saveBeanList = data;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
