<template>
  <el-dialog
    width="1000"
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
        :data="form?.filterDataConditions"
        @current-change="handleCurrentChange"
        @row-click="handleRowClick"
        highlight-current-row
        row-key="sort"
        max-height="40vh"
        class="mt-4 current-table"
      >
        <el-table-column style="width: 85px">
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
        <el-table-column label="数据" width="135">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`filterDataConditions[${$index}].fileType`"
              :rules="rules.fileType"
            >
              <el-select
                style="width: 120px"
                v-model="row.fileType"
                @change="changeFileType(row)"
                placeholder="选择数据"
              >
                <el-option v-for="(val, key) in fileTypeMap" :value="key" :label="val" :key="key" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="列名" width="150">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`filterDataConditions[${$index}].columnName`"
              :rules="rules.dataSource"
              v-if="getShowSelect(row.fileType)"
            >
              <DataFieldSelect
                placeholder="请选择"
                v-model="row.columnName"
                :fileType="row.fileType"
                :fileData="dataSet"
              />
            </el-form-item>
            <el-form-item
              :prop="`filterDataConditions[${$index}].columnName`"
              :rules="rules.columnName"
              v-else
            >
              <el-input
                v-model="row.columnName"
                placeholder="请输入"
                clearable
                @blur="(e) => handleColumnBlur(e, row)"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="比较符" width="135">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`filterDataConditions[${$index}].operator`"
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
                  : `filterDataConditions[${$index}].value`
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
    fileTypeMap,
    fileType,
    dataSourceType,
    logicType,
    logicTypeMap,
  } from '@/views/finance/income/incomeRule/enum';
  import DataFieldSelect from '@/views/finance/income/incomeRule/components/dataFieldSelect.vue';
  import { financeSystemApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';

  const emit = defineEmits<{
    (e: 'success', value: any): void;
  }>();

  const visible = ref(false);
  const title = ref('');

  const tableRef = ref(null);
  const formRef = ref(null);
  const form = ref({
    filterDataConditions: [
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
    columnName: [{ required: true, message: '请输入列名', trigger: 'change' }],
    dataSource: [{ required: true, message: '请选择列名', trigger: 'change' }],
    operator: [{ required: true, message: '请选择操作符', trigger: 'change' }],
    value: [{ required: true, message: '请输入值', trigger: 'change' }],
  });

  const currentRow = ref();
  const selectedIndex = ref(null);
  const handleCurrentChange = (val) => {
    currentRow.value = val; // 更新当前选中的行数据
  };
  const handleRowClick = (row, column, event) => {
    currentRow.value = row; // 更新当前选中的行数据
    selectedIndex.value = form.value?.filterDataConditions.indexOf(currentRow.value);
  };
  // 删除
  const deleteData = (index) => {
    form.value?.filterDataConditions?.splice(index, 1);
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
    const filterDataConditions = form.value?.filterDataConditions;
    switch (type) {
      case '添行':
        form.value?.filterDataConditions?.push({
          logic: logicType.或者,
          sort: form.value?.filterDataConditions?.length + 1,
        });
        break;
      case '插行':
        // 在所选中行的上方，增加一行
        form.value?.filterDataConditions.splice(selectedIndex.value, 0, {
          logic: logicType.或者,
          sort: form.value?.filterDataConditions?.length + 1,
        });
        setSortData();
        selectedIndex.value = form.value?.filterDataConditions.indexOf(currentRow.value);
        break;
      case '复制行':
        form.value?.filterDataConditions.splice(
          selectedIndex.value + 1,
          0,
          cloneDeep(currentRow.value)
        );
        setSortData();
        break;
      case '上移':
        if (selectedIndex.value > 0) {
          const temp = filterDataConditions[selectedIndex.value];
          filterDataConditions[selectedIndex.value] = filterDataConditions[selectedIndex.value - 1];
          filterDataConditions[selectedIndex.value - 1] = temp;
          selectedIndex.value -= 1;
          setSortData();
        } else {
          ElMessage.warning('已经是第一行了');
        }
        break;
      case '下移':
        if (selectedIndex.value < form.value?.filterDataConditions.length - 1) {
          const temp = filterDataConditions[selectedIndex.value];
          filterDataConditions[selectedIndex.value] = filterDataConditions[selectedIndex.value + 1];
          filterDataConditions[selectedIndex.value + 1] = temp;
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
    form.value?.filterDataConditions.forEach((res, index) => {
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
      form.value.filterDataConditions?.map((item) => {
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
    form.value.filterDataConditions?.forEach((item, index) => {
      const { leftParenthesis, fileType, columnName, operator, value, rightParenthesis, logic } =
        item;
      list.push(
        `${leftParenthesis || ''}${fileTypeMap[fileType] || ''} ${
          columnName ? `"${columnName}"` : ''
        } ${operator || ''} ${value || ''}${rightParenthesis || ''} ${
          index !== form.value.filterDataConditions?.length - 1 ? logicTypeMap[logic] : ''
        }`
      );
    });
    return list.join(' ');
  });
  const dataSet = ref({});
  // 根据选择的数据是库表，显示选择下拉，共享盘，显示是输入框
  const getShowSelect = (type) => {
    if (
      (type == fileType.结算数据 && dataSet.value?.settleFile.dataSource == dataSourceType.库表) ||
      (type == fileType.信息数据一 && dataSet.value?.infoFile1.dataSource == dataSourceType.库表) ||
      (type == fileType.信息数据二 && dataSet.value?.infoFile2.dataSource == dataSourceType.库表)
    ) {
      return true;
    }
    return false;
  };
  // 修改数据，要设置对应文件的数据来源值
  const changeFileType = (row) => {
    if (row.fileType == fileType.结算数据) {
      row.dataSource =
        dataSet.value?.settleFile.dataSource == dataSourceType.库表
          ? dataSourceType.库表
          : dataSourceType.共享盘;
    }
    if (row.fileType == fileType.信息数据一) {
      row.dataSource =
        dataSet.value?.infoFile1.dataSource == dataSourceType.库表
          ? dataSourceType.库表
          : dataSourceType.共享盘;
    }
    if (row.fileType == fileType.信息数据二) {
      row.dataSource =
        dataSet.value?.infoFile2.dataSource == dataSourceType.库表
          ? dataSourceType.库表
          : dataSourceType.共享盘;
    }
    row.columnName = '';
  };

  const open = async (row, obj) => {
    dataSet.value = obj;
    if (row?.shop) {
      title.value = `${row?.shop} - 条件设置`;
    } else if (row?.fieldName) {
      title.value = `${row?.fieldName?.replace('*', '')} - 条件设置`;
    }
    if (row?.filterDataConditions?.length) {
      form.value.filterDataConditions = row?.filterDataConditions;
    } else if (row?.incomeRuleConditionBeans?.length) {
      form.value.filterDataConditions = row?.incomeRuleConditionBeans;
    } else {
      form.value.filterDataConditions = [
        {
          fileType: '',
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
    selectedIndex.value = null;
    currentRow.value = undefined;
    tableRef.value.setCurrentRow(null);
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
