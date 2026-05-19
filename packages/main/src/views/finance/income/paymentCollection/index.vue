<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总记录数：
        <span class="text-bule text-num">{{ listData?.total }}</span>
      </span>
      <span>
        已关联发票：
        <span class="text-green text-num">
          {{ listData?.relateInvoiceStatics?.totalRelateInvoiceNum }}
        </span>
      </span>
      <span>
        未关联发票：
        <span class="text-red text-num">
          {{ listData?.relateInvoiceStatics?.totalNotRelateInvoiceNum }}
        </span>
      </span>
      <span>
        仅关联客户：
        <span class="text-grey text-num">
          {{ listData?.relateInvoiceStatics?.totalOnlyRelateCustomerNum }}
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
          placeholder="单据编号/发票号/对方账户名/我方银行"
          class="w-350px"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select v-model="search.status" clearable placeholder="全部状态">
          <el-option
            v-for="item in statusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          v-model="search.customerCodeList"
          :options="customerList"
          multiple
          :props="{ label: 'customerName', value: 'customerCode' }"
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="客户名称"
        />
        <el-select
          v-model="search.ourBankAccountList"
          :options="accountList"
          multiple
          :props="{ label: 'bankAccount', value: 'bankAccount' }"
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="我方银行账号"
        />
        <el-select
          v-model="search.collectionOrgList"
          :options="collectionOrgLists"
          multiple
          :props="{ label: 'name', value: 'code' }"
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="收款组织"
        />
        <el-date-picker
          v-model="search.paymentDate"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="收款开始日期"
          end-placeholder="收款结束日期"
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
      </template>
      <template #buttons>
        <el-button class="button" type="primary" @click="registerDialogRef.open('')">
          登记
        </el-button>
        <el-button type="primary" @click="collectionClaimData">认领</el-button>
        <el-button type="primary" @click="importDialogRef?.open()">导入</el-button>
        <ExportBtn
          :service="financeSystemApi.financePaymentCollectionExportList"
          :params="{
            ...omit(search, 'paymentDate'),
            startDate: search?.paymentDate ? search?.paymentDate[0] : undefined,
            endDate: search?.paymentDate ? search?.paymentDate[1] : undefined,
          }"
        >
          导出
        </ExportBtn>
        <!-- <el-button class="button" type="danger" :loading="batchDeleteLoading" @click="batchDelete">
          批量删除
        </el-button> -->
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
              (row.status == status.认领客户 ||
                row.status == status.部分认领 ||
                row.status == status.待认领) &&
              (selectedList?.length === 0 ||
                ((!row.customerName || row.customerName === selectedList?.[0]?.customerName) &&
                  row.currency === selectedList?.[0]?.currency))
          "
          fixed="left"
        />
        <el-table-column label="单据编号" prop="code" min-width="160" />
        <el-table-column label="收款日期" prop="collectionDate" min-width="120" />
        <el-table-column label="对方账户名" prop="customerAccountName" min-width="120" />
        <el-table-column label="币别" prop="currency" />
        <el-table-column label="金额" prop="amount" min-width="100" />
        <el-table-column label="到账金额" prop="receivedAmount" width="80" />
        <el-table-column label="手续费" prop="serviceCharge" width="80" />
        <el-table-column label="收款组织" prop="collectionOrgDesc" min-width="150" />
        <el-table-column label="我方银行账号" prop="ourBankAccount" min-width="150" />
        <el-table-column label="我方银行" prop="ourBank" min-width="150" />
        <el-table-column label="对方银行账号" prop="customerBankAccount" min-width="150" />
        <el-table-column label="对方银行" prop="customerBank" min-width="150" />
        <el-table-column label="客户" prop="customerName" min-width="150" />
        <el-table-column label="发票号" prop="invoiceNo" min-width="150" />
        <el-table-column label="关联发票金额" prop="relatedInvoiceAmount" fixed="right" width="200">
          <template #default="{ row }">
            <!-- 已关联发票金额/金额 × 100% -->
            <el-progress
              :percentage="(row.relatedInvoiceAmount / row.amount) * 100"
              :stroke-width="8"
              :show-text="false"
              status="success"
            />
            <div>{{ row.relatedInvoiceAmount || 0 }} / {{ row.amount }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="statusDesc" fixed="right" width="100">
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
                  label: '查看',
                  key: 'detail',
                  type: 'primary',
                  row: row,
                },
                {
                  label: '编辑',
                  key: 'edit',
                  type: 'primary',
                  hide: row.status !== status.待发布,
                  row: row,
                },
                {
                  label: '发布',
                  key: 'publish',
                  type: 'primary',
                  hide: row.status !== status.待发布,
                  row: row,
                },
                {
                  label: '撤销发布',
                  key: 'revocation',
                  type: 'primary',
                  hide: row.status !== status.待认领,
                  row: row,
                },
                {
                  label: '撤销认领',
                  key: 'cancelContact',
                  type: 'primary',
                  hide: row.status == status.待发布 || row.status == status.待认领,
                  row: row,
                },
                {
                  label: '认领',
                  key: 'contact',
                  type: 'primary',
                  hide: row.status == status.待发布 || row.status == status.全部认领,
                  row: row,
                },

                {
                  label: '删除',
                  key: 'delete',
                  hide: row.status !== status.待发布,
                  type: 'error',
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
      @close="detailVisible = false"
    />
    <!-- 登记 -->
    <registerDialog ref="registerDialogRef" @success="refreshList" />
    <!-- 导入 -->
    <importDialog ref="importDialogRef" @success="refreshList" />
  </div>
</template>

<script setup lang="ts" name="paymentCollection">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi, dataApi, financeApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import detailDialog from './components/detailDialog.vue';
  import registerDialog from './components/registerDialog.vue';
  import importDialog from './components/importDialog.vue';
  import { omit } from 'lodash-es';
  import { useRoute, useRouter } from 'vue-router';
  import { status, statusColorMap } from '@/views/finance/income/paymentCollection/enum';
  import OrganizationSelect from '@/views/finance/income/incomeRule/components/organizationSelect.vue';

  const PAGE_SIZE = 10;
  const router = useRouter();
  const statusList = [
    { name: '待发布', code: 0 },
    { name: '待认领', code: 1 },
    { name: '认领客户', code: 2 },
    { name: '部分认领', code: 3 },
    { name: '全部认领', code: 4 },
  ];
  const typeList = [
    { name: '金额', code: 0 },
    { name: '已关联发票金额', code: 1 },
    { name: '未关联发票金额', code: 2 },
  ];
  const detailVisible = ref(false);
  const code = ref('');
  const registerDialogRef = ref();
  const importDialogRef = ref();
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
      status: undefined,
      filterAmountType: 0,
      paymentDate: undefined,
      maxAmount: undefined,
      minAmount: undefined,
      customerCodeList: undefined,
      ourBankAccountList: undefined,
      collectionOrgList: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { paymentDate } = searchData;
      return {
        ...omit(searchData, 'paymentDate'),
        startDate: paymentDate ? paymentDate[0] : undefined,
        endDate: paymentDate ? paymentDate[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financePaymentCollectionQueryList,
  });
  const currencyList = ref<any[]>([]);
  const getCurrencyOptions = async () => {
    const res = await dataApi.luteosDataQueryCurrencyList();
    currencyList.value = res.currencyList || [];
  };
  getCurrencyOptions();
  const customerList = ref();
  const accountList = ref();
  const collectionOrgLists = ref();
  const queryCustomerList = async () => {
    const res = await financeSystemApi.financeBasicQueryCustomerList({
      pageNum: 1,
      pageSize: 500,
      customerSources: ['02'],
    });
    customerList.value = res?.customerList || [];
  };
  queryCustomerList();
  // 我方银行账号下拉
  const getQueryBankAccountList = async () => {
    const res = await financeSystemApi.financeBasicQueryBankAccountList({
      pageNum: 1,
      pageSize: 1000,
    });
    accountList.value = res.recordList;
  };
  getQueryBankAccountList();
  // 收款组织下拉
  const getopenOrgListList = async () => {
    const res = await financeApi.luteosFinanceSettlementOrganizationList({
      pageNum: 1,
      pageSize: 100,
    });
    collectionOrgLists.value = res.list;
  };
  getopenOrgListList();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'publish') {
      const isConfirm = await swal.confirm('确认发布吗？');
      if (!isConfirm) return;
      const res = await financeSystemApi
        .financePaymentCollectionPublish({
          code: row.code,
        })
        .catch(() => {
          runQuery();
        });
      if (res) {
        ElMessage.success('发布成功');
        runQuery();
      }
    } else if (key === 'revocation') {
      const isConfirm = await swal.confirm('确认撤销发布吗？');
      if (!isConfirm) return;
      const res = await financeSystemApi
        .financePaymentCollectionRevocation({
          code: row.code,
        })
        .catch(() => {
          runQuery();
        });
      if (res) {
        ElMessage.success('撤销发布成功');
        runQuery();
      }
    } else if (key === 'delete') {
      const isConfirm = await swal.confirm('确认删除吗？');
      if (!isConfirm) return;
      const res = await financeSystemApi
        .financePaymentCollectionBatchDelete([row.code])
        .catch(() => {
          runQuery();
        });
      if (res) {
        ElMessage.success('删除成功');
        runQuery();
      }
    } else if (key == 'detail') {
      code.value = row.code;
      detailVisible.value = false;
      detailVisible.value = true;
    } else if (key == 'edit') {
      registerDialogRef.value.open(row.code);
    } else if (key == 'cancelContact') {
      let currencyObj = currencyList.value.find((item) => item.currencyCode == row.currency);
      let currencySymbol = '';
      let currencyName = row.currency;
      if (currencyObj) {
        currencySymbol = currencyObj.currencySymbol || '';
        currencyName = currencyObj.currencyName || row.currency;
      }
      if (row.status !== 2 && row.customerCode) {
        // 先查询该客户当前可用额度，是否大于等于撤销认领/反核销的金额：
        // 查询客户信用额度
        const creditLimit = await financeSystemApi.financeStatementQueryCreditLimit({
          customerCodeList: [row.customerCode],
        });
        // 可用额度
        if (creditLimit && creditLimit?.creditLimitBeans?.length) {
          const availableLimit = creditLimit?.creditLimitBeans[0]?.availableLimit;
          if (availableLimit < row.writeOffAmount) {
            ElMessage.success('额度不足，不允许撤销认领');
            return;
          } else {
            //仅针对关联发票的反核销提示
            const isConfirm = await swal.confirmHtml(
              `<h2 style="color: var(---N9, #1f1f1f)!important;font-size: 15px;">确认撤销认领后，将按收款单撤销认领的金额，减少该客户信用额度：
        <span style="color:var(--el-color-danger)!important;">${currencySymbol}${row.relatedInvoiceAmount} ${currencyName}</span>，是否继续？</h2>`
            );
            if (!isConfirm) return;
            cancelClaim(row, '', 1);
          }
        } else {
          cancelClaim(row, '客户信用额度不存在，无法调整信用额度。是否继续撤销认领？', 0);
        }
      } else {
        cancelClaim(row, '确认撤销认领吗？', 0);
      }
    } else if (key == 'contact') {
      router.push({
        name: 'collectionClaim',
        query: { code: [row.code] },
      });
    }
  };
  const cancelClaim = async (row, tip, adjustCreditLimit) => {
    if (tip) {
      const isConfirm = await swal.confirm(tip);
      if (!isConfirm) return;
    }
    const res = await financeSystemApi
      .financePaymentCollectionCancelClaim({ code: row.code, adjustCreditLimit: adjustCreditLimit })
      .catch(() => {
        runQuery();
      });
    if (res) {
      ElMessage.success('撤销认领成功');
      runQuery();
    }
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
          (item.status == status.认领客户 ||
            item.status == status.部分认领 ||
            item.status == status.待认领) &&
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
      ElMessage.warning('同一个客户或客户为空且相同币种的数据方可批量认领！');
      clickNum.value = false;
      setTimeout(() => {
        clickNum.value = true;
      }, 2000);
    }
    // let customerNames = list.map((item) => item.customerName);
    // console.log(customerNames);
    // const map = new Map();
    // customerNames = customerNames.filter(
    //   (item) => !map.has(JSON.stringify(item)) && map.set(JSON.stringify(item), true)
    // );
    // console.log(customerNames);
    // if (customerNames.length > 1) {
    //   ElMessage.error('已选发票不属于同一客户，请重新选择');
    //   return;
    // }
    // codeList.value = list.map((item) => item.code);
  };
  // 批量删除
  const batchDeleteLoading = ref(false);
  const batchDelete = async () => {
    try {
      if (!codeList.value.length) return ElMessage.warning('请先勾选数据');
      const confirmed = await swal.confirm(`确定要删除吗？`);
      if (!confirmed) return;
      batchDeleteLoading.value = true;
      const res = await financeSystemApi.financePaymentCollectionBatchDelete(codeList.value);
      if (res) {
        ElMessage.success('删除成功');
        refreshList();
        tableRef.value?.clearSelection();
      } else {
        ElMessage.error('删除失败，请稍后再试');
      }
    } finally {
      batchDeleteLoading.value = false;
    }
  };
  // 批量认领
  const collectionClaimData = async () => {
    if (!codeList.value.length) return ElMessage.warning('请先勾选数据');
    router.push({
      name: 'collectionClaim',
      query: { code: codeList.value },
    });
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
