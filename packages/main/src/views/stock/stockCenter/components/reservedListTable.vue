<template>
  <div class="table-wrapper">
    <div class="table-input">
      <el-input
        @change="handleChangeBizNo"
        v-model="params.bizNo"
        placeholder="请输入业务单号"
        style="width: 200px"
      />
      <el-space>
        <el-button @click="handleChangeBizNo" type="primary" size="small">查询</el-button>
        <el-button @click="handleClearBizNo" size="small">清除</el-button>
      </el-space>
    </div>
    <el-table
      :data="reservedList"
      border
      max-height="200"
      style="margin-top: 12px"
      v-loading="reservedLoading"
    >
      <el-table-column prop="bizNo" label="业务单号" min-width="200" fixed="left">
        <template #default="{ row }">
          <OverflowTooltip :content="row.bizNo" :line="1" />
        </template>
      </el-table-column>
      <el-table-column prop="sourceSystem" label="来源系统" min-width="100">
        <template #default="{ row }">
          <OverflowTooltip :content="row.sourceSystem" :line="1" />
        </template>
      </el-table-column>
      <el-table-column prop="reservedQty" label="预占量" min-width="70" />
      <el-table-column prop="createTime" label="创建时间" min-width="160">
        <template #default="{ row }">
          <OverflowTooltip :content="row.createTime" :line="1" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="出库单号" min-width="160">
        <template #default="{ row }">
          <OverflowTooltip :content="row.outboundNo" :line="1" :font-size="12" />
        </template>
      </el-table-column>
      <el-table-column prop="statusDesc" label="出库状态" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row.statusDesc" :line="1" :font-size="12" />
        </template>
      </el-table-column>
      <el-table-column prop="warehouseCodeName" label="调出仓" min-width="200">
        <template #default="{ row }">
          <OverflowTooltip :content="row.warehouseCodeName" :line="1" :font-size="12" />
        </template>
      </el-table-column>
      <el-table-column prop="destinationWarehouseCodeName" label="调入仓" min-width="200">
        <template #default="{ row }">
          <OverflowTooltip :content="row.destinationWarehouseCodeName" :line="1" :font-size="12" />
        </template>
      </el-table-column> -->
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
</template>

<script setup lang="ts">
  import { cisApi } from '@/api';

  const reservedList = ref<any>([]);
  const reservedLoading = ref(false);
  const current = ref(1);
  const pageSize = ref(10);
  const pageSizeOption = ref([10, 20, 50, 100]);
  const total = ref(0);
  const params = ref({
    supplySkuList: [] as string[],
    warehouseCodeList: [] as string[],
    poolCodeList: [] as string[],
    bizNo: undefined as string | undefined,
  });
  const handleChangeBizNo = () => {
    handleFetchReserved();
  };
  const handleClearBizNo = () => {
    params.value.bizNo = undefined;
    handleFetchReserved();
  };
  const handlePageSizeChange = (value: number) => {
    pageSize.value = value;
    handleFetchReserved();
  };
  const handleCurrentChange = (value: number) => {
    current.value = value;
    handleFetchReserved();
  };
  const handleFetchReserved = async () => {
    try {
      if (!params.value.supplySkuList.length || !params.value.warehouseCodeList.length) return;
      // reservedList.value = [];
      reservedLoading.value = true;
      const res = await cisApi.cisInventorySupplySkuReservedList({
        supplySkuList: params.value.supplySkuList,
        warehouseCodeList: params.value.warehouseCodeList,
        pageNum: current.value,
        pageSize: pageSize.value,
        poolCodeList: params.value.poolCodeList ?? undefined,
        bizCode: params.value.bizNo ?? undefined,
      });

      reservedList.value = res.list;
      total.value = res.total ?? 0;
    } catch (e) {
      // console.error(e);
      /** empty */
    } finally {
      reservedLoading.value = false;
    }
  };
  const handleHideReserved = () => {
    reservedList.value = [];
    total.value = 0;
    current.value = 1;
    pageSize.value = 10;
    reservedLoading.value = false;
    params.value.supplySkuList = [];
    params.value.warehouseCodeList = [];
    params.value.bizNo = undefined;
  };
  const open = ({ supplySku = undefined, warehouseCode = undefined, poolCode = undefined }) => {
    params.value.supplySkuList = supplySku ? [supplySku] : [];
    params.value.warehouseCodeList = warehouseCode ? [warehouseCode] : [];
    params.value.poolCodeList = poolCode ? [poolCode] : [];
    handleFetchReserved();
  };
  const close = () => {
    handleHideReserved();
  };
  defineExpose({
    open,
    close,
  });
</script>

<style scoped lang="scss">
  .table-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
</style>
