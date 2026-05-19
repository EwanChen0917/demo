/** * 采购订单明细列表 */
<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search[searchType]"
        clearable
        placeholder="请输入"
        style="width: 350px"
        @change="
          () => {
            batchSearchRef.clear();
          }
        "
      >
        <template #prepend>
          <el-select v-model="searchType" style="width: 120px">
            <el-option
              v-for="item in searchTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo" />
        </template>
        <template #append v-if="searchType !== 'productName'">
          <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        v-model="search.supplierCodes"
        placeholder="请选择供应商"
        multiple
        clearable
        filterable
      >
        <el-option
          v-for="item in supplierOptionsList"
          :key="item.supplierCode"
          :label="`${item.supplierCode}-${item.supplierName}` || ''"
          :value="item.supplierCode!"
        />
      </el-select>
      <el-select v-model="search.isClosed" placeholder="是否关闭" clearable>
        <el-option label="已关闭" :value="1" />
        <el-option label="未关闭" :value="0" />
      </el-select>
      <DeptMember
        v-model="purchaseManager"
        placeholder="采购负责人"
        clearable
        filterable
        multiple
        @change="changePurchase"
      />
      <DeptMember
        v-model="search.planManager"
        placeholder="计划负责人"
        clearable
        filterable
        multiple
      />
      <el-date-picker
        v-model="time"
        type="daterange"
        value-format="YYYY-MM-DD HH:mm:ss"
        range-separator="-"
        start-placeholder="创建开始时间"
        end-placeholder="创建结束时间"
        @change="
          (val) => {
            search.creationTimeStart = val?.[0]
              ? dayjs(val[0]).format('YYYY-MM-DD HH:mm:ss')
              : undefined;
            search.creationTimeEnd = val?.[1]
              ? dayjs(val[1]).format('YYYY-MM-DD 23:59:59')
              : undefined;
          }
        "
      />
    </template>
    <template #buttons>
      <ExportBtn
        :service="erpApi.luteosErpSrmPurchaseExportDetailList"
        :params="{ ...search, creationTimeStart: time?.[0], creationTimeEnd: time?.[1] }"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      :row-key="(row) => `${row.purchaseOrderNumber}-${row.itemNumber}`"
    >
      <el-table-column type="index" label="序号" width="70" fixed />
      <el-table-column label="采购订单号" prop="purchaseOrderNumber" min-width="150" fixed />
      <el-table-column label="订单行号" prop="itemNumber" min-width="100" fixed />
      <el-table-column label="来源单号" prop="sourceNumber" min-width="150" fixed />
      <el-table-column label="产品SKU" prop="productSku" min-width="120" fixed />
      <el-table-column label="产品名称" prop="productName" min-width="150" />
      <el-table-column label="供应链SKU" prop="supplyChainSku" min-width="140" />
      <el-table-column label="订单数量" prop="orderQuantity" />
      <el-table-column label="交货数量" prop="deliveryQuantity" />
      <el-table-column label="未交货数量" prop="notDeliveryQuantity" min-width="100" />
      <el-table-column label="收货数量" prop="receiveQuantity" />
      <el-table-column label="要求交期" prop="requireDate" min-width="100" />
      <el-table-column label="创建时间" prop="creationTime" min-width="110" />
      <el-table-column label="是否关闭" prop="isClosed" />
      <el-table-column label="供应商" prop="supplierName" min-width="150" />
      <el-table-column label="供应商ELS账号" prop="supplierElsAccount" min-width="120" />
      <el-table-column label="供应商ERP编码" prop="supplierErpCode" min-width="130" />
      <el-table-column label="公司代码" prop="companyCode" min-width="100" />
      <el-table-column label="采购组" prop="purchaseGroup" min-width="100" />
      <el-table-column label="采购负责人" prop="purchaseManager" min-width="110" />
      <el-table-column label="计划负责人" prop="planManager" min-width="110" />
      <el-table-column label="是否首单" prop="isFirstOrder" />
      <el-table-column label="发布状态" prop="publishStatus" />
      <el-table-column label="物料组" prop="materialGroup" />
      <el-table-column label="采购单位" prop="purchaseUnit" />
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
</template>

<script setup lang="ts" name="purchaseOrderList">
  import useList from '@/hooks/list/useList';
  import { type ErpApi, erpApi, dataApi, memberApi } from '@/api/index';
  import dayjs from 'dayjs';

  const searchTypes = [
    {
      label: '采购订单号',
      value: 'purchaseOrderNumber',
    },
    {
      label: '来源单号',
      value: 'sourceNumber',
    },
    {
      label: '产品名称',
      value: 'productName',
    },
  ];
  const searchType = ref('purchaseOrderNumber');
  const batchSearchRef = ref();
  const tableRef = ref(null);
  const time = ref([]);
  const PAGE_SIZE = 10;

  const {
    search,
    // searchData,
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
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpSrmPurchaseQueryDetailList.RequestBody,
    ErpApi.LuteosErpSrmPurchaseQueryDetailList.ResponseBody
  >({
    searchDefaults: {
      purchaseOrderNumber: undefined,
      sourceNumber: undefined,
      productName: undefined,
      supplierCodes: undefined,
      isClosed: undefined,
      purchaseManager: undefined,
      planManager: undefined,
      creationTimeStart: undefined,
      creationTimeEnd: undefined,
    },
    interceptSearchData: (searchData) => {
      if (searchData[searchType.value]) {
        searchTypes.forEach((item) => {
          if (item.value !== searchType.value) {
            searchData[item.value] = undefined;
          }
        });
      }
      return searchData;
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpSrmPurchaseQueryDetailList,
  });

  // 批量查询
  const handleBatchSearch = (val) => {
    search[searchType.value] = val?.replace(/\n/g, ',');
  };
  const reset = () => {
    for (const key in search) {
      search[key] = undefined;
    }
    purchaseManager.value = undefined;
    time.value = [];
    batchSearchRef.value?.clear();
    resetSearch();
  };
  const purchaseManager = ref<any>([]);
  // 采购负责人---接口要传名称 特殊处理
  const changePurchase = (val, item) => {
    const names = item.map((i) => i.name);
    search.purchaseManager = names;
  };

  const supplierOptionsList = ref<any>([]);
  const memberOptions = ref<any>([]);
  const getSupplierOptions = async () => {
    const res = await dataApi.luteosDataQuerySupplierBaseList();
    supplierOptionsList.value = res?.supplierList;
  };
  const getMemberOptions = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
      searchChildDept: true,
    });
    memberOptions.value = res?.memberList;
  };

  getSupplierOptions();
  getMemberOptions();
</script>

<style scoped lang="scss"></style>
