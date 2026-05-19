<template>
  <el-dialog title="选择合作事项状态" v-model="visibility" width="800px">
    <el-radio-group v-model="status">
      <el-radio :label="5">顺利完结</el-radio>
      <el-radio :label="41">取消-跑单</el-radio>
      <el-radio :label="42">取消-需求变动</el-radio>
      <el-radio :label="43">取消-缺货</el-radio>
      <el-radio :label="44">取消-其他原因</el-radio>
    </el-radio-group>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { metaApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emits = defineEmits<{
    (success: string);
  }>();

  const projectCode = ref('');
  const visibility = ref(false);
  const status = ref(5);

  const save = async () => {
    await metaApi.luteosMetaOperateMetaProject({
      projectCode: projectCode.value,
      status: status.value,
      operateType: 8,
    });
    ElMessage.success('修改成功');
    emits('success');
    close();
  };

  const close = () => {
    visibility.value = false;
  };

  const open = (data) => {
    projectCode.value = data.projectCode;
    visibility.value = true;
  };

  defineExpose({ open });
</script>

<style scoped lang="scss"></style>
