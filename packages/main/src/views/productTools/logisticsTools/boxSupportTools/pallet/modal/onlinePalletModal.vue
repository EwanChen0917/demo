<template>
  <el-dialog title="在线装托" v-model="visible" width="80%">
    <section
      class="table-wrapper"
      v-for="(order, index) in orderList"
      :key="order.billCode"
      v-loading="loading"
    >
      <header>
        <el-space :size="80">
          <template v-if="packageType === 1">
            <div class="fw-bold">订单 {{ index + 1 }}</div>
            <div>参考号(PO号)：{{ order.titleProperty?.referenceCode }}</div>
            <div>订单号：{{ order.titleProperty?.orderCode }}</div>
            <div>客户名称：{{ order.titleProperty?.customerName }}</div>
            <div>总箱数：{{ order.titleProperty?.totalBox }}</div>
          </template>
          <el-button
            type="primary"
            text
            @click="batchPallet(order.titleProperty!.totalBox!, order)"
          >
            批量设置托盘
          </el-button>
        </el-space>
      </header>
      <!-- 增加key避免装箱单的orderTable缓存到当前页面 -->
      <OrderTable
        ref="orderTableRef"
        key="pallet-table"
        :totalBox="order.titleProperty?.totalBox!"
        :order="order"
        :packageType="packageType"
        status="edit"
      />
    </section>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button :loading="btnLoading" type="primary" @click="surePalletBill(false)">
        确认
      </el-button>
      <el-button :loading="btnLoading" type="primary" @click="surePalletBill(true)">
        确认并制作托唛
      </el-button>
    </template>
  </el-dialog>
  <BatchPalletModal v-if="true" ref="batchPalletModalRef" @confirm="updatePallet" />
</template>

<script setup lang="ts">
  import type { PackageMarkListQueryResp, PackageOrderInfo } from '@/api/erp/data-contracts';
  import { erpApi } from '@/api';
  import { useCache } from '@/hooks/web/useCache';
  import OrderTable from '../component/orderTable.vue';
  import BatchPalletModal from './batchPalletModal.vue';

  const emit = defineEmits<{
    (event: 'skipPalletMark'): void;
    (event: 'refresh'): void;
  }>();

  const visible = ref(false);
  /**
   * 批量设置托盘
   */
  const batchPalletModalRef = ref<InstanceType<typeof BatchPalletModal> | null>(null);
  const batchOrder = ref<PackageOrderInfo | null>(null); // 批量设置托唛的订单
  const batchPallet = (totalNumber: number, order) => {
    batchPalletModalRef.value?.open(totalNumber);
    batchOrder.value = order;
  };
  const updatePallet = (
    data: {
      startBoxNumber?: number;
      endBoxNumber?: number;
      palletNumber?: number;
    }[]
  ) => {
    // 托盘信息默认数组
    batchOrder.value!.palletNumberList = batchOrder.value!.palletNumberList || [];
    // 批量设置托盘数据
    data.forEach((item) => {
      for (let i = item.startBoxNumber!; i <= item.endBoxNumber!; i += 1) {
        batchOrder.value!.palletNumberList![i - 1] = {
          boxNumber: i,
          palletNumber: item.palletNumber,
        };
      }
    });
  };
  /**
   * 打开弹窗
   */
  const orderList = ref<PackageOrderInfo[]>([]);
  const open = async () => {
    visible.value = true;
    // 自己获取数据，与其他地方的数据进行数据隔离
    orderList.value = await getOrderList();
  };
  /**
   * 获取订单数据
   */
  const route = useRoute();
  const { wsCache } = useCache('localStorage');
  const loading = ref(false);
  const packageType = ref<1 | 2>(1);
  const getOrderList = async () => {
    loading.value = true;
    const res = (await erpApi
      .luteosErpPackageQueryPalletDetail({
        recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
      })
      .finally(() => {
        loading.value = false;
      })) as unknown as PackageMarkListQueryResp;
    packageType.value = (res.packageType as unknown as 1 | 2) || 1;
    return res.palletPackageDetailList!;
  };
  /**
   * 关闭弹窗
   */
  const handleClose = () => {
    visible.value = false;
  };
  /**
   * 确认打托单
   * @param skipPalletMark 是否制作托唛
   */
  const orderTableRef = ref<InstanceType<typeof OrderTable>[] | null>(null);
  const btnLoading = ref(false);
  const surePalletBill = async (skipPalletMark: boolean) => {
    btnLoading.value = true;
    try {
      await Promise.all(orderTableRef.value!.map((orderTable) => orderTable.validate()));
    } catch (e) {
      btnLoading.value = false;
      return;
    }
    const orderData = orderTableRef.value?.map((orderTable) => orderTable.getTableData());
    await erpApi
      .luteosErpPackageConfirmPalletOrder({
        recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
        palletList: orderData!.map((order) => ({
          billCode: order.orderData![0]!.billCode as string,
          palletBoxList: generatePalletBoxList(order),
        })),
      })
      .finally(() => {
        btnLoading.value = false;
      });
    if (skipPalletMark) {
      emit('skipPalletMark');
    }
    emit('refresh');
    handleClose();
  };
  const generatePalletBoxList = (order: any) => {
    const { totalBoxNumber } = order;
    const palletBoxList = new Array(totalBoxNumber).fill(0).map((_, i) => {
      return {
        boxNumber: i + 1,
        palletNumber: order.orderData[order.orderData.length - 1][`boxNumber${i + 1}`],
      };
    });
    return palletBoxList;
  };
  defineExpose({
    open,
  });
</script>

<style lang="scss" scoped></style>
