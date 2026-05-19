<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model.trim="search.code"
        placeholder="结算单号/订单号/客户PO"
        class="w-350px"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        v-model="search.customerCodes"
        :options="customerList"
        multiple
        :props ="{label: 'customerName', value:  'customerCode'}"
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="客户名称"
      />
      <el-date-picker
        v-model="search.paymentDate"
        type="daterange"
        value-format="YYYY-MM-DD"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="w-310px"
      />
      <el-select v-model="search.amountType" class="w-150px" placeholder="核销金额">
        <el-option
          v-for="item in typeList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
      <el-input
        v-model.trim="search.minAmount"
        oninput="if(value.length>12)value=value.slice(0,12)"
        type="number"
        placeholder="最小值"
        class="w-100px"
      />
      _
      <el-input
        v-model.trim="search.maxAmount"
        oninput="if(value.length>12)value=value.slice(0,12)"
        type="number"
        placeholder="最大值"
        class="w-100px"
      />
      <el-select
        v-model="search.invoiceStatusCodes"
        :options="billingStatusMap"
        multiple
        :props="{
            label: 'name',
            value: 'code',
        }"
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="开票状态"
      />
      <el-select
        v-model="search.writeOffStatusCodes"
        :options="writeOffStatusMap"
         multiple
        :props="{
           label: 'name',
           value: 'code',
        }"
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="核销状态"
      />
      <OrganizationSelect
        v-model="search.settlementOrgCodes"
        placeholder="结算组织"
        multiple
        clearable
        filterable
      />
    </template>
    <template #buttons>
      <el-button
        class="button"
        type="primary"
        title="同一个客户或客户为空且相同币种的数据方可批量开票"
        @click="invoiceIssuance"
      >
        开票
      </el-button>
      <ExportBtn
        :service="financeSystemApi.financeStatementExportList"
        :params="{
          ...omit(search, 'paymentDate'),
          startDate: search?.paymentDate ? search?.paymentDate[0] + ' 00:00:00' : undefined,
          endDate: search?.paymentDate ? search?.paymentDate[1] + ' 23:59:59' : undefined,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <template #tools-prepend>
      <el-tooltip placement="top">
        <template #content>
          <div v-if="store.taskMap[refreshType.ToB收入结算单].apiSync">数据获取并更新中…</div>
          <div v-else>
            <div>上次更新时间：{{ store.taskMap[refreshType.ToB收入结算单].lastRefreshTime }}</div>
          </div>
        </template>
        <i
          class="iconfont icon-shujutongbu1"
          :class="{ 'icon-loading': store.taskMap[refreshType.ToB收入结算单].apiSync }"
          @click="handleRefresh(refreshType.ToB收入结算单)"
        ></i>
      </el-tooltip>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      @selection-change="handleSelectionChange"
      row-key="code"
      class-name="table-row-dashed"
    >
      <el-table-column
        type="selection"
        width="40"
        reserve-selection
        :selectable="
          (row) =>
            row.billingStatus !== 1 &&
            row.totalAmountTax &&
            (selectedList?.length === 0 ||
              (row.customerName === selectedList?.[0]?.customerName &&
                row.currency === selectedList?.[0]?.currency))
        "
        fixed="left"
      />
      <el-table-column label="结算单号" prop="code" min-width="160" />
      <el-table-column label="客户" prop="customerName" />
      <el-table-column label="日期" prop="outboundTime" min-width="150" />
      <el-table-column label="币别" prop="currency" />
      <el-table-column label="价税合计" prop="totalAmountTax" />
      <el-table-column label="佣金" prop="commission" />
      <el-table-column label="销售运费" prop="shippingFee" />
      <el-table-column label="订单号" prop="orderNumber" min-width="150" />
      <el-table-column label="客户PO" prop="customerPo" min-width="110" />
      <el-table-column label="开票状态" prop="billingStatusDesc">
        <template #default="{ row }">
          <Tag :color="billingStatusColorMap[row?.billingStatus]">
            {{ row.billingStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="核销状态" prop="writeOffStatusDesc">
        <template #default="{ row }">
          <Tag :color="writeOffStatusColorMap[row?.writeOffStatus]">
            {{ row.writeOffStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="结算组织" prop="settlementOrgName" min-width="180" />
      <el-table-column label="核销金额" prop="writeOffAmount" width="200">
        <!-- 按核销金额/应收净额来显示进度 -->
        <template #default="{ row }">
          <el-progress
            :percentage="(row.writeOffAmount / row.amountReceivable) * 100"
            :stroke-width="8"
            :show-text="false"
            status="success"
          />
          <div>{{ row.writeOffAmount || 0 }} / {{ row.amountReceivable }}</div>
        </template>
      </el-table-column>

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
              {
                label: '开票',
                key: 'invoiceIssuance',
                type: 'primary',
                disabled: row.billingStatus == 1 || row.totalAmountTax == 0,
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
    <!-- 单据详情 -->
    <detailDialog
      v-if="detailVisible"
      :visible="detailVisible"
      :code="code"
      :detailType="0"
      @close="detailVisible = false"
    />
    <!-- 开票 -->
    <invoiceIssuanceDialog ref="invoiceIssuanceDialogRef" @success="refreshListData" />
  </KeenList>
</template>

<script setup lang="ts" name="incomeStatementToB">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi, erpApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import detailDialog from './components/detailDialog.vue';
  import invoiceIssuanceDialog from './components/invoiceIssuanceDialog.vue';
  import { omit } from 'lodash-es';
  import { useRoute, useRouter } from 'vue-router';
  import {
    billingStatusColorMap,
    writeOffStatusColorMap,
    writeOffStatusMap,
    billingStatusMap,
  } from '@/views/finance/income/incomeStatementToB/enum';
  import { useStore } from '@/store/modules/useStore';
  import useTask from '@/store/modules/task';
  import { refreshType } from '@/views/budget/base/enums/enums';
  import { financeBudgetRefresh, stopFinanceBudgetRefresh } from '@/worker/controls/notice';
  import OrganizationSelect from '@/views/finance/income/incomeRule/components/organizationSelect.vue';

  const user = useStore();
  const store = useTask();
  const PAGE_SIZE = 10;
  const router = useRouter();

  const typeList = [
    { name: '核销金额', code: 1 },
    { name: '金额', code: 2 },
    { name: '税额', code: 3 },
    { name: '价税合计', code: 4 },
    { name: '销售运费', code: 5 },
    { name: '佣金', code: 6 },
    { name: '应收净额', code: 7 },
  ];
  const detailVisible = ref(false);
  const code = ref('');
  const invoiceIssuanceDialogRef = ref();
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
    FinanceSystemApi.FinanceStatementQueryList.ResponseBody
  >({
    searchDefaults: {
      code: undefined,
      writeOffStatusCodes: undefined,
      amountType: 1,
      customerCodes: undefined,
      invoiceStatusCodes: undefined,
      maxAmount: undefined,
      minAmount: undefined,
      paymentDate: undefined,
      settlementOrgCodes: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { paymentDate } = searchData;
      return {
        ...omit(searchData, 'paymentDate'),
        startTime: paymentDate ? `${paymentDate[0]} 00:00:00` : undefined,
        endTime: paymentDate ? `${paymentDate[1]} 23:59:59` : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeStatementQueryList,
    onSuccess: () => {
      if (tableRef.value) {
        tableRef.value?.clearSelection();
      }
    },
  });
  const customerList = ref();
  const queryCustomerList = async () => {
    const res = await financeSystemApi.financeBasicQueryCustomerList({
      pageNum: 1,
      pageSize: 500,
      customerSources: ['02'],
    });
    customerList.value = res?.customerList || [];
  };
  queryCustomerList();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key == 'detail') {
      code.value = row.code;
      detailVisible.value = false;
      detailVisible.value = true;
    } else if (key == 'invoiceIssuance') {
      invoiceIssuanceDialogRef.value.open([row.code]);
    }
  };
  const tableRef = ref(null);
  // 勾选
  const codeList = ref([]);
  const selectedList = ref([]);
  const handleSelectionChange = (list) => {
    selectedList.value = [];
    codeList.value = [];
    if (list.length) {
      list.forEach((item) => {
        if (
          item.billingStatus !== 1 &&
          item.totalAmountTax &&
          item.currency === list[0]?.currency &&
          item.customerName === list[0]?.customerName
        ) {
          selectedList.value.push(item);
          codeList.value.push(item.code);
        } else {
          tableRef.value?.toggleRowSelection(item, false);
        }
      });
    }
  };
  const invoiceIssuance = () => {
    if (!codeList.value?.length) {
      ElMessage.warning('请先勾选数据');
      return;
    }
    invoiceIssuanceDialogRef.value.open(codeList.value);
  };
  const refreshListData = () => {
    refreshList();
    tableRef.value?.clearSelection();
  };
  const handleRefresh = async () => {
    await financeSystemApi.financeBasicPlatformRefresh({
      modelCode: 'settlement_form_data',
    });
    store.taskMap[refreshType.ToB收入结算单].apiSync = true;
    financeBudgetRefresh(user.token as string, refreshType.ToB收入结算单);
  };
  watch(
    () => store.taskMap[refreshType.ToB收入结算单].apiSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  onMounted(() => {
    financeBudgetRefresh(user.token as string, refreshType.ToB收入结算单);
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
