<template>
  <el-dialog
    title="批量修改运营人员"
    class="editModal"
    :model-value="visible"
    @close="emit('close')"
  >
    <div class="mb-5">{{ childInfo }}</div>
    <el-form ref="formRef" :model="form" label-position="top">
      <el-form-item label="运营人员">
        <DeptMember v-model="form.operator" deptId="65717209" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-space>
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveLoading">确认</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productOperationApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    visible: boolean;
    // operator?: string;
    // keyword?: string;
    platformType: any;
    codeList: any;
  }>();

  const formRef = ref();
  const form = ref({
    operator: '',
  });
  // if (props.row.operatorCode) form.value.operator = props.row.operatorCode || '';

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save', url: string): void;
  }>();

  const saveLoading = ref(false);
  const handleSave = async () => {
    // console.log(props.codeList);
    // return;
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await productOperationApi.luteosOpetationPlatformBatchSaveBatch({
        platformType: props.platformType,
        idList: props.codeList,
        operator: form.value.operator,
      });
      ElMessage.success('批量修改运营人员成功');
      emit('save', '');
    }
  };
</script>

<style scoped scss>
  :global(.keen-ui .editModal .el-dialog__body) {
    height: 420px;
  }
</style>
