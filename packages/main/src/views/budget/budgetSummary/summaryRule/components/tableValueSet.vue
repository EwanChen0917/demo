<template>
  <div class="pt-4">
    <el-button type="primary" size="small" @click="changeList('添行')">添行</el-button>
    <el-button type="primary" size="small" @click="changeList('插行')">插行</el-button>
    <el-button type="primary" size="small" @click="changeList('复制行')">复制行</el-button>
    <el-button type="primary" size="small" @click="changeList('上移')">上移</el-button>
    <el-button type="primary" size="small" @click="changeList('下移')">下移</el-button>
    <el-button type="primary" size="small" @click="copyValueMapping">
      复制取值映射
      <el-tooltip
        popper-class="action_tool_tip text-gray-600"
        placement="top-start"
        effect="light"
        :content="`单击行设置源行 (高亮行)，复选框选择要覆盖的行`"
      >
        <QuestionFilled class="question-icon" style="margin-top: -3px; margin-left: 5px" />
      </el-tooltip>
    </el-button>
    <el-button type="primary" size="small" @click="monthSetData">月份取值</el-button>
    <el-checkbox
      v-model="subYearmonth"
      @change="changeMonthSplitting"
      label="拆分月份"
      class="ms-4"
      :true-value="1"
      :false-value="0"
      style="vertical-align: sub"
    />
    <div class="tip-red mt-4">提示：1.请输入附表取值条件的简要说明，便于后续查找</div>
    <div class="tip-red" style="padding-left: 44px">
      2.复选框勾选仅影响“复制取值映射”，其余功能仍由高亮选中控制
    </div>
    <el-table
      ref="tableRef"
      :data="budgetSummaryRuleConditionBeanList"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      highlight-current-row
      row-key="sort"
      class="current-table"
    >
      <el-table-column
        type="selection"
        width="40"
        reserve-selection
        :selectable="(row) => row.sort !== selectedIndex + 1 || selectedIndex === null"
      />
      <el-table-column label="行号" width="70px">
        <template #default="{ row }">
          {{ row.sort }}
        </template>
      </el-table-column>
      <el-table-column label="说明" width="300">
        <template #default="{ row }">
          <el-input v-model.trim="row.remark" @change="remarkSuccess(row)" placeholder="说明" />
        </template>
      </el-table-column>
      <el-table-column label="通用条件">
        <template #default="{ row, $index }">
          <div class="d-flex justify-content-between align-items-center">
            <div class="text-break">
              <OverflowTooltip :content="getShowData(row?.incomeRuleConditionBeans)" />
            </div>
            <el-link underline="never" @click.stop="setCondition(row, $index)">
              <el-icon size="16">
                <Setting />
              </el-icon>
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="通用分摊">
        <template #default="{ row, $index }">
          <div class="d-flex justify-content-between align-items-center">
            <div class="text-break">
              <OverflowTooltip :content="getShowValue(row)" />
            </div>

            <el-link type="primary" underline="never" @click.stop="setValue(row, $index)">
              <SvgIcon icon="fx" class="svg-icon" />
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="取值映射" width="250">
        <template #default="{ row, $index }">
          <el-link type="primary" underline="never" @click.stop="setValueMapping(row, $index)">
            设置
          </el-link>
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
    <!-- 通用条件设置 -->
    <ConditionDialog ref="conditionDialogRef" @success="handleConditionSuccess" />
    <!-- 通用分摊 -->
    <ValueDialog ref="valueShareDialogRef" @success="handleValueSuccess" />
    <!-- 取值映射 -->
    <TableValueMappingDialog ref="tableValueMappingDialogRef" @success="tableValueMappingSuccess" />
    <!-- 月份取值 -->
    <MonthSet ref="monthSetRef" @success="handleMonthSetSuccess" />
  </div>
</template>

