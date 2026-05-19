<template>
  <!--主数据-取数规则设置-条件及值设置- 条件设置  附表通用条件设置  附表-取值映射-来源条件-->
  <el-dialog
    width="1200"
    :title="title"
    v-model="visible"
    @close="visible = false"
    align-center
    :close-on-click-modal="false"
  >
    <el-space>
      <el-button type="primary" size="small" @click="changeList('添行')">添行</el-button>
      <el-button type="primary" size="small" @click="changeList('插行')">插行</el-button>
      <el-button type="primary" size="small" @click="changeList('复制行')">复制行</el-button>
      <el-button type="primary" size="small" @click="changeList('上移')">上移</el-button>
      <el-button type="primary" size="small" @click="changeList('下移')">下移</el-button>
      <div class="tip">提示：比较符为IN或NOTIN时，值如存在多个，按逗号隔开</div>
    </el-space>
    <el-form ref="formRef" :model="form" label-width="0" :rules="rules">
      <el-table
        ref="tableRef"
        :data="form?.incomeRuleConditionBeans"
        @current-change="handleCurrentChange"
        @row-click="handleRowClick"
        highlight-current-row
        row-key="sort"
        max-height="40vh"
        class="mt-4 current-table"
      >
        <el-table-column width="85">
          <template #default="{ row }">
            <el-form-item>
              <el-select style="width: 70px" v-model="row.leftParenthesis" placeholder="" clearable>
                <el-option label="(" value="(" />
                <el-option label="((" value="((" />
                <el-option label="(((" value="(((" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="数据" min-width="230">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`incomeRuleConditionBeans[${$index}].fileType`"
              :rules="rules.fileType"
            >
              <el-select
                v-model="row.fileType"
                placeholder="选择数据"
                v-if="tableValueSetData.sharedBoundary === sharedBoundaryType.分摊后"
              >
                <!-- 分摊后 主数据的指标配置 -->
                <el-option :label="codeMainType.汇总表名" :value="fileType.主数据分摊后" />
              </el-select>
              <el-select v-model="row.fileType" placeholder="选择数据" v-else>
                <!--主数据-分摊前/取值映射-附表来源条件 当前数据源 -->
                <el-option
                  :label="tableValueSetData.budgetTemplateName"
                  :value="tableValueSetData.fileType"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="列名" min-width="250">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`incomeRuleConditionBeans[${$index}].columnCode`"
              :rules="rules.columnCode"
            >
              <DataFieldSelect
                placeholder="请选择"
                v-model="row.columnCode"
                @change="
                  (val) => {
                    row.columnName = val;
                  }
                "
                :key="$index"
                :code="
                  tableValueSetData.sharedBoundary === sharedBoundaryType.分摊后
                    ? codeMainType.汇总表
                    : tableValueSetData.budgetTemplateCode
                "
                v-if="visible"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="比较符" width="135">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`incomeRuleConditionBeans[${$index}].operator`"
              :rules="rules.operator"
            >
              <el-select
                style="width: 120px"
                v-model="row.operator"
                placeholder="请选择"
                clearable
                @change="(val) => handleOperatorChange(val, row)"
              >
                <el-option label="包含" value="包含" />
                <el-option label="不包含" value="不包含" />
                <el-option label="等于" value="等于" />
                <el-option label="不等于" value="不等于" />
                <el-option label="为空" value="为空" />
                <el-option label="不为空" value="不为空" />
                <el-option label="大于" value="大于" />
                <el-option label="小于" value="小于" />
                <el-option label="大于等于" value="大于等于" />
                <el-option label="小于等于" value="小于等于" />
                <el-option label="IN" value="IN" />
                <el-option label="NOT IN" value="NOT IN" />
                <el-option label="以...开始" value="以...开始" />
                <el-option label="以...结束" value="以...结束" />
                <el-option label="属于当月" value="属于当月" />
                <el-option label="不属于当月" value="不属于当月" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="值" width="150">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="
                ['为空', '不为空', '属于当月', '不属于当月'].includes(row?.operator)
                  ? ''
                  : `incomeRuleConditionBeans[${$index}].value`
              "
              :rules="rules.value"
            >
              <el-input
                v-model="row.value"
                :placeholder="
                  ['IN', 'NOT IN'].includes(row?.operator) ? '值1,值2,值3...' : '请输入'
                "
                :disabled="['为空', '不为空', '属于当月', '不属于当月'].includes(row?.operator)"
                clearable
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column width="85px">
          <template #default="{ row }">
            <el-form-item>
              <el-select
                style="width: 70px"
                v-model="row.rightParenthesis"
                placeholder=""
                clearable
              >
                <el-option label=")" value=")" />
                <el-option label="))" value="))" />
                <el-option label=")))" value=")))" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="逻辑符" width="95px">
          <template #default="{ row }">
            <el-form-item>
              <el-select style="width: 80px" v-model="row.logic" placeholder="">
                <el-option
                  v-for="(val, key) in logicTypeMap"
                  :value="key"
                  :label="val"
                  :key="key"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row, $index }">
            <el-form-item>
              <el-link type="danger" :underline="false" @click.stop="deleteData($index)">
                删除
              </el-link>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div class="condition-result">
      条件信息：
      <div class="result-content">
        {{ result }}
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import {
    logicType,
    logicTypeMap,
    codeMainType,
    sharedBoundaryType,
    fileType,
  } from '@/views/budget/budgetSummary/enum';
  import DataFieldSelect from '@/views/budget/budgetSummary/summaryRule/components/dataFieldSelect.vue';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';
  import { omit } from 'lodash-es';

  const emit = defineEmits<{
    (e: 'success', value: any): void;
  }>();

  const visible = ref(false);
  const title = ref('');

  const tableRef = ref(null);
  const formRef = ref(null);
  const logicValue = ref(logicType.并且);
  const form = ref({
    incomeRuleConditionBeans: [
      {
        fileType: '',
        columnName: '',
        operator: '',
        value: '',
        logic: logicType.或者,
        sort: 1,
      },
    ],
  });
  const rules = reactive({
    fileType: [{ required: true, message: '请选择数据', trigger: 'change' }],
    columnName: [{ required: true, message: '请输入列名', trigger: 'blur' }],
    columnCode: [{ required: true, message: '请选择列名', trigger: 'blur' }],
    operator: [{ required: true, message: '请选择操作符', trigger: 'blur' }],
    value: [{ required: true, message: '请输入值', trigger: 'blur' }],
  });

  const currentRow = ref();
  const selectedIndex = ref(null);
  const handleCurrentChange = (val) => {
    currentRow.value = val; // 更新当前选中的行数据
  };
  const handleRowClick = (row, column, event) => {
    currentRow.value = row; // 更新当前选中的行数据
    selectedIndex.value = form.value?.incomeRuleConditionBeans.indexOf(currentRow.value);
  };
  // 删除
  const deleteData = (index) => {
    form.value?.incomeRuleConditionBeans?.splice(index, 1);
    if (selectedIndex.value === index) {
      selectedIndex.value = null;
      currentRow.value = undefined;
    }
  };
  const changeList = (type) => {
    if (selectedIndex.value == null && type !== '添行') {
      ElMessage.warning('请选择要执行的数据');
      return;
    }
    let incomeRuleConditionBeans = form.value?.incomeRuleConditionBeans;
    let fileTypeValue =
      tableValueSetData.value.sharedBoundary == sharedBoundaryType.分摊后
        ? fileType.主数据分摊后
        : tableValueSetData.value.fileType;
    switch (type) {
      case '添行':
        form.value?.incomeRuleConditionBeans?.push({
          logic: logicValue.value,
          sort: form.value?.incomeRuleConditionBeans?.length + 1,
          fileType: fileTypeValue,
        });
        break;
      case '插行':
        // 在所选中行的上方，增加一行
        form.value?.incomeRuleConditionBeans.splice(selectedIndex.value, 0, {
          logic: logicValue.value,
          sort: form.value?.incomeRuleConditionBeans?.length + 1,
          fileType: fileTypeValue,
        });
        setSortData();
        selectedIndex.value = form.value?.incomeRuleConditionBeans.indexOf(currentRow.value);
        break;
      case '复制行':
        form.value?.incomeRuleConditionBeans.splice(selectedIndex.value + 1, 0, {
          ...omit(currentRow.value, 'id'),
        });
        setSortData();
        break;
      case '上移':
        if (selectedIndex.value > 0) {
          const temp = incomeRuleConditionBeans[selectedIndex.value];
          incomeRuleConditionBeans[selectedIndex.value] =
            incomeRuleConditionBeans[selectedIndex.value - 1];
          incomeRuleConditionBeans[selectedIndex.value - 1] = temp;
          selectedIndex.value -= 1;
          setSortData();
        } else {
          ElMessage.warning('已经是第一行了');
        }
        break;
      case '下移':
        if (selectedIndex.value < form.value?.incomeRuleConditionBeans.length - 1) {
          const temp = incomeRuleConditionBeans[selectedIndex.value];
          incomeRuleConditionBeans[selectedIndex.value] =
            incomeRuleConditionBeans[selectedIndex.value + 1];
          incomeRuleConditionBeans[selectedIndex.value + 1] = temp;
          selectedIndex.value += 1;
          setSortData();
        } else {
          ElMessage.warning('已经是最后一行了');
        }
        break;

      default:
        break;
    }
    nextTick(() => {
      // 获取表格滚动容器
      const scrollWrapper = tableRef.value?.$el?.querySelector('.el-scrollbar__wrap');
      if (scrollWrapper) {
        // 滚动到底部
        scrollWrapper.scrollTo({
          top: scrollWrapper.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
  };

  const setSortData = () => {
    form.value?.incomeRuleConditionBeans.forEach((res, index) => {
      res.sort = index + 1;
    });
  };

  // 校验括号是否匹配
  const checkBrackets = (str) => {
    const stack = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') {
        stack.push('(');
      } else if (str[i] === ')') {
        if (stack.length === 0) return false;
        stack.pop();
      }
    }
    return stack.length === 0;
  };

  const handleOperatorChange = (val, row) => {
    if (['为空', '不为空', '属于当月', '不属于当月'].includes(val)) {
      row.value = '';
    }
  };

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    if (!checkBrackets(result.value)) {
      ElMessage.warning('括号不匹配，请检查');
      return;
    }
    emit(
      'success',
      form.value.incomeRuleConditionBeans?.map((item) => {
        let value = item.value?.replace(/，/g, ',');
        // 去掉末尾最后一个逗号
        if (value.endsWith(',')) {
          value = value.slice(0, -1);
        }
        return {
          ...item,
          value,
        };
      })
    );
    visible.value = false;
  };

  const result = computed(() => {
    const list = [];
    form.value.incomeRuleConditionBeans?.forEach((item, index) => {
      const { leftParenthesis, fileType, columnName, operator, value, rightParenthesis, logic } =
        item;
      let fileTypeNmae =
        tableValueSetData.value.sharedBoundary === sharedBoundaryType.分摊后
          ? codeMainType.汇总表名
          : tableValueSetData.value.budgetTemplateName;
      list.push(
        `${leftParenthesis || ''}${fileTypeNmae} ${columnName ? `"${columnName}"` : ''} ${
          operator || ''
        } ${value || ''}${rightParenthesis || ''} ${
          index !== form.value.incomeRuleConditionBeans?.length - 1 ? logicTypeMap[logic] : ''
        }`
      );
    });
    return list.join(' ');
  });
  const tableValueSetData = ref();

  const open = async (row, obj) => {
    console.log(row, obj);
    if (obj) {
      title.value = obj?.title;
      if (obj?.title.includes('来源条件设置') || obj?.title.includes('通用条件设置')) {
        //附表默认并且，主表默认或者
        logicValue.value = logicType.并且;
      } else {
        logicValue.value = logicType.或者;
      }
    }
    tableValueSetData.value = obj;
    if (row?.incomeRuleConditionBeans?.length) {
      form.value.incomeRuleConditionBeans = row?.incomeRuleConditionBeans;
    } else {
      form.value.incomeRuleConditionBeans = [
        {
          fileType:
            obj.sharedBoundary == sharedBoundaryType.分摊后 ? fileType.主数据分摊后 : obj.fileType,
          columnName: '',
          operator: '',
          value: '',
          logic: logicValue.value,
          sort: 1,
          dataSource: 1,
        },
      ];
    }
    visible.value = true;
    formRef.value?.clearValidate();
    selectedIndex.value = null;
    currentRow.value = undefined;
    if (tableRef.value) {
      tableRef.value.setCurrentRow(null);
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .tip {
    font-size: 12px;
    color: #8c8c8c;
  }
  .condition-result {
    width: 100%;
    height: 120px;
    margin-top: 20px;
    margin-bottom: 20px;
    .result-content {
      height: 100%;
      overflow: scroll;
      border: 1px solid #dcdfe6;
      border-radius: 8px;
      padding: 12px;
      line-height: 1.5;
    }
  }
  :deep(.el-form-item .el-select) {
    min-width: unset;
  }
</style>
