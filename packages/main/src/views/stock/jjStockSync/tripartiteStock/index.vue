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
              v-for="item in searchTypes.jjTripartiteSeachTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo" />
        </template>
        <template #append v-if="['skus', 'thirdSkus'].includes(searchType)">
          <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
        </template>
      </el-input>
    </template>
    <template #filters>
      <WarehouseSelect :warehouseTypes="[3]" v-model="search.warehouseCodes" clearable multiple />
    </template>

    <template #buttons>
      <ExportBtn
        :service="erpApi.luteosErpJiJiaInventorySyncThirdListExport"
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
          <div>1.数据源为积加三方仓库存差异-三方仓库存看板</div>
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
      <el-table-column prop="warehouseName" label="仓库" min-width="120" fixed="left" />
      <el-table-column prop="thirdSku" label="三方仓SKU" min-width="140" fixed="left" />
      <el-table-column prop="productCnName" label="三方仓产品名称" min-width="150" fixed="left" />
      <el-table-column prop="statusName" label="三方仓产品状态" min-width="120" />
      <el-table-column prop="sku" label="供应链SKU" min-width="140" fixed="left" />
      <el-table-column prop="productName" label="产品名称" min-width="150" fixed="left" />
      <el-table-column prop="onwayQuantity" label="在途量" min-width="100" sortable />
      <el-table-column prop="sellableQuantity" label="可用量" min-width="100" sortable />
      <el-table-column prop="unsellableQuantity" label="次品量" min-width="100" sortable />
      <el-table-column prop="reservedQuantity" label="预占量" min-width="100" sortable />
      <el-table-column prop="shippedQuantity" label="历史库存量" min-width="120" />
      <el-table-column prop="updateTime" label="更新时间" min-width="160" />
      <el-table-column prop="synchronizeTime" label="同步时间" min-width="160" />
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

<script setup lang="ts" name="tripartiteStock">
  import { ref } from 'vue';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import WarehouseSelect from '@/views/stock/components/warehouseSelect.vue';
  import { searchTypes } from '@/views/stock/components/searchTypes';
  import { pick } from 'lodash-es';

  const route = useRoute();
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
    ErpApi.LuteosErpJiJiaInventorySyncQueryThirdList.RequestQuery,
    ErpApi.LuteosErpJiJiaInventorySyncQueryThirdList.ResponseBody
  >({
    searchDefaults: {
      skus: undefined,
      thirdSkus: undefined,
      productName: undefined,
      productCnName: undefined,
      warehouseCodes: undefined,
      orderBy: '',
      asc: false, // 默认降序
    },
    pageSize: PAGE_SIZE,
    interceptSearchData: (data) => {
      if (data[searchType.value]) {
        searchTypes.jjTripartiteSeachTypes.forEach((item) => {
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
    service: erpApi.luteosErpJiJiaInventorySyncQueryThirdList,
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
  // 移仓单查看海外库存
  const initData = async () => {
    console.log(route.query);
    if (route.query.productName && route.query.receiveWarehouseCode) {
      searchType.value = 'productName';
      search.productName = decodeURIComponent(route.query.productName as string);
      search.warehouseCodes = [route.query.receiveWarehouseCode];
      runQuery();
    }
  };
  initData();
</script>

<style scoped></style>
