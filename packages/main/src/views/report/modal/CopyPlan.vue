<template>
  <el-dialog
    v-model="visible"
    :title="`复制${reportType === 2 ? '报告' : '计划'}`"
    width="600px"
    top="30vh"
  >
    <el-form ref="formRef" :model="formData" label-position="top">
      <el-form-item
        :label="`${reportType === 2 ? '报告' : '计划'}关联周期`"
        prop="dateRange"
        :rules="[
          {
            required: true,
            message: `请选择${reportType === 2 ? '报告' : '计划'}关联周期`,
            trigger: 'change',
          },
        ]"
      >
        <el-date-picker
          type="daterange"
          rangeSeparator="至"
          startPlaceholder="开始日期"
          endPlaceholder="结束日期"
          clearable
          valueFormat="YYYY-MM-DD"
          v-model="formData.dateRange"
          @change="
            (val) => {
              startDate = val?.[0];
              endDate = val?.[1];
            }
          "
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { WeekReportBean } from '@/api/marketing/data-contracts';
  import { type FormInstance } from 'element-plus';
  import type { ReportType } from '../type';

  const props = defineProps<{
    reportType: ReportType; // 报告类型(1 - 经营分析周报，2 - VOC周报，VOC报告必填, 3 - 亚马逊运营周报)
  }>();
  const emit = defineEmits<{ confirm: [data: typeof formData] }>();

  const visible = ref(false);
  const open = (data?: WeekReportBean) => {
    if (data) {
      formData.reportCode = data.reportCode;
      formData.dateRange = [data.startDate, data.endDate];
    } else {
      formData.reportCode = '';
      formData.dateRange = [];
    }
    visible.value = true;
  };
  const formRef = ref<FormInstance>();
  const startDate = ref('');
  const endDate = ref('');
  const confirm = async () => {
    const validateResult = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (validateResult) {
      emit('confirm', formData);
      visible.value = false;
    }
  };

  const formData = reactive<{
    reportCode?: string;
    dateRange: string[];
  }>({
    reportCode: undefined,
    dateRange: [],
  });
  defineExpose({ open });
</script>

<style lang="scss" scoped></style>
