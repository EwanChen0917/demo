<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.keyword" placeholder="国家" clearable>
          <template #prefix>
            <SvgIconSearch/>
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select
          v-model="search.businessAreas"
          :options="businessAreasList"
          multiple
          :props="{label: 'name', value: 'code'}"
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="业务地区（线上）"
        />
        <el-select
          v-model="search.offlineArea"
          :options="offlineAreaList"
          multiple
          :props="{label: 'name', value: 'code'}"
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="业务地区（线下）"
        />
        <el-select
          v-model="search.currencyCodes"
          :options="currencyCodesList.map(item=>{
            return {
              label: `${item.code}【${item.name}】`,
              value: item.code
            }
          })"
          multiple
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="币种"
        />
      </template>
      <template #buttons>
        <ExportBtn
          :service="financeSystemApi.financeBasicExportCountryList"
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
            <div v-if="store.taskMap[refreshType.国家信息].apiSync">数据获取并更新中…</div>
            <div v-else>
              <div>上次更新时间：{{ store.taskMap[refreshType.国家信息].lastRefreshTime }}</div>
            </div>
          </template>
          <i
            class="iconfont icon-shujutongbu1"
            :class="{ 'icon-loading': store.taskMap[refreshType.国家信息].apiSync }"
            @click="handleRefresh(refreshType.国家信息)"
          ></i>
        </el-tooltip>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="country"
        class-name="table-row-dashed"
      >
        <el-table-column label="国家地区编码" prop="country" min-width="150"/>
        <el-table-column label="国家地区中文简称" prop="countryAdCh" min-width="150"/>
        <el-table-column label="币种" prop="currency" min-width="150"/>
        <el-table-column label="业务地区（线上）" prop="businessArea" min-width="150"/>
        <el-table-column label="业务地区（线下）" prop="offlineArea" min-width="150"/>
        <el-table-column label="国家地区所在洲中文名称" prop="countryLocateState" min-width="180"/>
        <el-table-column label="生效状态" prop="status">
          <template #default="{ row }">
            <Tag :color="row.status.includes('启用') ? 'green' : 'gray'">{{ row.status }}</Tag>
          </template>
        </el-table-column>
        <el-table-column label="数据来源" prop="dataSourceDesc" min-width="150"/>
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

<script setup lang="ts" name="budgetCountry">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi } from '@/api';
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
      businessAreas: undefined,
      offlineArea: undefined,
      currencyCodes: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryCountryList,
  });
  const businessAreasList = ref([]);
  const getBusinessAreasList = async () => {
    const res = await financeSystemApi.financeBasicQueryOnlineAreaSelect({
      pageNum: 1,
      pageSize: 100,
    });
    businessAreasList.value = res;
  };
  getBusinessAreasList();

  const offlineAreaList = ref([]);
  const getOfflineAreaList = async () => {
    const res = await financeSystemApi.financeBasicQueryOfflineAreaSelect({
      pageNum: 1,
      pageSize: 100,
    });
    offlineAreaList.value = res;
  };
  getOfflineAreaList();

  const currencyCodesList = ref([]);
  const getCurrencyCodesList = async () => {
    const res = await financeSystemApi.financeBasicQueryCurrencySelect({
      pageNum: 1,
      pageSize: 100,
    });
    currencyCodesList.value = res;
  };
  getCurrencyCodesList();
  watch(
    () => store.taskMap[refreshType.国家信息].apiSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  onMounted(() => {
    financeBudgetRefresh(user.token as string, refreshType.国家信息);
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
