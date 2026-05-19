<template>
  <el-tabs v-model="curTab">
    <el-tab-pane label="Item" name="child">
      <Child />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="productOnline">
import Child from '@/views/goodscenter/goodsmanage/onlinegoods/newplatform/child.vue';

  const route = useRoute();
  const curTab = ref(route.query.tab || 'child');
</script>

<style scoped lang="scss"></style>
