<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总记录数：
        <span class="text-bule text-num">{{ listData?.analysisResp?.totalCount }}</span>
      </span>
      <span>
        全部核销：
        <span class="text-green text-num">
          {{ listData?.analysisResp?.totalWriteOffAmount }}
        </span>
      </span>
      <span>
        部分核销：
        <span class="text-red text-num">
          {{ listData?.analysisResp?.partWriteOffAmount }}
        </span>
      </span>
      <span>
        未核销：
        <span class="text-grey text-num">
          {{ listData?.analysisResp?.notWriteOffAmount }}
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
          v-model.trim="search.keyword"
          placeholder="CN单号/费用L1-4 /费用详情"
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
        <el-select v-model="search.filterAmountType" class="w-150px" placeholder="金额">
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
            v-for="item in statusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </template>
      <template #buttons>
        <ExportBtn
          :service="financeSystemApi.financeCnOrderExportList"
          :params="{
            ...omit(search, 'time'),
            startTime: search?.time ? search?.time[0] : undefined,
            endTime: search?.time ? search?.time[1] : undefined,
          }"
        >
          导出
        </ExportBtn>
        <el-button class="button" type="primary" @click="writeOffData">核销</el-button>
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
              row.writeOffStatus !== status.全部核销 &&
              row.amount !== 0 &&
              (selectedList?.length === 0 ||
                ((!row.customerName || row.customerName === selectedList?.[0]?.customerName) &&
                  row.currency === selectedList?.[0]?.currency))
          "
          fixed="left"
        />
        <el-table-column label="CN单号" prop="code" min-width="130" />
        <el-table-column label="客户" prop="customerName" min-width="150" />
        <el-table-column label="申请日期" prop="applyTime" min-width="120" />
        <el-table-column label="币别" prop="currencyName" min-width="100" />
        <el-table-column label="金额" prop="amount" />
        <el-table-column label="费用L1" prop="feeL1" min-width="120" />
        <el-table-column label="费用L2" prop="feeL2" min-width="120" />
        <el-table-column label="费用L3" prop="feeL3" min-width="120" />
        <el-table-column label="费用L4" prop="feeL4" min-width="120" />
        <el-table-column label="费用详情" prop="feeDetails" min-width="120" />
        <el-table-column label="核销状态" prop="writeOffStatus" fixed="right" min-width="150">
          <template #default="{ row }">
            <Tag :color="statusColorMap[row?.writeOffStatus]">
              {{ row.writeOffStatusDesc || statusMap[row?.writeOffStatus] }}
            </Tag>
          </template>
        </el-table-column>
        <el-table-column label="核销金额" prop="writeOffAmount" fixed="right" width="200">
          <template #default="{ row }">
            <!-- 已关联发票金额/金额 × 100% -->
            <el-progress
              :percentage="(row.writeOffAmount / row.amount) * 100"
              :stroke-width="8"
              :show-text="false"
              status="success"
            />
            <div>{{ row.writeOffAmount || 0 }} / {{ row.amount }}</div>
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
                  label: '核销',
                  key: 'writeOff',
                  type: 'primary',
                  disabled: row.writeOffStatus == 1 || row.amount == 0,
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
      :code="code"
      :detailType="0"
      @close="detailVisible = false"
    />
  </div>
</template>

<script setup lang="ts" name="financeCNBills">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import detailDialog from './components/detailDialog.vue';
  import { omit } from 'lodash-es';
  import { useRoute, useRouter } from 'vue-router';
  import { status, statusColorMap, statusMap } from '@/views/finance/income/CNBills/enum';

  const PAGE_SIZE = 10;
  const router = useRouter();
  const statusList = [
    { name: '未核销', code: status.未核销 },
    { name: '部分核销', code: status.部分核销 },
    { name: '全部核销', code: status.全部核销 },
  ];
  const typeList = [
    { name: '金额', code: 0 },
    { name: '核销金额', code: 1 },
    { name: '剩余金额', code: 2 },
  ];
  const detailVisible = ref(false);
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
    { keyword?: string; pageNum: number; pageSize: number },
    FinanceSystemApi.FinancePayableBillQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      writeOffStatus: undefined,
      filterAmountType: 0,
      time: undefined,
      customerCodes: undefined,
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
    service: financeSystemApi.financeCnOrderQueryList,
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
    } else {
      router.push({
        name: 'financeWriteOff',
        query: { code: [row.code] },
      });
    }
  };
  //核销
  const writeOffData = () => {
    if (!codeList.value.length) return ElMessage.warning('请先勾选数据');
    router.push({
      name: 'financeWriteOff',
      query: { code: codeList.value },
    });
  };
  const tableRef = ref(null);
  // 勾选
  const codeList = ref([]);
  const selectedList = ref([]);
  const clickNum = ref(true);
  const handleSelectionChange = (list) => {
    selectedList.value = [];
    codeList.value = [];
    if (list.length) {
      list.forEach((item) => {
        if (
          (item.writeOffStatus == status.未核销 || item.writeOffStatus == status.部分核销) &&
          item.currency === list[0]?.currency &&
          (!item.customerName || item.customerName === list[0]?.customerName)
        ) {
          selectedList.value.push(item);
          codeList.value.push(item.code);
        } else {
          tableRef.value?.toggleRowSelection(item, false);
        }
      });
    }
    if (list.length !== codeList.value.length && clickNum.value) {
      ElMessage.warning('只能选择相同的客户和币别的数据！');
      clickNum.value = false;
      setTimeout(() => {
        clickNum.value = true;
      }, 2000);
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

    .text-bule {
      color: #75a3f4;
    }

    .text-green {
      color: #50cf7e;
    }

    .text-red {
      color: #ef6868;
    }
    .text-grey {
      color: #b6b6b6;
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
