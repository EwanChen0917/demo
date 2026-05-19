<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearchData"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.code"
        placeholder="发票号/订单号/客户PO"
        class="w-250px"
        clearable
        @change="handleBlur"
        @blur="handleBlur"
      >
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append>
          <BatchSearchPopover
            ref="batchSearchRef"
            @search="handleBatchSearch"
            @clear="handleBatchClear"
          />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        v-model="search.customerCodes"
        :options="customerList"
        multiple
        :props="{
          label: 'customerName',
          value: 'customerCode'
        }"
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="客户名称"
      />

      <el-date-picker
        v-model="search.time"
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
      <el-select v-model="search.writeOffStatus" clearable placeholder="核销状态">
        <el-option
          v-for="item in writeOffStatusMap"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
      <el-select v-model="search.status" clearable placeholder="单据状态">
        <el-option
          v-for="item in statusList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="importDialogRef?.open()">导入</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      @selection-change="handleSelectionChange"
      row-key="code"
      class-name="table-row-dashed"
    >
      <el-table-column label="发票号" prop="code" min-width="160" />
      <el-table-column label="日期" prop="invoiceDate" min-width="100" />
      <el-table-column label="金额" prop="amount" />
      <el-table-column label="税额" prop="taxAmount" />
      <el-table-column label="价税合计" prop="totalAmountTax" />
      <el-table-column label="佣金" prop="commission" />
      <el-table-column label="销售运费" prop="shippingFee" />
      <el-table-column label="发票净额" prop="invoiceNetAmount" />
      <el-table-column label="币别" prop="currency" />
      <el-table-column label="客户" prop="customerName" />
      <el-table-column label="订单号" prop="orderNumber" min-width="160" />
      <el-table-column label="客户PO" prop="customerPo" min-width="160" />
      <el-table-column label="核销金额" prop="writeOffAmount" fixed="right" width="200">
        <!-- 按核销金额/发票净额来显示进度 -->
        <template #default="{ row }">
          <el-progress
            :percentage="(row.writeOffAmount / row.invoiceNetAmount) * 100"
            :stroke-width="8"
            :show-text="false"
            status="success"
          />
          <div>{{ row.writeOffAmount || 0 }} / {{ row.invoiceNetAmount }}</div>
        </template>
      </el-table-column>
      <el-table-column label="单据状态" prop="statusDesc" fixed="right" width="100">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row?.status]">
            {{ row.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
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
                label: '审核',
                key: 'audit',
                type: 'primary',
                hide: row.status == 2,
                row: row,
              },
              {
                label: '反审核',
                key: 'reverseAudit',
                type: 'primary',
                hide: row.status == 1,
                row: row,
              },
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
                hide: row.status == 2,
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
    <!-- 导入 -->
    <importDialog ref="importDialogRef" @success="refreshList" />
  </KeenList>
</template>

<script setup lang="ts" name="salesInvoice">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi, erpApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import detailDialog from './components/detailDialog.vue';
  import { omit } from 'lodash-es';
  import { statusColorMap } from '@/views/finance/income/salesInvoice/enum';
  import { writeOffStatusMap } from '@/views/finance/income/incomeStatementToB/enum';
  import importDialog from './components/importDialog.vue';

  const PAGE_SIZE = 10;
  const statusList = [
    { name: '暂存', code: 1 },
    { name: '已审核', code: 2 },
  ];

  const typeList = [
    { name: '核销金额', code: 1 },
    { name: '金额', code: 2 },
    { name: '税额', code: 3 },
    { name: '价税合计', code: 4 },
  ];
  const detailVisible = ref(false);
  const importDialogRef = ref();
  const code = ref('');
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
    { code?: string; pageNum: number; pageSize: number },
    FinanceSystemApi.FinanceInvoiceQueryList.ResponseBody
  >({
    searchDefaults: {
      code: undefined,
      codes: undefined,
      amountType: 1,
      type: 0,
      customerCodes: undefined,
      status: undefined,
      writeOffStatus: undefined,
      time: undefined,
      maxAmount: undefined,
      minAmount: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { time } = searchData;
      return {
        ...omit(searchData, 'time'),
        startTime: time ? time[0] : undefined,
        endTime: time ? time[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeInvoiceQueryList,
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
  // 审核/反审核
  const financeInvoiceReviewData = async (status, codes) => {
    const isConfirmed = await swal.confirm(`请确认是否${status == 2 ? '审核' : '反审核'}该数据？`);
    if (!isConfirmed) return;
    await financeSystemApi.financeInvoiceReview({
      status: status, //审核状态 1.暂存 2.已审核
      codes: codes,
    });
    ElMessage.success(status == 2 ? '审核成功' : '反审核成功');
    runQuery();
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key == 'detail') {
      code.value = row.code;
      detailVisible.value = false;
      detailVisible.value = true;
    } else if (key == 'audit') {
      financeInvoiceReviewData(2, [row.code]);
    } else if (key == 'reverseAudit') {
      financeInvoiceReviewData(1, [row.code]);
    } else if (key == 'delete') {
      const isConfirmed = await swal.confirm('请确认是否删除数据？');
      if (!isConfirmed) return;
      await financeSystemApi.financeInvoiceDelete({
        code: row.code,
      });
      ElMessage.success('删除成功');
      runQuery();
    }
  };
  const tableRef = ref(null);
  // 勾选
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.code);
  };
  const batchSearchRef = ref();
  const handleBlur = (e) => {
    if (e.target?.value) {
      search.codes = [];
      batchSearchRef.value?.clear();
    }
  };
  const handleBatchClear = (val) => {
    search.codes = [];
  };
  const handleBatchSearch = (val) => {
    search.code = undefined;
    const str = val?.replace(/\n/g, ',');
    const arr = str.split(',').filter((item) => item.length > 0);
    console.log(arr);
    search.codes = arr;
  };
  const resetSearchData = () => {
    batchSearchRef.value?.clear();
    resetSearch();
  };
</script>

<style scoped lang="scss"></style>
