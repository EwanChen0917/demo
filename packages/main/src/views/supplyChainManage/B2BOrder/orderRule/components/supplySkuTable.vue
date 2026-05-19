<template>
  <!-- <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  > -->
  <!-- <template #search>
    <el-input
      v-model="search.keyword"
      style="width: 300px"
      placeholder="供应链产品名称/供应链SKU"
      clearable
    >
      <template #prefix>
        <SvgIconSearch />
      </template>
    </el-input> 
  </template>-->
  <div class="d-flex align-items-center search">
    <div class="input-wrap">
      <el-input
        v-model="search.keyword"
        style="width: 300px"
        placeholder="供应链产品名称/供应链SKU"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </div>
  </div>
  <div class="card-body pt-0 tablewrap">
    <el-table
      ref="tableRef"
      max-height="50vh"
      v-loading="listLoading"
      :data="listData?.supplySkuList"
      :row-key="rowKey"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
      row-class-name="rowcell"
      header-cell-class-name="hdcell"
      :border="true"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="供应链产品信息" min-width="220">
        <template #default="{ row }">
          <GoodsInfo :src="row.productImage" :title="row.productTitle" :subtitle="row.productSku" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="产品类型" min-width="120">
      <template #default="{ row }">
        <span>{{ productTypeMap[row?.productType] }}</span>
      </template>
    </el-table-column> -->
      <template #empty>
        <div class="flex-align flex-center">
          <EmptyAnimation name="listEmpty" :width="128" :height="128" :loop="true" />
        </div>
        <div class="text">暂无数据</div>
      </template>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- </KeenList> -->
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi, ProductContracts } from '@/api';
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      productType?: number;
      selectedRows?: ProductContracts.ProductBean[];
      rowKey?: string;
    }>(),
    {
      rowKey: 'productSku',
    }
  );

  const emit = defineEmits(['select']);

  // const productTypeMap = {
  //   1: '产品',
  //   2: '物料',
  //   3: '用研产品',
  //   12: '配件',
  //   13: '组合产品',
  //   14: '虚拟产品',
  // };

  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();

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
    ProductApi.LuteosProductSupplySkuQuerySupplySkuList.RequestQuery,
    ProductApi.LuteosProductSupplySkuQuerySupplySkuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      productStatus: undefined,
      saleStatus: undefined,
      productType: props?.productType,
      purchaser: undefined,
      supplierCode: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSupplySkuQuerySupplySkuList,
  });

  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows.forEach((row) => {
        tableRef.value!.toggleRowSelection(row);
      });
    }
  };
  setSelectedRows();

  // 勾选产品
  const totalList = reactive([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
    emit('select', list);
  };

  onMounted(() => {
    runQuery();
  });

  onActivated(() => {
    runQuery();
  });
</script>

<style scoped lang="scss">
  .search {
    padding-bottom: 20px;
    .input-wrap {
      // margin-left: 12px;
    }
  }
  .tablewrap {
    border-radius: 10px 10px 0px 0px !important;
    overflow: hidden;
    .product-item {
      // display: flex;
      // gap: 10px;
      .left {
        display: flex;
        gap: 13px;
        .product-img {
          width: 48px;
          height: 50px;
          border-radius: 8px;
        }
        .product-title {
          padding-bottom: 1px;
          flex: 1 0;
        }
        .product-sku {
          margin-top: 2px;
          .item-label {
            flex-shrink: 0;
            color: #999999;
          }
        }
      }
    }
  }
  :deep(.el-table) {
    // border-bottom: solid 1px #f5f5f5;
    .vtop {
      vertical-align: top;
    }
    .el-table__cell > .cell {
      line-height: 20px !important;
      padding-left: 12px !important;
    }
    .hdcell {
      padding: 0 !important;
      color: #1f1f1f;
      font-family: 'PingFang SC';
      font-size: 13px;
      font-family: 'PingFang SC Medium';
      line-height: 20px;
      height: 40px !important;
      background-color: #f5f5f5 !important;
      vertical-align: middle;
    }
    .cellheight {
      height: 70px !important;
    }
    td {
      padding: 0 !important;
      margin-left: 12px !important;
      padding-top: 10px !important;
      vertical-align: top !important;
    }
  }
</style>
