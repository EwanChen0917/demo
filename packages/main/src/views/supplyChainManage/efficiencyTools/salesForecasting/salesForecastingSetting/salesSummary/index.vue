<template>
  <el-tabs v-model="activeTab" tab-position="top" @tab-change="handleTabChange" class="radio-group">
    <el-tab-pane label="电商渠道" name="ecommerce">
      <ecommerce />
    </el-tab-pane>
    <el-tab-pane label="零售与渠道" name="retail">
      <retail />
    </el-tab-pane>
  </el-tabs>
  <!-- <el-radio-group v-model="activeTab" size="small" class="mb-3">
    <el-radio-button value="ecommerce" label="电商渠道"></el-radio-button>
    <el-radio-button value="retail" label="零售与渠道" />
  </el-radio-group>
  <ecommerce v-if="activeTab === 'ecommerce'" />
  <retail v-if="activeTab === 'retail'" /> -->
</template>

<script lang="ts" setup name="salesSummary">
  import ecommerce from './online.vue';
  import retail from './retail.vue';
  const activeTab = ref('retail');

  const handleTabChange = (tab: string) => {
    activeTab.value = tab;
  };
</script>

<style scoped lang="scss"></style>
