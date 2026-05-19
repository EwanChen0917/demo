<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearchData"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.code" placeholder="结算单号/订单号/客户PO" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select v-model="search.customerCode" filterable clearable placeholder="客户">
          <el-option
            v-for="item in customerList"
            :key="item.customerCode"
            :label="item.customerName"
            :value="item.customerCode"
          />
        </el-select>
        <el-date-picker
          v-model="search.statisticsTime"
          type="date"
          :clearable="false"
          :editable="false"
          placeholder="选择统计时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
        <el-select v-model="search.currencyCode" :clearable="false" placeholder="币别">
          <el-option label="原币" value="1" />
          <el-option label="人民币" value="2" />
        </el-select>
        <el-checkbox label="无数据费用列不展示" v-model="search.noDataFeeColumnNotDisplay" />
        <el-checkbox
          label="应收余额为0不展示"
          v-model="zeroBalanceNotDisplay"
          @change="changeCheckedReceivable"
        />
        <el-date-picker
          v-model="search.zeroBalanceStartDate"
          type="date"
          :clearable="false"
          :editable="false"
          placeholder="零应收起始日期"
          value-format="YYYY-MM-DD HH:mm:ss"
          v-if="!zeroBalanceNotDisplay"
        />
      </template>
      <template #buttons>
        <ExportBtn
          :service="financeSystemApi.financeAgingDetailExport"
          :params="{
            ...search,
          }"
        >
          导出
        </ExportBtn>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="incomeStatementNo"
        class-name="table-row-dashed"
      >
        <el-table-column
          :label="item.label"
          :prop="item.key"
          :min-width="item.width"
          v-for="(item, index) in tableTitleListData"
          :key="index"
        />
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

<script setup lang="ts" name="receivableAccountDetails">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, FinanceSystemApi } from '@/api';
  import dayjs from 'dayjs';
  import { omit } from 'lodash-es';

  const route = useRoute();
  const zeroBalanceNotDisplay = ref(true);
  const PAGE_SIZE = 10;
  const tableTitleList = [
    { label: '客户', key: 'customerName', width: '80px' },
    { label: '月份', key: 'month', width: '80px' },
    { label: '客户PO', key: 'customerPo', width: '100px' },
    { label: '订单号', key: 'orderNo', width: '150px' },
    { label: '收入结算单号', key: 'incomeStatementNo', width: '160px' },
    { label: '币别', key: 'currency', width: '80px' },
    { label: '应收余额', key: 'receivableBalance', width: '80px' },
    { label: '订单金额', key: 'orderAmount', width: '80px' },
    { label: '佣金', key: 'commission', width: '80px' },
    { label: '线下推广费', key: 'offlinePromotionFee', width: '120px' },
    { label: 'Commission', key: 'cnCommission', width: '120px' },
    { label: '价格保护', key: 'priceProtection', width: '80px' },
    { label: '促销折扣', key: 'promotionDiscount', width: '80px' },
    { label: '线下损耗', key: 'offlineLoss', width: '80px' },
    { label: '线下签收差异', key: 'offlineSignDifference', width: '120px' },
    { label: 'RMA allowance', key: 'rmaAllowance', width: '120px' },
    { label: '客服退款', key: 'customerServiceRefund', width: '80px' },
    { label: '退款额', key: 'refundAmount', width: '80px' },
    { label: '客户补贴', key: 'customerSubsidy', width: '80px' },
    { label: '客户返点', key: 'customerCommission', width: '80px' },
    { label: '银行到账金额', key: 'bankReceiptAmount', width: '120px' },
    { label: '手续费', key: 'fee', width: '80px' },
    { label: '银行到账时间', key: 'bankReceiptTimes', width: '150px' },
    { label: '发货时间', key: 'deliveryTime', width: '150px' },
    { label: '到期日', key: 'expiryDate', width: '150px' },
    { label: '逾期天数', key: 'overdueDays', width: '80px' },
    { label: '状态', key: 'status', width: '80px' },
  ];
  const tableTitleListData = ref(tableTitleList);
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
    FinanceSystemApi.FinanceAgingDetail.ResponseBody
  >({
    searchDefaults: {
      currencyCode: '1',
      code: undefined,
      customerCode: undefined,
      noDataFeeColumnNotDisplay: true,
      statisticsTime: dayjs().endOf('day').format('YYYY-MM-DD') + ' 00:00:00',
      zeroBalanceNotDisplay: true,
      zeroBalanceStartDate: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeAgingDetail,
    onSuccess: (res) => {
      if (res?.recordList?.length) {
        tableTitleListData.value = res.headerBean?.headers?.map((item) => {
          return {
            label: item.desc,
            key: item.field,
          };
        });
        tableTitleListData.value.forEach((item) => {
          let find = tableTitleList.find((i) => i.label == item.label);
          if (find) {
            Reflect.set(item, 'width', find.width);
          }
          if (item.label == '客户编码') {
            Reflect.set(item, 'width', '100px');
          }
        });
      } else {
        tableTitleListData.value = tableTitleList;
      }
    },
  });
  const changeCheckedReceivable = () => {
    if (!zeroBalanceNotDisplay.value) {
      search.zeroBalanceStartDate = dayjs().format('YYYY') + '-01-01 00:00:00';
    } else {
      search.zeroBalanceStartDate = '';
    }
    search.zeroBalanceNotDisplay = zeroBalanceNotDisplay.value;
  };
  const customerList = ref([]);
  const queryCustomerList = async () => {
    const res = await financeSystemApi.financeBasicQueryCustomerList({
      pageNum: 1,
      pageSize: 500,
      customerSources: ['02'],
    });
    customerList.value = res?.customerList || [];
  };
  queryCustomerList();
  const resetSearchData = () => {
    zeroBalanceNotDisplay.value = true;
    resetSearch();
  };
  const initData = () => {
    if (!route?.query?.customerCode) return;
    search.customerCode = route?.query?.customerCode;
  };
  initData();
</script>

<style scoped lang="scss"></style>
