<template>
  <el-dialog title="完成度检查" v-model="visible" @close="visible = false" align-center>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        {{ ruleTypeList }}
        <el-space>
          状态筛选：
          <el-checkbox-group v-model="search.statusList">
            <el-checkbox :value="-1" label="不存在" />
            <el-checkbox :value="0" label="未启用" />
            <el-checkbox :value="1" label="已启用" />
          </el-checkbox-group>
        </el-space>
      </template>
      <el-table
        v-loading="listLoading"
        :data="listData?.recordList"
        class-name="table-row-dashed"
        height="50vh"
      >
        <el-table-column label="店铺" prop="shop" />
        <el-table-column label="规则状态" prop="status">
          <template #default="{ row }">
            <Tag :color="statusColorMap[row?.status]">
              {{ row.statusDesc }}
            </Tag>
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
  </el-dialog>
</template>

<script setup lang="ts">
  import { FinanceSystemApi, financeSystemApi } from '@/api';

  import useList from '@/hooks/list/useList';
  import { ruleType } from '@/views/finance/income/incomeRule/enum';

  const props = defineProps<{
    ruleType: any; // 单据类型
  }>();
  const statusColorMap = {
    '-1': 'red',
    0: 'gary',
    1: 'green',
  };
  const visible = ref(false);
  const ruleTypeList = ref(props.ruleType);

  const PAGE_SIZE = 10;
  const route = useRoute();

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
    FinanceSystemApi.FinanceIncomeRuleQueryShopCheckList.RequestBody,
    FinanceSystemApi.FinanceIncomeRuleQueryShopCheckList.ResponseBody
  >({
    searchDefaults: {
      statusList: [-1],
      ruleTypeList: ruleTypeList.value,
    },
    // serviceManual: false,
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeIncomeRuleQueryShopCheckList,
  });

  const open = (type) => {
    ruleTypeList.value = type;
    search.ruleTypeList = type;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
