<!-- 数据来自tiktok -->
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
              v-for="item in searchTypes.fbtSearchTypes"
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
        v-model="search.userAccounts"
        multiple
        clearable
        :max-collapse-tags="1"
        collapse-tags
        collapse-tags-tooltip
        placeholder="请选择仓库"
        style="width: 210px"
      >
        <el-option
          v-for="item in tiktokShops"
          :key="item.userAccount"
          :label="item.userAccountName"
          :value="item.userAccount"
        />
      </el-select>
    </template>

    <template #buttons>
      <ExportBtn
        :service="erpApi.luteosErpJiJiaInventorySyncTiktokListExport"
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
          <div>1、数据源为TikTok后台接口</div>
          <div>2、数据每小时整点更新一次</div>
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
      <el-table-column prop="warehouseName" label="仓库" min-width="120" fixed="left" />
      <el-table-column prop="msku" label="MSKU" min-width="140" fixed="left">
        <template #default="{ row }">
          <div class="d-flex">
            <OverflowTooltip :content="row?.msku" :line="2" />
            <Copy :content="row.msku" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="itemId" label="ItemID" min-width="130" fixed="left" />
      <el-table-column prop="sku" label="供应链SKU" min-width="120" fixed="left" />
      <el-table-column prop="productName" label="产品名称" min-width="150" fixed="left">
        <template #default="{ row }">
          <div class="d-flex">
            <OverflowTooltip :content="row?.productName" :line="2" />
            <Copy :content="row.productName" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="inTransitQuantity" label="在途量" min-width="100" sortable />
      <el-table-column prop="availableQuantity" label="可用量" min-width="100" sortable />
      <el-table-column prop="unfulfillableQuantity" label="次品量" min-width="100" sortable />
      <el-table-column prop="reservedQuantity" label="预占量" min-width="100" sortable />
      <el-table-column prop="totalQuantity" label="在库数量" min-width="100" sortable />
      <el-table-column prop="updateTime" label="更新时间" min-width="120" />
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

<script setup lang="ts" name="fbtStock">
  import { ref } from 'vue';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import { searchTypes } from '@/views/stock/components/searchTypes';
  import { pick } from 'lodash-es';

  const searchType = ref('skus');
  const batchSearchRef = ref();
  const PAGE_SIZE = 10;
  const tableRef = ref();
  const tiktokShops = ref();

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
    ErpApi.LuteosErpJiJiaInventorySyncQueryTiktokList.RequestQuery,
    ErpApi.LuteosErpJiJiaInventorySyncQueryTiktokList.ResponseBody
  >({
    searchDefaults: {
      itemIds: undefined,
      mskus: undefined,
      skus: undefined,
      productName: undefined,
      userAccounts: undefined,
      orderBy: '',
      asc: false, // 默认降序
    },
    pageSize: PAGE_SIZE,
    interceptSearchData: (data) => {
      if (data[searchType.value]) {
        searchTypes.fbtSearchTypes.forEach((item) => {
          if (item.value !== searchType.value) {
            data[item.value] = undefined;
          }
        });
        return {
          ...pick(data, [[searchType.value], 'userAccounts', 'orderBy', 'asc']),
        };
      }
      return data;
    },
    service: erpApi.luteosErpJiJiaInventorySyncQueryTiktokList,
  });

  const getTiktokShops = async () => {
    const res = await erpApi.luteosErpJiJiaInventorySyncQueryTiktokShopList({
      pageNum: 1,
      pageSize: 500,
    });
    tiktokShops.value = res.recordList;
  };
  getTiktokShops();

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
