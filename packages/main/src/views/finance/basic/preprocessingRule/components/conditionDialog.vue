<template>
  <el-dialog
    width="1000"
    :title="title"
    v-model="visible"
    @close="visible = false"
    align-center
    :close-on-click-modal="false"
  >
    <el-space v-if="isCanEdit">
      <el-button size="small" type="primary" @click="handleAdd">添加行</el-button>
      <div class="tip">提示：比较符为IN或NOTIN时，值如存在多个，按逗号隔开</div>
    </el-space>
    <el-form ref="formRef" :model="form" label-width="0" :rules="rules">
      <el-table
        ref="tableRef"
        :data="form?.incomeRuleConditionBeans"
        max-height="40vh"
        class="mt-4"
      >
        <el-table-column width="85">
          <template #default="{ row }">
            <el-form-item v-if="isCanEdit">
              <el-select style="width: 70px" v-model="row.leftParenthesis" placeholder="" clearable>
                <el-option label="(" value="(" />
                <el-option label="((" value="((" />
                <el-option label="(((" value="(((" />
              </el-select>
            </el-form-item>
            <span v-else>
              {{ row.leftParenthesis }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="列名" width="220">
          <template #default="{ row, $index }">
            <el-form-item
              v-if="isCanEdit"
              :prop="`incomeRuleConditionBeans[${$index}].columnName`"
              :rules="rules.columnName"
            >
              <el-input
                v-model="row.columnName"
                placeholder="请输入"
                clearable
                @blur="(e) => handleColumnBlur(e, row)"
              />
            </el-form-item>
            <span v-else>
              {{ row.columnName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="比较符" width="135">
          <template #default="{ row, $index }">
            <el-form-item
              v-if="isCanEdit"
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
                <el-option v-for="op in operators" :key="op" :label="op" :value="op" />
              </el-select>
            </el-form-item>
            <span v-else>
              {{ row.operator }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="值" width="230">
          <template #default="{ row, $index }">
            <el-form-item
              v-if="isCanEdit"
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
            <span v-else>
              {{ row.value }}
            </span>
          </template>
        </el-table-column>
        <el-table-column width="85px">
          <template #default="{ row }">
            <el-form-item v-if="isCanEdit">
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
            <span v-else>
              {{ row.rightParenthesis }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="逻辑符" width="95px">
          <template #default="{ row }">
            <el-form-item v-if="isCanEdit">
              <el-select style="width: 80px" v-model="row.logic" placeholder="">
                <el-option
                  v-for="(val, key) in logicTypeMap"
                  :value="key"
                  :label="val"
                  :key="key"
                />
              </el-select>
            </el-form-item>
            <span v-else>
              {{ logicTypeMap[row.logic] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row, $index }">
            <el-form-item v-if="isCanEdit">
              <el-link
                type="danger"
                :underline="false"
                @click="form?.incomeRuleConditionBeans?.splice($index, 1)"
              >
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
        <el-button type="primary" @click="save" v-loading="saveLoading" v-if="isCanEdit">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { logicType, logicTypeMap, operators } from '../enum';

  defineProps<{
    isCanEdit: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'success', value: any): void;
  }>();

  const visible = ref(false);
  const title = ref('条件设置');

  const tableRef = ref(null);
  const formRef = ref(null);
  const form = ref({
    row: null,
    incomeRuleConditionBeans: [
      {
        columnName: '',
        operator: '',
        value: '',
        logic: logicType.或者,
        sort: 1,
      },
    ],
  });
  const rules = reactive({
    columnName: [{ required: true, message: '请输入列名', trigger: 'change' }],
    dataSource: [{ required: true, message: '请选择列名', trigger: 'change' }],
    operator: [{ required: true, message: '请选择操作符', trigger: 'change' }],
    value: [{ required: true, message: '请输入值', trigger: 'change' }],
  });

  const handleAdd = () => {
    form.value?.incomeRuleConditionBeans?.push({
      logic: logicType.或者,
      sort: form.value?.incomeRuleConditionBeans?.length + 1,
    });
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

  //
  const handleOperatorChange = (val, row) => {
    if (['为空', '不为空', '属于当月', '不属于当月'].includes(val)) {
      row.value = '';
    }
  };

  // 去除前后空格
  const handleColumnBlur = (e, row) => {
    row.columnName = e.target?.value?.trim();
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
      form.value.row,
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
      const { leftParenthesis, columnName, operator, value, rightParenthesis, logic } = item;
      list.push(
        `${leftParenthesis || ''} ${columnName ? `"${columnName}"` : ''} ${operator || ''} ${
          value || ''
        }${rightParenthesis || ''} ${
          index !== form.value.incomeRuleConditionBeans?.length - 1 ? logicTypeMap[logic] : ''
        }`
      );
    });
    return list.join(' ');
  });

  const open = async (row) => {
    form.value.row = row;
    if (row?.shop) {
      title.value = `${row?.shop} - 条件设置`;
    } else if (row?.fieldName) {
      title.value = `${row?.fieldName?.replace('*', '')} - 条件设置`;
    }
    if (row?.incomeRuleConditionBeans?.length) {
      form.value.incomeRuleConditionBeans = row?.incomeRuleConditionBeans;
    } else {
      form.value.incomeRuleConditionBeans = [
        {
          columnName: '',
          operator: '',
          value: '',
          logic: logicType.或者,
          sort: 1,
          dataSource: 0,
        },
      ];
    }
    visible.value = true;
    formRef.value?.clearValidate();
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
