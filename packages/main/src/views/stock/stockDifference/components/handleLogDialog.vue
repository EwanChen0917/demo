<template>
  <el-dialog
    v-model="visible"
    title="操作日志"
    width="1100px"
    align-center
    destroy-on-close
    :close-on-click-modal="false"
    @close="handleDialogClose"
  >
    <div class="handle-log-dialog">
      <div class="handle-log-toolbar">
        <div class="handle-log-toolbar__left">
          <el-date-picker
            v-model="search.date"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="日期"
            clearable
            style="width: 160px"
          />
          <el-input
            v-model="search.warehouseName"
            clearable
            placeholder="仓库名称"
            maxlength="200"
            style="width: 200px"
          />
          <el-input
            v-model="search.supplySku"
            clearable
            placeholder="供应链SKU"
            maxlength="100"
            style="width: 200px"
          />
        </div>
        <el-button type="primary" :loading="listLoading" @click="handleQuery">查询</el-button>
      </div>

      <el-table :data="tableData" v-loading="listLoading" min-height="360" max-height="420" border>
        <el-table-column prop="operateTime" label="操作时间" min-width="170" align="center" />
        <el-table-column prop="supplySku" label="供应链SKU" min-width="140" align="center" />
        <el-table-column prop="productName" label="产品名称" min-width="160" align="center" />
        <el-table-column prop="warehouseName" label="仓库名称" min-width="140" align="center" />
        <el-table-column prop="goodStockDiff" label="良品差异" min-width="100" align="center" />
        <el-table-column
          prop="defectiveStockDiff"
          label="次品差异"
          min-width="100"
          align="center"
        />
        <el-table-column prop="status" label="状态" min-width="100" align="center" />
      </el-table>

      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="onPageSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import usePagination from '@/hooks/list/usePagination';

  interface HandleLogRow {
    operateTime?: string;
    supplySku?: string;
    productName?: string;
    warehouseName?: string;
    goodStockDiff?: number;
    defectiveStockDiff?: number;
    status?: string;
  }

  const visible = ref(false);

  const search = reactive({
    date: undefined as string | undefined,
    warehouseName: undefined as string | undefined,
    supplySku: undefined as string | undefined,
  });

  const searchDefaults = () => ({
    date: undefined as string | undefined,
    warehouseName: undefined as string | undefined,
    supplySku: undefined as string | undefined,
  });

  const tableData = ref<HandleLogRow[]>([]);
  const listLoading = ref(false);
  const total = ref(0);

  const { current, pageSize, pageSizeOption, handlePageSizeChange, handleCurrentChange } =
    usePagination({ pageSize: 10, pageNum: 1 });

  const resetSearch = () => {
    const d = searchDefaults();
    search.date = d.date;
    search.warehouseName = d.warehouseName;
    search.supplySku = d.supplySku;
    current.value = 1;
  };

  const fetchList = async () => {
    listLoading.value = true;
    try {
      // TODO: 对接操作日志列表接口，入参含 search、current、pageSize
      tableData.value = [];
      total.value = 0;
    } finally {
      listLoading.value = false;
    }
  };

  const handleQuery = () => {
    current.value = 1;
    fetchList();
  };

  const onCurrentChange = (page: number) => {
    handleCurrentChange(page);
    fetchList();
  };

  const onPageSizeChange = (size: number) => {
    handlePageSizeChange(size);
    current.value = 1;
    fetchList();
  };

  const open = () => {
    resetSearch();
    visible.value = true;
    fetchList();
  };

  const close = () => {
    visible.value = false;
  };

  const handleDialogClose = () => {
    resetSearch();
    tableData.value = [];
    total.value = 0;
  };

  defineExpose({
    open,
    close,
  });
</script>

<style scoped lang="scss">
  .handle-log-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  .handle-log-toolbar__left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
