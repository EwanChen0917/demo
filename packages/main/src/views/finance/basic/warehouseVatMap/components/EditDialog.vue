<template>
  <el-dialog v-model="visible" :title="isEdit ? '编辑' : '新增'" @close="handleClose">
    <el-form ref="formRef" :model="formData" label-width="90px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="仓库编码" prop="warehouseCode" required>
            <el-select
              placeholder="仓库编码"
              v-model="formData.warehouseCode"
              filterable
              clearable
              @change="handleWarehouseChange"
            >
              <el-option
                v-for="item in warehouseMap"
                :value="item.warehouseCode"
                :label="item.warehouseCode"
                :key="item.warehouseCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="仓库名称" prop="warehouseName">
            <el-input v-model="formData.warehouseName" placeholder="请输入仓库名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="VAT" prop="vat" required>
        <el-input v-model="formData.vat" placeholder="请输入VAT" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="生效时间" prop="effectiveTime">
            <el-date-picker
              v-model="formData.effectiveTime"
              type="date"
              placeholder="选择时间"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="失效时间" prop="expirationTime">
            <el-date-picker
              v-model="formData.expirationTime"
              type="date"
              placeholder="选择时间"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import { erpApi, dataApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const formRef = ref();
  const formatTime = (time) => {
    const pad = (n) => (n < 10 ? `0${n}` : n);
    return `${time.getFullYear()}-${pad(time.getMonth() + 1)}-${pad(time.getDate())} 00:00:00`;
  };
  const initFormData = {
    id: '',
    warehouseCode: '',
    warehouseDesc: '',
    warehouseName: '',
    vat: '',
    effectiveTime: formatTime(new Date()),
    expirationTime: formatTime(new Date(new Date().setFullYear(new Date().getFullYear() + 10))),
  };
  const formData = ref({ ...initFormData });
  const visible = ref(false);
  const isEdit = computed(() => formData.value?.id);
  const rules = ref({
    warehouseCode: [{ required: true, message: '请输入仓库编码' }],
    vat: [{ required: true, message: '请输入VAT' }],
  });
  const handleWarehouseChange = (value) => {
    const warehouse = warehouseMap.value.find((item) => item.warehouseCode === value);
    formData.value.warehouseName = warehouse?.warehouseDesc;
  };
  const warehouseMap = ref();
  const queryAllWarehouse = async () => {
    const res = await dataApi.luteosDataQueryWarehouseList({
      pageNum: 1,
      pageSize: 2000,
    });
    warehouseMap.value = res?.warehouseList || [];
  };

  queryAllWarehouse();
  const open = (data) => {
    formData.value = data || { ...initFormData };
    visible.value = true;
  };
  const handleClose = () => {
    visible.value = false;
    formData.value = { ...initFormData };
    formRef.value.resetFields();
  };
  const handleSubmit = () => {
    formRef.value
      ?.validate(async (valid) => {
        if (valid) {
          try {
            const res = isEdit.value
              ? await erpApi.luteosErpWarehouseVatUpdate({ ...formData.value })
              : await erpApi.luteosErpWarehouseVatAdd({ ...formData.value });
            if (res) {
              ElMessage.success('操作成功');
              emit('success');
              visible.value = false;
            }
          } catch (error) {
            console.error('Error saving form:', error);
          }
        }
      })
      .catch(() => false);
  };

  defineExpose({
    open,
  });
</script>

<style scoped>
  .el-dialog__footer {
    text-align: right;
  }
</style>
