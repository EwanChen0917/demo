<template>
  <el-button @click="goPacking" size="large" type="primary" text>去装箱</el-button>
  <OrderTable ref="orderTable" :orderList="orderList" :loading="listLoading" />
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import { useCache } from '@/hooks/web/useCache';
  import OrderTable from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/OrderTable/index.vue';

  const route = useRoute();
  const { wsCache } = useCache('localStorage');
  const orderList = ref<any>([]);
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
        if (orderTable.value) {
          orderTable.value.tableColumnList = [
            ...orderTable.value.initTableColumnList,
            { prop: 'warehouseDesc', label: '发货仓库' },
          ];
        }
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

<style scoped lang="scss"></style>
