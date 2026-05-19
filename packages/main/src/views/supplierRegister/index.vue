<template>
  <!-- 供应商注册ERP外部链接页面 -->
  <h3 class="title-registerList">供应商注册信息</h3>
  <!-- 审核成功，待审核都是查看状态 -->
  <registerDetail
    v-if="auditRecords?.auditStatus == 'APPROVED' || auditRecords?.auditStatus == 'REGISTERED'"
  />
  <registerList v-else />
</template>
<script setup lang="ts" name="supplierRegister">
  import { erpApi } from '@/api';
  import registerList from '@/views/goodscenter/supplyRecommend/components/registerList.vue';
  import registerDetail from '@/views/goodscenter/supplyRecommend/detail.vue';
  const route = useRoute();
  const auditRecords = ref({
    auditStatus: 'INVITED',
  });
  const queryDetail = async () => {
    if (!route.query?.code) return;
    const res = await erpApi.luteosErpInviteSupplierQueryDetail({
      code: route.query?.code as string,
    });
    if (res?.auditRecords?.length) {
      auditRecords.value = res.auditRecords[res.auditRecords?.length - 1];
    }
  };
  queryDetail();
</script>
<style scoped lang="scss">
  .title-registerList {
    text-align: center;
    padding: 10px 0;
  }
</style>