<script setup lang="ts">
  import { Setting } from '@element-plus/icons-vue';
  import { logicTypeMap, codeMainType } from '@/views/budget/budgetSummary/enum';
  import ConditionDialog from '@/views/budget/budgetSummary/summaryRule/components/conditionDialog.vue';
  import ValueDialog from '@/views/budget/budgetSummary/summaryRule/components/valueShareDialog.vue';
  import TableValueMappingDialog from '@/views/budget/budgetSummary/summaryRule/components/tableValueMappingDialog.vue';
  import MonthSet from '@/views/budget/budgetSummary/summaryRule/components/monthSet.vue';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';
  import * as swal from '@/utils/swal';

  const props = defineProps<{
    tableValueSetData: any; //附表行的数据
  }>();

  const emit = defineEmits<{
    (e: 'success', value: any): void;
    (e: 'changeSubYearmonth', type: any, value: any): void;
  }>();

  const tableRef = ref();
  const subYearmonth = ref(0);
  const monthSetOperate = ref(false);
  const budgetSummaryRuleConditionBeanList = ref([
    {
      fieldCode: `${props.tableValueSetData?.budgetTemplateCode}`,
      fieldName: `${props.tableValueSetData?.budgetTemplateCode}`,
      fileType: props.tableValueSetData?.fileType,
      valueFormula: '',
      value: '',
      remark: '',
      groupFields: [
        {
          type: props.tableValueSetData?.fileType,
          field: '',
          fieldName: '',
          addValue: false,
          compareType: '',
          compareValue: '',
        },
      ],
      weightField: {
        first: props.tableValueSetData?.fileType,
        second: '',
        secondName: '',
      },
      isDefault: false, //当未匹配对应值时，需按条件值新增一行 ture&false
      defaultAvgValue: false, //当权重字段汇总为0时，取平均值 ture&false
      isReverse: false, //分摊取反数值 ture&false
      incomeRuleConditionBeans: [], //通用条件组
      budgetSummaryRuleApportionPickValueBeans: [], //取值映射
      sort: 0,
    },
  ]);
  const budgetSummaryRuleSubMonthBean = ref({
    monthFormat: '',
    monthColumn: '',
    monthColumnName: '',
    subYearmonth: 0, //拆分成一年12个月 0-否 1-是
  });
  const conditionDialogRef = ref(null);
  const valueShareDialogRef = ref(null);
  const tableValueMappingDialogRef = ref(null);
  const monthSetRef = ref();
  const currentRow = ref();
  const selectedIndex = ref(null);
  // 监听tableValueSetData变化
  watch(
    () => props.tableValueSetData,
    () => {
      if (props.tableValueSetData?.budgetSummaryRuleConditionBeanList?.length) {
        budgetSummaryRuleConditionBeanList.value =
          props.tableValueSetData?.budgetSummaryRuleConditionBeanList;
        setTimeout(() => {
          setSort();
        }, 500);
      }
      budgetSummaryRuleSubMonthBean.value = props.tableValueSetData?.budgetSummaryRuleSubMonthBean;
      if (
        budgetSummaryRuleSubMonthBean.value?.monthColumn &&
        budgetSummaryRuleSubMonthBean.value?.monthFormat
      ) {
        monthSetOperate.value = true;
        subYearmonth.value = 0;
        return;
      } else {
        monthSetOperate.value = false;
        subYearmonth.value = props.tableValueSetData?.budgetSummaryRuleSubMonthBean?.subYearmonth;
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );

  const monthSetData = () => {
    if (subYearmonth.value) {
      ElMessage.error('该附表已按指标拆分月份，不可设置月份取值');
      return;
    }
    monthSetRef.value.open(props.tableValueSetData, budgetSummaryRuleSubMonthBean.value);
  };
  // 是否设置月份取值
  const handleMonthSetSuccess = (val) => {
    monthSetOperate.value = true;
    budgetSummaryRuleConditionBeanList.value.forEach((item) => {
      item.budgetSummaryRuleSubMonthBean = val;
    });
    emit('changeSubYearmonth', '附表', val);
    emit('success', budgetSummaryRuleConditionBeanList.value);
  };
  const changeMonthSplitting = () => {
    if (monthSetOperate.value) {
      ElMessage.error('该附表已设置月份取值，不可按指标拆分月份');
      subYearmonth.value = 0;
      return;
    }

    budgetSummaryRuleSubMonthBean.value = {
      monthFormat: '',
      monthColumn: '',
      monthColumnName: '',
      subYearmonth: subYearmonth.value, //拆分成一年12个月 0-否 1-是
    };
    budgetSummaryRuleConditionBeanList.value.forEach((item) => {
      item.budgetSummaryRuleSubMonthBean = budgetSummaryRuleSubMonthBean.value;
    });
    emit('success', budgetSummaryRuleConditionBeanList.value);
    emit('changeSubYearmonth', '附表', budgetSummaryRuleSubMonthBean.value);
  };
  // 勾选sort
  const sortList = ref([]);
  const handleSelectionChange = (list) => {
    sortList.value = list.map((item) => {
      if (item.sort !== selectedIndex.value + 1) {
        return item.sort;
      }
    });
  };
  const handleCurrentChange = (val) => {
    currentRow.value = val; // 更新当前选中的行数据
  };
  const handleRowClick = (row, column, event) => {
    currentRow.value = row; // 更新当前选中的行数据
    selectedIndex.value = budgetSummaryRuleConditionBeanList.value.indexOf(row);
    tableRef.value?.toggleRowSelection(row, false);
  };
  const initValue = ref({});
  const changeList = (type) => {
    if (selectedIndex.value == null && type !== '添行') {
      ElMessage.warning('请选择要执行的数据');
      return;
    }
    initValue.value = {
      fieldCode: `${props.tableValueSetData?.budgetTemplateCode}`,
      fieldName: `${props.tableValueSetData?.budgetTemplateCode}`,
      fileType: props.tableValueSetData?.fileType,
      valueFormula: '',
      value: '',
      remark: '',
      groupFields: [
        {
          type: props.tableValueSetData?.fileType,
          field: '',
          fieldName: '',
          addValue: false,
          compareType: '',
          compareValue: '',
        },
      ],
      weightField: {
        first: props.tableValueSetData?.fileType,
        second: '',
        secondName: '',
      },
      isDefault: false, //当未匹配对应值时，需按条件值新增一行 ture&false
      defaultAvgValue: false, //当权重字段汇总为0时，取平均值 ture&false
      isReverse: false, //分摊取反数值 ture&false
      incomeRuleConditionBeans: [],
      budgetSummaryRuleApportionPickValueBeans: [],
    };
    switch (type) {
      case '添行':
        budgetSummaryRuleConditionBeanList.value?.push(initValue.value);
        break;
      case '插行':
        // 在所选中行的上方，增加一行
        budgetSummaryRuleConditionBeanList.value.splice(selectedIndex.value, 0, initValue.value);
        selectedIndex.value = budgetSummaryRuleConditionBeanList.value.indexOf(currentRow.value);
        break;
      case '复制行':
        console.log('复制行', currentRow.value);
        const obj = cloneDeep(currentRow.value);
        for (const key in initValue.value) {
          initValue.value[key] = obj[key];
        }
        initValue.value = budgetSummaryRuleConditionBeanList.value.splice(
          selectedIndex.value + 1,
          0,
          { ...omit(currentRow.value, 'id') }
        );
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
    setSort();
  };
  const setSort = () => {
    // 行号重新设置
    if (budgetSummaryRuleConditionBeanList.value.length) {
      budgetSummaryRuleConditionBeanList.value.forEach((item, index) => {
        item.sort = index + 1;
      });
    }
  };
  // 通用条件设置
  const curIdx = ref();
  const setCondition = (row, index) => {
    curIdx.value = index;
    conditionDialogRef.value?.open(
      cloneDeep(row),
      cloneDeep({
        ...props.tableValueSetData,
        title: `${props.tableValueSetData.budgetTemplateName} - 通用条件设置`,
      })
    );
  };

  //  修改说明
  const remarkSuccess = (row) => {
    emit('success', budgetSummaryRuleConditionBeanList.value);
  };

  //  通用条件设置成功回调
  const handleConditionSuccess = (row) => {
    budgetSummaryRuleConditionBeanList.value[curIdx.value].incomeRuleConditionBeans = row;
    selectedIndex.value = null;
    currentRow.value = undefined;
    if (tableRef.value) {
      tableRef.value.setCurrentRow(null);
    }
    emit('success', budgetSummaryRuleConditionBeanList.value);
  };

  const getShowData = (data) => {
    const list = [];
    data?.forEach((item, index) => {
      const { leftParenthesis, fileType, columnName, operator, value, rightParenthesis, logic } =
        item;
      list.push(
        `${leftParenthesis || ''}${props.tableValueSetData?.budgetTemplateName || ''} ${
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
    budgetSummaryRuleConditionBeanList.value?.splice(index, 1);
    if (selectedIndex.value === index) {
      selectedIndex.value = null;
      currentRow.value = undefined;
    }
  };
  // 通用分摊设置
  const setValue = (row, index) => {
    curIdx.value = index;
    if (row.value) {
      let obj = JSON.parse(row.value);
      let objValue = {
        groupFields: obj.groupFields,
        weightField: {
          first: obj.weightField.split('###')[0],
          second: obj.weightField.split('###')[1],
          secondName: obj.weightField.split('###')[2],
        },
        isDefault: obj.isDefault,
        defaultAvgValue: obj.defaultAvgValue,
      };
      row = Object.assign(row, objValue);
    }
    valueShareDialogRef.value?.open(cloneDeep(row), cloneDeep(props.tableValueSetData));
  };
  // 取值映射设置
  const setValueMapping = (row, index) => {
    curIdx.value = index;
    tableValueMappingDialogRef.value?.open(cloneDeep(row), cloneDeep(props.tableValueSetData));
  };
  // 复制取值映射设置
  const copyValueMapping = async () => {
    if (selectedIndex.value == null) {
      ElMessage.warning('请先点击一行设为源行');
      return;
    }
    if (currentRow.value.budgetSummaryRuleApportionPickValueBeans.length === 0) {
      ElMessage.warning('请先设置取值映射');
      return;
    }
    if (sortList.value.length === 0) {
      ElMessage.warning('请勾选要覆盖的行');
      return;
    }
    let text = '';
    sortList.value.forEach((item, index) => {
      console.log(item);
      text = text + `第${item}行` + `${index === sortList.value.length - 1 ? '' : ','}`;
    });
    const isConfirmed = await swal.confirm(
      `确定将第 ${selectedIndex.value + 1} 行的取值映射覆盖到已选的${text}中吗？`
    );
    if (isConfirmed) {
      const obj = cloneDeep(currentRow.value);
      sortList.value.forEach((item) => {
        budgetSummaryRuleConditionBeanList.value[
          item - 1
        ].budgetSummaryRuleApportionPickValueBeans = obj.budgetSummaryRuleApportionPickValueBeans;
      });
      ElMessage.success(`成功将取值映射覆盖至${text}中`);
      tableRef.value.clearSelection();
    }
  };

  // 通用分摊设置成功回调
  const handleValueSuccess = (row) => {
    budgetSummaryRuleConditionBeanList.value[curIdx.value] = Object.assign(
      budgetSummaryRuleConditionBeanList.value[curIdx.value],
      row
    );
    selectedIndex.value = null;
    currentRow.value = undefined;
    tableRef.value.setCurrentRow(null);
    emit('success', budgetSummaryRuleConditionBeanList.value);
  };
  // 取值映射设置成功回调
  const tableValueMappingSuccess = (row) => {
    budgetSummaryRuleConditionBeanList.value[
      curIdx.value
    ].budgetSummaryRuleApportionPickValueBeans = row;
    selectedIndex.value = null;
    currentRow.value = undefined;
    tableRef.value.setCurrentRow(null);
    emit('success', budgetSummaryRuleConditionBeanList.value);
  };

  const getShowValue = (row) => {
    if (row?.value) {
      // value传一个json字符串，
      // {
      //   "groupFields":[{
      //     "type": "来源类型: 数据源 1-N",
      //     "field": "{字段编码}",
      //     "fieldName": "{字段名}",
      //     "addValue": "添加值 ture&false",
      //     "compareType": "比较符: 同条件的",
      //     "compareValue": "比较值"
      //   }],
      //   "weightField":"权重字段, {字段来源}###{字段编码}###{字段名字}",
      //   "isDefault":"当未匹配对应值时，需按条件值新增一行 ture&false",
      //   "defaultAvgValue": "当权重字段汇总为0时，取平均值 ture&false"
      // }
      try {
        const obj = JSON.parse(row.value);
        let text = '';
        obj.groupFields.forEach((item) => {
          text = text + `${codeMainType.汇总表名}.${item.fieldName}`;
        });
        return `qzbe(${text},${codeMainType.汇总表名}.${obj.weightField.split('###')[2]})`;
      } catch (error) {
        console.error(error);
      }
    }
  };
</script>

<style scoped lang="scss">
  .question-icon {
    width: 15px;
    height: 15px;
    color: #fff;
  }
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
  .tip-red {
    font-size: 12px;
    color: var(--el-color-danger);
    padding-left: 8px;
  }
</style>
