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
      <ExportBtn :service="erpApi.luteosErpInventoryCenterListExport" :params="search">
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      :default-sort="{ prop: 'canSaleInventory', order: 'descending' }"
      @sort-change="handleSortChange"
    >
      <!--      <el-table-column label="供应链SKU" prop="supplySku" />
      <el-table-column label="产品名称" prop="productName" />-->
      <el-table-column label="产品信息" prop="productName" min-width="250">
        <template #default="{ row }">
          <GoodsInfo
            :src="row.imageUrl"
            :title="row.productName"
            :subtitle="row.skuCode"
            copy-subtitle
          />
        </template>
      </el-table-column>
      <el-table-column label="供应链SKU" prop="supplySku" min-width="120" />
      <!--      <el-table-column label="产品SKU" prop="skuCode" min-width="120" />-->
      <el-table-column label="仓库名称" prop="warehouseName" min-width="150" />
      <el-table-column label="仓库编码" prop="warehouseCode" min-width="120" />
      <el-table-column label="在途库存" sortable="custom" prop="inWayInventory" min-width="90" />
      <el-table-column label="待上架" sortable="custom" prop="waitUpInventory" min-width="90" />
      <el-table-column label="可用库存" sortable="custom" prop="canUseInventory" min-width="90" />
      <el-table-column label="可售库存" sortable="custom" prop="canSaleInventory" min-width="90" />
      <el-table-column label="中仓库存" sortable="custom" prop="centerInventory" min-width="90" />
      <el-table-column label="待出库" sortable="custom" prop="waitOutInventory" min-width="90" />
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

<script setup lang="ts" name="centerInventory">
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
    ErpApi.LuteosErpInventoryQueryCenterList.RequestQuery,
    ErpApi.LuteosErpInventoryQueryCenterList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      warehouseName: undefined,
      warehouseCode: undefined,
      orderBy: 'canSaleInventory',
      asc: false,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpInventoryQueryCenterList,
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
</script>

<style scoped lang="scss"></style>
