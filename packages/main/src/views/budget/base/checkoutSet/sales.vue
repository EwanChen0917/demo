<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #filters>
        <el-date-picker
          v-model="search.budgetYear"
          type="year"
          placeholder="预算年度"
          value-format="YYYY"
          format="YYYY"
        />
        <el-select v-model="search.checkName" clearable placeholder="校验维度">
          <el-option
            v-for="item in checkKeyDataList"
            :key="item.desc"
            :label="item.desc"
            :value="item.desc"
          />
        </el-select>
        <el-select v-model="search.status" placeholder="状态" clearable>
          <el-option
            v-for="item in statusList"
            :key="item.status"
            :label="item.label"
            :value="item.status"
          />
        </el-select>
      </template>
      <template #buttons>
        <el-button class="button" type="primary" @click="addData">新增</el-button>
        <el-button class="button" type="primary" @click="changeSuatus(1)">批量启用</el-button>
        <el-button class="button" type="primary" @click="changeSuatus(0)">批量禁用</el-button>
        <el-button class="button" type="danger" :loading="batchDeleteLoading" @click="batchDelete">
          批量删除
        </el-button>
        <ExportBtn
          :service="budgetApi.financeBudgetValidationRuleExportList"
          :params="{
            ...search,
          }"
        >
          导出
        </ExportBtn>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        @selection-change="handleSelectionChange"
        row-key="code"
        class-name="table-row-dashed"
      >
        <el-table-column type="selection" width="40" reserve-selection fixed="left" />
        <el-table-column label="所属年度" prop="budgetYear" />
        <el-table-column label="校验表单" prop="templateName" min-width="150" />
        <el-table-column label="校验维度" prop="checkName" />
        <el-table-column label="数据" prop="checkValueName" min-width="150" />
        <el-table-column label="指标" prop="sumName" min-width="150" />
        <el-table-column label="规则" prop="compareTypeDesc" />
        <el-table-column label="指标类型" prop="targetValueTypeDesc" />
        <el-table-column label="目标值" prop="targetValue" />
        <el-table-column label="状态" prop="status">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              @click="changeSuatusSingle(row.status, row.code)"
            />
          </template>
        </el-table-column>
        <el-table-column label="适用部门" prop="deptName" min-width="110" />
        <el-table-column label="错误提示" prop="validationMessage" min-width="180" />
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '编辑',
                  key: 'edit',
                  type: 'primary',
                  row: row,
                },
                {
                  label: '删除',
                  key: 'delete',
                  type: 'danger',
                  row: row,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
        <el-table-column label="更新时间" fixed="right" width="150px">
          <template #default="{ row }">
            <div>{{ row.updateTime }}</div>
            <div v-if="row.updater">由 {{ row.updater }} 更新</div>
          </template>
        </el-table-column>
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="[20, 50, 100, 200, 500]"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
    <AddDialog ref="addDialogRef" @success="refreshList" />
  </div>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { budgetApi, platformApi } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import AddDialog from './components/addDialog.vue';

  const statusList = [
    { label: '启用', status: 1 },
    { label: '禁用', status: 0 },
  ];
  const PAGE_SIZE = 20;
  const {
    search,
    pagination: { total, current, pageSize, handleCurrentChange, handlePageSizeChange },
    listData,
    listLoading,
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    { keyword?: string; pageNum: number; pageSize: number },
    FinanceSystemContracts.ProductListQueryResp
  >({
    searchDefaults: {
      budgetYear: undefined,
      status: undefined,
      checkName: undefined,
      ruleType: 0, // 目标值校验规则类型 0-销售明细表 1-费用明细目标值
    },
    pageSize: PAGE_SIZE,
    service: budgetApi.financeBudgetValidationRuleQueryList,
  });
  const templateList = ref<any[]>([]);
  const checkKeyDataList = ref<any[]>([]);
  // 查询校验表单,适用部门下拉
  const getDeptList = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['budget_validation_rule_template'],
    });
    templateList.value = (res.dictMap && res.dictMap.budget_validation_rule_template) || [];
    checkKeyDataList.value = [];
    const codes = templateList.value.map((res) => res.value);
    if (codes) {
      changTemplateCode(codes);
    }
  };
  // 根据校验表单 查 校验维度
  const changTemplateCode = async (codes) => {
    const res: any = await platformApi.platformDict({
      dictCodes: codes,
    });
    for (const item of codes) {
      if (res.dictMap && res.dictMap[item]) {
        checkKeyDataList.value.push(...res.dictMap[item]);
      }
    }
  };
  getDeptList();
  const addDialogRef = ref();
  const addData = () => {
    addDialogRef.value.open();
  };
  const tableRef = ref(null);
  // 勾选
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.code);
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      addDialogRef.value.open(row.code, 0);
    } else if (key === 'delete') {
      // 删除
      const isConfirmed = await swal.confirm('确定要删除吗？');
      if (!isConfirmed) return;
      const res = await budgetApi.financeBudgetValidationRuleBatchDelete([row.code]);
      if (res) {
        ElMessage.success('删除成功');
        refreshList();
      } else {
        ElMessage.error('删除失败，请稍后再试');
      }
    }
  };
  // 批量删除
  const batchDeleteLoading = ref(false);
  const batchDelete = async () => {
    try {
      if (!codeList.value.length) return ElMessage.warning('请先勾选数据');
      const confirmed = await swal.confirm(`确定要删除吗？`);
      if (!confirmed) return;
      batchDeleteLoading.value = true;
      const res = await budgetApi.financeBudgetValidationRuleBatchDelete(codeList.value);
      if (res) {
        ElMessage.success('删除成功');
        refreshList();
        tableRef.value?.clearSelection();
      } else {
        ElMessage.error('删除失败，请稍后再试');
      }
    } finally {
      batchDeleteLoading.value = false;
    }
  };
  const changeSuatus = async (type) => {
    if (!codeList.value.length) return ElMessage.warning('请先勾选数据');
    const res = await budgetApi.financeBudgetValidationRuleBatchUpdateStatus({
      codeList: codeList.value,
      status: type,
    });
    ElMessage.success('修改状态成功');
    refreshList();
    tableRef.value?.clearSelection();
  };
  const changeSuatusSingle = async (type, code) => {
    const res = await budgetApi.financeBudgetValidationRuleBatchUpdateStatus({
      codeList: [code],
      status: type,
    });
    ElMessage.success('修改状态成功');
    refreshList();
  };
</script>

<style scoped lang="scss">
  :deep(.actions) {
    background-color: #f5f5f5;
  }
</style>
