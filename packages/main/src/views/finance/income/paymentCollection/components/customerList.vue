<template>
  <el-form ref="formRef2" :model="listData" label-width="150" scroll-to-error>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          v-model.trim="search.keyword"
          placeholder="客户编码/客户名称"
          class="w-350px"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.customerList"
        row-key="customerCode"
        class-name="table-row-dashed"
      >
        <el-table-column label="" width="160">
          <template #default="{ row, $index }">
            <el-radio
              v-model="customerCode"
              :value="row.customerCode"
              @change="getCustomerCode"
            ></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="客户编码" prop="customerCode" min-width="160" />
        <el-table-column label="客户名称" prop="customerName" min-width="160" />
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
  </el-form>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi } from '@/api/index';
  const PAGE_SIZE = 10;
  const customerCode = ref();
  const emit = defineEmits<{
    (event: 'getCustomerCode'): void;
  }>();
  const {
    search,
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
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    { keyword?: string; pageNum: number; pageSize: number },
    FinanceSystemApi.FinanceBasicQueryCustomerList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      relateStatus: undefined,
      marketNames: undefined,
      pushStatus: undefined,
      customerSources: ['02'],
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryCustomerList,
  });
  const getCustomerCode = () => {
    let obj = listData.value?.customerList.find((item) => {
      return item.customerCode === customerCode.value;
    });
    emit('getCustomerCode', customerCode.value, obj.customerName);
  };
</script>

<style scoped lang="scss">
  .table-form-item {
    margin-top: 1.75rem;

    :deep(.el-form-item__content) {
      margin: 0 !important;
      display: flex;
      column-gap: 10px;
      font-size: 12px;
    }
  }
</style>
