<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        style="width: 400px"
        v-model="search.keyword"
        placeholder="店铺sku/item id/供应链SKU/产品SKU/产品名称"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select placeholder="店铺名称" v-model="search.walmartShopCode" filterable clearable>
        <el-option v-for="item in listData?.shopList" :value="item" :label="item" :key="item" />
      </el-select>
      <el-select placeholder="国家" v-model="search.countryCode" filterable clearable>
        <el-option v-for="item in listData?.countryList" :value="item" :label="item" :key="item" />
      </el-select>
      <el-select placeholder="品线" v-model="search.bigCategory" filterable clearable>
        <el-option
          v-for="item in listData?.bigCategoryList"
          :value="item"
          :label="item"
          :key="item"
        />
      </el-select>
      <el-select placeholder="三级分类" v-model="search.samllCategory" filterable clearable>
        <el-option
          v-for="item in listData?.smallCategoryList"
          :value="item"
          :label="item"
          :key="item"
        />
      </el-select>
      <el-select placeholder="五级分类" v-model="search.model" filterable clearable>
        <el-option v-for="item in listData?.modelList" :value="item" :label="item" :key="item" />
      </el-select>
    </template>
    <template #buttons>
      <ExportBtn :service="erpApi.luteosErpInventoryWalmartPlatformListExport" :params="search">
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      :default-sort="{ prop: 'platformInventory', order: 'descending' }"
      @sort-change="handleSortChange"
    >
      <el-table-column label="产品信息" prop="productName" min-width="300">
        <template #default="{ row }">
          <GoodsInfo
            :src="row.imageUrl"
            :title="row.productName"
            :subtitle="row.skuCode"
            copy-subtitle
          />
        </template>
      </el-table-column>
      <el-table-column label="店铺SKU" prop="storeSKU" min-width="150" />
      <el-table-column label="item id" prop="channelIdentifier" min-width="120" />
      <!--      <el-table-column label="产品名称" prop="productName" />
      <el-table-column label="产品SKU" prop="productSKU" />-->
      <el-table-column label="供应链SKU" prop="supplySku" min-width="120" />
      <el-table-column label="渠道" prop="channel" />
      <el-table-column label="国家" prop="country" />
      <el-table-column label="店铺账号" prop="userAccount" min-width="150" />
      <el-table-column label="品线" prop="bigCategory" min-width="120" />
      <el-table-column label="三级分类" prop="smallCategory" />
      <el-table-column label="五级分类" prop="productModel" min-width="120" />
      <el-table-column
        label="平台在途库存"
        sortable="custom"
        prop="platformOnRouteInventory"
        min-width="120"
      />
      <el-table-column label="平台库存" sortable="custom" prop="platformInventory" min-width="90" />
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

<script setup lang="ts">
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
    ErpApi.LuteosErpInventoryWalmartQueryPlatformList.RequestQuery,
    ErpApi.LuteosErpInventoryWalmartQueryPlatformList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      walmartShopCode: undefined,
      countryCode: undefined,
      bigCategory: undefined,
      samllCategory: undefined,
      model: undefined,
      orderBy: 'platformInventory',
      asc: false,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpInventoryWalmartQueryPlatformList,
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

  onMounted(() => {
    runQuery();
  });
</script>

<style scoped lang="scss"></style>
