<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
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
      </el-space>
    </template>
    <!-- <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
    </template> -->
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSpu"
      class-name="table-row-dashed"
      :default-sort="{ prop: 'platformInventory', order: 'descending' }"
      @sort-change="handleSortChange"
    >
      <!--      <el-table-column type="selection" width="40" reserve-selection />-->
      <!--      确认label-->
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
      <el-table-column label="供应链SKU" prop="productSku" min-width="170" fixed />
      <!--      <el-table-column label="产品名称" prop="productName" min-width="230" fixed />
      <el-table-column label="产品SKU" prop="skuCode" min-width="150" fixed />-->
      <el-table-column label="最近15天商品销量" prop="salesQty" sortable="custom" min-width="150" />
      <el-table-column
        label="中仓在途库存总数量"
        prop="centerWayInventory"
        sortable="custom"
        min-width="150"
      >
        <template #default="{ row }">
          <span>{{ row.centerWayInventory }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="中仓库存总数量"
        prop="centerInventory"
        sortable="custom"
        min-width="130"
      >
        <template #default="{ row }">
          <span>{{ row.centerInventory }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="平台在途库存总数量"
        prop="platformWayInventory"
        sortable="custom"
        min-width="150"
      >
        <template #default="{ row }">
          <span>{{ row.platformWayInventory }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="平台库存总数量"
        prop="platformInventory"
        sortable="custom"
        min-width="130"
      >
        <template #default="{ row }">
          <span>{{ row.platformInventory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台可售库存" min-width="120">
        <template #default="{ row }">
          <span>{{ row.platformWayInventory + row.platformInventory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预估可售天数" min-width="120">
        <template #default="{ row }">
          <span>
            {{
              row.salesQty === 0
                ? 'NAN'
                : Math.floor(
                    (row.platformWayInventory + row.platformInventory) / (row.salesQty / 15)
                  )
            }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="总库存" sortable="custom" prop="inventory" min-width="80" />
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
  </KeenList>
</template>

<script setup lang="ts" name="inventory">
  import { ErpApi, erpApi, productApi, ProductApi } from '@/api';
  import useList from '@/hooks/list/useList';

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
    ErpApi.LuteosErpInventoryQueryAllInventoryAmount.RequestQuery,
    ErpApi.LuteosErpInventoryQueryAllInventoryAmount.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      orderBy: 'platformInventory',
      asc: false,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpInventoryQueryAllInventoryAmount,
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
