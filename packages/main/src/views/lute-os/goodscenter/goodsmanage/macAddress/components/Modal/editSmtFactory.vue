<template>
  <el-dialog :title="title" :model-value="visible" @close="handleClose">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
    >
      <el-form-item
        label="工厂代码："
        prop="factoryCode"
        :rules="[
          { required: true, message: '工厂代码不能为空', trigger: ['blur', 'change'] },
          { pattern: /^[0-9A-Fa-f]+$/, message: '请输入十六进制值' },
        ]"
      >
        <el-input
          v-model="form.factoryCode"
          placeholder="请输入工厂代码"
          maxlength="1"
          :disabled="info.factoryCode"
        />
      </el-form-item>
      <el-form-item
        label="工厂名称："
        prop="factoryName"
        :rules="[{ required: true, message: '工厂名称不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="form.factoryName" placeholder="请输入工厂名称" maxlength="30" />
      </el-form-item>
      <el-form-item
        label="供应商："
        prop="supplierCode"
        :rules="[{ required: false, message: '请选择供应商', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.supplierCode"
          clearable
          filterable
          placeholder="请选择"
          @change="handleLabelChange"
        >
          <el-option
            v-for="item in supplierOptionsList"
            :key="item.supplierCode"
            :label="`${item.supplierCode}-${item.supplierName}` || ''"
            :value="item.supplierCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="生产项目：" prop="project">
        <el-input v-model="form.project" placeholder="请输入生产项目" maxlength="100" />
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          rows="5"
          placeholder="请输入备注"
          maxlength="600"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { productApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      info: any;
    }>(),
    {
      visible: false,
    }
  );
  const formRef = ref();
  const form: any = ref({
    factoryCode: '',
    factoryName: '',
    supplierCode: '',
    project: '',
    remark: '',
  });

  form.value = { ...props.info };

  const title = computed(() => {
    if (props.info.factoryCode) {
      return '编辑贴片工厂';
    }
    return '新增贴片工厂';
  });

  const supplierOptionsList = ref<any[]>([]);
  const getSupplierOptions = async () => {
    const res: any = await productApi.luteosProductMacQuerySupplierList();
    supplierOptionsList.value = res?.supplierList.filter((item) => item.supplierCode);
  };
  getSupplierOptions();

  const saveLoading = ref(false);
  const submitFn = () => {
    formRef.value.validate((isValid) => {
      if (isValid) {
        saveLoading.value = true;
        productApi
          .luteosProductMacSaveFactory({
            id: form.value.id || undefined,
            factoryCode: form.value.factoryCode,
            factoryName: form.value.factoryName,
            supplierCode: form.value.supplierCode || '',
            project: form.value.project || '',
            remark: form.value.remark || '',
          })
          .then(() => {
            ElMessage.success('保存成功');
            formRef.value.resetFields();
            emit('closeModal', 'reload');
          })
          .finally(() => {
            saveLoading.value = false;
          });
      }
    });
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    formRef.value.resetFields();
    emit('closeModal');
  };
</script>

<style lang="scss" scoped></style>
