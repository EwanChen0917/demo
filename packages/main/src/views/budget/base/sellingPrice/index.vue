<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearchData"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          class="w-350px"
          v-model="search.keyword"
          placeholder="产品SKU/产品SKU名称/SPU编码/产品SPU"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <CategoryCascader
          v-model="categoryCodeArr"
          placeholder="产品分类"
          style="margin-left: 10px"
          @change="changeCategoryCode"
        />
        <el-select
          v-model="search.countryCodes"
          :options="countryMap.map(item=>{
            return {
              label: item.countryCode + ' - ' + item.countryName,
              value: item.countryCode
            }
          })"
          multiple
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="国家"
        />
      </template>
      <template #buttons>
        <ExportBtn
          :service="financeSystemApi.financeBasicExportMsrpPriceList"
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
            <div v-if="store.taskMap[refreshType.售价信息].apiSync">数据获取并更新中…</div>
            <div v-else>
              <div>上次更新时间：{{ store.taskMap[refreshType.售价信息].lastRefreshTime }}</div>
            </div>
          </template>
          <i
            class="iconfont icon-shujutongbu1"
            :class="{ 'icon-loading': store.taskMap[refreshType.售价信息].apiSync }"
            @click="handleRefresh(refreshType.售价信息)"
          ></i>
        </el-tooltip>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="id"
        class-name="table-row-dashed"
      >
        <el-table-column label="产品SKU/产品SKU名称" min-width="180">
          <template #default="{ row }">
            <div class="fs-7">{{ row.skuCode }}</div>
            <div class="fs-7">{{ row.skuName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="SPU编码/SPU名称" min-width="150">
          <template #default="{ row }">
            <div class="fs-7">{{ row.spuCode }}</div>
            <div class="fs-7">{{ row.spuName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="产品分类" prop="categoryShow" min-width="200" />
        <el-table-column label="国家" prop="countryCode" />
        <el-table-column label="MSRP(全渠道)" prop="currencyCode" min-width="150">
          <template #default="{ row }">
            <div class="fs-7" v-if="row.salePrice">{{ row.salePrice }} {{ row.currencyCode }}</div>
          </template>
        </el-table-column>
        <el-table-column label="MSRP(亚马逊-VC)" prop="vcSalePrice" min-width="150">
          <template #default="{ row }">
            <div class="fs-7" v-if="row.vcSalePrice">
              {{ row.vcSalePrice }} {{ row.vcCurrencyCode }}
            </div>
          </template>
        </el-table-column>
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

<script setup lang="ts" name="budgetSellingPrice">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, dataApi } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import { financeBudgetRefresh, stopFinanceBudgetRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';
  import useTask from '@/store/modules/task';
  import { refreshType } from '@/views/budget/base/enums/enums';
  import { handleRefresh } from '@/views/budget/base/script/api';

  const user = useStore();
  const store = useTask();
  const PAGE_SIZE = 20;
  const categoryCodeArr = ref([]);
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
      countryCodes: undefined,
      categoryCode: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryMsrpPriceList,
  });
  const resetSearchData = () => {
    categoryCodeArr.value = undefined;
    resetSearch();
  };
  const changeCategoryCode = () => {
    console.log(categoryCodeArr.value);
    if (categoryCodeArr.value) {
      search.categoryCode = categoryCodeArr.value[categoryCodeArr.value.length - 1];
    } else {
      search.categoryCode = '';
    }
  };

  const countryMap = ref<any[]>([]);
  const getSiteOptions = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    countryMap.value = res?.countryList || [];
  };
  getSiteOptions();
  watch(
    () => store.taskMap[refreshType.售价信息].apiSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  onMounted(() => {
    financeBudgetRefresh(user.token as string, refreshType.售价信息);
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
