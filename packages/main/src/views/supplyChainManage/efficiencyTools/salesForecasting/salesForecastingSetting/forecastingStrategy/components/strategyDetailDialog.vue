<template>
  <el-dialog title="预测策略详情" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" label-width="130px" label-position="left">
      <el-form-item label="策略名称" prop="name">
        {{ form?.name }}
      </el-form-item>
      <el-form-item label="渠道" prop="channel">
        {{ form?.channelDesc }}
      </el-form-item>
      <el-form-item label="预测方式" prop="type">
        {{ form?.typeDesc }}
      </el-form-item>
      <el-form-item label="站点" prop="site">
        {{ form?.siteList?.join('、') }}
      </el-form-item>
      <el-form-item label="预测编码" prop="code">
        {{ uniqueTypeMap[form?.uniqueType] }}
      </el-form-item>
      <el-form-item label="状态" prop="status">
        {{ form?.statusDesc }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const title = ref('');

  const uniqueTypeMap = {
    1: 'asin',
    2: 'msku',
    3: 'itemId',
  };

  const formRef = ref();
  const form = ref({
    name: '',
    channel: '',
    site: '',
    code: '',
    type: 1,
    status: 0,
  });

  const rules = reactive({
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    channel: [{ required: true, message: '请选择渠道', trigger: 'change' }],
    type: [{ required: true, message: '请选择预测方式', trigger: 'change' }],
    site: [{ required: true, message: '请选择站点', trigger: 'change' }],
    code: [{ required: true, message: '请选择预测编码', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  });

  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    try {
      saveLoading.value = true;
      await erpApi.luteosErpPlanPsfsSaveOrUpdate(form.value);
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
    if (row) {
      form.value = { ...row };
    } else {
      form.value = {
        name: '',
        channel: '',
        type: 1,
        site: '',
        code: '',
        status: 0,
      };
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
