<template>
  <div class="pallet-bill">
    <section>
      <el-space>
        <el-button
          type="primary"
          text
          @click="openOnlinePallet"
          v-if="route?.query?.viewType !== 'view'"
        >
          在线装托
        </el-button>
        <el-button
          type="primary"
          text
          @click="openUploadPallet"
          v-if="route?.query?.viewType !== 'view'"
        >
          上传装托文件
        </el-button>
        <el-button type="primary" text @click="downloadFile">下载打托明细文件</el-button>
        <el-button type="primary" :disabled="!isCompletedPallet" text @click="skipPalletMark">
          制作托唛
        </el-button>
      </el-space>
    </section>
    <section class="table-wrapper" v-for="(order, index) in orderList" :key="order.billCode">
      <!-- 单独装箱显示 -->
      <header v-if="packageType === 1">
        <el-space :size="80">
          <div class="fw-bold">订单 {{ index + 1 }}</div>
          <div>参考号(PO号)：{{ order.titleProperty?.referenceCode }}</div>
          <div>订单号：{{ order.titleProperty?.orderCode }}</div>
          <div>客户名称：{{ order.titleProperty?.customerName }}</div>
          <div>总箱数：{{ order.titleProperty?.totalBox }}</div>
        </el-space>
      </header>
      <!-- 增加key避免装箱单的orderTable缓存到当前页面 -->
      <OrderTable
        key="pallet-table"
        :totalBox="order.titleProperty?.totalBox!"
        :order="order"
        :packageType="packageType"
        :loading="loading"
        status="view"
      />
    </section>
  </div>
  <OnlinePalletModal
    ref="onlinePalletModalRef"
    @refresh="refresh"
    @skip-pallet-mark="skipPalletMark"
  />
  <UploadPalletModal ref="uploadPalletModalRef" @close="closeOnlinePallet" />
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';

  import { download } from '@/utils/download';

  import { PackageOrderInfo } from '@/api/erp/data-contracts';
  import { useCache } from '@/hooks/web/useCache';
  import OrderTable from './orderTable.vue';
  import OnlinePalletModal from '../modal/onlinePalletModal.vue';
  import UploadPalletModal from '../modal/uploadPalletModal.vue';

  const props = defineProps<{
    orderList: PackageOrderInfo[];
    packageType: 1 | 2;
    isCompletedPallet: boolean;
    loading?: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'skipPalletMark'): void;
    (event: 'refresh'): void;
  }>();

  /**
   * 刷新页面数据
   */
  const refresh = async () => {
    emit('refresh');
  };
  /**
   * 打开在线装托
   */
  const onlinePalletModalRef = ref<InstanceType<typeof OnlinePalletModal> | null>(null);
  const openOnlinePallet = () => {
    onlinePalletModalRef.value?.open();
  };
  const closeOnlinePallet = (isConfirm: boolean) => {
    if (isConfirm) {
      refresh();
    }
  };
  /**
   * 打开上传装托文件
   */
  const uploadPalletModalRef = ref<InstanceType<typeof UploadPalletModal> | null>(null);
  const openUploadPallet = () => {
    uploadPalletModalRef.value?.open();
  };
  const route = useRoute();
  const { wsCache } = useCache('localStorage');
  /**
   * 下载打托明细文件
   */
  const downloadFile = async () => {
    const res = await erpApi.luteosErpPackageDownLoadPalletDetail({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
      packageType: route.query.packageType ?? wsCache.get('packageType') ?? 1,
    });
    download(res as string, '打托明细文件.pdf');
  };
  /**
   * 跳转制作托唛
   */
  const skipPalletMark = () => {
    emit('skipPalletMark');
  };
</script>

<style lang="scss" scoped>
  /* Add your styles here */
  .pallet-bill {
    .table-wrapper {
      margin-top: 20px;
    }
  }
</style>
