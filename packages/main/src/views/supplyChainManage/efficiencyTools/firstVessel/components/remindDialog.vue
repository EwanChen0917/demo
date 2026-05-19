<template>
  <el-dialog title="发货提醒" :model-value="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="选择提醒人员" prop="noticeMemberCode">
        <DeptMember
          placeholder="请选择提醒人员"
          v-model="form.noticeMemberCode"
          multiple
          filterable
          deptCode="plan_and_warhouse_operator_dept"
        />
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

  const visible = ref(false);

  const formRef = ref();
  const form = ref({
    noticeMemberCode: [],
  });

  const rules = reactive({
    noticeMemberCode: [{ required: true, message: '请选择提醒人员', trigger: 'change' }],
  });

  const code = ref('');
  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    saveLoading.value = true;
    try {
      await erpApi.luteosErpFirstVesselTimelinessSendNotice({
        noticeList: [
          {
            code: code.value,
            noticeMemberCode: form.value.noticeMemberCode,
          },
        ],
      });
      ElMessage.success('已发起提醒');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (data) => {
    code.value = data;
    visible.value = true;
    formRef.value?.resetFields();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
