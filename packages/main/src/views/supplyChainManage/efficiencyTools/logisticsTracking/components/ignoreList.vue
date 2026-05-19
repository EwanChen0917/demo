<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #filters>
      <el-input
        v-model="search.shippingOrderNo"
        placeholder="发货单号"
        clearable
        style="width: 186px"
      >
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
      </el-input>
      <el-button class="button" type="primary" @click="emit('import')">导入</el-button>
      <ExportBtn :service="erpApi.luteosErpV2FirstLogisticsExportDiffList" :plain="false">
        导出
      </ExportBtn>
      <el-button class="button" type="primary" @click="batchReset">批量恢复</el-button>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
      max-height="400"
      :row-key="(row) => row.fbaId"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" :reserve-selection="true" />
      <el-table-column prop="shippingOrderNo" label="发货单号" width="150" />
      <el-table-column label="操作" fixed="right" min-width="160">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '恢复数据',
                key: 'resetData',
                type: 'primary',
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

<script setup lang="ts">
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';

  type IgnoreRequestQuery = ErpApi.LuteosErpV2FirstLogisticsDiffQueryIgnoreList.RequestQuery;
  type IgnoreResponseBody = ErpApi.LuteosErpV2FirstLogisticsDiffQueryIgnoreList.ResponseBody;

  const time = ref([]);
  const totalList = ref([]);
  const PAGE_SIZE = 10;
  const emit = defineEmits(['import']);

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
  } = useList<IgnoreRequestQuery, IgnoreResponseBody>({
    searchDefaults: {
      shippingOrderNo: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpV2FirstLogisticsDiffQueryIgnoreList,
  });

  const handleSelectionChange = (list) => {
    totalList.value = list;
  };
  const batchReset = async () => {
    if (totalList.value.length === 0) {
      ElMessage.warning('请至少选择一条数据');
      return;
    }
    const confirmed = await swal.confirm(`确认恢复${totalList.value.length}条数据吗？`);
    if (!confirmed) return;
    const shippingOrderNos = totalList.value.map((item) => item.shippingOrderNo);
    await erpApi.luteosErpV2FirstLogisticsDiffDeleteIgnore({
      shippingNoList: shippingOrderNos,
    });
    ElMessage.success('恢复成功');
    refreshList();
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;

    if (key === 'resetData') {
      const isConfirmed = await swal.confirm('确认恢复吗？');
      if (!isConfirmed) return;
      await erpApi.luteosErpV2FirstLogisticsDiffDeleteIgnore({
        shippingNoList: [row.shippingOrderNo],
      });
      ElMessage.success('恢复成功');
      refreshList();
    }
  };
</script>

<style scoped lang="scss">
  .diff-dialog {
    .el-dialog__body {
      padding: 0;
    }
  }
</style>
