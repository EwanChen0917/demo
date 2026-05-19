<template>
  <el-drawer
    class="salesTargetDrawer"
    v-model="drawer"
    title="销售目标"
    :before-close="handleClose"
    size="400px"
  >
    <div class="spu-name">
      <span>{{ detailData.spuName }}</span>
    </div>
    <el-table :data="detailData.monthArr">
      <el-table-column prop="month" label="月份" />
      <el-table-column prop="target" label="目标销售额(USD)" />
    </el-table>
  </el-drawer>
</template>

<script setup lang="ts">
  import { pdtApi } from '@/api';
  import currency from 'currency.js';

  const drawer = ref(false);
  const open = async (row: any) => {
    await getDataList(row);
    drawer.value = true;
  };
  const detailData = ref({
    spuName: '',
    spuCode: '',
    year: '',
    monthArr: [],
  });
  const getDataList = async (row: any) => {
    const res = await pdtApi.luteosPdtQuerySpuYearTargetSummary({
      spuCode: row.productSpu,
      year: row.planYear,
    });
    detailData.value.spuName = res.spuName;
    detailData.value.spuCode = res.spuCode;
    detailData.value.year = res.year;
    detailData.value.monthArr = new Array(12).fill('').map((item, index) => {
      return {
        month: `${detailData.value.year}.${index + 1}`,
        target: currency(res[`month${index + 1}`]).format({ separator: ',', symbol: '' }),
      };
    });
  };

  const handleClose = () => {
    detailData.value = {
      spuName: '',
      spuCode: '',
      year: '',
      monthArr: [],
    };
    drawer.value = false;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .salesTargetDrawer .spu-name {
    margin-bottom: 20px;
  }
</style>
