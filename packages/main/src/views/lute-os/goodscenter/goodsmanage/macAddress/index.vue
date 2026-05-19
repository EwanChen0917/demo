<template>
  <el-tabs tab-position="top" v-model="curTab">
    <el-tab-pane label="贴片工厂" :name="1">
      <SmtFactory />
    </el-tab-pane>
    <el-tab-pane label="产品代码" :name="2">
      <ProductCode />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="macAddress">
  import SmtFactory from './components/smtFactory.vue';
  import ProductCode from './components/productCode.vue';

  const curTab = ref(1);
</script>

<style scoped lang="scss"></style>
