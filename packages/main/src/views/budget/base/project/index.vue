<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.keyword" placeholder="研发项目" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select v-model="search.productLineCode" filterable clearable placeholder="产品品线">
          <el-option
            v-for="item in productLineList"
            :key="item.code"
            :label="item.productLine"
            :value="item.code"
          />
        </el-select>
      </template>
      <template #buttons>
        <ExportBtn
          :service="financeSystemApi.financeBasicExportBudgetNewProductList"
          :params="{
            ...search,
          }"
        >
          导出
        </ExportBtn>
      </template>
      <template #tools-prepend>
        <el-tooltip placement="top">
          <template #content>
            <div v-if="store.taskMap[refreshType.研发项目].apiSync">数据获取并更新中…</div>
            <div v-else>
              <div>上次更新时间：{{ store.taskMap[refreshType.研发项目].lastRefreshTime }}</div>
            </div>
          </template>
          <i
            class="iconfont icon-shujutongbu1"
            :class="{ 'icon-loading': store.taskMap[refreshType.研发项目].apiSync }"
            @click="handleRefresh(refreshType.研发项目)"
          ></i>
        </el-tooltip>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="productCode"
        class-name="table-row-dashed"
      >
        <el-table-column label="研发项目" prop="productName" min-width="150" />
        <el-table-column label="所属年度" prop="planYear" />
        <el-table-column label="产品品线" prop="productLine" />
        <el-table-column label="GTM品线" prop="gtmPlName" />
        <el-table-column label="一级分类" prop="categoryNameLevel1" />
        <el-table-column label="二级分类" prop="categoryNameLevel2" />
        <el-table-column label="三级分类" prop="categoryNameLevel3" />
        <el-table-column label="产品名" prop="spuName" />
        <el-table-column label="预计上市时间" prop="listingTime" min-width="150" />
        <el-table-column label="状态" prop="productStatusDesc" />
        <el-table-column label="数据来源" prop="dataSourceDesc" min-width="150" />
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
  </div>
</template>

<script setup lang="ts" name="budgetProject">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, productApi } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import { financeBudgetRefresh, stopFinanceBudgetRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';
  import useTask from '@/store/modules/task';
  import { refreshType } from '@/views/budget/base/enums/enums';
  import { handleRefresh } from '@/views/budget/base/script/api';

  const user = useStore();
  const store = useTask();
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
      keyword: undefined,
      productLineCode: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryBudgetNewProductList,
  });

  const productLineList = ref([]);
  const getProductLineList = async () => {
    const res = await productApi.luteosProductLineQueryList({
      pageNum: 1,
      pageSize: 100,
    });
    productLineList.value = res.recordList;
  };
  getProductLineList();
  watch(
    () => store.taskMap[refreshType.研发项目].apiSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  onMounted(() => {
    financeBudgetRefresh(user.token as string, refreshType.研发项目);
  });

  onBeforeUnmount(() => {
    stopFinanceBudgetRefresh();
  });
</script>

<style scoped lang="scss">
  .icon-shujutongbu1 {
    color: #666666;
    cursor: pointer;
  }
  .icon-loading {
    color: #666666;
    cursor: pointer;
    animation: rotate 1s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
