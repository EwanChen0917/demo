<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search[searchType]" clearable style="width: 350px">
        <template #prepend>
          <el-select v-model="searchType" style="width: 120px">
            <el-option
              v-for="item in searchTypes.jjFbaSeachTypes"
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
      <WarehouseSelect platformCode="AMAZON" v-model="search.warehouseCodes" clearable multiple />
    </template>

    <template #buttons>
      <ExportBtn
        :service="erpApi.luteosErpJiJiaInventorySyncFbaListExport"
        :params="{
          ...search,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <template #tools-prepend>
      <el-tooltip placement="top">
        <template #content>
          <div>1.数据源为积加平仓库存-FBA库存</div>
          <div>2.数据实时更新</div>
        </template>
        <i class="iconfont icon-xianxingtubiaoxunwen" style="color: var(--bs-success)" />
      </el-tooltip>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      @sort-change="handleSortChange"
    >
      <el-table-column prop="warehouseName" label="仓库" min-width="140" fixed="left" />
      <el-table-column prop="asin" label="ASIN" min-width="120" fixed="left" />
      <el-table-column prop="msku" label="MSKU" min-width="120" fixed="left" />
      <el-table-column prop="fnsku" label="FNSKU" min-width="110" fixed="left" />
      <el-table-column prop="productName" label="产品名称" min-width="150" fixed="left" />
      <el-table-column prop="sku" label="SKU" min-width="140" fixed="left" />
      <el-table-column prop="fulfillmentChannelName" label="配送渠道" min-width="100" />
      <el-table-column prop="erpShippedQty" label="已发货量" min-width="100" sortable />
      <el-table-column prop="erpPendingInventoryQty" label="待入库量" min-width="100" sortable />
      <el-table-column prop="inTransitQty" label="在途量" min-width="100" sortable />
      <el-table-column prop="workingQuantity" label="货件处理中" min-width="120" sortable />
      <el-table-column prop="shippedQuantity" label="货件已发货" min-width="120" sortable />
      <el-table-column prop="receivingQuantity" label="货件正在接收" min-width="130" sortable />
      <el-table-column prop="inboundTotal" label="货件在途量" min-width="130" sortable />
      <el-table-column
        prop="reservedCustomerOrders"
        label="预留-买家订单"
        min-width="140"
        sortable
      />
      <el-table-column
        prop="reservedTransfers"
        label="预留-运营中心转运"
        min-width="160"
        sortable
      />
      <el-table-column
        prop="reservedProcessing"
        label="预留-运营中心正在处理"
        min-width="190"
        sortable
      />
      <el-table-column prop="reserved" label="预留数量" min-width="100" sortable />
      <el-table-column prop="afnFulfillableQuantity" label="可售" min-width="100" sortable />
      <el-table-column
        prop="afnFulfillableQuantityLocal"
        label="本地可售"
        min-width="110"
        sortable
      />
      <el-table-column
        prop="afnFulfillableQuantityRemote"
        label="远程可售"
        min-width="110"
        sortable
      />
      <el-table-column prop="unsellableQuantity" label="不可售" min-width="100" sortable />
      <el-table-column prop="mfnFulfillableQuantity" label="FBM可售" min-width="110" sortable />
      <el-table-column prop="researchingQuantity" label="调查中" min-width="100" sortable />
      <el-table-column prop="totalQuantity" label="总数量" min-width="100" sortable />
      <el-table-column prop="goodQty" label="良品量" min-width="100" sortable />
      <el-table-column prop="defectiveQty" label="次品量" min-width="100" sortable />
      <el-table-column
        prop="unprocessedReservationQty"
        label="未处理预占"
        min-width="120"
        sortable
      />
      <el-table-column prop="processedReservationQty" label="已处理预占" min-width="120" sortable />
      <el-table-column prop="availableQty" label="可用量" min-width="100" sortable />
      <el-table-column prop="onHandQty" label="在库量" min-width="100" sortable />

      <el-table-column prop="invAge0To30Days" label="0~30" min-width="120" />
      <el-table-column prop="invAge31To60Days" label="31~60" min-width="120" />
      <el-table-column prop="invAge61To90Days" label="61~90" min-width="120" />
      <el-table-column prop="invAge91To180Days" label="91~180" min-width="120" />
      <el-table-column prop="invAge181To270Days" label="181~270" min-width="120" />
      <el-table-column prop="invAge271To330Days" label="271~330" min-width="120" />
      <el-table-column prop="invAge331To365Days" label="331~365" min-width="120" />
      <el-table-column prop="invAge365PlusDays" label="365+" min-width="120" />
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

<script setup lang="ts" name="jjFbaStock">
  import { ref } from 'vue';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import WarehouseSelect from '@/views/stock/components/warehouseSelect.vue';
  import { searchTypes } from '@/views/stock/components/searchTypes';
  import { pick } from 'lodash-es';

  const searchType = ref('mskus');
  const batchSearchRef = ref();
  const PAGE_SIZE = 10;
  const tableRef = ref();

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
    ErpApi.LuteosErpJiJiaInventorySyncQueryFbaList.RequestQuery,
    ErpApi.LuteosErpJiJiaInventorySyncQueryFbaList.ResponseBody
  >({
    searchDefaults: {
      asins: undefined,
      fnskus: undefined,
      mskus: undefined,
      skus: undefined,
      productName: undefined,
      warehouseCodes: undefined,
      orderBy: '',
      asc: false, // 默认降序
    },
    pageSize: PAGE_SIZE,
    interceptSearchData: (data) => {
      if (data[searchType.value]) {
        searchTypes.jjFbaSeachTypes.forEach((item) => {
          if (item.value !== searchType.value) {
            data[item.value] = undefined;
          }
        });
        return {
          ...pick(data, [[searchType.value], 'warehouseCodes', 'orderBy', 'asc']),
        };
      }
      return data;
    },
    service: erpApi.luteosErpJiJiaInventorySyncQueryFbaList,
  });

  const handleSortChange = (sort) => {
    if (sort.order) {
      search.orderBy = sort.prop;
      search.asc = sort.order === 'ascending';
    } else {
      search.orderBy = undefined;
      search.asc = undefined;
    }
  };

  const handleBatchSearch = (val) => {
    search[searchType.value] = val?.replace(/\n/g, ',');
  };
  const reset = () => {
    batchSearchRef.value?.clear();
    resetSearch();
  };
</script>

<style scoped></style>
