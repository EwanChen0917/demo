<template>
  <el-dialog
    v-model="visible"
    :destroy-on-close="true"
    :title="isEdit ? '编辑' : '新增'"
    width="800px"
    :close-on-click-modal="false"
    @closed="handleClosed"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      class="item-container"
    >
      <el-form-item label="产品SKU" prop="productSku" required>
        <el-select
          v-model="formData.productSku"
          placeholder="请选择产品SKU"
          filterable
          remote
          :remote-method="querySupplySkuList"
          :loading="supplySkuLoading"
          :disabled="isEdit"
          @change="handleChangeSupplySku"
        >
          <el-option
            v-for="item in supplySkuList"
            :key="item.productSku"
            :label="item.productSku"
            :value="item.productSku"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="海关品名" prop="declarationName">
        <el-input v-model="formData.declarationName" placeholder="请输入海关品名" clearable />
      </el-form-item>

      <el-form-item label="产品名称" prop="productName" required>
        <el-input v-model="formData.productName" disabled />
      </el-form-item>

      <el-form-item label="海关编码" prop="declarationCode">
        <el-input v-model="formData.declarationCode" placeholder="请输入海关编码" clearable />
      </el-form-item>

      <el-form-item label="成交单位" prop="transactionUnit" required>
        <el-input v-model="formData.transactionUnit" placeholder="请输入成交单位" clearable />
      </el-form-item>

      <el-form-item label="备案币种" prop="recordCurrency">
        <el-input v-model="formData.recordCurrency" disabled />
      </el-form-item>

      <el-form-item label="申报价值" prop="declaredValue" required>
        <el-input-number
          :precision="2"
          :controls="false"
          v-model="formData.declaredValue"
          placeholder="请输入申报价值"
          clearable
        />
      </el-form-item>

      <el-form-item label="境内资源地" prop="domesticSource">
        <el-input v-model="formData.domesticSource" placeholder="请输入境内资源地" clearable />
      </el-form-item>

      <el-form-item label="产品毛重" prop="grossWeight" required>
        <el-input-number
          :precision="2"
          v-model="formData.grossWeight"
          placeholder="请输入产品毛重"
          :controls="false"
          clearable
        />
      </el-form-item>
      <el-form-item label="供应商" prop="supplier">
        <el-input
          v-model="formData.supplier"
          placeholder="请输入供应商"
          maxlength="32"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="申报要素" prop="declarationElement" required>
        <el-input
          v-model="formData.declarationElement"
          placeholder="请输入申报要素 "
          type="textarea"
          maxlength="255"
          show-word-limit
          :rows="2"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          maxlength="255"
          show-word-limit
          placeholder="请输入备注"
          :rows="2"
        />
      </el-form-item>
      <el-form-item label="监管方式" prop="supervisionMethod" required>
        <el-select v-model="formData.supervisionMethod" placeholder="请选择监管方式">
          <el-option label="一般贸易" value="GENERAL_TRADE" />
          <el-option label="其他进出口" value="OTHER_IMPORT_EXPORT" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否商检" prop="isNeedInspection" required>
        <el-switch v-model="formData.isNeedInspection" :active-value="1" :inactive-value="0" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { ElMessage } from 'element-plus';
  import { productApi, erpApi } from '@/api';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const isEdit = computed(() => !!formData.value.id);
  const formRef = ref<FormInstance>();
  const initFormData = () => ({
    productSku: '',
    productName: '',
    declarationName: '',
    declarationCode: '',
    transactionUnit: '',
    recordCurrency: '',
    declaredValue: undefined,
    domesticSource: '',
    grossWeight: undefined,
    supplier: '',
    declarationElement: '',
    supervisionMethod: undefined,
    isNeedInspection: 0,
    remark: '',
  });
  // 表单数据
  const formData = ref(Object.assign(initFormData()));

  // 表单校验规则
  const rules = reactive<FormRules>({
    productSku: [{ required: true, message: '产品sku必填', trigger: 'blur' }],
    declarationName: [{ required: true, message: '海关名称必填', trigger: 'blur' }],
    productName: [{ required: true, message: '产品名称不能为空', trigger: 'blur' }],
    declarationCode: [{ required: true, message: '海关编码不能为空', trigger: 'blur' }],
    transactionUnit: [{ required: true, message: '成交单位不能为空', trigger: 'blur' }],
    declaredValue: [{ required: true, message: '申报价值不能为空', trigger: 'blur' }],
    grossWeight: [{ required: true, message: '产品毛重不能为空', trigger: 'blur' }],
    declarationElement: [{ required: true, message: '申报要素不能为空', trigger: 'blur' }],
    supervisionMethod: [{ required: true, message: '监管方式不能为空', trigger: 'blur' }],
    isNeedInspection: [{ required: true, message: '是否商检不能为空', trigger: 'blur' }],
  });

  const supplySkuList = ref<any[]>([]);
  const supplySkuLoading = ref(false);
  const querySupplySkuList = async (keyword: string) => {
    supplySkuLoading.value = true;
    try {
      const res = await productApi.luteosProductSupplySkuQuerySupplySkuList({
        pageNum: 1,
        pageSize: 10,
        keyword,
      });
      supplySkuList.value = res.supplySkuList || [];
    } catch (error) {
    } finally {
      supplySkuLoading.value = false;
    }
  };
  const handleChangeSupplySku = (val: string) => {
    const selectedSku = supplySkuList.value.find((item) => item.productSku === val);
    if (selectedSku) {
      formData.value.productName = selectedSku.productTitle;
      formData.value.recordCurrency = selectedSku.hsImportCurrency;
    } else {
      formData.value.productName = '';
      formData.value.recordCurrency = '';
    }
  };
  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return;

    await formRef.value
      ?.validate(async (valid) => {
        if (valid) {
          try {
            await erpApi.luteosErpCustomsSaveOrUpdateProduct({ ...formData.value });
            ElMessage.success(`${isEdit.value ? '编辑' : '添加'}报关产品成功`);
            visible.value = false;
            emit('success');
          } catch (error) {}
        }
      })
      .catch(() => false);
  };

  // 关闭弹窗时重置表单
  const handleClosed = () => {
    if (formRef.value) {
      formRef.value.resetFields();
    }
  };

  const open = (val?: any) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (val) {
      formData.value = { ...val };
    } else {
      formData.value = { ...initFormData() };
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped>
  .item-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    :deep(.el-input-number) {
      width: 100%;
      :deep(.el-input__wrapper .el-input__inner) {
        text-align: left;
      }
    }
  }
</style>
