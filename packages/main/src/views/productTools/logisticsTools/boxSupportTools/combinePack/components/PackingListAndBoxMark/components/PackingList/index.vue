<!-- 合并装箱-装箱单 -->
<template>
  <div class="packing-list">
    <el-button v-if="route?.query?.viewType !== 'view'" @click="visible = true" type="primary" text>
      在线装箱
    </el-button>
    <el-button
      v-if="route?.query?.viewType !== 'view'"
      @click="excelVisible = true"
      type="primary"
      text
    >
      上传Excel表格装箱
    </el-button>
    <template v-if="recordCode">
      <el-button @click="downloadPackingList" type="primary" text>下载装箱单</el-button>
      <el-button
        v-if="route?.query?.viewType !== 'view'"
        @click="emit('changeTab', 'boxMark', recordCode)"
        type="primary"
        text
      >
        制作箱唛
      </el-button>
    </template>
    <OrderTable ref="orderTable" :orderList="orderList" :loading="listLoading" />
    <!-- 在线编辑装箱清单 -->
    <OnlinePackingDialog @get-record-code="getRecordCode" @close="closeModal" :visible="visible" />
    <ExcelPackingDialog
      @get-record-code="getRecordCode"
      @close="closeModal"
      :visible="excelVisible"
    />
  </div>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import { SourceOrderBean } from '@/api/erp/data-contracts';
  import { useCache } from '@/hooks/web/useCache';
  import OrderTable from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/OrderTable/index.vue';
  import OnlinePackingDialog from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/PackingListAndBoxMark/components/PackingList/components/OnlinePackingDialog/index.vue';
  import ExcelPackingDialog from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/PackingListAndBoxMark/components/PackingList/components/ExcelPackingDialog/index.vue';
  import { queryCombinePackPackageMark } from '@/views/productTools/logisticsTools/boxSupportTools/utils';
  import { urlDownload } from '@/utils/download';

  const route = useRoute();
  const { wsCache } = useCache('localStorage');
  const orderList = ref<SourceOrderBean[] | undefined>([]);
  const listLoading = ref(false);
  const visible = ref(false);
  const excelVisible = ref(false);
  const orderTable = ref<typeof OrderTable>();
  const recordCode = ref<string | undefined>(undefined);
  const closeModal = () => {
    visible.value = false;
    excelVisible.value = false;
  };
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
          orderTable.value.tableColumnList = [...orderTable.value.initTableColumnList];
        }
      } finally {
        listLoading.value = false;
      }
    }
  };
  const emit = defineEmits<{
    (event: 'changeTab', tabName: string, code: string): void;
  }>();
  const getRecordCode = async (code: string, toBox: string) => {
    recordCode.value = code;
    orderList.value = await queryCombinePackPackageMark(code, orderTable?.value);
    closeModal();
    if (toBox) {
      emit('changeTab', 'boxMark', recordCode.value);
    }
  };
  const downloadPackingList = async () => {
    if (recordCode.value && orderList?.value?.length) {
      const res = await erpApi.luteosErpPackageDownPackageOrder({
        recordCode: recordCode.value,
      });
      urlDownload(res as string);
    }
  };
  const init = async () => {
    recordCode.value = route.query.recordCode ?? wsCache.get('recordCode') ?? '';
    if (recordCode.value) {
      try {
        listLoading.value = true;
        orderList.value = await queryCombinePackPackageMark(recordCode.value, orderTable?.value);
      } finally {
        listLoading.value = false;
      }
    } else {
      getTableList();
    }
  };
  onMounted(() => {
    init();
  });
</script>

<style scoped lang="scss"></style>
