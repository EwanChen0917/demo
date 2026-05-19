<template>
  <el-dialog
    width="900px"
    :title="title"
    v-model="visible"
    @close="visible = false"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" label-width="0" scroll-to-error>
      <el-table
        ref="tableRef"
        :data="form.budgetSummaryRuleSubMonthBean"
        highlight-current-row
        row-key="id"
        class="mt-4 current-table"
      >
        <el-table-column label="数据源">
          <template #default="{ row, $index }">
            <el-select v-model="row.fileType" placeholder="选择数据源">
              <el-option
                :label="tableValueSetData.budgetTemplateName"
                :value="tableValueSetData.fileType"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="列名">
          <template #default="{ row, $index }">
            <DataFieldSelect
              :code="tableValueSetData.budgetTemplateCode"
              v-model="row.monthColumn"
              @change="(val) => (row.monthColumnName = val)"
              placeholder="请选择列名"
            />
          </template>
        </el-table-column>
        <el-table-column label="月份格式">
          <template #default="{ row }">
            <el-select v-model="row.monthFormat" placeholder="选择月份格式">
              <el-option label="yyyy-MM" value="yyyy-MM" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template #default="{ $index }">
            <el-link type="danger" underline="never" @click.stop="deleteData($index)">清除</el-link>
          </template>
        </el-table-column>
      </el-table>
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
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import DataFieldSelect from '@/views/budget/budgetSummary/summaryRule/components/dataFieldSelect.vue';

  const emit = defineEmits<{
    (e: 'success', value: any): void;
  }>();

  const title = ref('');
  const visible = ref(false);
  const form = ref({
    budgetSummaryRuleSubMonthBean: [
      {
        monthFormat: '',
        monthColumn: '',
        monthColumnName: '',
        subYearmonth: 0,
        fileType: '',
      },
    ],
  });
  const formRef = ref(null);
  const tableValueSetData = ref();

  // 删除
  const deleteData = (index) => {
    form.value.budgetSummaryRuleSubMonthBean?.forEach((item) => {
      item.monthFormat = '';
      item.monthColumn = '';
      item.monthColumnName = '';
      item.fileType = '';
      item.subYearmonth = 0;
    });
  };

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    emit('success', form.value.budgetSummaryRuleSubMonthBean[0]);
    visible.value = false;
  };
  const open = (obj, list) => {
    console.log(obj, list);
    tableValueSetData.value = obj;
    if (list) {
      form.value.budgetSummaryRuleSubMonthBean = cloneDeep([list]);
      if (list.monthColumn) {
        form.value.budgetSummaryRuleSubMonthBean[0].fileType = obj.fileType;
      }
    }
    title.value = `${obj.budgetTemplateName} - 月份取值`;
    visible.value = true;
    if (formRef.value) {
      formRef.value?.clearValidate();
    }
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(svg) {
    fill: #2c2c2c;
    &:hover {
      fill: var(--el-color-primary);
    }
  }
</style>
<style>
  .current-table .current-row:hover > td.el-table__cell {
    background-color: var(--el-table-current-row-bg-color) !important;
  }
  .budget-body-class {
    padding-top: 0 !important;
  }
  .budget-body-class .el-tabs__header {
    padding-left: 0 !important;
  }
</style>
