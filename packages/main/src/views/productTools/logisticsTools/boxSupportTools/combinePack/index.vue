<template>
  <div class="combine-pack">
    <el-steps
      style="margin-bottom: 10px"
      simple
      finish-status="process"
      process-status="finish"
      :active="stepActive"
    >
      <el-step
        v-for="(item, index) in stepList"
        :key="item.title"
        :title="item.title"
        icon="none"
        @click="handleStepClick(index)"
      />
    </el-steps>
    <OrderData
      :handleStepClick="handleStepClick"
      :handleMaxIndex="handleMaxIndex"
      v-if="stepActive === 0"
    />
    <PackingListAndBoxMark
      v-if="stepActive === 1"
      @handle-max-index="handleMaxIndex"
      @handle-step-click="handleStepClick"
    />
    <Pallet
      v-if="stepActive === 2"
      @handle-max-index="handleMaxIndex"
      @handle-step-click="handleStepClick"
    />
    <Bol
      v-if="stepActive === 3"
      @handle-max-index="handleMaxIndex"
      @handle-step-click="handleStepClick"
    />
    <Invoice
      v-if="stepActive === 4"
      @handle-max-index="handleMaxIndex"
      @handle-step-click="handleStepClick"
    />
    <InboundOrder v-if="stepActive === 5" />
  </div>
</template>

<script lang="ts" setup name="boxSupportToolsCombinePack">
import OrderData from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/OrderData/index.vue';
  import PackingListAndBoxMark from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/PackingListAndBoxMark/index.vue';
  import Pallet from '@/views/productTools/logisticsTools/boxSupportTools/pallet/index.vue';
  import Bol from '@/views/productTools/logisticsTools/boxSupportTools/bol/index.vue';
  import Invoice from '@/views/productTools/logisticsTools/boxSupportTools/packingInvoice/index.vue';
  import InboundOrder from '@/views/productTools/logisticsTools/boxSupportTools/InboundOrder/index.vue';
  import { useCache } from '@/hooks/web/useCache';
  import { erpApi } from '@/api';
  import type { PalletStatusBean } from '@/api/erp/data-contracts';

  const stepActive = ref(0);
  const maxIndex = ref(0);
  const stepList = reactive([
    {
      title: '1、订单数据',
    },
    {
      title: '2、装箱单 & 箱唛',
    },
    {
      title: '3、打托单 & 托唛',
    },
    {
      title: '4、BOL（提单）',
    },
    {
      title: '5、运营装箱单 & 发票',
    },
    {
      title: '6、入库单',
    },
  ]);
  const handleStepClick = (index: number) => {
    console.log(index, maxIndex.value);
    if (index > maxIndex.value) return;
    stepActive.value = index;
  };
  const handleMaxIndex = (index: number) => {
    // 设置最大步骤，只能往前不允许后退
    maxIndex.value = Math.max(index, maxIndex.value);
  };
  const route = useRoute();
  const { wsCache } = useCache('localStorage');
  const queryRecordStatus = async () => {
    const recordCode = route.query.recordCode ?? wsCache.get('recordCode') ?? '';
    if (!recordCode) return;
    const res = (await erpApi.luteosErpPackageQueryRecordStatus({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    })) as unknown as PalletStatusBean;
    switch (1) {
      case res.isFinish:
        stepActive.value = 5;
        maxIndex.value = 5;
        break;
      case res.isGenerateInboundMarkFile:
      case res.isGenerateInboundMark:
        stepActive.value = 5;
        maxIndex.value = 5;
        break;
      case res.isGenerateOperationMarkFile:
      case res.isGenerateOperationMark:
        stepActive.value = 4;
        maxIndex.value = 5;
        break;
      case res.isGenerateBolMarkFile:
      case res.isGenerateBolMark:
        stepActive.value = 3;
        maxIndex.value = 4;
        break;
      case res.isGeneratePalletFile:
        stepActive.value = 2;
        maxIndex.value = 3;
        break;
      case res.isGeneratePalletMark:
      case res.isGeneratePalletOrder:
        stepActive.value = 2;
        maxIndex.value = 2;
        break;
      case res.isGeneratePackageMarkFile:
        stepActive.value = 1;
        maxIndex.value = 2;
        break;
      case res.isGeneratePackageMark:
      case res.isGeneratePackageOrder:
        stepActive.value = 1;
        maxIndex.value = 1;
        break;
      default:
        break;
    }
  };
  onBeforeRouteLeave(() => {
    stepActive.value = 0;
    maxIndex.value = 0;
  });
  onActivated(() => {
    queryRecordStatus();
  });
</script>

<style scoped lang="scss">
  .combine-pack {
    min-width: 1200px;
    background: #fff;
    padding: 20px;
    :deep(.el-step.is-simple:not(:last-of-type) .el-step__title) {
      max-width: 80%;
    }
  }
  :deep(.el-step) {
    cursor: pointer;
  }
</style>
