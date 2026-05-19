<template>
  <KeenList @refresh="refreshList" @reset-search="resetSearch">
    <template #search>
      <el-input v-model="search.classification" placeholder="标签编码" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters></template>
    <template #buttons>
      <!--      <el-button class="button" type="primary" @click="handleAdd">新增标签</el-button>-->
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="tagCode"
      class-name="table-row-dashed"
    >
      <!--      <el-table-column type="selection" width="40" reserve-selection />-->
      <el-table-column label="标签信息" min-width="280">
        <template #default="{ row }">
          <GoodsInfo :title="row.classificationName" :subtitle="row.classification" hideImage />
        </template>
      </el-table-column>
      <el-table-column prop="labelTypeDesc" label="标签类型" />
      <el-table-column prop="customerGroup" label="客服组别" min-width="160" />
      <el-table-column prop="productLineName" label="产品品线" min-width="160" />
      <el-table-column prop="productCategory" label="产品品类" min-width="160" />
      <el-table-column prop="firstLevelName" label="一级标签" min-width="160" />
      <el-table-column prop="secondLevelName" label="二级标签" min-width="160" />
      <el-table-column prop="thirdLevelName" label="三级标签" min-width="160" />
      <el-table-column prop="fourthLevelName" label="四级标签" min-width="160" />
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
  <AddDialog ref="addDialogRef" @success="refreshList" />
  <DetailDrawer ref="detailRef" />
</template>

<script setup lang="ts" name="aiLabel">
  import useList from '@/hooks/list/useList';
  import { AfterSaleApi, afterSaleApi } from '@/api';
  import AddDialog from '@/views/afterSale/aiLabel/components/addDialog.vue';
  import DetailDrawer from '@/views/afterSale/aiLabel/components/detailDrawer.vue';

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
    AfterSaleApi.LuteosAfterSaleServiceLabelQueryList.RequestBody,
    AfterSaleApi.LuteosAfterSaleServiceLabelQueryList.ResponseBody
  >({
    searchDefaults: {
      classification: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: afterSaleApi.luteosAfterSaleServiceLabelQueryList,
  });

  // 表格操作
  const detailRef = ref(null);
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'view':
        // 详情
        detailRef.value?.open(row?.classification);
        break;
      default:
        break;
    }
  };

  const addDialogRef = ref(null);
  const handleAdd = () => {
    addDialogRef.value?.open();
  };
</script>

<style scoped lang="scss"></style>
