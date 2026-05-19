<template>
  <el-table
    ref="tableRef"
    v-loading="listLoading"
    :data="listData?.list"
    class-name="table-row-dashed"
  >
    <!--      <el-table-column type="selection" width="40" reserve-selection />-->
    <el-table-column label="年份" prop="year" min-width="80" />
    <el-table-column label="月份" prop="month" min-width="80" />
    <el-table-column label="供应链信息" min-width="200">
      <template #default="{ row }">
        <GoodsInfo
          :title="row?.productTitle"
          :subtitle="row?.productSku"
          copy-title
          copy-subtitle
          hide-image
        />
      </template>
    </el-table-column>

    <!--    <el-table-column label="供应链SKU" prop="productSku" min-width="150">
      <template #default="{ row }">
        <div>
          {{ row?.productSku }}
          <Copy :content="row?.productSku" />
        </div>
      </template>
    </el-table-column>-->
    <el-table-column label="站点" prop="site" />
    <el-table-column label="amazon" prop="amazon" />
    <el-table-column label="shopify" prop="shopify" />
    <el-table-column label="walmart" prop="walmart" />
    <!--    <el-table-column label="供应链SKU名称" prop="productTitle" min-width="150">
      <template #default="{ row }">
        <div>
          {{ row?.productTitle }}
          <Copy :content="row?.productTitle" />
        </div>
      </template>
    </el-table-column>-->
    <!--      <el-table-column label="操作" fixed="right" min-width="140">
      <template #default="">
        <KeenActions
          display-style="buttons"
          :actions="[
            {
              label: '详情',
              key: 'view',
              type: 'primary',
              permissionCode: '',
            },
          ]"
          @click="handleActions"
        />
      </template>
    </el-table-column>-->
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

<script setup lang="ts">
  import useList from '@/views/lute-os/hooks/list/useList';
  import { dataApi, DataApi } from '@/api';

  const props = defineProps<{
    search: any;
  }>();

  watch(props.search, () => {
    search.keyword = props.search.keyword;
  });

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
    DataApi.LuteosDataQueryFinanceSkuHeadPriceList.RequestQuery,
    DataApi.LuteosDataQueryFinanceSkuHeadPriceList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: dataApi.luteosDataQueryFinanceSkuHeadPriceList,
  });

  defineExpose({
    runQuery,
    resetSearch,
  });
</script>

<style scoped lang="scss"></style>
