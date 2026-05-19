<template>
  <el-table :data="localData" style="width: 100%">
    <el-table-column label="序号" width="60" align="center">
      <template #default="{ $index }">
        {{ $index + 1 }}
      </template>
    </el-table-column>
    <el-table-column label="送货单号" prop="deliveryBillCode" min-width="150" />
    <el-table-column label="供应商名称" prop="supplierName" min-width="250" />
    <el-table-column label="库存地点" prop="storageLocationName" min-width="200">
      <template #default="{ row }">
        <span v-if="row.storageLocationName === '供应链公司出口退税仓'">
          供应链公司供应商虚拟仓
        </span>
        <span v-else-if="row.storageLocationName === '海南路特出口退税仓'">
          海南路特供应商虚拟仓
        </span>
        <span v-else>{{ row.storageLocationName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="发货时间" prop="deliveryTime" min-width="150" />
    <el-table-column label="计划到货日期" prop="estimatedArrivalTime" min-width="150" />
    <el-table-column label="单据状态" prop="statusName" min-width="150" />
    <el-table-column label="计划负责人" prop="projectLeader" min-width="150" />
    <el-table-column label="创建时间" prop="createTime" min-width="150" />
    <el-table-column label="订单号" prop="poCode" min-width="250" />
    <el-table-column label="供方备注" prop="supplierRemark" min-width="160" />
    <el-table-column label="订单行号" prop="orderItemNumber" min-width="80" />
    <el-table-column label="物料编码" prop="skuCode" min-width="150" />
    <el-table-column label="物料名称" prop="materialName" min-width="150" />
    <el-table-column label="发货数量" prop="sendQty" min-width="150" />
  </el-table>
  <div class="total">{{ totalText }}</div>
</template>

<script setup lang="ts">
  import { DirectFactoryWorkOrderDelivery } from '..';

  interface Props {
    data: DirectFactoryWorkOrderDelivery[] | any[];
  }
  // 发货数量
  const totalNumber = computed(() => {
    let sums = 0;
    sums = localData.value?.reduce((sum, item: any) => sum * 1 + item.sendQty * 1, 0);
    return sums;
  });
  const totalText = computed(() => {
    return `发货总数量：${totalNumber.value} `;
  });
  const props = defineProps<Props>();
  const localData = ref<DirectFactoryWorkOrderDelivery[]>(props.data);
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
