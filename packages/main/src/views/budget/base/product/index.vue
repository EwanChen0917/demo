<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.keyword" placeholder="产品SKU/产品SKU名称/产品SPU" clearable>
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
        <el-select
          v-model="search.brandCodes"
          :options="brandCodesList"
          :props="{ label: 'brandName', value: 'brandCode' }"
          multiple
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="品牌"
        />
        <el-select
          v-model="search.productStatusList"
          :options="productStatusLists"
          multiple
          :props="{ label: 'name', value: 'code' }"
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="产品状态"
        />
        <el-select
          v-model="search.gtmNames"
          :options="
            gtmNamesList.map((item) => {
              return {
                label: item.name || item.gtmPlCode,
                value: item.name || item.gtmPlCode,
              };
            })
          "
          multiple
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="GTM分组"
        />
      </template>
      <template #buttons>
        <ExportBtn
          :service="financeSystemApi.financeBasicExportProductList"
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
            <div v-if="store.taskMap[refreshType.产品信息].apiSync">数据获取并更新中…</div>
            <div v-else>
              <div>上次更新时间：{{ store.taskMap[refreshType.产品信息].lastRefreshTime }}</div>
            </div>
          </template>
          <i
            class="iconfont icon-shujutongbu1"
            :class="{ 'icon-loading': store.taskMap[refreshType.产品信息].apiSync }"
            @click="handleRefresh(refreshType.产品信息)"
          ></i>
        </el-tooltip>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="skuCode"
        class-name="table-row-dashed"
      >
        <el-table-column label="产品SKU" prop="skuCode" min-width="150" fixed="left" />
        <el-table-column label="产品SKU名称" prop="skuName" min-width="200" fixed="left" />
        <el-table-column label="品牌" prop="skuBrand" />
        <el-table-column label="SPU名称" prop="spuName" min-width="150" />
        <el-table-column label="产品品线" prop="productLine" min-width="150" />
        <el-table-column label="GTM品线" prop="productLineMarketGroup" min-width="150" />
        <el-table-column label="产品状态" prop="skuStateDesc" min-width="150" />
        <el-table-column label="数据来源" prop="dataSourceDesc" min-width="150" />
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '详情',
                  key: 'detail',
                  type: 'primary',
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
        :page-size-option="[20, 50, 100, 200, 500]"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
    <Detail ref="detailDialogRef" />
  </div>
</template>

<script setup lang="ts" name="budgetProduct">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, gtmApi, productApi, financeApi } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import { financeBudgetRefresh, stopFinanceBudgetRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';
  import useTask from '@/store/modules/task';
  import { refreshType } from '@/views/budget/base/enums/enums';
  import { handleRefresh } from '@/views/budget/base/script/api';
  import Detail from './detail.vue';

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
      brandCodes: undefined,
      gtmNames: undefined,
      productLineCode: undefined,
      productStatusList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryProductList2,
  });

  const detailDialogRef = ref();
  // 产品品线
  const productLineList = ref([]);
  const getProductLineList = async () => {
    const res = await productApi.luteosProductLineQueryList({
      pageNum: 1,
      pageSize: 100,
    });
    productLineList.value = res.recordList;
  };
  getProductLineList();

  // GTM分组
  const gtmNamesList = ref([]);
  const getGtmNamesList = async () => {
    const res = await gtmApi.luteosGtmPlQueryList({
      pageNum: 1,
      pageSize: 100,
    });
    gtmNamesList.value = res.gtmPlList;
  };
  getGtmNamesList();

  // 查询品牌
  const brandCodesList = ref([]);
  const queryBrandList = () => {
    productApi
      .luteosProductBrandQueryBrandList({
        pageNum: 1,
        pageSize: 100,
      })
      .then((res: any) => {
        if (+res.code === 200) {
          brandCodesList.value = res.brandBeanList || [];
        }
      });
  };
  queryBrandList();

  // 查询产品状态下拉
  const productStatusLists = ref([]);
  const queryProductStatusLists = async () => {
    const res = await financeApi.luteosFinanceBusinessDictItemBatchQuery({
      dictCodes: 'budget_product_status',
    });
    productStatusLists.value = res?.dictItemMap?.budget_product_status;
  };
  queryProductStatusLists();

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'detail') {
      detailDialogRef.value.open(row.skuCode);
    }
  };
  watch(
    () => store.taskMap[refreshType.产品信息].apiSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  onMounted(() => {
    financeBudgetRefresh(user.token as string, refreshType.产品信息);
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
