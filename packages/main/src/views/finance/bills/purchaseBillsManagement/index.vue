<template>
  <div>
    <el-row class="page-top-box">
      <span>
        总记录数：
        <span class="text-bule text-num">{{ listData?.total }}</span>
      </span>
      <span>
        已推送金蝶：
        <span class="text-green text-num">
          {{ listData?.relateSystemStatics?.totalRelateNumKingdee }}
        </span>
      </span>
      <span>
        推送金蝶失败：
        <span class="text-red text-num">
          {{ listData?.relateSystemStatics?.totalFailRelatedNumKingdee }}
        </span>
      </span>
      <span>
        推送中：
        <span class="text-grey text-num">
          {{ listData?.relateSystemStatics?.totalPushingNumKingdee }}
        </span>
      </span>
      <span>
        未推送金蝶：
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
          v-model="search.orderCodes"
          placeholder="单据编号"
          class="me-2 w-310px"
          clearable
          style="width: 220px"
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
        <el-input
          v-model.trim="search.purchaseOrgName"
          placeholder="采购组织"
          class="me-2 w-310px"
          clearable
          style="width: 180px"
        >

        </el-input>
        <el-input
          v-model.trim="search.purchaseWarehouseName"
          placeholder="采购仓库"
          class="me-2 w-310px"
          clearable
          style="width: 180px"
        >

        </el-input>
        <el-input
          v-model.trim="search.skuCode"
          placeholder="产品SKU"
          class="me-2 w-310px"
          clearable
          style="width: 180px"
        >

        </el-input>
        <el-input
          v-model.trim="search.productSku"
          placeholder="供应链SKU"
          class="me-2 w-310px"
          clearable
          style="width: 180px"
        >

        </el-input>
        <el-input
          v-model.trim="search.supplierName"
          placeholder="供应商名称"
          class="me-2 w-310px"
          clearable
          style="width: 180px"
        >

        </el-input>
        <el-autocomplete
          v-model="search.creatorName"
          :fetch-suggestions="querySearch"
          clearable
          style="width: 180px"
          placeholder="单据创建人"
        />
        <el-date-picker
          v-model="search.createStart"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="单据创建开始时间"
          end-placeholder="单据创建结束时间"
          class="w-310px"
        />
        <el-select
          v-model="search.orderTypes"
          :options="billsStatusList"
          :props="{label: 'name', value: 'code'}"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="单据类型"
        />
        <el-select
          v-model="search.orderStatuss"
          :options="orderStatusList"
          :props ="{label: 'name', value: 'code'}"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="单据状态"
        />
        <el-select
          v-model="search.kingdeePushStatus"
          :options="statusList"
          :props="{label: 'name', value: 'code'}"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="推送金蝶状态"
        />
      </template>
      <template #buttons>
        <el-button type="primary" :loading="markLoading" @click="handlePushCommand('statusPush')">
          推送金蝶
        </el-button>
        <el-button type="primary" :loading="markLoading" @click="handlePushCommand('markPush')">
          标记推送成功
        </el-button>
        <el-button
          type="primary"
          :loading="cancelMarkLoading"
          @click="handlePushCommand('cancelMarkPush')"
        >
          取消标记推送成功
        </el-button>
        <ExportBtn
          :service="financeSystemApi.financePurhcaseExportDetailList"
          :params="{
            ...omit(search, ['orderCodes', 'createStart']),
            createStartDate: search.createStart ? search.createStart[0] + ' 00:00:00' : undefined,
            createEndDate: search.createStart ? search.createStart[1] + ' 23:59:59' : undefined,
            orderCodes:
              Array.isArray(search.orderCodes) && search.orderCodes
                ? search.orderCodes
                : search.orderCodes
                ? [search.orderCodes]
                : undefined,
          }"
        >
          导出
        </ExportBtn>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="orderCode"
        @selection-change="handleSelectionChange"
        class-name="table-row-dashed"
      >
        <el-table-column type="selection" width="40" reserve-selection fixed />
        <el-table-column label="单据类型" prop="orderTypeDesc" min-width="150" />
        <el-table-column label="单据编号" prop="orderCode" min-width="150" />
        <el-table-column label="单据状态" prop="orderStatusDesc" min-width="150" />
        <el-table-column label="单据明细" prop="orderTypeDesc" min-width="350">
          <template #default="{ row }">
            <div v-for="item in row.skuList" class="sku-list">
              <div>
                <span class="item-label">单据行号:</span>
                {{ item.lineNumber }}
              </div>
              <div>
                <span class="item-label">产品SKU名称:</span>
                {{ item.skuName }}
              </div>
              <div>
                <span class="item-label">产品SKU:</span>
                {{ item.skuCode }}
              </div>
              <div>
                <span class="item-label">供应链SKU:</span>
                {{ item.productSku }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="采购组织" prop="purchaseOrgName" min-width="150" />
        <el-table-column label="采购仓库" prop="purchaseWarehouseName" min-width="110" />
        <el-table-column label="供应商名称" prop="supplierName" min-width="110" />
        <el-table-column label="单据创建人" prop="creator" min-width="110px" />
        <el-table-column label="单据创建时间" prop="orderDate" min-width="110" />
        <el-table-column label="推送金蝶" prop="kingdeePushBean" width="120">
          <template #default="{ row }">
            <el-tooltip placement="top" effect="light" v-if="row.kingdeePushBean">
              <template #content>
                <div
                  style="max-width: 600px; color: var(--bs-danger)"
                  v-if="row.kingdeePushBean.pushStatus == 2"
                >
                  {{ `推送失败：${row.kingdeePushBean.failReason}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row.kingdeePushBean.pushStatus == 1"
                >
                  {{ `推送成功，最近推送时间：${row.kingdeePushBean.pushTime}` }}
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row.kingdeePushBean.pushStatus == 0"
                >
                  未推送
                </div>
                <div
                  style="max-width: 600px; color: var(--bs-text-gray-600)"
                  v-if="row.kingdeePushBean.pushStatus == 3"
                >
                  推送中
                </div>
              </template>
              <el-icon
                style="color: var(--bs-danger)"
                :size="20"
                v-if="row.kingdeePushBean.pushStatus == 2"
              >
                <WarningFilled />
              </el-icon>
              <el-icon
                style="color: var(--bs-success)"
                :size="20"
                v-if="row.kingdeePushBean.pushStatus == 1"
              >
                <CircleCheckFilled />
              </el-icon>
              <el-icon style="color: #b6b6b6" :size="20" v-if="row.kingdeePushBean.pushStatus == 0">
                <RemoveFilled />
              </el-icon>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <!-- 订单状态已关闭 orderStatus == 8 row.kingdeePushBean.pushStatus 1未推送，3推送失败-->
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
                  label: '推送金蝶',
                  key: 'push',
                  type: 'primary',
                  disabled:
                    row.kingdeePushBean.pushStatus == 1 ||
                    row.kingdeePushBean.pushStatus == 3 ||
                    row.orderStatus == 8,
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
    <!-- 采购订单据详情 -->
    <purchasingOrder ref="purchasingOrderRef" />
    <!-- 采购入库单据详情 -->
    <procurementWarehouse ref="procurementWarehouseRef" />
    <!-- 采购退货单据详情 -->
    <purchaseReturnForm ref="purchaseReturnFormRef" />
    <FailDialog ref="failDialogRef" />
  </div>
</template>

<script setup lang="ts" name="purchaseBillsManagement">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi, memberApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import FailDialog from '@/views/finance/income/incomeAnalysis/components/failDialog.vue';
  import { omit } from 'lodash-es';
  import dayjs from 'dayjs';
  import purchasingOrder from './components/purchasingOrder.vue';
  import procurementWarehouse from './components/procurementWarehouse.vue';
  import purchaseReturnForm from './components/purchaseReturnForm.vue';

  const PAGE_SIZE = 10;
  const tableRef = ref(null);
  const billsStatusList = [
    { name: '采购订单', code: 'purchase_order' },
    { name: '采购入库单', code: 'purchase_in_stock' },
    { name: '采购退货单', code: 'purchase_return' },
  ];
  const statusList = [
    { name: '未推送', code: 0 },
    { name: '推送中', code: 3 },
    { name: '推送成功', code: 1 },
    { name: '推送失败', code: 2 },
  ];
  // 列表采购订单状态=已确认/已关闭，采购入库单状态=已完成，采购退货单=全部退货；
  const orderStatusList = [
    { name: '已确认', code: 5 },
    { name: '已关闭', code: 8 },
    { name: '已完成', code: 50 },
    { name: '全部退货', code: 6 },
  ];

  const orderType = ref('');
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
    FinanceSystemApi.FinancePurhcaseQueryList.ResponseBody
  >({
    searchDefaults: {
      orderTypes: undefined,
      kingdeePushStatus: undefined,
      orderStatuss: undefined,
      skuCode: undefined,
      purchaseWarehouseName: undefined,
      purchaseOrgName: undefined,
      orderCodes: undefined,
      creatorName: undefined,
      supplierName: undefined,
      productSku: undefined,
      createStart: [
        dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        dayjs().endOf('day').format('YYYY-MM-DD'),
      ],
      createEndDate: undefined,
      createStartDate: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { createStart, orderCodes } = searchData;
      return {
        ...omit(searchData, ['orderCodes', 'createStart']),
        createStartDate: createStart ? `${createStart[0]} 00:00:00` : undefined,
        createEndDate: createStart ? `${createStart[1]} 23:59:59` : undefined,
        orderCodes:
          Array.isArray(orderCodes) && orderCodes
            ? orderCodes
            : orderCodes
            ? [orderCodes]
            : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financePurhcaseQueryList,
  });

  const creatorList: any = ref([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        memberCode: item.memberCode,
        value: item.name,
      };
    });
  };
  getCreatorList();
  const createFilter = (queryString: string) => {
    return (restaurant) => {
      return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    };
  };
  const querySearch = (queryString: string, cb: any) => {
    const results = queryString
      ? creatorList.value.filter(createFilter(queryString))
      : creatorList.value;
    cb(results);
  };

  const batchSearchRef = ref();
  const handleBlur = (e) => {
    if (e.target?.value) {
      batchSearchRef.value?.clear();
    }
  };
  const handleBatchClear = (val) => {
    search.orderCodes = undefined;
  };
  const handleBatchSearch = (val) => {
    search.orderCodes = undefined;
    search.orderCodes = val?.replace(/\n/g, ',').split(',');
    search.orderCodes = search.orderCodes.filter((res) => res);
  };
  const purchasingOrderRef = ref();
  const procurementWarehouseRef = ref();
  const purchaseReturnFormRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'push') {
      const text =
        row?.kingdeePushBean?.pushStatus == 1 ? '该数据已推送，是否覆盖？' : '确认推送吗？';
      const isConfirm = await swal.confirm(text);
      if (!isConfirm) return;
      let type = 35;
      if (row.orderType == 'purchase_in_stock') {
        type = 36;
      }
      if (row.orderType == 'purchase_return') {
        type = 37;
      }
      const param = {
        billTypes: [type], // 35, "采购订单"36, "采购入库单" 37, "采购退货单",
        billNo: row.orderCode,
        systemCode: 'kingdee', // 系统编码, kingdee ->金蝶 fbt->分贝通
      };
      const res = await financeSystemApi.financeBasicSyncThirdSystemBill(param).catch(() => {
        runQuery();
      });
      if (res) {
        ElMessage.success('推送成功');
        runQuery();
      }
    } else if (key == 'detail') {
      // 类型:purchase_order-采购订单 purchase_in_stock-采购入库单 purchase_return-采购退货单
      orderType.value = row.orderType;
      if (row.orderType == 'purchase_order') {
        purchasingOrderRef.value.open(row.orderCode);
      }
      if (row.orderType == 'purchase_in_stock') {
        procurementWarehouseRef.value.open(row.orderCode);
      }
      if (row.orderType == 'purchase_return') {
        purchaseReturnFormRef.value.open(row.orderCode);
      }
    }
  };
  // 选中行
  const codeList = ref([]);
  const dataList = ref([]);
  const handleSelectionChange = (selection) => {
    codeList.value = selection.map((item) => item.orderCode);
    dataList.value = selection;
  };
  const failDialogRef = ref(null);
  const cancelMarkLoading = ref(false);
  const markLoading = ref(false);
  const handlePushCommand = async (command) => {
    switch (command) {
      case 'markPush': {
        if (!codeList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认标记推送数据吗？');
        if (!isConfirmed) return;
        markPushStatus('标记推送成功', 1);
        break;
      }
      case 'cancelMarkPush': {
        if (!codeList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认取消标记推送数据吗？');
        if (!isConfirmed) return;
        markPushStatus('取消标记推送成功', 0);
        break;
      }
      case 'statusPush': {
        if (!dataList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认推送金蝶吗？');
        if (!isConfirmed) return;
        const param = [];
        dataList.value.forEach((res) => {
          let type = 35;
          if (res.orderType == 'purchase_in_stock') {
            type = 36;
          }
          if (res.orderType == 'purchase_return') {
            type = 37;
          }
          const obj = {
            billTypes: [type], // 35, "采购订单"36, "采购入库单" 37, "采购退货单",
            billNo: res.orderCode,
            systemCode: 'kingdee', // 系统编码, kingdee ->金蝶 fbt->分贝通
          };
          param.push(obj);
        });

        const res = await financeSystemApi.financeBasicBatchSyncThirdSystemBill(param).catch(() => {
          runQuery();
        });
        if (res) {
          ElMessage.success('推送成功');
          runQuery();
          tableRef.value?.clearSelection();
        }
        break;
      }
      default:
        break;
    }
  };
  // 标记推送成功
  const markPushStatus = async (tip, status) => {
    try {
      if (status == 1) {
        markLoading.value = true;
      } else {
        cancelMarkLoading.value = true;
      }
      const res = await financeSystemApi.financePurhcaseMarkPushStatus({
        codeList: codeList.value,
        markPushSuccess: status == 1,
      });
      if (res?.failList?.length) {
        failDialogRef.value?.open(res?.failList);
      } else {
        ElMessage.success(`${tip}成功`);
      }
      tableRef.value?.clearSelection();
      refreshList();
    } finally {
      if (status == 1) {
        markLoading.value = false;
      } else {
        cancelMarkLoading.value = false;
      }
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
  .sku-list {
    padding: 3px;
    border-radius: 5px;
    .item-label {
      color: #999;
    }
  }
  .sku-list:hover {
    background: #f7f7f7;
  }
</style>
