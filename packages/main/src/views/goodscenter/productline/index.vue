<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #buttons>
      <el-button class="button" type="primary" @click="router.push('/productline/add')">
        新增
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column label="产品品线" prop="productLine" />
      <el-table-column label="关联产品数量">
        <template #default="{ row }">
          <el-button type="text" @click="toSpuList(row.code)">
            `
            {{ row.spuNums }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="产品负责人" prop="productLeader" />
      <el-table-column label="GTM负责人" prop="gtmLeader" />
      <el-table-column label="操作" fixed="right" width="80">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: 'productlineEdit',
                row,
              },
            ]"
            @click="handleActions"
          />
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

<script setup lang="ts" name="productline">
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';

  const PAGE_SIZE = 10;
  const router = useRouter();

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
    ProductApi.LuteosProductLineQueryList.RequestQuery,
    ProductApi.LuteosProductLineQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductLineQueryList,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      router.push(`/productline/edit?code=${row.code}`);
    }
  };

  const toSpuList = (code) => {
    router.push(`/goodslist?productLine=${code}`);
  };
</script>

<style scoped lang="scss"></style>
