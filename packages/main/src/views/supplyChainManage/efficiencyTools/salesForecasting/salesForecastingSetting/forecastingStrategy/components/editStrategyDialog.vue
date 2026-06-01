<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" label-position="left">
      <el-form-item label="策略名称" prop="name">
        <el-input v-model="form.name" clearable placeholder="请输入策略名称" />
      </el-form-item>
      <el-form-item label="渠道" prop="channel">
        <el-select v-model="form.channel">
          <el-option value="amazon" label="Amazon" />
          <el-option value="shopify" label="Shopify" />
          <el-option value="walmart" label="Walmart" />
          <el-option value="tiktok" label="TikTok" />
          <el-option value="mercadocbt" label="Mercadocbt" />
        </el-select>
      </el-form-item>
      <el-form-item label="预测方式" prop="type">
        <el-select v-model="form.type">
          <el-option label="按产品SKU预测" :value="1" />
          <el-option label="按在线商品预测" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="站点" prop="site">
        <ErpSiteSelect v-model="form.site" clearable placeholder="站点" :channel="form.channel" />
      </el-form-item>
      <el-form-item label="预测编码" prop="code">
        <el-select v-model="form.code">
          <el-option label="按产品SKU预测" :value="1" />
          <el-option label="按在线商品预测" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const title = ref('');

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
      title.value = '编辑预测策略';
      form.value = { ...row };
    } else {
      title.value = '新增预测策略';
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
