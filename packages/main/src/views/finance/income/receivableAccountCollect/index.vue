<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearchData"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #filters>
        <el-select
          v-model="search.customerCodes"
          :options="customerList"
          :props="{
              label: 'customerName',
              value: 'customerCode',
          }"
          multiple
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="客户"
        />
        <el-date-picker
          v-model="search.statisticsTime"
          type="date"
          :clearable="false"
          placeholder="选择统计时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
        <el-select v-model="search.currencyCode" :clearable="false" placeholder="币别">
          <el-option label="原币" value="1" />
          <el-option label="人民币" value="2" />
        </el-select>
        <el-select
          v-model="search.paymentConditions"
          :options="receiptConditionList"
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
          placeholder="收款条件"
        />
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
          placeholder="零应收起始日期"
          value-format="YYYY-MM-DD HH:mm:ss"
          v-if="!zeroBalanceNotDisplay"
        />
      </template>
      <template #buttons>
        <ExportBtn
          :service="financeSystemApi.financeAgingSummaryExport"
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
        row-key="key"
        class-name="table-row-dashed"
      >
        <el-table-column
          :label="item.label"
          :prop="item.key"
          :min-width="item.width"
          v-for="(item, index) in tableTitleListData"
          :key="index"
        >
          <template #default="{ row }">
            <div v-if="item.key == 'customerName'">
              <el-link type="primary" :underline="false" @click="openPage(row.customerCode)">
                {{ row[item.key] }}
              </el-link>
            </div>
            <div v-else>{{ row[item.key] }}</div>
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
  </div>
</template>

<script setup lang="ts" name="receivableAccountCollect">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, FinanceSystemApi } from '@/api';
  import dayjs from 'dayjs';
  import { omit } from 'lodash-es';
  const router = useRouter();
  const zeroBalanceNotDisplay = ref(true);
  const PAGE_SIZE = 20;
  const tableTitleList = [
    { label: '客户', key: 'customerName', width: '120px' },
    { label: '销售渠道', key: 'saleChannel', width: '120px' },
    { label: '部门', key: 'department', width: '120px' },
    { label: '币别', key: 'currency', width: '80px' },
    { label: '收款条件', key: 'paymentCondition', width: '120px' },
    { label: '订单金额', key: 'orderAmount', width: '120px' },
    { label: '佣金', key: 'commission', width: '120px' },
    { label: '销售运费', key: 'salesFreight', width: '120px' },
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
    { label: '应收余额', key: 'receivableBalance', width: '80px' },
    { label: '未逾期', key: 'notOverdue', width: '80px' },
    { label: '1-30天', key: 'oneToThirtyDays', width: '80px' },
    { label: '31-60天', key: 'thirtyOneToSixtyDays', width: '80px' },
    { label: '61-90天', key: 'sixtyOneToNinetyDays', width: '80px' },
    { label: '91-180天', key: 'ninetyOneToOneEightyDays', width: '80px' },
    { label: '181天及以上', key: 'oneEightyOneDays', width: '120px' },
    { label: '结算组织', key: 'settlementOrganization', width: '150px' },
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
    FinanceSystemApi.FinanceAgingSummaryStatistics.ResponseBody
  >({
    searchDefaults: {
      currencyCode: '1',
      customerCodes: undefined,
      noDataFeeColumnNotDisplay: true,
      paymentConditions: undefined,
      statisticsTime: dayjs().endOf('day').format('YYYY-MM-DD') + ' 00:00:00',
      zeroBalanceNotDisplay: true,
      zeroBalanceStartDate: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeAgingSummaryStatistics,
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
  // 收款条件
  const receiptConditionList = ref([]);
  const getReceiptConditionList = async () => {
    const res = await financeSystemApi.financeReceiptConditionQueryList({
      pageNum: 1,
      pageSize: 100,
    });
    receiptConditionList.value = res.receiptConditionList;
  };
  getReceiptConditionList();
  // 客户
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
  const openPage = (customerCode) => {
    router.push({
      name: 'receivableAccountDetails',
      query: { customerCode: customerCode },
    });
  };
</script>

<style scoped lang="scss"></style>
