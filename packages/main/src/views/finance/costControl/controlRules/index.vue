<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" clearable placeholder="规则名称" style="width: 300px">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-select v-model="search.status" filterable clearable placeholder="全部状态">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <ExportBtn
        :service="budgetApi.financeBudgetRuleControlCfgExportList"
        :params="{
          ...search,
        }"
      >
        导出规则
      </ExportBtn>
      <el-button class="button" type="primary" @click="addWarehouseVatMap">新增规则</el-button>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.records"
      row-key="id"
      class-name="table-row-dashed"
    >
      <el-table-column label="优先级" prop="priority">
        <template #default="{ row }">
          <Tag v-if="row.isSystemDefault" color="green">默认</Tag>
          <div v-else>{{ row.priority }}</div>
        </template>
      </el-table-column>
      <el-table-column label="规则名称" prop="ruleName" />
      <el-table-column label="来源系统" prop="sourceSystems">
        <template #default="{ row }">
          <div v-for="item in row.sourceSystems">{{ item.desc }}</div>
        </template>
      </el-table-column>
      <el-table-column label="单据名称" prop="processCodes">
        <template #default="{ row }">
          <div v-for="item in row.processCodes">{{ item.desc }}</div>
        </template>
      </el-table-column>
      <el-table-column label="适用维度" prop="dimensionalityCodes">
        <template #default="{ row }">
          <div v-for="item in row.dimensionalityCodes">{{ item.desc }}</div>
        </template>
      </el-table-column>
      <el-table-column label="控制强度" prop="typeDesc" />
      <el-table-column label="控制费用" prop="feeSubjects">
        <template #default="{ row }">
          <div v-for="item in row.feeSubjects">{{ item.desc }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status">
        <template #default="{ row }">
          <Tag :color="+row.status === 0 ? 'green' : 'red'" size="small">
            {{ row.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
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
              // 状态
              {
                label: row.status === 0 ? '禁用' : '启用',
                key: 'status',
                type: 'primary',
                hide: row.isSystemDefault,
                row: row,
              },
              // 删除
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
                hide: row.isSystemDefault,
                row: row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <EditDialog ref="editDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="budgetControlRules">
  import useList from '@/hooks/list/useList';
  import { budgetApi, BudgetApi } from '@/api';
  import EditDialog from './components/editDialog.vue';
  import * as swal from '@/utils/swal';

  const PAGE_SIZE = 10;
  const statusList = [
    { label: '启用', value: 0 },
    { label: '禁用', value: 1 },
  ];
  const {
    search,
    // searchData,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    { keyword?: string; pageNum: number; pageSize: number },
    BudgetApi.FinanceBudgetRuleControlCfgQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      status: undefined,
    },
    pageSize: PAGE_SIZE,
    service: budgetApi.financeBudgetRuleControlCfgQueryList,
  });

  const editDialogRef = ref();

  const addWarehouseVatMap = () => {
    editDialogRef.value.open();
  };

  const handleActions = async (action) => {
    const { key, row } = action;
    switch (key) {
      case 'edit':
        editDialogRef.value.open({ ...row });
        break;
      case 'status':
        const isOk = await swal.confirm(`确认${row.status === 0 ? '禁用' : '启用'}该规则吗？`);
        if (!isOk) return;
        await budgetApi.financeBudgetRuleControlCfgEnable({
          ruleCodes: [row.ruleCode],
          status: row.status === 0 ? 1 : 0,
        });
        runQuery();
        break;
      case 'delete':
        const isConfirmed = await swal.confirm(`确认删除该规则吗？`);
        if (!isConfirmed) return;
        const res = await budgetApi.financeBudgetRuleControlCfgDeleteBatch([row.ruleCode]);
        if (res) {
          runQuery();
        }
        break;
    }
  };
</script>

<style scoped lang="scss">
  /* 这里可以添加样式 */
</style>
