<template>
  <el-dialog
    title="SKU种类"
    v-model="visibility"
    width="800px"
    :before-close="
      () => {
        visibility = false;
      }
    "
  >
    <vxe-table ref="table" :data="dataList" border="inner" min-height="40" row-id="supplySku">
      <vxe-column field="supplySku" min-width="120px" title="供应链SKU" />
      <vxe-column field="productBarcode" min-width="160px" title="FNSKU/海外仓产品条码" />
      <vxe-column field="sendQty" title="计划量" />
      <vxe-column field="receivedQty" title="已收量" />
      <vxe-column field="differenceQty" title="差异量" />
    </vxe-table>
  </el-dialog>
</template>

<script setup lang="ts">
  defineProps<{
    dataList: any[];
  }>();

  const visibility = ref(false);
  const open = () => {
    visibility.value = true;
  };

  defineExpose({ open });
</script>

<style scoped lang="scss"></style>
