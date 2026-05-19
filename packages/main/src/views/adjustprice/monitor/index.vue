<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="指定渠道" name="channel">
      <Channel />
    </el-tab-pane>
    <el-tab-pane label="指定国家" name="totalMSKU">
      <Country />
    </el-tab-pane>
    <!-- <el-tab-pane label="指定SKU" name="SKU">
      <SkuTable />
    </el-tab-pane> -->
    <!-- <el-tab-pane label="指定MSKU" name="MSKU">
      <MskuTable />
    </el-tab-pane> -->
  </el-tabs>
</template>

<script setup lang="ts" name="adjustpriceMonitor">
  import Channel from './Table/channel.vue';
  import Country from './Table/country.vue';
  import MskuTable from './Table/msku.vue';
  import SkuTable from './Table/sku.vue';

  const route = useRoute();

  const activeTab = ref(route.query.tab || 'channel');
</script>

<style scoped lang="scss"></style>
