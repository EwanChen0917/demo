<template>
  <el-button v-if="route?.query?.viewType !== 'view'" @click="goPacking" type="primary" text>
    去装箱
  </el-button>
  <div class="order-table-wrap">
    <OrderTable ref="orderTable" :orderList="orderList" :loading="listLoading" />
  </div>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import { SourceOrderBean } from '@/api/erp/data-contracts';
  import { useCache } from '@/hooks/web/useCache';
  import OrderTable from '@/views/productTools/logisticsTools/boxSupportTools/selectOrderPacking/components/OrderTable/index.vue';

  const route = useRoute();
  const { wsCache } = useCache('localStorage');
  const orderList = ref<SourceOrderBean[] | undefined>([]);
  const orderTable = ref<typeof OrderTable>();
  const props = withDefaults(
    defineProps<{
      handleStepClick: (index: number) => void;
      handleMaxIndex: (maxIndex: number) => void;
    }>(),
    {}
  );
  const goPacking = () => {
    props.handleMaxIndex(1);
    props.handleStepClick(1);
  };

  const listLoading = ref(false);
  const getTableList = async () => {
    if (route.query.id) {
      try {
        listLoading.value = true;
        const ids = route.query.id as string;
        const res = await erpApi.luteosErpPackageQueryChooseOrderList({
          orderIdList: ids.split(',').map((item) => Number(item)),
        });
        orderList.value = res.orderList;
        orderList.value?.map((i, index) => {
          i.skuDescList?.map((v: any) => {
            v.warehouseDesc = i.warehouseDesc;
            return v;
          });
          if (orderTable.value) {
            orderTable.value.tableColumnListArray[index] = [
              ...orderTable.value.tableColumnList,
              {
                prop: 'warehouseDesc',
                label: '发货仓库',
              },
            ];
          }
          return i;
        });
      } finally {
        listLoading.value = false;
      }
    }
  };
  const getDetail = async () => {
    try {
      listLoading.value = true;
      const res = await erpApi.luteosErpPackageQueryDetail({
        recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
      });
      if (res.palletPackageDetailList?.length) {
        props.handleMaxIndex(1);
      }
      if (res.chooseOrderInfoList?.length) {
        orderList.value = res.chooseOrderInfoList;
        orderList.value?.map((i, index) => {
          i.skuDescList?.map((v: any) => {
            v.warehouseDesc = i.warehouseDesc;
            return v;
          });
          if (orderTable.value) {
            orderTable.value.tableColumnListArray[index] = [
              ...orderTable.value.tableColumnList,
              {
                prop: 'warehouseDesc',
                label: '发货仓库',
              },
            ];
          }
          return i;
        });
      }
    } finally {
      listLoading.value = false;
    }
  };
  onMounted(() => {
    if (route.query.viewType) {
      getDetail();
    } else {
      getTableList();
    }
  });
</script>

<style scoped lang="scss">
  .order-table-wrap {
    margin-top: 10px;
  }
</style>
