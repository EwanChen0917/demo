<!-- 打托单&托唛 -->
<template>
  <el-tabs :model-value="activeName" @tab-click="changeTab" type="card" class="packing-list-tabs">
    <el-tab-pane label="打托单" name="palletBill">
      <PalletBill
        :orderList="orderList"
        :packageType="packageType"
        :isCompletedPallet="isCompletedPallet"
        :loading="listLoading"
        @refresh="refresh"
        @skip-pallet-mark="changeTab('palletMark')"
      />
    </el-tab-pane>
    <el-tab-pane label="托唛" :disabled="!isCompletedPallet" name="palletMark">
      <PalletMark
        :loading="listLoading"
        :orderList="orderList"
        :packageType="packageType"
        :isGeneratePalletMark="isGeneratePalletMark"
        @handle-max-index="handleMaxIndex"
        v-bind="$attrs"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import type { PackageMarkListQueryResp, PackageOrderInfo } from '@/api/erp/data-contracts';
  import { useCache } from '@/hooks/web/useCache';
  import { ElMessage, type TabsPaneContext } from 'element-plus';
  import PalletBill from './component/palletBill.vue';
  import PalletMark from './component/palletMark.vue';

  const emit = defineEmits<{
    (event: 'handleMaxIndex', data: number): void;
  }>();
  const activeName = ref('palletBill');
  /**
   * 切换tab标签
   * @param tabName tab名称
   */
  const changeTab = (tabName: string | TabsPaneContext) => {
    if (tabName === 'palletBill') {
      activeName.value = 'palletBill';
      return;
    }
    if (tabName === 'palletMark' && !isCompletedPallet.value) {
      ElMessage({
        message: '请先完成打托单',
        type: 'warning',
      });
      activeName.value = 'palletBill';
      return;
    }
    activeName.value = typeof tabName === 'string' ? tabName : (tabName.props.name as string);
  };
  const isCompletedPallet = computed(() => {
    return orderList.value.every((order) => {
      return order.palletNumberList?.every((item) => {
        return item.palletNumber;
      });
    });
  });
  const route = useRoute();
  const { wsCache } = useCache('localStorage');
  const orderList = ref<PackageOrderInfo[]>([]);

  /**
   * 获取订单数据
   */
  const packageType = ref<1 | 2>(2); // 1-单独装箱 2-合并装箱;
  const isGeneratePalletMark = ref(false); // 是否生成托唛文件
  const getOrderList = async () => {
    const res = (await erpApi.luteosErpPackageQueryPalletDetail({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    })) as unknown as PackageMarkListQueryResp;

    // 托唛已经生成时，允许跳转到BOL提单
    if (isGeneratePalletMark.value) {
      emit('handleMaxIndex', 3);
    }
    return res;
  };

  const listLoading = ref(false);
  (async function init() {
    try {
      listLoading.value = true;
      const res = await getOrderList();
      orderList.value = res.palletPackageDetailList!;
      packageType.value = res.packageType as 1 | 2;
      isGeneratePalletMark.value = !!res.generateStatusBean?.isGeneratePalletMark;
    } finally {
      listLoading.value = false;
    }
  })();
  const refresh = async () => {
    try {
      listLoading.value = true;
      const res = await getOrderList();
      orderList.value = res.palletPackageDetailList!;
    } finally {
      listLoading.value = false;
    }
  };
  const handleMaxIndex = (index: number) => {
    emit('handleMaxIndex', index);
  };
</script>

<style scoped>
  /* Add your styles here */
</style>
