<template>
  <el-dialog title="批量提醒" :model-value="visible" @close="close()" width="65%">
    <el-form ref="formRef" :model="form" label-width="0" :rules="rules" scroll-to-error>
      <el-table :data="form.rowList" row-key="id">
        <el-table-column min-width="160" label="货件单号/海外仓头程计划单号" prop="code" />
        <el-table-column label="时效状态" prop="statusDesc" />
        <el-table-column label="原单状态" prop="codeStatusDesc" />
        <el-table-column label="超时天数" prop="overTime" />
        <el-table-column label="提醒人员" min-width="130">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`rowList.${$index}.noticeMemberCode`"
              :rules="rules.noticeMemberCode"
            >
              <DeptMember
                placeholder="请选择提醒人员"
                v-model="row.noticeMemberCode"
                multiple
                filterable
                teleported
                deptCode="plan_and_warhouse_operator_dept"
              />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
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
  const emits = defineEmits(['refresh']);

  const formRef = ref();
  const form = ref({
    rowList: [],
  });

  const rules = reactive({
    noticeMemberCode: [{ required: true, message: '请选择提醒人员', trigger: 'change' }],
  });

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    saveLoading.value = true;
    try {
      await erpApi.luteosErpFirstVesselTimelinessSendNotice({
        noticeList: form.value.rowList.map((item) => ({
          code: item.code,
          noticeMemberCode: item.noticeMemberCode,
        })),
      });
      ElMessage.success('已发起提醒');
      emits('refresh');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (data) => {
    form.value.rowList = data?.map((item) => {
      return {
        ...item,
        noticeMemberCode: [],
      };
    });
    visible.value = true;
    formRef.value?.resetFields();
  };

  const close = () => {
    form.value.rowList = [];
    emits('refresh');
    visible.value = false;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
