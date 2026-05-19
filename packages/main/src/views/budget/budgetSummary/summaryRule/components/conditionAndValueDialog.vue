<template>
  <!-- 主数据设置条件和值-->
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
    <el-checkbox
      v-model="subYearmonth"
      label="拆分月份"
      class="ms-4"
      :true-value="1"
      :false-value="0"
      style="vertical-align: middle"
    />
    <el-table
      ref="tableRef"
      :data="budgetSummaryRuleConditionBeanList"
      @current-change="handleCurrentChange"
      @row-click="handleRowClick"
      highlight-current-row
      row-key="id"
      class="mt-4 current-table"
    >
      <el-table-column label="条件">
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
      <el-table-column label="值">
        <template #default="{ row, $index }">
          <div class="d-flex justify-content-between align-items-center">
            <div class="text-break">
              <OverflowTooltip :content="getShowValue(row)" />
            </div>
            <el-link type="primary" underline="never" @click="setValue(row, $index)">
              <SvgIcon icon="fx" class="svg-icon" />
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="{ $index }">
          <el-link
            type="danger"
            underline="never"
            :disabled="budgetSummaryRuleConditionBeanList?.length === 1"
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
  <ConditionDialog ref="conditionDialogRef" @success="handleConditionSuccess" />
  <ValueDialog ref="valueDialogRef" @success="handleValueSuccess" />
</template>

