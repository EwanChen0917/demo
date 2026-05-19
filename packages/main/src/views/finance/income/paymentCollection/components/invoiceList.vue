<template>
  <el-form ref="formRef2" :model="listData" label-width="150" scroll-to-error>
    <KeenList
      :selected-num="codeList?.length"
      @refresh="refreshList"
      @reset-search="resetSearchData"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          v-model.trim="search.code"
          placeholder="发票号/订单号/客户PO"
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
          v-model="customerCodesValue"
          @change="customerCodesValueChange"
          clearable
          filterable
          :disabled="props.customerCodes !== undefined"
          placeholder="客户名称"
        >
          <el-option
            v-for="item in customerList"
            :key="item.customerCode"
            :label="item.customerName"
            :value="item.customerCode"
          />
        </el-select>
        <el-date-picker
          v-model="search.time"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="w-310px"
        />
        <el-select v-model="search.amountType" class="w-150px" placeholder="发票金额">
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
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        @selection-change="handleSelectionChange"
        row-key="code"
        :height="600"
        class-name="table-row-dashed"
      >
        <el-table-column
          type="selection"
          width="40"
          reserve-selection
          :selectable="
            (row) =>
              row.customerName !== null &&
              (selectList?.length === 0 ||
                !row.customerName ||
                row.customerName === selectList?.[0]?.customerName)
          "
          fixed="left"
        />
        <el-table-column label="发票号" prop="code" min-width="160" />
        <el-table-column label="发票净额" prop="invoiceNetAmount" min-width="160" />
        <el-table-column label="未核销金额" prop="unWriteOffAmount" min-width="160" />
        <el-table-column label="关联金额" min-width="160">
          <template #default="{ row, $index }">
            <NumberInput
              v-model="row.invoiceAmount"
              :precision="2"
              :min="0"
              :max="row?.unWriteOffAmount > 0 ? row?.unWriteOffAmount : 0"
              :disabled="row.disabled"
              @change="changeInvoiceAmount(row)"
              controls-position="right"
            />
          </template>
        </el-table-column>
        <el-table-column label="币别" prop="currency" />
        <el-table-column label="客户" prop="customerName" min-width="160" />
        <el-table-column label="订单号" prop="orderNumber" min-width="160" />
        <el-table-column label="客户PO" prop="customerPo" min-width="160" />
        <el-table-column label="日期" prop="invoiceDate" min-width="160" />
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
  import { omit } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import Decimal from 'decimal.js';

  const PAGE_SIZE = 10;
  const typeList = [
    { name: '发票净额', code: 9 },
    { name: '未核销金额', code: 8 },
  ];
  const customerCodesValue = ref();
  const tableRef = ref();
  const props = defineProps<{
    customerCodes: any; //客户有值不可选择，没值可以重新选择客户
    currency: string; //选择同一种币别
  }>();
  const emit = defineEmits(['correlationAmountChange']);
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
      amountType: 9,
      status: 2,
      type: 1,
      customerCodes: props.customerCodes,
      currency: props.currency,
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
    onSuccess: (res) => {
      if (res?.recordList?.length) {
        res?.recordList.forEach((item) => {
          Reflect.set(item, 'disabled', true);
          Reflect.set(item, 'invoiceNo', item.code);
          Reflect.set(item, 'invoiceAmount', item.unWriteOffAmount);
          Reflect.set(item, 'invoiceAmountMax', item.unWriteOffAmount);
        });
      }
      if (tableRef.value) {
        tableRef.value?.clearSelection();
      }
    },
  });
  emit('correlationAmountChange', 0, [], []);
  // 勾选
  const codeList = ref([]);
  const selectList = ref([]);
  const correlationAmount = ref(0);
  const clickNum = ref(true);
  const handleSelectionChange = (list) => {
    correlationAmount.value = 0;
    selectList.value = [];
    codeList.value = [];
    if (list.length) {
      list.forEach((item) => {
        if (!item.customerName || item.customerName === list[0]?.customerName) {
          selectList.value.push(item);
          codeList.value.push(item.code);
        } else {
          tableRef.value?.toggleRowSelection(item, false);
        }
      });
    }
    if (list.length !== codeList.value.length && clickNum.value) {
      ElMessage.warning('只能选择相同的客户的数据！');
      clickNum.value = false;
      setTimeout(() => {
        clickNum.value = true;
      }, 2000);
    }
    listData.value?.recordList.forEach((item) => {
      if (codeList.value.includes(item.invoiceNo)) {
        item.disabled = false;
        correlationAmount.value = Decimal.add(
          correlationAmount.value,
          item.invoiceAmount
        ).toNumber();
      } else {
        item.disabled = true;
      }
    });
    emit('correlationAmountChange', correlationAmount.value, selectList.value, codeList.value);
  };
  const changeInvoiceAmount = (row) => {
    correlationAmount.value = 0;
    listData.value?.recordList.forEach((item) => {
      if (codeList.value.includes(item.invoiceNo)) {
        correlationAmount.value = Decimal.add(
          correlationAmount.value,
          item.invoiceAmount
        ).toNumber();
      } else {
      }
    });
    row.invoiceAmountMax = row.invoiceAmount;
    emit('correlationAmountChange', correlationAmount.value, selectList.value, codeList.value);
  };

  const customerList = ref<string[]>([]);
  const queryCustomerList = async () => {
    const res = await financeSystemApi.financeBasicQueryCustomerList({
      pageNum: 1,
      pageSize: 500,
      customerSources: ['02'],
    });
    customerList.value = res?.customerList || [];
    if (props.customerCodes) {
      search.customerCodes = props.customerCodes;
      customerCodesValue.value = props.customerCodes[0];
    }
  };
  queryCustomerList();
  const customerCodesValueChange = () => {
    search.customerCodes = customerCodesValue.value ? [customerCodesValue.value] : undefined;
  };
  const resetSearchData = () => {
    customerCodesValue.value = props.customerCodes ? props.customerCodes[0] : undefined;
    search.customerCodes = customerCodesValue.value ? [customerCodesValue.value] : undefined;
    search.currency = props.currency ? props.currency : undefined;
    resetSearch();
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
