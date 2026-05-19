<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search[searchType]" clearable placeholder="请输入" style="width: 350px">
        <template #prepend>
          <el-select v-model="searchType" style="width: 120px">
            <el-option
              v-for="item in searchTypes.shopifySearchTypes"
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
      <WarehouseSelect
        platformCode="SHOPIFY"
        v-model="search.warehouseCodeList"
        clearable
        multiple
      />
      <ErpSiteSelect
        v-model="search.sites"
        multiple
        clearable
        placeholder="站点"
        channel="shopify"
      />
      <ProductTypeCascader
        v-model="search.productCategoryList"
        placeholder="品类"
        style="min-width: 190px"
      />
      <el-select
        placeholder="品线"
        :options="productLineOptions"
        style="width: 250px"
        v-model="search.productLineList"
        multiple
        clearable
        filterable
        collapse-tags
        max-collapse-tags="1"
      ></el-select>

      <DeptMember v-model="search.productOperatorList" placeholder="运营" multiple/>
    </template>

    <template #buttons>
      <ExportBtn
        :service="erpApi.luteosErpPlanInventoryShopifyExportList"
        :params="{
          ...search,
        }"
      >
        导出
      </ExportBtn>
      <el-button type="primary" @click="openSync" :disabled="asyncLoading" :loading="asyncLoading">
        {{ syncButtonText }}
      </el-button>
    </template>
    <template #tools-prepend>
      <el-tooltip placement="top">
        <template #content>
          <div>
            1.数据源为积加三方仓库存看板、调拨单、发货单
            <br />
            2.数据每小时整点更新一次
            <br />
            3.仓库统计仅统计仓库归属页面，渠道为shopify的仓库
          </div>
        </template>
        <div>上次更新时间：{{ listData?.lastSyncTime || '--' }}</div>
      </el-tooltip>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      @sort-change="handleSortChange"
    >
      <el-table-column prop="warehouse" label="仓库" min-width="160" fixed="left">
        <template #default="{ row }">
          <OverflowTooltip :content="row.warehouse" :line="2" />
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="产品名称" min-width="140" fixed="left" />
      <el-table-column prop="supplySku" label="供应链SKU" min-width="140" fixed="left" />
      <el-table-column prop="skuCode" label="产品SKU" min-width="140" fixed="left" />
      <el-table-column prop="countryCode" label="仓库地点" min-width="140" fixed="left" />
      <el-table-column prop="site" label="站点" min-width="100" fixed="left" />
      <el-table-column prop="productLine" label="品线" min-width="150" fixed="left" />
      <el-table-column prop="productCategory" label="品类" min-width="150" fixed="left" />
      <el-table-column prop="productOperatorName" label="运营" min-width="150" fixed="left" />
      <el-table-column v-for="col in planStockTableColumns" :key="col.prop" v-bind="col">
        <template #header>
          {{ col.label }}
          <el-tooltip placement="top">
            <template #content>
              <component :is="col.tips['shopify']" />
            </template>
            <i class="iconfont icon-xianxingtubiaoxunwen" style="color: var(--bs-success)" />
          </el-tooltip>
        </template>
      </el-table-column>
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

<script setup lang="ts" name="planShopifyStock">
  import { ref } from 'vue';
  import { cisApi, ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import WarehouseSelect from '../../components/warehouseSelect.vue';
  import { searchTypes } from '../../components/searchTypes';
  import { planStockTableColumns } from '../components/tableColumns';
  import { pick } from 'lodash-es';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';
  import { useShopifyStock } from './useShopifyStock';
  import ProductTypeCascader from '../../shopifyStock/components/productTypeCascader.vue';
  import { useSyncButton } from '../../thirdStock/hooks/useSyncButton';
  const { productLineOptions, getProductLineOptions } = useShopifyStock();
  const searchType = ref('supplySku');
  const batchSearchRef = ref();
  const PAGE_SIZE = 10;
  const tableRef = ref();
  const { asyncLoading, syncButtonText, openSync } = useSyncButton({
    loadingButtonText: '更新库存',
    confirmButtonText: '更新库存',
    confirmTitle: '确认',
    confirmText: '确认要更新shopify业务库存',
    successMessage: 'shopify业务库存更新成功',
    loadingMessage: 'shopify业务库存更新中',
    errorMessage: 'shopify业务库存更新失败',
    services: erpApi.luteosErpPlanInventoryShopifySync,
    onSuccess: () => {
      refreshList();
    },
  });
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
    ErpApi.LuteosErpPlanInventoryShopifyQueryList.RequestBody,
    ErpApi.LuteosErpPlanInventoryShopifyQueryList.ResponseBody
  >({
    searchDefaults: {
      supplySku: undefined,
      skuCode: undefined,
      productName: undefined,
      warehouseCodeList: undefined,
      sites: undefined,
      orderBy: '',
      asc: false, // 默认降序
      productLineList: undefined,
      productCategoryList: undefined,
      productOperatorList: undefined,
    },
    pageSize: PAGE_SIZE,
    interceptSearchData: (data) => {
      if (data[searchType.value]) {
        searchTypes.centerSearchTypes.forEach((item) => {
          if (item.value !== searchType.value) {
            data[item.value] = undefined;
          }
        });
        return {
          ...pick(data, [[searchType.value], 'warehouseCodeList', 'sites', 'orderBy', 'asc']),
        };
      }
      return data;
    },
    service: erpApi.luteosErpPlanInventoryShopifyQueryList,
  });
  const productCategoryListComputed = computed({
    get: () => {
      if (!search?.productCategoryList) {
        return undefined;
      }
      if (Array.isArray(search?.productCategoryList)) {
        const firstItem = search.productCategoryList[0];
        if (typeof firstItem === 'string' && firstItem.includes(':')) {
          return firstItem.split(':');
        }
        return search?.productCategoryList;
      }
      if (typeof search?.productCategoryList === 'string') {
        return search?.productCategoryList ? search?.productCategoryList.split(':') : undefined;
      }
      return undefined;
    },
    set: (val) => {
      if (!val || (Array.isArray(val) && val.length === 0)) {
        search.productCategoryList = undefined;
      } else if (Array.isArray(val)) {
        const joinedString = val.join(':');
        search.productCategoryList = [joinedString] as any;
      } else {
        search.productCategoryList = val;
      }
    },
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
  onMounted(() => {
    getProductLineOptions();
  });
</script>

<style scoped></style>
