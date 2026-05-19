<template>
  <KeenList>
    <template #search>
      <el-space>
        <el-input v-model="search.skuCode" placeholder="产品SKU/供应链SKU">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-input v-model="search.supplierName" placeholder="供应商代码/名称" v-if="isSuperAdmin" />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button type="primary" plain @click="exportSelect">导出</el-button>
      <!--      <ExportBtn
        :service="productApi.luteosProductEccangSkuV2ExportEccangSku"
        :params="{
          ...search,
          queryParam: getQueryParam(),
        }"
      >
        导出
      </ExportBtn>-->
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.eccangSkuList"
      row-key="productSku"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="供应链SKU" prop="productSku" min-width="180">
        <template #default="{ row }">
          <GoodsInfo
            :title="row.skuName"
            :subtitle="row.productSku"
            :src="row.produceImage"
            copySubtitle
          />
        </template>
      </el-table-column>
      <el-table-column label="新供应链SKU" prop="newProductSku">
        <!--        <template #default="{ row }">
          <div
            v-for="supplier in row.supplierBeanList"
            :key="supplier.supplierCode"
            @mouseenter="handleMouseEnter(supplier)"
            @mouseleave="handleMouseLeave(supplier)"
            :class="{ 'supplier-hover': supplier.isHover }"
          >
            {{ supplier.newProductSku }}
          </div>
        </template>-->
      </el-table-column>
      <el-table-column label="产品SKU" prop="skuCode" />

      <el-table-column label="供应商" v-if="isSuperAdmin" prop="supplierName">
        <!--        <template #default="{ row }">
          <div
            v-for="supplier in row.supplierBeanList"
            :key="supplier.supplierCode"
            @mouseenter="handleMouseEnter(supplier)"
            @mouseleave="handleMouseLeave(supplier)"
            :class="{ 'supplier-hover': supplier.isHover }"
          >
            {{ supplier.supplierName }}
          </div>
        </template>-->
      </el-table-column>
      <el-table-column label="默认供应商" v-if="isSuperAdmin" prop="defaulSupplierName">
        <!--        <template #default="{ row }">
          <div
            v-for="supplier in row.supplierBeanList"
            :key="supplier.supplierCode"
            @mouseenter="handleMouseEnter(supplier)"
            @mouseleave="handleMouseLeave(supplier)"
            :class="{ 'supplier-hover': supplier.isHover }"
          >
            {{ supplier.defaulSupplierName }}
          </div>
        </template>-->
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
  <ExportSelectDialog ref="exportSelectRef" />
</template>

<script setup lang="ts" name="supplyrelation">
  import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';
  import { useStore } from '@/store/modules/useStore';
  import ExportSelectDialog from '@/views/lute-os/goodscenter/goodsmanage/supplyrelation/components/exportSelectDialog.vue';

  const { isSuperAdmin } = useStore();

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
    ProductApi.LuteosProductEccangSkuV2QueryEccangSkuList.RequestQuery,
    ProductApi.LuteosProductEccangSkuV2QueryEccangSkuList.ResponseBody
  >({
    searchDefaults: {
      skuCode: undefined,
      supplierName: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductEccangSkuV2QueryEccangSkuList,
  });

  const route = useRoute();
  const code = route.query.code as string;
  if (code) search.supplierName = code;

  const getQueryParam = () => {
    const data = {
      '产品SKU/供应链SKU': search.skuCode,
      供应商名称: search.supplierName,
    };
    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }
    return data;
  };

  const exportSelectRef = ref();
  const exportSelect = () => {
    exportSelectRef.value?.open({
      ...search,
      queryParam: getQueryParam(),
    });
  };
</script>

<style scoped lang="scss"></style>
