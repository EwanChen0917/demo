<template>
  <el-dialog
    v-model="visible"
    :title="rowData?.table ? '编辑数据表' : '新增数据表'"
    width="625px"
    @close="cancel"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" label-position="top">
      <el-form-item label="表" prop="table">
        <el-input v-model="form.table" placeholder="请输入表" />
      </el-form-item>
      <el-form-item label="表名" prop="tableName">
        <el-input v-model="form.tableName" placeholder="请输入表名" />
      </el-form-item>
      <el-form-item label="表描述" prop="tableDesc">
        <el-input v-model="form.tableDesc" type="textarea" placeholder="请输入表描述" />
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
    table: '',
    tableName: '',
    tableDesc: '',
  });
  const formRef = ref();
  const rules = ref({
    // 输入框校验建议用 blur，避免“编辑→新增(置空)”时因值变化立刻触发 required 提示
    table: [{ required: true, message: '请输入表', trigger: 'blur' }],
    tableName: [{ required: true, message: '请输入表名', trigger: 'blur' }],
    tableDesc: [{ required: true, message: '请输入表描述', trigger: 'blur' }],
  });
  const rowData = ref<any>();
  const open = (row?: any) => {
    visible.value = true;
    rowData.value = row || {};
    form.value = cloneDeep(row || {});
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
          const url = rowData.value?.table ? biApi.biTableUpdate : biApi.biTableAdd;
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
