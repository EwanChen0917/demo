<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总条数：
        <span class="text-bule text-num">{{ listData?.total }}</span>
      </span>
      <el-divider direction="vertical" class="me-6" />
      <span>
        金蝶使用状态： 可用：
        <span class="text-green text-num">{{ listData?.enableStatusCountMap?.['1'] || 0 }}</span>
        <span class="text-red text-num">
          禁用：{{ listData?.enableStatusCountMap?.['0'] || 0 }}
        </span>
      </span>
      <el-divider direction="vertical" class="me-6" />
      <span>
        金蝶数据状态：
        <span class="text-red text-num">暂存：{{ listData?.statusCountMap?.['A'] || 0 }}</span>
        <span class="text-red text-num">已提交：{{ listData?.statusCountMap?.['B'] || 0 }}</span>
        已审核：
        <span class="text-green text-num">{{ listData?.statusCountMap?.['C'] || 0 }}</span>
      </span>
    </el-row>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.keyword" placeholder="编码/名称/金蝶编码" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select
          v-model="search.kingdeeStatuses"
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="金蝶数据状态"
        >
          <el-option
            v-for="item in dataList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          v-model="search.kingdeeEnables"
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="金蝶使用状态"
        >
          <el-option
            v-for="item in statusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </template>
      <template #buttons>
        <ExportBtn
          :service="financeSystemApi.financeBasicOtherBusinessPartnersExportQueryList"
          :params="{ ...search }"
        >
          导出
        </ExportBtn>
      </template>
      <template #tools-prepend>
        <el-tooltip placement="top">
          <template #content>
            <div v-if="store.taskMap[refreshType.其他往来单位].apiSync">
              数据拉取中，请稍后刷新页面查询最新数据
            </div>
            <div v-else>
              <div>从金蝶拉取主数据，上次更新时间：{{ store.taskMap[refreshType.其他往来单位].lastRefreshTime }}</div>
            </div>
          </template>
          <i
            class="iconfont icon-shujutongbu1"
            :class="{ 'icon-loading': store.taskMap[refreshType.其他往来单位].apiSync }"
            @click="handleRefresh"
          ></i>
        </el-tooltip>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="code"
        class-name="table-row-dashed"
      >
        <el-table-column label="编码" prop="code" min-width="120" />
        <el-table-column label="名称" prop="name" min-width="200" />
        <el-table-column label="金蝶编码" prop="kingdeeNumber" />
        <el-table-column label="金蝶使用状态" prop="kingdeeEnableTitle">
          <template #default="{ row }">
            <Tag :color="statusColorMap[row.kingdeeEnable]">{{ row.kingdeeEnableTitle }}</Tag>
          </template>
        </el-table-column>
        <el-table-column label="金蝶数据状态" prop="kingdeeStatusTitle">
          <template #default="{ row }">
            <Tag :color="statusColorMap[row.kingdeeStatus]">{{ row.kingdeeStatusTitle }}</Tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" min-width="120" />
        <el-table-column label="更新时间" prop="updateTime" min-width="120" />
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
  </div>
</template>

<script setup lang="ts" name="financeOtherCompany">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { refreshType } from '@/views/budget/base/enums/enums';
  import { useStore } from '@/store/modules/useStore';
  import useTask from '@/store/modules/task';
  import { financeBudgetRefresh, stopFinanceBudgetRefresh } from '@/worker/controls/notice';

  const route = useRoute();
  const store = useTask();
  const user = useStore();
  const PAGE_SIZE = 10;
  const dataList = [
    { name: '暂存', code: 'A' },
    { name: '已提交', code: 'B' },
    { name: '已审核', code: 'C' },
  ];
  const statusList = [
    { name: '可用', code: '1' },
    { name: '禁用', code: '0' },
  ];
  const statusColorMap = {
    '1': 'green',
    '0': 'red',
    A: 'red',
    B: 'red',
    C: 'green',
  };
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
    FinanceSystemContracts.SupplierListQueryResp
  >({
    searchDefaults: {
      keyword: undefined,
      kingdeeEnables: undefined,
      kingdeeStatuses: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicOtherBusinessPartnersQueryList,
  });
  const handleRefresh = async () => {
    await financeSystemApi.financeBasicPlatformRefresh({
      modelCode: 'other_business_partners_refresh',
    });
    store.taskMap[refreshType.其他往来单位].apiSync = true;
    financeBudgetRefresh(user.token as string, refreshType.其他往来单位);
  };
  watch(
    () => store.taskMap[refreshType.其他往来单位].apiSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  onMounted(() => {
    financeBudgetRefresh(user.token as string, refreshType.其他往来单位);
  });

  onBeforeUnmount(() => {
    stopFinanceBudgetRefresh();
  });
</script>

<style scoped lang="scss">
  .page-top-box {
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;

    .text-num {
      font-weight: 500;
      margin-right: 1.25rem;
    }

    .text-bule {
      color: #75a3f4;
    }

    .text-green {
      color: #50cf7e;
    }

    .text-red {
      color: #ef6868;
    }
    .el-divider--vertical {
      border-left: 1px var(--el-border-color) var(--el-border-style);
      margin-top: 2px;
    }
  }
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
