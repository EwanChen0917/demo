<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="供应链SKU/产品SKU/产品名称"
        clearable
        style="width: 325px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select placeholder="仓库名称" v-model="search.warehouseName" filterable clearable>
        <el-option
          v-for="item in listData?.warehouseNameList"
          :value="item"
          :label="item"
          :key="item"
        />
      </el-select>
      <el-select placeholder="仓库编码" v-model="search.warehouseCode" filterable clearable>
        <el-option
          v-for="item in listData?.warehousCodeList"
          :value="item"
          :label="item"
          :key="item"
        />
      </el-select>
    </template>
    <template #buttons>
      <ExportBtn :service="erpApi.luteosErpInventoryWarehouseListExport" :params="search">
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      :default-sort="{ prop: 'saleableQuantity', order: 'descending' }"
      @sort-change="handleSortChange"
    >
      <!--      <el-table-column label="供应链SKU" prop="supplyChainSKU" />
      <el-table-column label="产品名称" prop="productName" />-->
      <el-table-column label="产品信息" prop="productName" min-width="300" fixed>
        <template #default="{ row }">
          <GoodsInfo
            :src="row.imageUrl"
            :title="row.productName"
            :subtitle="row.skuCode"
            copy-subtitle
          />
        </template>
      </el-table-column>
      <el-table-column label="供应链SKU" prop="supplyChainSKU" min-width="150" fixed />
      <el-table-column label="仓库编码" prop="warehouseCode" min-width="150" />
      <el-table-column label="仓库名称" prop="warehouseName" min-width="150" />
      <el-table-column label="销售状态" prop="salesStatus" />
      <el-table-column
        label="采购在途数量"
        sortable="custom"
        prop="purchaseInTransitQuantity"
        min-width="130"
      />
      <el-table-column
        label="退件在途数量"
        sortable="custom"
        prop="returnInTransitQuantity"
        min-width="130"
      />
      <el-table-column
        label="待上架数量"
        sortable="custom"
        prop="pendingShelfQuantity"
        min-width="120"
      />
      <el-table-column
        label="可用数量"
        sortable="custom"
        prop="availableQuantity"
        min-width="120"
      />
      <el-table-column label="预警数量" sortable="custom" prop="warningQuantity" min-width="120" />
      <el-table-column label="可售数量" sortable="custom" prop="saleableQuantity" min-width="120" />
      <el-table-column
        label="分销数量"
        sortable="custom"
        prop="distributionQuantity"
        min-width="120"
      />
      <el-table-column
        label="待出数量"
        sortable="custom"
        prop="pendingOutQuantity"
        min-width="120"
      />
      <el-table-column
        label="缺货数量"
        sortable="custom"
        prop="outOfStockQuantity"
        min-width="120"
      />
      <el-table-column label="缺货天数" sortable="custom" prop="outOfStockDays" min-width="120" />
      <el-table-column
        label="不良品数量"
        sortable="custom"
        prop="defectiveQuantity"
        min-width="120"
      />
      <el-table-column
        label="待出不良品数量"
        sortable="custom"
        prop="pendingDefectiveQuantity"
        min-width="150"
      />
      <el-table-column label="最后更新时间" prop="lastUpdateTime" min-width="120" />
      <el-table-column
        label="实际可用库存"
        sortable="custom"
        prop="actualAvailableInventory"
        min-width="130"
      />
      <el-table-column label="计划库存" sortable="custom" prop="plannedInventory	" min-width="120" />
      <el-table-column
        label="采购库存"
        sortable="custom"
        prop="purchaseInventory"
        min-width="120"
      />
      <el-table-column
        label="待质检"
        sortable="custom"
        prop="pendingQualityInspection"
        min-width="120"
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
</template>

<script setup lang="ts" name="warehouseInventory">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';

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
    ErpApi.LuteosErpInventoryWarehouseQueryList.RequestQuery,
    ErpApi.LuteosErpInventoryWarehouseQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      warehouseName: undefined,
      warehouseCode: undefined,
      orderBy: 'saleableQuantity',
      asc: false,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpInventoryWarehouseQueryList,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key } = item;
  };

  const handleSortChange = (sort) => {
    if (sort.order) {
      search.orderBy = sort.prop;
      search.asc = sort.order === 'ascending';
    } else {
      search.orderBy = undefined;
      search.asc = undefined;
    }
  };
</script>

<style scoped lang="scss"></style>
