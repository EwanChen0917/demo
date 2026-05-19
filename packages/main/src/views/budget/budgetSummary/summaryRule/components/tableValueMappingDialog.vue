<template>
  <!-- 取值映射 -->
  <el-dialog
    width="900px"
    :title="title"
    v-model="visible"
    @close="visible = false"
    :close-on-click-modal="false"
  >
    <el-button type="primary" size="small" @click="changeList('添行')">添行</el-button>
    <el-button type="primary" size="small" @click="changeList('插行')">插行</el-button>
    <el-button type="primary" size="small" @click="changeList('复制行')">复制行</el-button>
    <el-button type="primary" size="small" @click="changeList('上移')">上移</el-button>
    <el-button type="primary" size="small" @click="changeList('下移')">下移</el-button>
    <el-table
      ref="tableRef"
      :data="budgetSummaryRuleApportionPickValueBeans"
      @current-change="handleCurrentChange"
      @row-click="handleRowClick"
      highlight-current-row
      row-key="id"
      class="mt-4 current-table"
      v-if="visible"
    >
      <el-table-column label="来源条件">
        <template #default="{ row, $index }">
          <div class="d-flex justify-content-between align-items-center">
            <div class="text-break">
              <OverflowTooltip :content="getShowData(row?.incomeRuleConditionBeans)" />
            </div>
            <el-link underline="never" @click="setCondition(row, $index)">
              <el-icon size="16">
                <Setting />
              </el-icon>
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="来源值">
        <template #default="{ row, $index }">
          <!-- 附表对应预算表的字段 -->
          <DataFieldSelect
            :code="tableValueSetData.budgetTemplateCode"
            :key="tableValueSetData.budgetTemplateCode"
            v-model="row.sourceColumnCode"
            @change="(val) => (row.sourceColumnName = val)"
            placeholder="请选择"
          />
        </template>
      </el-table-column>
      <el-table-column label="目标值">
        <template #default="{ row, $index }">
          <!-- 取主表字段取值配置-指标字段 -->
          <DataFieldSelect
            :code="codeMainType.汇总表"
            :key="$index"
            v-model="row.columnCode"
            @change="(val) => changeTargetColums(val, row)"
            placeholder="请选择"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="{ $index }">
          <el-link
            type="danger"
            underline="never"
            :disabled="budgetSummaryRuleApportionPickValueBeans?.length === 1"
            @click.stop="deleteData($index)"
          >
            删除
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 来源条件设置 -->
  <ConditionDialog ref="conditionDialogRef" @success="handleConditionSuccess" />
</template>

