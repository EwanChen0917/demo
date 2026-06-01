<template>
  <el-tabs v-model="curTab">
    <!--    <el-tab-pane label="FBA" :name="1">
      <FBAPush v-show="curTab === 1" :code="route.query?.code" />
    </el-tab-pane>-->
    <el-tab-pane label="其他调拨" :name="2">
      <OtherTransfers v-show="curTab === 2" :code="route.query?.code" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="warehouseOrderPush">
  import FBAPush from '@/views/supplyChainManage/efficiencyTools/warehouseOrder/components/FBAPush.vue';
  import OtherTransfers from '@/views/supplyChainManage/efficiencyTools/warehouseOrder/components/OtherTransfers.vue';

  const curTab = ref(2);

  const route = useRoute();
</script>

<style scoped lang="scss"></style>
