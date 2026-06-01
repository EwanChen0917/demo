<template>
  <div>
    <el-tabs v-model="parentTab">
      <el-tab-pane label="电商渠道" name="online">
        <div class="tabs-section">
          <el-radio-group v-model="curTab" size="small">
            <el-radio-button value="sku" label="产品SKU" />
            <div class="gap"></div>
            <el-radio-button value="online" label="在线商品" />
            <div class="gap"></div>
          </el-radio-group>
        </div>
        <Sku v-if="curTab === 'sku'" />
        <OnlineGoods v-if="curTab === 'online'" />
      </el-tab-pane>
      <el-tab-pane label="零售与渠道" name="retail">
        <Retail />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts" name="salesForecastingList">
  import Sku from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/sku.vue';
  import OnlineGoods from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/onlinegoods.vue';
  import Retail from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/retail.vue';

  const route = useRoute();
  const query = route.query || {};

  const parentTab = ref(query.tab || 'online');
  const curTab = ref('sku');
</script>

<style scoped lang="scss">
  .tabs-section {
    padding-top: 8px;
    background-color: #fff;
    .gap {
      height: 10px;
      width: 1px;
      margin: 0 1px;
      background-color: #dfe2e6;
    }
    .el-radio-button {
      --el-radio-button-checked-bg-color: #fff;
    }
  }
  :deep(.el-tabs__header) {
    background-color: #fff;
  }
  :global(.rt_el_pop.el-popper) {
    //width: auto!important;
    width: max-content !important;
    min-width: unset;
    border-radius: 6px;
    padding: 0;
    border: none;
    box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);
  }
</style>
