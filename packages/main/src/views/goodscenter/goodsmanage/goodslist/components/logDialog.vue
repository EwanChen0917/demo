<template>
  <el-drawer
    title="日志"
    :size="880"
    class="logDialog custom-drawer"
    v-model="visible"
    @close="visible = false"
    align-center
  >
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.logList"
      row-key="id"
      class-name="table-row-dashed"
    >
      <el-table-column prop="operationTime" label="创建时间" min-width="120" />
      <el-table-column prop="operatorName" label="操作人" min-width="150">
        <template #default="scope">
          <el-tag v-if="scope.row.operatorName" round type="info">
            <SvgIcon icon="fullUser" class="me-1" />
            <span>{{ scope.row.operatorName }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operationTypeDesc" label="操作类别" min-width="150" />
      <el-table-column prop="remark" label="操作入口" min-width="180" />
      <el-table-column prop="operationContent" label="操作内容" min-width="240">
        <template #default="{ row }">
          <OverflowTooltip :content="JSON.parse(row?.operationContent)" :line="3" />
        </template>
      </el-table-column>
    </el-table>

    <!-- <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    /> -->
    <template #footer>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
  import { platformApi, PlatformApi } from '@/api';

  import useList from '@/hooks/list/useList';

  const visible = ref(false);

  const PAGE_SIZE = 100;
  const props = defineProps<{
    itemType?: string;
  }>();

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
  } = useList<PlatformApi.PlatformQueryLog.RequestBody, PlatformApi.PlatformQueryLog.ResponseBody>({
    searchDefaults: {
      itemCode: '',
      itemType: props.itemType ?? 'product_spu',
      moduleType: 'product',
      pageNum: 1,
      pageSize: PAGE_SIZE,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformQueryLog,
    serviceManual: true,
  });

  const open = (uniqueCode) => {
    search.itemCode = uniqueCode;
    runQuery();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
