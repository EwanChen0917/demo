<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="平台/渠道/店铺渠道" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.lutePlatform" placeholder="平台" clearable filterable>
        <el-option v-for="item in lutePlatformList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="search.luteChannel" placeholder="渠道" clearable filterable>
        <el-option v-for="item in luteChannelList" :key="item" :label="item" :value="item" />
      </el-select>
    </template>

    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.dictSalesChannelList">
      <el-table-column label="平台" prop="lutePlatform" />
      <el-table-column label="渠道" prop="luteChannel" />
      <el-table-column label="店铺渠道" prop="shopChannel" />
      <el-table-column label="部门" prop="operateDept" />
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

<script setup lang="ts" name="saleschannel">
import useList from '@/hooks/list/useList';
  import { platformApi, productApi, ProductApi } from '@/api';

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
    ProductApi.LuteosProductSaleSkuQueryDictSalesChannelList.RequestQuery,
    ProductApi.LuteosProductSaleSkuQueryDictSalesChannelList.ResponseBody
  >({
    searchDefaults: {
      luteChannel: undefined,
      keyword: undefined,
      lutePlatform: undefined,
      operateDept: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSaleSkuQueryDictSalesChannelList,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key } = item;
  };

  const luteChannelList = ref([]);
  const lutePlatformList = ref([]);

  const queryOptions = async () => {
    const res = await productApi.luteosProductSaleSkuQueryLuteChannelList();
    luteChannelList.value = res?.luteChannelList;
    lutePlatformList.value = res?.lutePlatformList;
  };

  queryOptions();
</script>

<style scoped lang="scss"></style>
