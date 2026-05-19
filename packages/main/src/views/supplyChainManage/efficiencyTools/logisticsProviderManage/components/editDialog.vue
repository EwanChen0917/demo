<template>
  <el-dialog :title="title.name" v-model="visible" @close="visible = false">
    <el-form
      :model="form"
      label-width="auto"
      label-position="left"
      ref="formRef"
      :disabled="title.type === 'detail'"
    >
      <el-form-item
        prop="supplierName"
        label="物流商名称:"
        :required="title.type !== 'detail'"
        :rules="[{ required: true, message: '请输入物流商名称', trigger: ['blur'] }]"
      >
        <span v-if="title.type === 'detail'">{{ form.supplierName }}</span>
        <el-input v-else v-model="form.supplierName" placeholder="请输入物流商名称" />
      </el-form-item>
      <el-form-item
        prop="supplierCode"
        label="物流商编码:"
        :required="title.type === 'add'"
        :rules="[
          { required: `${title.type === 'add'}`, message: '请输入物流商编码', trigger: ['blur'] },
        ]"
      >
        <el-input
          v-if="title.type === 'add'"
          v-model="form.supplierCode"
          placeholder="请输入物流商编码"
        />
        <span v-else>{{ form.supplierCode }}</span>
      </el-form-item>
      <el-form-item prop="supplierType" label="物流商类型:">
        <span>{{ form.supplierTypeDesc }}</span>
      </el-form-item>
      <el-form-item label="状态:">
        <el-switch
          v-if="title.type !== 'detail'"
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
        />
        <span v-else>{{ form.status === 1 ? '启用' : '禁用' }}</span>
      </el-form-item>
      <el-form-item prop="creator" label="创建人:" v-show="title.type === 'detail'">
        <span>{{ form.creator }}</span>
      </el-form-item>
      <el-form-item prop="createTime" label="创建时间:" v-show="title.type === 'detail'">
        <span>{{ form.createTime }}</span>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
        <el-button
          v-if="title.type !== 'detail'"
          type="primary"
          @click="submitData"
          v-loading="submitLoading"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage, FormInstance } from 'element-plus';

  const props = defineProps<{
    title: {
      name?: string;
      type?: string;
    };
  }>();

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const submitLoading = ref(false);

  // 表单定义
  const formRef = ref<FormInstance>();
  const initFormData = {
    supplierName: '',
    supplierCode: '',
    supplierTypeDesc: '头程物流商',
    supplierType: 'supplier_first',
    status: 1,
    creator: '',
    createTime: '',
  };
  const form = ref({ ...initFormData });

  const open = (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (row) {
      form.value = { ...row };
    } else {
      form.value = { ...initFormData };
    }
  };

  // 新增|编辑
  const submitData = async () => {
    const validRes = await formRef?.value?.validate();
    if (!validRes) return;

    try {
      submitLoading.value = true;
      if (props.title.type === 'add') {
        await erpApi.luteosErpLogisticsSupplierAdd(form.value);
      } else {
        await erpApi.luteosErpLogisticsSupplierUpdate({
          supplierCode: form.value.supplierCode,
          supplierName: form.value.supplierName,
          status: form.value.status,
          supplierType: form.value.supplierType,
        });
      }
      ElMessage.success('保存成功');
      emit('success');
    } finally {
      visible.value = false;
      submitLoading.value = false;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
