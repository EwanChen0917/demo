<!-- 合并装箱-装箱单和箱唛 -->
<template>
  <el-tabs v-model="activeName" type="card" class="packing-list-tabs" @tab-click="handleClick">
    <el-tab-pane label="装箱单" name="packingList">
      <PackingList :activeName="activeName" @change-tab="changeTab" />
    </el-tab-pane>
    <el-tab-pane :disabled="!recordCode" label="箱唛" name="boxMark">
      <BoxMark :activeName="activeName" :orderList="orderList" v-bind="$attrs" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import { SourceOrderBean } from '@/api/erp/data-contracts';
  import { TabsPaneContext } from 'element-plus';
  import PackingList from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/PackingListAndBoxMark/components/PackingList/index.vue';
  import BoxMark from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/PackingListAndBoxMark/components/BoxMark/index.vue';
  import { useCache } from '@/hooks/web/useCache';

  const route = useRoute();
  const { wsCache } = useCache('localStorage');
  const recordCode = ref<string | undefined>(undefined);
  const activeName = ref('packingList');
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    activeName.value = tab.props.name as string;
  };
  const orderList = ref<SourceOrderBean[]>();
  const getTableList = async () => {
    if (route.query.id) {
      const ids = route.query.id as string;
      const res = await erpApi.luteosErpPackageQueryChooseOrderList({
        orderIdList: ids.split(',').map((item) => Number(item)),
      });
      if (res.orderList) {
        res.orderList.map((i) => {
          i.skuDescList?.map((v: any) => {
            v.referenceCode = i.referenceCode;
            v.orderCode = i.orderCode;
            v.customerName = i.customerName;
            v.warehouseDesc = i.warehouseDesc;
            orderList.value?.push(v);
            return v;
          });
          return i;
        });
      }
    }
  };
  const changeTab = (tabName: string, code: string) => {
    activeName.value = tabName;
    recordCode.value = code;
  };
  onMounted(() => {
    recordCode.value = route.query.recordCode ?? wsCache.get('recordCode') ?? undefined;
    getTableList();
  });
</script>

<style scoped lang="scss">
  .packing-list-tabs {
    margin-top: 10px;
  }
</style>
