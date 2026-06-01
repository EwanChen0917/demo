<template>
  <vxe-table border="inner" :data="data">
    <vxe-column field="supplySku" title="供应链SKU" />
    <vxe-column field="supplierDesc" title="供应商名称" />
    <vxe-column field="skuCode" title="产品SKU" />
    <vxe-column field="productName" title="产品名称" />
    <vxe-column field="purchaseWaitPickQty" title="采购未交数量" />
    <vxe-column field="pickQty" title="提货数量" />
    <vxe-column title="关联发货指令">
      <template #default="{ row }">
        <template v-if="checkPermission('deliverDirections')">
          <div
            class="cursor-pointer text-primary"
            v-for="item in row.shipCommandCodeList"
            :key="item"
            @click="toDeliverDirections(item)"
          >
            {{ item }}
          </div>
        </template>
        <template v-else>
          <div v-for="item in row.shipCommandCodeList" :key="item">
            {{ item }}
          </div>
        </template>
      </template>
    </vxe-column>
  </vxe-table>
</template>

<script setup lang="ts">
  import { Item } from '@/api/erp/data-contracts';
  import { checkPermission } from '@/utils/permission';

  defineProps<{
    data: Item[];
  }>();

  const router = useRouter();

  const toDeliverDirections = (code) => {
    router.push(`/deliverDirections?code=${code}`);
  };
</script>

<style scoped lang="scss"></style>
