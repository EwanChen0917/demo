<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总记录数：
        <span class="text-bule text-num">{{ listData?.total }}</span>
      </span>
      <span>
        已推送：
        <span class="text-green text-num">
          {{ listData?.relateSystemStatics?.totalRelateNumKingdee }}
        </span>
      </span>
      <span>
        推送失败：
        <span class="text-red text-num">
          {{ listData?.relateSystemStatics?.totalFailRelatedNumKingdee }}
        </span>
      </span>
      <span>
        未推送：
        <span class="text-grey text-num">
          {{ listData?.relateSystemStatics?.totalNotRelateNumKingdee }}
        </span>
      </span>
    </el-row>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #filters>
        <el-input
          style="width: 360px"
          v-model="searchValue"
          @clear="handleBatchClear"
          @change="handleBatchChange"
          placeholder="请输入"
          clearable
        >
          <template #prepend>
            <el-select v-model="searchType" @change="handleBatchChange" style="width: 100px">
              <el-option v-for="(val, key) in searchTypeMap" :value="key" :label="val" :key="key" />
            </el-select>
          </template>
          <template #suffix>
            <i class="iconfont icon-sousuo"></i>
          </template>
          <template #append>
            <BatchSearchPopover
              ref="batchSearchRef"
              @clear="handleBatchClear"
              @search="handleBatchSearch"
            />
          </template>
        </el-input>
        <el-select
          v-model="search.customerCodes"
          placeholder="客户"
          clearable
          multiple
          filterable
          :teleported="true"
          collapse-tags
          collapse-tags-tooltip
          :options="customList"
          :props="{
            label: 'customerName',
            value: 'customerCode',
          }"
        />
        <el-date-picker
          v-model="search.createTimeRange"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          class="w-250px"
        />
        <el-select
          v-model="search.kingdeePushStatus"
          placeholder="推送状态"
          filterable
          clearable
          multiple
          style="width: 200px"
          :teleported="false"
        >
          <el-option v-for="(value, key) in pushStatus" :key="key" :label="key" :value="value" />
        </el-select>
        <el-select
          v-model="search.typeList"
          placeholder="订单类型"
          multiple
          clearable
          style="width: 200px"
        >
          <el-option label="B2B订单" :value="1" />
          <el-option label="Shopify订单" :value="4" />
          <el-option v-if="false" label="tiktok订单" :value="2" />
          <el-option label="内购订单" :value="3" />
          <el-option label="领用订单" :value="-1" />
          <el-option label="红人订单" :value="0" />
        </el-select>
      </template>
      <template #buttons>
        <el-button type="primary" @click="handlerExport">导出</el-button>
        <el-dropdown @command="doPushRows">
          <el-button type="primary" :loading="markLoading">
            推送
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="batchPush">推送所选</el-dropdown-item>
              <el-dropdown-item command="batchSearchPush">按筛选条件推送</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <BatchOperatePophover name="推送成功标识" type="primary" :options="exportActions" />
      </template>
      <template #default>
        <el-table ref="tableRef" v-loading="listLoading" :data="listData?.recordList">
          <el-table-column type="selection" width="55" fixed="left" />
          <el-table-column label="单据编号" prop="code" min-width="120" fixed="left" />
          <el-table-column label="订单类型" prop="typeDesc" min-width="120" />
          <el-table-column label="出库单号" prop="outStockCode" min-width="120" />
          <el-table-column label="订单号" prop="platformCode" min-width="120" />
          <el-table-column label="客户" prop="customerName" min-width="120">
            <template #default="{ row }">
              {{ row.customerName || row.customerCode }}
            </template>
          </el-table-column>
          <el-table-column label="日期" prop="outTime" min-width="120" />
          <el-table-column label="物流渠道" prop="shippingName" min-width="120" />
          <el-table-column label="销售组织编码" prop="salesOrgCode" min-width="120" />
          <el-table-column label="销售组织" prop="salesOrgName" min-width="120" />
          <el-table-column label="库存组织编码" prop="stockOrgCode" min-width="120" />
          <el-table-column label="库存组织" prop="stockOrgName" min-width="120" />
          <el-table-column label="金蝶单据一" prop="kingdeePushInfo_pushStatusDesc" min-width="220">
            <template #default="{ row }">
              <template v-if="row.kingdeePushInfo1?.pushStatus === pushStatus.推送成功">
                <div>
                  {{ row.kingdeePushInfo1.billTypeDesc }}
                  <el-tag type="success">生成成功</el-tag>
                </div>
                <div>单号: {{ row.kingdeePushInfo1.number }}</div>
                <div>生成时间： {{ row.kingdeePushInfo1.pushTime }}</div>
              </template>
              <template v-else-if="row.kingdeePushInfo1?.pushStatus === pushStatus.推送失败">
                <div>
                  {{ row.kingdeePushInfo1.billTypeDesc }}
                  <el-tag type="danger">生成失败</el-tag>
                </div>
                <div>单号: -</div>
                <div>失败原因： {{ row.kingdeePushInfo1.failReason }}</div>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="金蝶单据二" prop="kingdeePushInfo_pushStatusDesc" min-width="220">
            <template #default="{ row }">
              <template v-if="row.kingdeePushInfo2?.pushStatus === pushStatus.推送成功">
                <div>
                  {{ row.kingdeePushInfo2.billTypeDesc }}
                  <el-tag type="success">生成成功</el-tag>
                </div>
                <div>单号: {{ row.kingdeePushInfo2.number }}</div>
                <div>生成时间： {{ row.kingdeePushInfo2.pushTime }}</div>
              </template>
              <template v-else-if="row.kingdeePushInfo2?.pushStatus === pushStatus.推送失败">
                <div>
                  {{ row.kingdeePushInfo2.billTypeDesc }}
                  <el-tag type="danger">生成失败</el-tag>
                </div>
                <div>单号: -</div>
                <div>失败原因： {{ row.kingdeePushInfo2.failReason }}</div>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="organizationDeptName" min-width="120" />
          <el-table-column label="收款条件" prop="paymentTermsDesc" min-width="120" />
          <el-table-column label="推送状态" prop="pushStatusDesc" min-width="120" />
          <el-table-column label="是否需报关" prop="isCustomsDesc" min-width="120" />
          <el-table-column label="MSKU" prop="sellerSku" min-width="120" />
          <el-table-column label="供应链SKU" prop="supplySku" min-width="120" />
          <el-table-column label="产品SKU" prop="skuCode" min-width="120" />
          <el-table-column label="产品名称" prop="productName" min-width="120" />
          <el-table-column label="数量" prop="num" min-width="120" />
          <el-table-column label="币别" prop="currencyName" min-width="120" />
          <el-table-column label="单价" prop="price" min-width="120">
            <template #default="{ row }">
              {{ (+row.price || 0).toFixed(4) }}
            </template>
          </el-table-column>
          <el-table-column label="税率" prop="taxRate" min-width="120">
            <template #default="{ row }">
              {{ (+row.taxRate || 0).toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column label="含税单价" prop="taxPrice" min-width="120" />
          <el-table-column label="金额" prop="notTaxAmount" min-width="120" />
          <el-table-column label="税额" prop="tax" min-width="120" />
          <el-table-column label="价税合计" prop="taxAmount" min-width="120" />
          <el-table-column label="销售运费" prop="sharedSalesFreightAmount" min-width="120" />
          <el-table-column label="运费" prop="sharedFreightAmount" min-width="120" />
          <el-table-column label="折扣额" prop="sharedDiscountAmount" min-width="120" />
          <el-table-column label="佣金" prop="sharedCommission" min-width="120" />
          <el-table-column label="仓库" prop="warehouseName" min-width="120">
            <template #default="{ row }">
              {{ row.warehouseName || row.warehouseCode }}
            </template>
          </el-table-column>
          <el-table-column label="line.item_id" prop="itemId" min-width="120" />
          <el-table-column label="操作" min-width="120" fixed="right">
            <template #default="{ row }">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '推送',
                    key: 'push',
                    type: 'primary',
                    text: true,
                    row: row,
                    hide: !(
                      row.pushStatus === pushStatus.推送失败 || row.pushStatus === pushStatus.未推送
                    ),
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
      </template>
    </KeenList>
  </div>
  <FailDialog ref="failDialogRef" />
</template>

<script setup lang="ts" name="wmsSalesOutStockBill">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import dayjs from 'dayjs';
  import FailDialog from '@/views/finance/income/incomeAnalysis/components/failDialog.vue';
  import { openWindow } from '@/utils';
  import { pushStatus, markStatus } from './enum';

  const PAGE_SIZE = 10;
  const tableRef = ref(null);
  const searchType = ref('orderCodeKeyword');
  const searchValue = ref('');
  const searchTypeMap = {
    orderCodeKeyword: '单据编号',
    outStockCodeKeyword: '出库单号',
    saleOrderCodesKeyword: '订单号',
  };
  const customList = ref([]);
  const getCustomerList = async () => {
    const res = await financeSystemApi.financeBasicQueryCustomerList({
      pageNum: 1,
      pageSize: 1000,
      customerSources: ['02'],
    });
    customList.value = res.customerList || [];
  };
  getCustomerList();

  const buildQueryParams = (params) => {
    const [start, end] = params.createTimeRange || [];
    return {
      ...params,
      createTimeRange: undefined,
      outTimeEnd: end || undefined,
      outTimeStart: start || undefined,
    };
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
    refreshList,
    resetSearch,
  } = useList({
    searchDefaults: {
      codeKeyword: '',
      createTimeRange: [
        dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD'),
      ],
      kingdeePushStatus: [],
      customerCodes: [],
      codeList: [],
      orderCodeKeyword: undefined,
      outStockCodeKeyword: undefined,
      saleOrderCodesKeyword: undefined,
      typeList: [],
    },
    pageSize: PAGE_SIZE,
    service: (params) => {
      const newParams = buildQueryParams(params);
      tableRef.value?.clearSelection?.();
      return financeSystemApi.financeSalesOutStockOrderQueryList(newParams);
    },
  });

  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'push') {
      const isConfirmed = await swal.confirm('确认推送吗？');
      if (!isConfirmed) return;
      doPush({ codeList: [row.code] });
    }
  };
  const handleBatchClear = () => {
    search.orderCodeKeyword = undefined;
    search.outStockCodeKeyword = undefined;
    search.saleOrderCodesKeyword = undefined;
  };
  const handleBatchSearch = (val) => {
    handleBatchClear();
    searchValue.value = '';
    search[searchType.value] = val?.replace(/\n/g, ',');
  };
  const handleBatchChange = () => {
    handleBatchClear();
    search[searchType.value] = searchValue.value;
  };

  const exportActions = [
    {
      title: '标记所选',
      fn: async () => {
        const dataList = getCheckedData();
        if (!dataList?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const codeList = dataList.map((item) => item.code);
        markPushStatus('标记推送成功', markStatus.标记, { codeList });
      },
    },
    {
      title: '按筛选条件标记',
      fn: async () => {
        const query = buildQueryParams(search);
        markPushStatus('标记推送成功', markStatus.标记, query);
      },
    },
    {
      title: '取消标记所选',
      fn: async () => {
        const dataList = getCheckedData();
        if (!dataList?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const codeList = dataList.map((item) => item.code);
        markPushStatus('取消标记推送成功', markStatus.取消标记, { codeList });
      },
    },
    {
      title: '按筛选条件取消标记',
      fn: async () => {
        const query = buildQueryParams(search);
        markPushStatus('取消标记推送成功', markStatus.取消标记, query);
      },
    },
  ];

  const markPushStatus = async (tip, status, query) => {
    const isConfirmed = await swal.confirm(
      `确认${status === markStatus.标记 ? '标记' : '取消标记'}推送数据吗？`
    );
    if (!isConfirmed) return;

    const res = await financeSystemApi.financeSalesOutStockOrderMarkPushStatus({
      markPushSuccess: status == markStatus.标记,
      ...query,
    });
    if (res?.failList?.length) {
      failDialogRef.value?.open(res?.failList);
    } else {
      ElMessage.success(`${tip}成功`);
    }
    tableRef.value?.clearSelection();
    refreshList();
  };

  const getCheckedData = () => {
    const checkedList = tableRef.value?.getSelectionRows?.() || [];
    return checkedList;
  };

  const failDialogRef = ref(null);
  const markLoading = ref(false);

  const doPushRows = async (command) => {
    if (command == 'batchPush') {
      const dataList = getCheckedData();
      if (!dataList.length) {
        ElMessage.warning('请先勾选数据');
        return;
      }
      const isConfirmed = await swal.confirm('确认推送所选吗？');
      if (!isConfirmed) return;
      const param = dataList.map((row) => {
        return row.code;
      });
      doPush({ codeList: param });
    } else {
      const isConfirmed = await swal.confirm('确认按筛选条件推送吗？');
      if (!isConfirmed) return;
      const query = buildQueryParams(search);
      doPush(query);
    }
  };

  const doPush = async (param) => {
    const res = await financeSystemApi.financeSalesOutStockOrderPushByCondition(param).catch(() => {
      runQuery();
    });
    if (res) {
      ElMessage.success('推送成功');
      runQuery();
      tableRef.value?.clearSelection();
    }
  };

  const router = useRouter();

  const handlerExport = async () => {
    const res = await financeSystemApi.financeSalesOutStockOrderExportList(
      buildQueryParams(search)
    );
    const isExportConfirm = await swal.exportConfirm();
    if (!isExportConfirm) return;

    await nextTick();
    const path = router.resolve({
      path: '/downloadmanage',
      query: {
        app_code: res?.appCode,
        module_code: res?.moduleCode,
        record_type: 2,
      },
    });
    openWindow(path.href);
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

    .text-error {
      color: #ef6868;
    }
  }

  .icon {
    margin-left: 6px;
    display: inline-block;
    cursor: pointer;
  }
</style>
