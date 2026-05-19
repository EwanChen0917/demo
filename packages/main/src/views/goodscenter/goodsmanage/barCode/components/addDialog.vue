<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="产品69码：" prop="barCode">
        <span v-if="isEdit">{{ form?.barCode }}</span>
        <el-input v-else v-model="form.barCode" placeholder="请填写条形码（69开头13位）" />
      </el-form-item>
      <el-form-item label="产品SKU：" prop="skuCode">
        <span class="me-3">{{ form?.skuCode }}</span>
        <el-button type="primary" size="small" @click="selectSku">选择产品SKU</el-button>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <BindSku
    v-if="bindVisible"
    :visible="bindVisible"
    selectOne
    confirmText="确定"
    @close="handleBindSkuClose"
    :selected-row="selectedRow"
    :selected-key="selectedKey"
  />
</template>

<script setup lang="ts">
  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';
  import { productApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['save']);

  const visible = ref(false);
  const title = ref('');

  const formRef = ref();
  const form = ref({
    barCode: '',
    skuCode: '',
    remark: '',
  });

  const rules = reactive({
    barCode: [
      { required: true, message: '请输入产品69码', trigger: 'blur' },
      { pattern: /^69\d{11}$/, message: '请输入正确的条形码' },
    ],
    skuCode: [{ required: true, message: '请选择产品SKU' }],
  });

  const bindVisible = ref(false);
  const selectedRow = ref([]);
  const selectedKey = ref();
  const selectSku = async () => {
    if (form.value?.skuCode) {
      const res = await productApi.luteosProductSkuQueryProductSkuList({
        keyWord: form.value?.skuCode,
      });
      selectedRow.value = res?.productSkuBeanList[0];
      selectedKey.value = form.value?.skuCode;
    }
    bindVisible.value = true;
  };
  const handleBindSkuClose = async (reload = false, val) => {
    if (reload) {
      form.value.skuCode = val?.skuCode;
      formRef.value?.validateField('skuCode');
      bindVisible.value = false;
    } else {
      bindVisible.value = false;
    }
  };

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      await productApi.luteosProductBarcodeSaveOrUpdate(form.value);
      ElMessage.success('保存成功');
      visible.value = false;
      emit('save');
    } finally {
      saveLoading.value = false;
    }
  };

  const isEdit = ref(false);
  const open = (type, row) => {
    title.value = `${type === 'add' ? '新增' : '编辑'}产品69码`;
    formRef.value?.clearValidate();
    if (type === 'edit') {
      form.value = row;
      isEdit.value = true;
    } else {
      form.value = {};
      isEdit.value = false;
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
