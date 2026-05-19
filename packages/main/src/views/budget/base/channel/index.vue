<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.keyword" placeholder="平台/渠道/店铺渠道" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select
          v-model="search.platformNames"
          :options="platformOptions"
          :props="{label: 'name', value: 'code'}"
          clearable
          multiple
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="平台"
        />
        <el-select
          v-model="search.channelNames"
          :options="customerTypeLists"
          :props="{label: 'name', value: 'code'}"
          clearable
          filterable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="渠道"
        />
      </template>
      <template #buttons>
        <ExportBtn
          :service="financeSystemApi.financeBasicExportChannelList"
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
            <div v-if="store.taskMap[refreshType.渠道].apiSync">数据获取并更新中…</div>
            <div v-else>
              <div>上次更新时间：{{ store.taskMap[refreshType.渠道].lastRefreshTime }}</div>
            </div>
          </template>
          <i
            class="iconfont icon-shujutongbu1"
            :class="{ 'icon-loading': store.taskMap[refreshType.渠道].apiSync }"
            @click="handleRefresh(refreshType.渠道)"
          ></i>
        </el-tooltip>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="uniqueCode"
        class-name="table-row-dashed"
      >
        <el-table-column label="平台" prop="platform" />
        <el-table-column label="渠道" prop="channelName" />
        <el-table-column label="店铺渠道" prop="shopChannel" />
        <el-table-column label="部门" prop="operateDept" />
        <el-table-column label="数据来源" prop="dataSourceDesc" />
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

<script setup lang="ts" name="budgetChannel">
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
      channelNames: [],
      platformNames: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryChannelList,
  });
  const platformOptions = ref<any[]>([]);
  const getPlatformOptions = async () => {
    const res = await financeSystemApi.financeBasicQueryPlatformSelect({
      pageNum: 1,
      pageSize: 1000,
    });
    platformOptions.value = res;
  };
  getPlatformOptions();
  const customerTypeLists = ref([]);
  const getChanneleList = async () => {
    const res = await financeSystemApi.financeBasicQueryChannelSelect({
      pageNum: 1,
      pageSize: 1000,
    });
    customerTypeLists.value = res;
  };
  getChanneleList();
  watch(
    () => store.taskMap[refreshType.渠道].apiSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  onMounted(() => {
    financeBudgetRefresh(user.token as string, refreshType.渠道);
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
