<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyWord" placeholder="产品SKU名称/产品SKU">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="handleAdd">新增兑换商品</el-button>
      <el-button
        class="button"
        type="primary"
        plain
        @click="
          handleExport({
            codeList,
            ...search,
          })
        "
        :loading="exportLoading"
      >
        导出
      </el-button>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.pointProductList"
      row-key="productCode"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="name" label="产品SKU信息" min-width="300">
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.productImage"
            :title="scope.row.productName"
            :subtitle="scope.row.skuCode"
          />
        </template>
      </el-table-column>
      <!--      <el-table-column prop="productSpu" label="SPU" />-->
      <el-table-column label="商品类型">
        <template #default="scope">
          {{ PointProductType[scope.row.productType] }}
        </template>
      </el-table-column>
      <el-table-column prop="productCount" label="总数" />
      <el-table-column prop="remainCount" label="剩余数量" />
      <el-table-column prop="exchangePoint" label="兑换积分" />
      <el-table-column prop="minLevelName" label="会员等级" />
      <el-table-column label="状态">
        <template #default="scope">
          <span class="badge" :class="[scope.row.status ? 'badge-light-success' : 'badge-light']">
            {{ PointProductStatus[scope.row.status] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                payload: { code: scope.row.productCode },
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

  <AddModal :visible="addModalVisible" @close="handleAddModalClose" @window-close="refreshList" />
</template>

<script lang="ts" setup name="pointsgoodslist">
  import useList from '@/hooks/list/useList';
  import useExport from '@/hooks/list/useExport';
  import useAddModal from '@/hooks/list/useAddModal';
  import { pointApi, PointApi } from '@/api/index';
  import { PointProductType, PointProductStatus } from '@/types/api';

  import AddModal from './components/addGoods.vue';

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
    resetSearch,
    // runQuery,
    tableRef,
    selectedKeys: codeList,
    handleSelectionChange,
  } = useList<
    PointApi.LuteosPointProductQueryPointProductList.RequestQuery,
    PointApi.LuteosPointProductQueryPointProductList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    service: pointApi.luteosPointProductQueryPointProductList,
  });
  const { handleExport, exportLoading } = useExport(pointApi.luteosPointProductExportPointProduct);
  const router = useRouter();
  // 表格操作
  const handleActions = (item) => {
    const {
      key,
      payload: { code },
    } = item;

    if (key === 'view') {
      router.push(`/pointsgoodslist/detail?code=${code}`);
    }
  };

  // 新增操作
  const { addModalVisible, handleAdd, handleAddModalClose } = useAddModal({
    refreshList,
  });
</script>
