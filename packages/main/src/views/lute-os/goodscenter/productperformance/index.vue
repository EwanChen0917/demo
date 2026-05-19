<template>
  <el-tabs tab-position="top" v-model="curTab">
    <el-tab-pane label="产品SKU" :name="1">
      <SkuTable />
    </el-tab-pane>
    <el-tab-pane label="MSKU" :name="2">
      <MskuTable />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="productperformance">
  import SkuTable from './components/table/sku.vue';
  import MskuTable from './components/table/msku.vue';

  const curTab = ref(1);
</script>

<style scoped lang="scss"></style>
