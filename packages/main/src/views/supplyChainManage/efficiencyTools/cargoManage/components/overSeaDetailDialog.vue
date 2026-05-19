<template>
  <el-dialog title="详情" v-model="visible" @close="visible = false" width="65%" align-center>
    <h5>装箱信息</h5>
    <el-table :data="detailInfo?.packList" max-height="70vh">
      <el-table-column label="参考单号" prop="referenceNo" />
      <el-table-column label="装箱箱号" prop="tppCode" />
      <el-table-column label="产品总数" prop="tppQuantity" />
      <el-table-column label="重量（KG）" prop="tppWeight" />
      <el-table-column label="体积（CM）" prop="tppVolume" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  const visible = ref(false);

  const detailInfo = ref([]);
  const open = (data) => {
    detailInfo.value = data;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