<script setup lang="ts">
  import { Setting } from '@element-plus/icons-vue';
  import {
    logicTypeMap,
    setValueType,
    codeMainType,
    sharedBoundaryType,
  } from '@/views/budget/budgetSummary/enum';
  import ConditionDialog from '@/views/budget/budgetSummary/summaryRule/components/conditionDialog.vue';
  import ValueDialog from '@/views/budget/budgetSummary/summaryRule/components/valueDialog.vue';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';

  const emit = defineEmits<{
    (e: 'success', value: any): void;
    (e: 'changeSubYearmonth', type: any, value: any): void;
  }>();

  const visible = ref(false);
  const title = ref('');
  const tableValueName = ref(''); //公式匹配的name
  const tableValuecode = ref(''); //模版cod
  const budgetSummaryRuleConditionBeanList = ref([]);
  const conditionDialogRef = ref(null);
  const valueDialogRef = ref(null);
  const subYearmonth = ref(0);

  const tableRef = ref();
  const currentRow = ref();
  const selectedIndex = ref(null);
  const handleCurrentChange = (val) => {
    currentRow.value = val; // 更新当前选中的行数据
  };
  const handleRowClick = (row, column, event) => {
    currentRow.value = row; // 更新当前选中的行数据
    selectedIndex.value = budgetSummaryRuleConditionBeanList.value.indexOf(row);
  };
  const changeList = (type) => {
    if (selectedIndex.value == null && type !== '添行') {
      ElMessage.warning('请选择要执行的数据');
      return;
    }
    switch (type) {
      case '添行':
        budgetSummaryRuleConditionBeanList.value?.push({
          fieldCode: curFieldCode.value,
          fieldName: curFieldName.value,
          columnCode: '',
          columnName: '',
          dataSource: 1,
          fileType: '1',
        });
        break;
      case '插行':
        // 在所选中行的上方，增加一行
        budgetSummaryRuleConditionBeanList.value.splice(selectedIndex.value, 0, {
          fieldCode: curFieldCode.value,
          fieldName: curFieldName.value,
          columnCode: '',
          columnName: '',
          dataSource: 1,
          fileType: '1',
        });
        selectedIndex.value = budgetSummaryRuleConditionBeanList.value.indexOf(currentRow.value);
        break;
      case '复制行':
        budgetSummaryRuleConditionBeanList.value.splice(selectedIndex.value + 1, 0, {
          ...omit(currentRow.value, 'id'),
        });
        break;
      case '上移':
        if (selectedIndex.value > 0) {
          const temp = budgetSummaryRuleConditionBeanList.value[selectedIndex.value];
          budgetSummaryRuleConditionBeanList.value[selectedIndex.value] =
            budgetSummaryRuleConditionBeanList.value[selectedIndex.value - 1];
          budgetSummaryRuleConditionBeanList.value[selectedIndex.value - 1] = temp;
          selectedIndex.value -= 1;
        } else {
          ElMessage.warning('已经是第一行了');
        }
        break;
      case '下移':
        if (selectedIndex.value < budgetSummaryRuleConditionBeanList.value.length - 1) {
          const temp = budgetSummaryRuleConditionBeanList.value[selectedIndex.value];
          budgetSummaryRuleConditionBeanList.value[selectedIndex.value] =
            budgetSummaryRuleConditionBeanList.value[selectedIndex.value + 1];
          budgetSummaryRuleConditionBeanList.value[selectedIndex.value + 1] = temp;
          selectedIndex.value += 1;
        } else {
          ElMessage.warning('已经是最后一行了');
        }
        break;

      default:
        break;
    }
  };

  // 主数据条件设置
  const curIdx = ref();
  const setCondition = (row, index) => {
    curIdx.value = index;
    tableValueSetData.value.title = `${tableValueSetData.value.fieldName} - 条件设置`;
    conditionDialogRef.value?.open(
      cloneDeep(row),
      cloneDeep(tableValueSetData.value),
      cloneDeep(tableValueList.value)
    );
  };

  // 条件设置成功回调
  const handleConditionSuccess = (row) => {
    budgetSummaryRuleConditionBeanList.value[curIdx.value].incomeRuleConditionBeans = row;
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
        `${leftParenthesis || ''}${tableValueName.value || ''} ${
          columnName ? `"${columnName}"` : ''
        } ${operator || ''} ${value || ''}${rightParenthesis || ''} ${
          index !== data?.length - 1 ? logicTypeMap[logic] : ''
        }`
      );
    });
    return list.join(' ');
  };

  const dictList = ref([]);
  // 删除
  const deleteData = (index) => {
    budgetSummaryRuleConditionBeanList.value?.splice(index, 1);
    if (selectedIndex.value === index) {
      selectedIndex.value = null;
      currentRow.value = undefined;
    }
  };
  // 主数据值设置
  const setValue = (row, index) => {
    curIdx.value = index;
    valueDialogRef.value?.open(
      cloneDeep(row),
      cloneDeep(tableValueSetData.value),
      cloneDeep(tableValueList.value)
    );
  };

  // 主数据值设置成功回调
  const handleValueSuccess = (row) => {
    budgetSummaryRuleConditionBeanList.value[curIdx.value] = {
      ...row,
      fieldCode: curFieldCode.value,
      fieldName: curFieldName.value,
      incomeRuleConditionBeans:
        budgetSummaryRuleConditionBeanList.value[curIdx.value]?.incomeRuleConditionBeans,
    };
    selectedIndex.value = null;
    currentRow.value = undefined;
    tableRef.value.setCurrentRow(null);
  };

  const getShowValue = (row) => {
    if (row.valueType === 10) {
      return `${tableValueName.value}"${row?.columnName}"`;
    }
    if (row.valueType === 11) {
      return `${tableValueName.value}"${row?.columnName}" (${row?.value?.split('###')[0]}-${
        row?.value?.split('###')[1]
      })`;
    }
    if (row.valueType === 12) {
      return `${tableValueName.value}"${row?.columnName}" (${row?.value?.split('###')[0]}, ${
        row?.value?.split('###')[1]
      })`;
    }
    if (row.valueType === 13) {
      // value传一个json字符串，{"groupFields":[1###字段名,1###字段名],"weightField":"1###字段名"}
      // 结算文件.商品总金额.qzbe(结算数据“订单号”,...，信息数据一“订单金额”)
      const obj = JSON.parse(row?.value);
      let text = '';
      obj.groupFields.forEach((item) => {
        text = text + `${tableValueName.value}.${item.split('###')[1]}`;
      });
      return `${tableValueName.value}.${row?.columnName}.qzbe(${text},${tableValueName.value}.${
        obj.weightField.split('###')[1]
      })`;
    }
    if (row.valueType === setValueType.固定值) {
      return row?.value;
    }
    if (row.valueType === setValueType.币别) {
      return row?.value;
    }
    if (row.valueType === setValueType.计算) {
      return row?.value;
    }
    if (row.valueType === setValueType.文本) {
      return row?.value;
    }
  };

  const saveLoading = ref(false);
  const save = async () => {
    try {
      budgetSummaryRuleConditionBeanList.value?.forEach((item, index) => {
        if (item?.incomeRuleConditionBeans?.length && item?.valueType !== 10 && !item?.value) {
          throw new Error(`第${index + 1}行值不能为空`);
        }
      });
      emit(
        'success',
        budgetSummaryRuleConditionBeanList.value?.filter((item) => getShowValue(item))
      );
      emit('changeSubYearmonth', '主数据', subYearmonth.value);
      visible.value = false;
    } catch (e) {
      ElMessage.warning(e.message);
    }
  };

  const curFieldCode = ref();
  const curFieldName = ref();
  const tableValueSetData = ref({});
  const tableValueList = ref([]); //数据源下拉
  const open = (row, obj) => {
    console.log(row, obj);
    subYearmonth.value = row?.budgetSummaryRuleSubMonthBean?.subYearmonth || 0;
    tableValueSetData.value = obj;
    tableValueSetData.value.fieldName = row.fieldName;
    tableValueSetData.value.fileType = row.fileType;
    if (row.sharedBoundary == sharedBoundaryType.分摊后) {
      //分摊后
      tableValueSetData.value.sharedBoundary = sharedBoundaryType.分摊后;
      tableValueList.value = [{ fileType: '0', name: '汇总表字段取值配置' }];
      tableValuecode.value = codeMainType.汇总表;
      tableValueName.value = codeMainType.汇总表名;
    } else {
      tableValueSetData.value.sharedBoundary = sharedBoundaryType.分摊前;
      tableValueList.value = [{ fileType: '1', name: obj.budgetTemplateName }];
      tableValuecode.value = obj.budgetTemplateCode;
      tableValueName.value = obj.budgetTemplateName;
    }

    title.value = `${row?.fieldName} - 条件及值设置`;
    curFieldCode.value = row?.fieldCode;
    curFieldName.value = row?.fieldName;
    budgetSummaryRuleConditionBeanList.value = row?.budgetSummaryRuleConditionBeanList?.length
      ? row?.budgetSummaryRuleConditionBeanList
      : [
          {
            fieldCode: row?.fieldCode,
            fieldName: row?.fieldName,
          },
        ];
    budgetSummaryRuleConditionBeanList.value = budgetSummaryRuleConditionBeanList.value.filter(
      (item) => item !== null
    );
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
