<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false">
    <el-form :model="form" ref="formRef" label-width="120px">
      <el-form-item
        label="客户汇总名称"
        prop="name"
        :rules="[{ required: true, message: '请输入客户汇总名称', trigger: 'blur' }]"
      >
        <el-input maxlength="500" v-model="form.name" placeholder="客户汇总名称" />
      </el-form-item>
      <el-form-item
        label="客户名称"
        prop="customerCollectList"
        :rules="[{ required: true, message: '请选择客户名称', trigger: 'change' }]"
      >
        <CustomerSelect
          v-model="form.customerCollectList"
          clearable
          placeholder="客户名称"
          multiple
          teleported
          return-label
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" :active-value="0" :inactive-value="1" />
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
  import CustomerSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/customerSelect.vue';
  import { erpApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const title = ref('');

  const form = ref({});
  const formRef = ref();

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;

      const res = await erpApi.luteosErpPlanPsfccSaveOrUpdate({
        ...form.value,
        customerCollectList: form.value.customerCollectList.map((item) => ({
          value: item,
        })),
      });
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (type, editTitle, data) => {
    title.value = editTitle;
    if (type === 'edit') {
      const newData = {
        ...data,
        customerCollectList: data.customerCollectList.map((item) => item.value),
      };
      form.value = cloneDeep(newData);
    } else {
      form.value = { status: 0 };
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
