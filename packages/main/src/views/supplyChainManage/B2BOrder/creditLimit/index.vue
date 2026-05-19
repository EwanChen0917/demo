<template>
  <div>
    <el-row class="page-top-box">
      <span>
        路特授信总额度：
        <span class="text-num">
          <span class="text-green">
            {{ addNumberCommas(String(listData?.statistics?.totalLimit)) }}
          </span>
          {{ listData?.statistics?.currencyCode }}
        </span>
      </span>
      <span>
        使用率：
        <span class="text-green text-num">{{ listData?.statistics?.userRatioDesc }}</span>
      </span>
      <span>
        路特已用额度：
        <span class="text-num">
          <span class="text-green">
            {{ addNumberCommas(String(listData?.statistics?.usedLimit)) }}
          </span>
          {{ listData?.statistics?.currencyCode }}
        </span>
      </span>
      <span>
        路特可用额度：
        <span class="text-num">
          <span class="text-green">
            {{ addNumberCommas(String(listData?.statistics?.availableLimit)) }}
          </span>
          {{ listData?.statistics?.currencyCode }}
        </span>
      </span>
    </el-row>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          v-model="search.keyword"
          placeholder="客户名称/客户编码"
          class="w-350px"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #buttons>
        <el-button
          class="button"
          v-permission="'creditAdd'"
          type="primary"
          @click="batchUpdateVisible = true"
        >
          导入
        </el-button>
        <ExportBtn
          :service="erpApi.luteosErpCustomerCreditLimitExportCustomerCreditList"
          :params="search"
          v-permission="'creditLimitExport'"
        >
          导出
        </ExportBtn>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.records"
        row-key="customerCode"
        class-name="table-row-dashed"
      >
        <el-table-column label="客户编码" prop="customerCode" min-width="120" />
        <el-table-column label="客户名称" prop="customerName" min-width="120" />
        <el-table-column label="主币种" prop="currencyCode" />
        <el-table-column label="总额度" prop="totalLimit" min-width="150">
          <template #default="{ row }">
            <div>{{ addNumberCommas(String(row.totalLimit)) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="锁定额度" prop="lockedLimit" min-width="130">
          <template #default="{ row }">
            <div>{{ addNumberCommas(String(row.lockedLimit)) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="已用额度" prop="usedLimit" min-width="150">
          <template #default="{ row }">
            <div>{{ addNumberCommas(String(row.usedLimit)) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="可用额度" prop="availableLimit" min-width="150">
          <template #default="{ row }">
            <div>{{ addNumberCommas(String(row.availableLimit)) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="使用率" prop="userRatioDesc" min-width="150" />
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '信用详情',
                  key: 'detail',
                  type: 'primary',
                  row: row,
                },
                {
                  label: '扣减额度',
                  key: 'abatement',
                  type: 'primary',
                  hide: row.availableLimit == 0 || row.availableLimit < 0,
                  permissionCode: 'creditLimitDeduction',
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
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
    <DeductionAmount ref="deductionAmountRef" @close-modal="refreshList" />
    <!-- @export="handleExport" -->
    <BatchUpdateModal
      v-if="batchUpdateVisible"
      :visible="batchUpdateVisible"
      @close="batchUpdate"
      type="import"
      title="导入"
    />
  </div>
</template>

<script setup lang="ts" name="creditLimit">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, financeApi, erpApi } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { addNumberCommas } from '@/views/budget/budgetTable/util/util';
  import BatchUpdateModal from './components/batchUpdateModal.vue';
  import DeductionAmount from './components/deductionAmount.vue';

  // 批量更新
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      refreshList();
    }
    batchUpdateVisible.value = false;
  };
  const router = useRouter();
  const route = useRoute();
  const PAGE_SIZE = 10;
  const pushList = [
    { name: '未推送', code: 0 },
    { name: '推送成功', code: 1 },
    { name: '推送失败', code: 2 },
  ];
  const statusList = [
    { name: '已关联', code: 1 },
    { name: '未关联', code: 0 },
  ];
  const kingdeeNumber = ref('');
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
    FinanceSystemContracts.CustomerListQueryResp
  >({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpCustomerCreditLimitQueryCustomerCreditList,
  });
  const deductionAmountRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'detail') {
      const path = router.resolve({
        name: 'creditLimitDetail',
        query: {
          customerCode: row.customerCode,
          customerName: row.customerName,
        },
      });
      router.push(path.href);
    }
    if (key === 'abatement') {
      deductionAmountRef.value?.open(row);
    }
  };
</script>

<style scoped lang="scss">
  .page-top-box {
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;

    .text-num {
      font-weight: 500;
      margin-right: 30px;
    }

    .text-green {
      color: #50cf7e;
    }
  }

  .icon {
    margin-left: 6px;
    display: inline-block;
    cursor: pointer;
  }
  .ml60 {
    margin-left: 49px;
  }

  .ml156 {
    margin-left: 156px;
  }
  @media screen and (max-width: 1700px) {
    .ml60 {
      margin-left: 60px;
    }
  }
</style>
