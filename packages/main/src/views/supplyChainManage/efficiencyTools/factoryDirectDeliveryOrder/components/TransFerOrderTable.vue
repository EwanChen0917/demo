<template>
  <el-table :data="localData" style="width: 100%">
    <el-table-column label="失败原因" prop="result" min-width="150" />
    <el-table-column label="调拨单号" prop="transferOrderCode" min-width="150" />
    <el-table-column label="状态" prop="status" min-width="150" />
    <el-table-column label="调出仓库" prop="warehouseName" min-width="200" />
    <el-table-column label="调入仓库" prop="arrivalWarehouseName" min-width="200" />
    <el-table-column label="物流方式" prop="transport" min-width="150" />
    <el-table-column label="预计出库日期" prop="executorDate" min-width="150" />
    <el-table-column label="预计出运日期" prop="expectShipmentDate" min-width="150" />
    <el-table-column label="创建人" prop="createBy" min-width="150" />
    <el-table-column label="创建时间" prop="createTime" min-width="200" />
    <el-table-column label="产品名称" prop="skuName" min-width="300" />
    <el-table-column label="产品编码" prop="supplySku" min-width="300" />
    <el-table-column label="调拨数量" prop="quantity" min-width="100" />
  </el-table>
  <div class="total">{{ totalText }}</div>
</template>

<script lang="ts" setup>
  import { DirectFactoryWorkOrderTransfer } from '..';

  interface Props {
    data: DirectFactoryWorkOrderTransfer[];
  }
  const props = defineProps<Props>();
  const localData = ref<DirectFactoryWorkOrderTransfer[]>(props.data);
  // 数量汇总
  const totalNumber = computed(() => {
    let sums = 0;
    sums = localData.value?.reduce((sum, item: any) => sum * 1 + item.quantity * 1, 0);
    return sums;
  });
  const totalText = computed(() => {
    return `调拨总数量：${totalNumber.value} `;
  });
  watch(
    () => props.data,
    (newVal) => {
      localData.value = newVal;
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .total {
    text-align: right;
    color: #000000;
    font-size: 13px;
    line-height: 22px;
    padding: 16px 0 26px;
  }
</style>
