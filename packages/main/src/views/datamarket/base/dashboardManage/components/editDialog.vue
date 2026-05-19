<template>
  <el-dialog
    v-model="visible"
    :title="rowData?.reportCode ? '编辑看板' : '新增看板'"
    width="625px"
    @close="cancel"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" label-position="top">
      <el-form-item label="看板编码" prop="reportCode">
        <el-input v-model="form.reportCode" placeholder="请输入看板编码" />
      </el-form-item>
      <el-form-item label="看板名称" prop="reportName">
        <el-input v-model="form.reportName" placeholder="请输入看板名称" />
      </el-form-item>
      <el-form-item label="看板描述" prop="reportDesc">
        <el-input v-model="form.reportDesc" type="textarea" placeholder="请输入看板描述" />
      </el-form-item>
      <el-form-item label="所属菜单编码" prop="menuCode">
        <el-input v-model="form.menuCode" placeholder="请输入所属菜单编码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash-es';
  import { biApi, BiApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits<{
    (e: 'success'): void;
  }>();
  const visible = ref(false);
  const form = ref({
    reportCode: '',
    reportName: '',
    reportDesc: '',
    menuCode: '',
  });
  const formRef = ref();
  const rules = ref({
    reportCode: [{ required: true, message: '请输入看板编码', trigger: 'blur' }],
    reportName: [{ required: true, message: '请输入看板名称', trigger: 'blur' }],
  });
  const rowData = ref<any>();
  const open = (row?: any) => {
    visible.value = true;
    rowData.value = row || {};
    form.value = cloneDeep(row || {});
    visible.value = true;
  };
  const cancel = () => {
    visible.value = false;
    // 关闭时清一下校验状态，避免下次打开残留提示
    nextTick(() => {
      formRef.value?.clearValidate();
    });
  };
  const save = () => {
    formRef.value
      ?.validate(async (valid) => {
        if (valid) {
          const url = rowData.value?.reportCode ? biApi.biReportUpdate : biApi.biReportAdd;
          await url({ ...form.value, id: rowData.value?.id });
          ElMessage.success('保存成功');
          emit('success');
          cancel();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
