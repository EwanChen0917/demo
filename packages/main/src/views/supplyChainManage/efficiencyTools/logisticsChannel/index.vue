<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="头程渠道" name="supplier_first">
      <Logistics />
    </el-tab-pane>
    <el-tab-pane v-if="checkPermission('selfChannel')" label="自发货渠道" name="supplier_second">
      <ShipmentType />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="shipmentType">
  import ShipmentType from '@/views/supplyChainManage/efficiencyTools/shipmentType/index.vue';
  import Logistics from './logistics.vue';
  import { checkPermission } from '@/utils/permission';

  const router = useRouter();
  const activeTab = ref(checkPermission('firstChannel') ? 'supplier_first' : 'supplier_second');

  const noPermission = () => {
    if (!checkPermission('firstChannel') && !checkPermission('selfChannel')) {
      router.push('/404');
    }
  };
  onMounted(() => {
    noPermission();
  });
</script>

<style scoped lang="scss"></style>
