<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总记录数：
        <span class="text-bule text-num">{{ listData?.total }}</span>
      </span>
      <span>
        推送成功：
        <span class="text-green text-num">{{ listData?.totalPushSuccessNum }}</span>
      </span>
      <span>
        推送失败：
        <span class="text-red text-num">{{ listData?.totalPushFailNum }}</span>
      </span>
      <span>
        未推送：
        <span class="text-bule text-num">{{ listData?.totalNotPushNum }}</span>
      </span>
    </el-row>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearchData"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          v-model.trim="search.keyword"
          placeholder="SRM对账单单号/成本调整单编号/应付调整单编号/采购发票编号"
          class="w-450px"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select v-model="diffType" clearable placeholder="差异类型" class="w-125px">
          <el-option
            v-for="item in differenceList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          v-model="compareType"
          @change="changeCompareValue"
          clearable
          placeholder="比较符"
          class="w-100px"
        >
          <el-option
            v-for="item in symbolList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-input
          :disabled="!compareType && compareType !== 0"
          v-model.trim="search.compareValue"
          oninput="if(value.length>12)value=value.slice(0,12)"
          type="number"
          class="w-150px"
        />
        <el-select
          v-model="search.searchTimeType"
          @change="search.invoiceConfirmDate = undefined"
          placeholder="查询时间类型"
          class="w-135px"
        >
          <el-option
            v-for="item in timeSearchType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-date-picker
          v-model="search.invoiceConfirmDate"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          :start-placeholder="
            search.searchTimeType == 1 ? '付款申请通过开始日期' : '发票确认开始日期'
          "
          :end-placeholder="
            search.searchTimeType == 1 ? '付款申请通过结束日期' : '发票确认结束日期'
          "
          class="w-310px"
        />
        <el-select v-model="search.pushStatus" clearable placeholder="推送状态" class="w-125px">
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
          :service="financeSystemApi.financeBasicExportQueryRecOrderList"
          :params="{
            ...omit(search, ['invoiceConfirmDate', 'compareValue']),
            compareType: compareType,
            diffType: diffType,
            compareValue: search.compareValue,
            typeStartTime: search.invoiceConfirmDate
              ? `${search.invoiceConfirmDate[0]} 00:00:00`
              : undefined,
            typeEndTime: search.invoiceConfirmDate
              ? `${search.invoiceConfirmDate[1]} 23:59:59`
              : undefined,
          }"
        >
          导出
        </ExportBtn>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recOrderList"
        row-key="srmRecBillNo"
        class-name="table-row-dashed"
      >
        <el-table-column label="SRM对账单单号" prop="srmRecBillNo" min-width="150" />
        <el-table-column label="公司代码" prop="companyCode" min-width="100" />
        <el-table-column label="公司名称" prop="companyName" min-width="220" />
        <el-table-column label="供应商ERP编码" prop="supplierCode" min-width="150" />
        <el-table-column label="供应商名称" prop="supplierName" min-width="240" />
        <el-table-column label="发票未税金额" prop="invoiceNetAmount" min-width="150" />
        <el-table-column label="发票税额" prop="invoiceTaxAmount" min-width="150" />
        <el-table-column label="对账单未税金额" prop="recNetAmount" min-width="150" />
        <el-table-column label="对账单税额" prop="recTaxAmount" min-width="150" />
        <el-table-column label="未税差异" prop="diffNetAmount" min-width="150" />
        <el-table-column label="税额差异" prop="diffTaxAmount" min-width="150" />
        <el-table-column label="发票确认时间" prop="invoiceConfirmTime" min-width="150" />
        <el-table-column label="付款申请通过时间" prop="paymentApprovaledTime" min-width="150" />
        <el-table-column label="成本调整单编号" prop="costAdjustBillNo" min-width="150" />
        <el-table-column label="应付调整单编号" prop="payableAdjustBillNo" min-width="150" />
        <el-table-column label="采购发票编号" prop="invoiceBillNo" min-width="150" />
        <el-table-column label="推送金蝶" prop="pushStatusDesc" width="120">
          <template #default="{ row }">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <div style="max-width: 600px; color: var(--bs-danger)" v-if="row.pushStatus == 2">
                  {{ `推送失败：${row.failReason}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row.pushStatus == 1"
                >
                  {{ `推送成功，最近推送时间：${row.pushTime}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row.pushStatus == 0"
                >
                  未推送
                </div>
              </template>
              <el-icon style="color: var(--bs-danger)" :size="20" v-if="row.pushStatus == 2">
                <WarningFilled />
              </el-icon>
              <el-icon style="color: var(--bs-success)" :size="20" v-if="row.pushStatus == 1">
                <CircleCheckFilled />
              </el-icon>
              <el-icon style="color: #b6b6b6" :size="20" v-if="row.pushStatus == 0">
                <RemoveFilled />
              </el-icon>
            </el-tooltip>
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
                  label: '推送',
                  key: 'push',
                  type: 'primary',
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
    <!-- 单据详情 -->
    <detailDialog
      v-if="detailVisible"
      :visible="detailVisible"
      :code="srmRecBillNo"
      @close="detailVisible = false"
    />
  </div>
</template>

<script setup lang="ts" name="billInvoiceDifference">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';
  import detailDialog from './components/detailDialog.vue';

  const PAGE_SIZE = 10;
  const differenceList = [
    { name: '未税差异', code: 0 },
    { name: '税额差异', code: 1 },
  ];
  const timeSearchType = [
    { name: '付款申请通过时间', code: 1 },
    { name: '发票确认时间', code: 2 },
  ];
  // 比较符: 0-不等于 1-大于 2-等于 3-小于 4-大于等于 5-小于等于
  const symbolList = [
    { name: '≠', code: 0 },
    { name: '>', code: 1 },
    { name: '=', code: 2 },
    { name: '<', code: 3 },
    { name: '>=', code: 4 },
    { name: '<=', code: 5 },
  ];
  const statusList = [
    { name: '未推送', code: 0 },
    { name: '推送成功', code: 1 },
    { name: '推送失败', code: 2 },
  ];
  const detailVisible = ref(false);
  const srmRecBillNo = ref('');
  const compareType = ref(undefined);
  const diffType = ref(undefined);
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
    FinanceSystemContracts.RecOrderListQueryResp
  >({
    searchDefaults: {
      keyword: undefined,
      diffType: diffType.value,
      compareType: compareType.value,
      searchTimeType: 1,
      compareValue: undefined,
      pushStatus: undefined,
      invoiceConfirmDate: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { compareValue, invoiceConfirmDate } = searchData;
      return {
        ...omit(searchData, ['invoiceConfirmDate', 'compareValue']),
        compareType: compareType.value,
        diffType: diffType.value,
        compareValue,
        typeStartTime: invoiceConfirmDate ? `${invoiceConfirmDate[0]} 00:00:00` : undefined,
        typeEndTime: invoiceConfirmDate ? `${invoiceConfirmDate[1]} 23:59:59` : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryRecOrderList,
  });
  watch(listData, () => {
    listData.value?.productList?.forEach((item) => {
      Reflect.set(item, 'edit', false);
    });
  });
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'push') {
      const text = row.pushStatus == 1 ? '该数据已推送，是否覆盖？' : '确认推送吗？';
      const isConfirm = await swal.confirm(text);
      if (!isConfirm) return;
      const res = await financeSystemApi
        .financeBasicSyncKingdeeBill({ billNo: row?.srmRecBillNo, billType: 8 })
        .catch(() => {
          runQuery();
        });
      if (res) {
        ElMessage.success('推送成功');
        runQuery();
      }
    } else if (key == 'detail') {
      srmRecBillNo.value = row.srmRecBillNo;
      detailVisible.value = false;
      detailVisible.value = true;
    }
  };
  // 清空比较符，清空比较值
  const changeCompareValue = () => {
    search.compareValue = undefined;
  };
  const runQuery_ = () => {
    console.log(compareType.value);
    if (
      compareType.value !== '' &&
      compareType.value !== undefined &&
      search.compareValue == undefined
    ) {
      search.compareValue = '0';
      runQuery();
    } else {
      runQuery();
    }
  };
  const resetSearchData = () => {
    compareType.value = '';
    diffType.value = undefined;
    resetSearch();
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

    .text-bule {
      color: #75a3f4;
    }

    .text-green {
      color: #50cf7e;
    }

    .text-red {
      color: #ef6868;
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
