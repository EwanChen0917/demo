<template>
  <el-tabs v-model="activeTab" tab-position="top" @tab-change="handleTabChange">
    <el-tab-pane label="电商渠道" name="ecommerce">
      <ecommerce />
    </el-tab-pane>
    <el-tab-pane label="零售与渠道" name="retail">
      <retail />
    </el-tab-pane>
    <el-tab-pane label="售后" name="dwsSale">
      <dwsSale />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup name="salesStatistics">
  import ecommerce from './components/ecommerce.vue';
  import retail from './components/retail.vue';
  import dwsSale from './components/dwsSale.vue';

  const route = useRoute();
  const query = route.query || {};

  const activeTab = ref(query.tab || 'ecommerce');

  const handleTabChange = (tab: string) => {
    activeTab.value = tab;
  };
</script>

<style scoped lang="scss"></style>
