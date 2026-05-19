<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.ruleName" placeholder="汇总表模板" class="w-350px" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button type="primary" @click="add">新增</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="ruleCode"
      class-name="table-row-dashed"
      :tree-props="{
        children: 'ruleShopList',
      }"
    >
      <el-table-column label="规则识别码" prop="ruleCode" />
      <el-table-column label="汇总表模板" prop="ruleName" />
      <el-table-column label="状态" prop="statusDesc">
        <template #default="{ row }">
          <Tag v-if="[0, 1].includes(row?.status)" :color="statusColorMap[row?.status]">
            {{ statusMap[row?.status] }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '查看',
                key: 'view',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '启用',
                key: 'enable',
                type: 'success',
                hide: row?.status === 1,
                permissionCode: '',
                row,
              },
              {
                label: '禁用',
                key: 'disable',
                type: 'danger',
                hide: row?.status === 0,
                permissionCode: '',
                row,
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
</template>

<script setup lang="ts" name="budgetSummaryRule">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, FinanceSystemApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';

  const statusMap = {
    0: '未启用',
    1: '已启用',
  };
  const statusColorMap = {
    0: 'gray',
    1: 'green',
  };
  const PAGE_SIZE = 10;
  const router = useRouter();
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
    FinanceSystemApi.FinanceBudgetRuleQueryList.RequestBody,
    FinanceSystemApi.FinanceBudgetRuleQueryList.ResponseBody
  >({
    searchDefaults: {
      ruleCode: '',
      ruleName: '',
      statusList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBudgetRuleQueryList,
  });
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    let isConfirmed = false;
    switch (key) {
      case 'view':
        // 查看详情
        router.push({
          name: 'budgetSummaryRuleDetail',
          query: { ruleCode: row.ruleCode },
        });

        break;
      case 'edit':
        // 编辑
        router.push({
          name: 'budgetSummaryRuleEdit',
          query: { ruleCode: row.ruleCode },
        });
        break;
      case 'enable':
        // 启用
        isConfirmed = await swal.confirm('确认启用吗？');
        if (!isConfirmed) break;
        await financeSystemApi.financeBudgetRuleChangeStatus({ ruleCode: row.ruleCode, status: 1 });
        ElMessage.success('启用成功');
        refreshList();
        break;
      case 'disable':
        // 停用
        isConfirmed = await swal.confirm('确认停用吗？');
        if (!isConfirmed) break;
        await financeSystemApi.financeBudgetRuleChangeStatus({ ruleCode: row.ruleCode, status: 0 });
        ElMessage.success('停用成功');
        refreshList();
        break;
      default:
        break;
    }
  };

  // 新增
  const add = () => {
    router.push({ name: 'budgetSummaryRuleAdd' });
  };
</script>

<style scoped lang="scss"></style>
