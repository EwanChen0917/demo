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
              v-for="item in searchTypes.jjProductTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo" />
        </template>
        <template #append v-if="searchType === 'skus'">
          <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
        </template>
      </el-input>
    </template>
    <template #filters>
      <WarehouseSelect :warehouseTypes="[1]" v-model="search.warehouseCodes" clearable multiple />
    </template>

    <template #buttons>
      <ExportBtn
        :service="erpApi.luteosErpJiJiaInventorySyncProductListExport"
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
          <div>1.数据源为积加产品库存</div>
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
      <el-table-column prop="warehouseName" label="仓库" min-width="140" fixed="left">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.warehouseName" :line="2" />
          <!-- <div class="d-flex">
            <Copy :content="row.warehouseName" />
          </div> -->
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="产品名称" min-width="150" fixed="left">
        <template #default="{ row }">
          {{ row.productName }}
          <!-- <Copy :content="row.productName" /> -->
        </template>
      </el-table-column>
      <el-table-column prop="sku" label="供应链SKU" min-width="150" fixed="left">
        <template #default="{ row }">
          {{ row.sku }}
          <Copy :content="row.sku" />
        </template>
      </el-table-column>
      <el-table-column prop="spu" label="产品SPU" min-width="120" />
      <el-table-column prop="productState" label="产品状态" min-width="100">
        <!-- 0-正常，1-停用 -->
        <template #default="{ row }">
          <Tag :color="row.productState ? 'yellow' : 'success'" size="small">
            {{ row.productState ? '停用' : '正常' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="brand" label="品牌" min-width="120" />
      <el-table-column prop="unit" label="单位" min-width="80" />
      <el-table-column prop="plQuantity" label="计划量" min-width="100" sortable />
      <el-table-column prop="poQuantity" label="采购量" min-width="100" sortable />
      <el-table-column prop="lnQuantity" label="交货量" min-width="100" sortable />
      <el-table-column prop="purchaseQuantity" label="已下单量" min-width="100" sortable />
      <el-table-column prop="erpInboundWorking" label="计划入库" min-width="100" sortable />
      <el-table-column prop="inboundWorking" label="处理中(FBA)" min-width="130" sortable />
      <el-table-column prop="erpInboundWaitShipped" label="待出运量" min-width="100" sortable />
      <el-table-column prop="erpInboundShipped" label="已发货量" min-width="100" sortable />
      <el-table-column prop="inboundShipped" label="已发货(FBA)" min-width="130" sortable />
      <el-table-column prop="erpInboundReceiving" label="待入库量" min-width="100" sortable />
      <el-table-column prop="inboundReceiving" label="正在接收(FBA)" min-width="140" sortable />
      <el-table-column prop="inboundQuantity" label="在途量" min-width="100" sortable />
      <el-table-column prop="overseasQuantity" label="海外仓在途量" min-width="150" sortable />
      <el-table-column prop="fbaInboundQuantity" label="入库数量" min-width="100" sortable />
      <el-table-column prop="inventoryQuantity" label="在库量" min-width="100" sortable />
      <el-table-column prop="availableQuantity" label="良品量" min-width="100" sortable />
      <el-table-column prop="goodAvailableQuantity" label="可用量" min-width="100" sortable />
      <el-table-column prop="reservedQuantity" label="预占量" min-width="100" sortable />
      <el-table-column prop="reservedUntreated" label="未处理预占" min-width="120" sortable />
      <el-table-column prop="reservedProcessed" label="已处理预占" min-width="120" sortable />
      <el-table-column prop="defectiveQuantity" label="次品量" min-width="100" sortable />
      <el-table-column prop="totalInventory" label="总库存" min-width="100" sortable />

      <el-table-column prop="inventoryAge0to1Month" label="0~30" min-width="120" />
      <el-table-column prop="inventoryAge1to2Month" label="31~60" min-width="120" />
      <el-table-column prop="inventoryAge2to3Month" label="61~90" min-width="120" />
      <el-table-column prop="inventoryAge3to6Month" label="91~180" min-width="120" />
      <el-table-column prop="inventoryAge6to9Month" label="181~270" min-width="120" />
      <el-table-column prop="inventoryAge9to11Month" label="271~330" min-width="120" />
      <el-table-column prop="inventoryAge11to12Month" label="331~365" min-width="120" />
      <el-table-column prop="inventoryAge12MonthUp" label="365+" min-width="120" />
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

<script setup lang="ts" name="productStock">
  import { ref } from 'vue';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import WarehouseSelect from '@/views/stock/components/warehouseSelect.vue';
  import { searchTypes } from '@/views/stock/components/searchTypes';
  import { pick } from 'lodash-es';

  const searchType = ref('skus');
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
    ErpApi.LuteosErpJiJiaInventorySyncQueryProductList.RequestQuery,
    ErpApi.LuteosErpJiJiaInventorySyncQueryProductList.ResponseBody
  >({
    searchDefaults: {
      skus: undefined,
      skuName: undefined,
      warehouseCodes: undefined,
      orderBy: '',
      asc: false, // 默认降序
    },
    pageSize: PAGE_SIZE,
    interceptSearchData: (data) => {
      if (data[searchType.value]) {
        searchTypes.jjProductTypes.forEach((item) => {
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
    service: erpApi.luteosErpJiJiaInventorySyncQueryProductList,
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
