<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #filters>
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
        row-key="code"
        class-name="table-row-dashed"
      >
        <el-table-column label="校验表单" prop="templateName" min-width="150" />
        <el-table-column label="校验维度" prop="checkName" min-width="120" />
        <el-table-column label="数据" prop="checkValueName" min-width="150" />
        <el-table-column label="指标" prop="sumName" />
        <el-table-column label="规则" prop="compareTypeDesc" />
        <el-table-column label="指标类型" prop="targetValueTypeDesc" />
        <el-table-column label="目标值" prop="targetValue">
          <template #default="{ row }">
            <div>{{ row.targetValue }}{{ row.targetValueType == 1 ? '%' : '' }}</div>
          </template>
        </el-table-column>
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
  import { budgetApi } from '@/api';
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
      status: undefined,
      ruleType: 1,
    },
    pageSize: PAGE_SIZE,
    service: budgetApi.financeBudgetValidationRuleQueryList,
  });
  const addDialogRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      addDialogRef.value.open(row.code, 1);
    }
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