<script setup lang="ts">
  import { Setting } from '@element-plus/icons-vue';
  import { logicTypeMap, codeMainType } from '@/views/budget/budgetSummary/enum';
  import ConditionDialog from '@/views/budget/budgetSummary/summaryRule/components/conditionDialog.vue';
  import DataFieldSelect from '@/views/budget/budgetSummary/summaryRule/components/dataFieldSelect.vue';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';

  const emit = defineEmits<{
    (e: 'success', value: any): void;
  }>();

  const visible = ref(false);
  const title = ref('');
  const budgetSummaryRuleApportionPickValueBeans = ref([]);
  const conditionDialogRef = ref(null);
  const tableRef = ref();
  const currentRow = ref();
  const selectedIndex = ref(null);
  const handleCurrentChange = (val) => {
    currentRow.value = val; // 更新当前选中的行数据
  };
  const handleRowClick = (row, column, event) => {
    currentRow.value = row; // 更新当前选中的行数据
    selectedIndex.value = budgetSummaryRuleApportionPickValueBeans.value.indexOf(row);
  };
  const changeList = (type) => {
    if (selectedIndex.value == null && type !== '添行') {
      ElMessage.warning('请选择要执行的数据');
      return;
    }
    switch (type) {
      case '添行':
        budgetSummaryRuleApportionPickValueBeans.value?.push({
          fieldCode: curFieldCode.value,
          fieldName: curFieldName.value,
        });
        break;
      case '插行':
        // 在所选中行的上方，增加一行
        budgetSummaryRuleApportionPickValueBeans.value.splice(selectedIndex.value, 0, {
          fieldCode: curFieldCode.value,
          fieldName: curFieldName.value,
        });
        selectedIndex.value = budgetSummaryRuleApportionPickValueBeans.value.indexOf(
          currentRow.value
        );
        break;
      case '复制行':
        budgetSummaryRuleApportionPickValueBeans.value.splice(selectedIndex.value + 1, 0, {
          ...omit(currentRow.value, 'id'),
        });
        break;
      case '上移':
        if (selectedIndex.value > 0) {
          const temp = budgetSummaryRuleApportionPickValueBeans.value[selectedIndex.value];
          budgetSummaryRuleApportionPickValueBeans.value[selectedIndex.value] =
            budgetSummaryRuleApportionPickValueBeans.value[selectedIndex.value - 1];
          budgetSummaryRuleApportionPickValueBeans.value[selectedIndex.value - 1] = temp;
          selectedIndex.value -= 1;
        } else {
          ElMessage.warning('已经是第一行了');
        }
        break;
      case '下移':
        if (selectedIndex.value < budgetSummaryRuleApportionPickValueBeans.value.length - 1) {
          const temp = budgetSummaryRuleApportionPickValueBeans.value[selectedIndex.value];
          budgetSummaryRuleApportionPickValueBeans.value[selectedIndex.value] =
            budgetSummaryRuleApportionPickValueBeans.value[selectedIndex.value + 1];
          budgetSummaryRuleApportionPickValueBeans.value[selectedIndex.value + 1] = temp;
          selectedIndex.value += 1;
        } else {
          ElMessage.warning('已经是最后一行了');
        }
        break;

      default:
        break;
    }
  };

  // 来源条件设置
  const curIdx = ref();
  const setCondition = (row, index) => {
    curIdx.value = index;
    tableValueSetData.value.title = `${tableValueSetData.value.budgetTemplateName} - 来源条件设置`;
    conditionDialogRef.value?.open(cloneDeep(row), cloneDeep(tableValueSetData.value));
  };

  // 来源条件设置成功回调
  const handleConditionSuccess = (row) => {
    budgetSummaryRuleApportionPickValueBeans.value[curIdx.value].incomeRuleConditionBeans = row;
    selectedIndex.value = null;
    currentRow.value = undefined;
    if (tableRef.value) {
      tableRef.value.setCurrentRow(null);
    }
  };

  const getShowData = (data) => {
    const list = [];
    data?.forEach((item, index) => {
      const { leftParenthesis, fileType, columnName, operator, value, rightParenthesis, logic } =
        item;
      list.push(
        `${leftParenthesis || ''}${tableValueSetData.value.budgetTemplateName || ''} ${
          columnName ? `"${columnName}"` : ''
        } ${operator || ''} ${value || ''}${rightParenthesis || ''} ${
          index !== data?.length - 1 ? logicTypeMap[logic] : ''
        }`
      );
    });
    return list.join(' ');
  };

  // 删除
  const deleteData = (index) => {
    budgetSummaryRuleApportionPickValueBeans.value?.splice(index, 1);
    if (selectedIndex.value === index) {
      selectedIndex.value = null;
      currentRow.value = undefined;
    }
  };
  // 修改目标值 后端存数组 targetColums
  const changeTargetColums = (val, row) => {
    row.columnName = val;
    row.targetColums = [
      {
        columnCode: row.columnCode,
        columnName: val,
      },
    ];
  };

  const saveLoading = ref(false);
  const save = async () => {
    emit(
      'success',
      budgetSummaryRuleApportionPickValueBeans.value.filter((item) => {
        return item?.columnCode || item?.sourceColumnCode || item?.incomeRuleConditionBeans?.length;
      })
    );
    visible.value = false;
  };

  const curFieldCode = ref();
  const curFieldName = ref();
  const tableValueSetData = ref();

  const open = (row, obj) => {
    console.log(row, obj);
    tableValueSetData.value = obj;
    title.value = `${obj.budgetTemplateName} - 取值映射`;
    curFieldCode.value = row?.fieldCode;
    curFieldName.value = row?.fieldName;
    budgetSummaryRuleApportionPickValueBeans.value = row?.budgetSummaryRuleApportionPickValueBeans
      ?.length
      ? row?.budgetSummaryRuleApportionPickValueBeans
      : [
          {
            fieldCode: row?.fieldCode,
            fieldName: row?.fieldName,
          },
        ];
    budgetSummaryRuleApportionPickValueBeans.value =
      budgetSummaryRuleApportionPickValueBeans.value.filter((item) => item !== null);
    budgetSummaryRuleApportionPickValueBeans.value.forEach((item) => {
      if (item?.targetColums && item?.targetColums?.length) {
        Reflect.set(item, 'columnCode', item?.targetColums[0]?.columnCode);
        Reflect.set(item, 'columnName', item?.targetColums[0]?.columnName);
      }
    });
    visible.value = true;
    selectedIndex.value = null;
    currentRow.value = undefined;
    if (tableRef.value) {
      tableRef.value.setCurrentRow();
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
</style>
