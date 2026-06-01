<template>
  <KeenCard title="发货指令信息">
    <vxe-table border="inner" :data="detailInfo?.planCommandItemList">
      <vxe-column field="commandCode" title="发货指令单号" />
      <vxe-column field="skuCode" title="产品SKU" />
      <vxe-column field="productName" title="产品名称" />
      <vxe-column field="estimateQty" title="预计发货量" />
      <vxe-column field="estimateShipDate" title="预计发货时间" />
      <vxe-column field="shipMethodDesc" title="发货方式" />
      <vxe-column field="planer" title="计划" />
    </vxe-table>
  </KeenCard>
  <KeenCard title="提货信息" position="start">
    <template #operation>
      <div class="d-flex gap-10 ms-20">
        <span>提货时间 {{ detailInfo?.baseInfo?.pickTime }}</span>
        <span>提货方式 {{ detailInfo?.baseInfo?.pickTypeDesc }}</span>
      </div>
    </template>
    <ItemInfo :data="detailInfo?.itemList" />
  </KeenCard>
  <KeenCard title="审核历史">
    <el-descriptions v-for="(item, index) in detailInfo?.authList" :key="index">
      <el-descriptions-item label="审核结果">{{ item.statusDesc }}</el-descriptions-item>
      <el-descriptions-item label="审核时间">{{ item.authTime }}</el-descriptions-item>
      <el-descriptions-item label="备注">{{ item.remark }}</el-descriptions-item>
    </el-descriptions>
  </KeenCard>
</template>

<script setup lang="ts" name="takeDeliveryManageDetail">
  import ItemInfo from '@/views/supplyChainManage/takeDeliveryTools/takeDeliveryManage/component/itemInfo.vue';
  import { erpApi } from '@/api';
  import { PlanBillLadingDetailQueryResp } from '@/api/erp/data-contracts';

  const route = useRoute();
  const { code } = route.query;

  const detailInfo = ref<PlanBillLadingDetailQueryResp>({});
  const getDetailInfo = async () => {
    detailInfo.value = await erpApi.luteosErpPlanBillLadingQueryDetail({
      code,
    });
  };
  getDetailInfo();
</script>

<style scoped lang="scss"></style>
