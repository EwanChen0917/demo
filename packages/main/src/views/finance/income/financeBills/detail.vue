<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="产品sku/供应链SKU/店铺sku" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>

    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.recordList" row-key="code">
      <el-table-column
        :label="item.fieldName"
        :prop="item.fieldCode"
        v-for="(item, index) in titleTable"
        :key="index"
      />
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChangeData"
      @current-change="handleCurrentChangeData"
    />
  </KeenList>
</template>

<script setup lang="ts" name="financeBillsStatementDetail">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi, platformApi } from '@/api';
  import { useStore } from '@/store/modules/useStore';
  import useTask from '@/store/modules/task';
  import { ruleType } from '@/views/finance/income/incomeRule/enum';

  const user = useStore();
  const store = useTask();
  const route = useRoute();
  const tableRef = ref(null);
  const PAGE_SIZE = 10;

  const isFirstQuery = true;

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
    FinanceSystemApi.FinancePlatformOrderQueryItemList.RequestBody,
    FinanceSystemApi.FinancePlatformOrderQueryItemList.ResponseBody
  >({
    searchDefaults: {
      codeList: [route?.query?.code],
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financePlatformOrderQueryItemList,
  });

  const type = ref(route?.query?.type);
  const titleTable = ref([]);
  // 获取详情表头
  const queryDictMap = async () => {
    const res = await financeSystemApi.financePlatformOrderQueryDetailHeader({
      type: type.value,
    });

    titleTable.value = res?.detailHeaders?.map((item) => {
      return {
        fieldCode: item?.field,
        fieldName: item?.desc,
      };
    });
  };
  queryDictMap();
  const handlePageSizeChangeData = (val) => {
    handlePageSizeChange(val);
    scrollTop();
  };
  const handleCurrentChangeData = (val) => {
    handleCurrentChange(val);
    scrollTop();
  };
  // 回到顶部
  const scrollTop = () => {
    if (tableRef.value) {
      setTimeout(() => {
        const bodyWrapper = tableRef.value.$el.querySelector('.el-scrollbar__wrap--hidden-default');
        if (bodyWrapper) {
          bodyWrapper.scrollTop = 0;
        }
      }, 100);
    }
  };
</script>

<style scoped lang="scss"></style>
