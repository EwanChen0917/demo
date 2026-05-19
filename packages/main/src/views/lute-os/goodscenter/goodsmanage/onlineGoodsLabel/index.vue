<template>
  <KeenList>
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" placeholder="标签名称" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters></template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      class-name="table-row-dashed"
    >
      <el-table-column label="标签名称" prop="labelName" />
      <el-table-column label="关联在线产品数量" prop="qty" />
      <el-table-column label="标签创建人" prop="creator" />
      <el-table-column label="创建日期" prop="createTime" />
      <el-table-column label="更新日期" prop="updateTime" />
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

<script setup lang="ts" name="onlineGoodsLabel">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';

  const tableRef = ref(null);
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
    ProductApi.LuteosProductSaleSkuRelationMissQueryList.RequestQuery,
    ProductApi.LuteosProductSaleSkuRelationMissQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSaleSkuRelationMissQueryList,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
    }
  };
</script>

<style scoped lang="scss"></style>
