<template>
  <el-dialog width="900px" title="编辑配送方式" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px" label-position="left">
      <el-form-item label="配送方式代码" prop="smCode">
        <el-input disabled v-model="form.smCode" placeholder="请输入配送方式代码" />
        <!--        <span>{{ form?.smCode }}</span>-->
      </el-form-item>
      <el-form-item label="配送方式名称" prop="smName">
        <el-input disabled v-model="form.smName" placeholder="请输入配送方式名称" />
        <!--        <span>{{ form?.smName }}</span>-->
      </el-form-item>
      <el-form-item label="绑定仓库" prop="warehouseList">
        <el-select
          disabled
          v-model="form.warehouseList"
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="3"
          placeholder="暂无仓库"
        >
          <el-option
            v-for="item in warehouseList"
            :key="item.warehouseCode"
            :label="item.warehouseName"
            :value="item.warehouseCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="目的国" prop="countryList">
        <!--        <el-select v-model="form.countryList" multiple placeholder="请选择国家" />-->
        <CountrySelect
          v-model="form.countryList"
          multiple
          placeholder="请选择国家"
          clearable
          collapse-tags
          collapse-tags-tooltip
          teleported
          :max-collapse-tags="3"
        />
      </el-form-item>
      <el-form-item label="时效" required>
        <div class="w-100 d-flex gap-5">
          <el-form-item prop="timelinessMin" class="w-50">
            <NumberInput v-model="form.timelinessMin" :precision="0" :min="0" :max="99" />
          </el-form-item>
          -
          <el-form-item prop="timelinessMax" class="w-50">
            <NumberInput v-model="form.timelinessMax" :precision="0" :min="0" :max="99" />
          </el-form-item>
          天
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const visible = ref(false);

  const formRef = ref();
  const form = ref({
    smCode: '',
    smName: '',
    countryList: [],
    timelinessMin: 0,
    timelinessMax: 0,
  });
  const rules = reactive({
    // 表单验证规则
    smCode: [{ required: true, message: '请输入配送方式代码', trigger: 'blur' }],
    smName: [{ required: true, message: '请输入配送方式名称', trigger: 'blur' }],
    warehouseList: [{ required: true, message: '请选择仓库', trigger: 'change' }],
    countryList: [{ required: true, message: '请选择国家', trigger: 'change' }],
    timelinessMin: [
      { required: true, message: '请输入最小时效', trigger: ['blur', 'change'] },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (form.value.timelinessMin > form.value.timelinessMax) {
            callback(new Error('最小时效不能大于最大时效'));
          } else {
            formRef.value.validateField('timelinessMax');
            callback();
          }
        },
        trigger: ['blur', 'change'],
      },
    ],
    timelinessMax: [
      { required: true, message: '请输入最大时效', trigger: ['blur', 'change'] },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (form.value.timelinessMax < form.value.timelinessMin) {
            callback(new Error('最大时效不能小于最小时效'));
          } else {
            formRef.value.validateField('timelinessMin');
            callback();
          }
        },
        trigger: ['blur', 'change'],
      },
    ],
  });

  const warehouseList = ref<any[]>([]);
  const getWarehouseList = async () => {
    const res = await erpApi.luteosErpWarehouseAffiliationQueryWarehouseList();
    warehouseList.value = (res as []) || [];
  };

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      await erpApi.luteosErpOrderShipmentUpdateSmwp({
        ...form.value,
        countryList: form.value.countryList.map((item) => ({ value: item })),
        warehouseList: form.value.warehouseList.map((item) => ({ value: item })),
      });
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    getWarehouseList();
    form.value = { ...row };
    form.value.countryList = row.countryList.map((item) => item.value);
    // form.value.warehouseList = row.warehouseList.map((item) => item.desc)?.join(',');
    form.value.warehouseList = row.warehouseList.map((item) => item.value);
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
