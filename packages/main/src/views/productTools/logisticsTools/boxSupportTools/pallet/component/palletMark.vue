<template>
  <div>
    <el-space>
      <span style="font-size: 14px; font-weight: 700">
        操作步骤：1、托唛模板——2、点击生成托唛按钮——3、编辑/确认托唛文件——4、下载托唛文件
      </span>
      <el-button
        v-if="route?.query?.viewType !== 'view'"
        :disabled="!(canNextStep || isGeneratePalletMark)"
        @click="skipBol"
        type="primary"
        text
      >
        制作BOL提单
      </el-button>
    </el-space>
    <div>
      <el-space :size="50">
        <div>
          <span>托唛模板：</span>
          <el-select
            v-model="sendData.packageModuleType"
            placeholder="请选择"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in templateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-button
          v-if="route?.query?.viewType !== 'view'"
          @click="initPalletMark"
          :loading="btnLoading"
          type="primary"
          text
        >
          生成托唛
        </el-button>
        <el-button @click="downloadPalletMarkFile" type="primary" text>下载托唛文件</el-button>
      </el-space>
      <div class="area">
        <!-- 装箱数据 -->
        <div class="order-table">
          <section
            class="table-wrapper"
            v-for="(order, index) in orderList"
            :key="'pallet-mark' + order.billCode"
          >
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
              :loading="loading"
              :totalBox="order.titleProperty?.totalBox!"
              :packageType="packageType"
              :order="order"
              status="view"
            />
          </section>
        </div>
        <!-- 托唛展示区域 -->
        <div class="pallet-mark" v-loading="markLoading">
          <PalletMarkArea
            ref="palletMarkAreaRef"
            v-if="isShowflag || isGeneratePalletMark"
            @sure-mark="sureMark"
          />
        </div>
      </div>
    </div>
    <!-- 托唛pdf区域 -->
    <div aria-hidden="true" :style="{ height: 0, width: '386px', overflow: 'hidden' }">
      <div :id="`pdf-area`" :style="{}">
        <div v-for="(item, index) in allList" :key="item.id" class="box-mark-area-item">
          <CommonTemplate
            :key="`pdf-area-${index}`"
            ref="boxMarkPdfRef"
            :item="item"
            :index="index"
            :startPdf="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import { useCache } from '@/hooks/web/useCache';
  import type {
    PackageOrderInfo,
    PalletDataResp,
    PalletMarkDataBean,
  } from '@/api/erp/data-contracts';
  import { urlDownload } from '@/utils/download';
  import { exportToPDF, uploadFile } from '@/utils/boxMark';
  import { ElMessage } from 'element-plus';
  import PalletMarkArea from './palletMarkArea.vue';
  import CommonTemplate from '../template/CommonTemplate.vue';
  import OrderTable from './orderTable.vue';

  const props = defineProps<{
    orderList: PackageOrderInfo[];
    packageType: 1 | 2;
    isGeneratePalletMark: boolean;
    loading?: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'handleMaxIndex', data: number): void;
    (event: 'handleStepClick', data: number): void;
  }>();
  const { wsCache } = useCache('localStorage');
  const route = useRoute();
  const isShowflag = ref(false);
  const sendData = ref<{
    packageModuleType: string;
  }>({
    packageModuleType: '通用托唛模板',
  });
  // 托唛模板选项
  const templateOptions = reactive([
    {
      value: '通用托唛模板',
      label: '通用托唛模板',
    },
  ]);

  /**
   * 初始化托唛数据
   */
  const btnLoading = ref(false);
  const palletMarkAreaRef = ref<InstanceType<typeof PalletMarkArea>>();
  const initPalletMark = async () => {
    try {
      btnLoading.value = true;

      await erpApi.luteosErpPackageInitPalletMarkData({
        recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
      });
      // 托唛已经展示，用来刷新托唛数据
      if (isShowflag.value || props.isGeneratePalletMark) {
        palletMarkAreaRef.value?.queryPalletDataByPage();
      }
      isShowflag.value = true;
    } finally {
      btnLoading.value = false;
    }
  };

  const allList = ref<PalletMarkDataBean[]>([]);
  const markLoading = ref(false);
  /**
   * 确认托唛
   */
  const canNextStep = ref(false);
  const sureMark = async () => {
    markLoading.value = true;
    // 获取所有托唛数据
    const res = (await erpApi.luteosErpPackageQueryPalletMarkData({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    })) as PalletDataResp;
    allList.value = res.respList!;
    nextTick(async () => {
      const file: Blob | null = await exportToPDF('#pdf-area');
      if (!file) return;
      // 将文件上传到文件服务器
      const fileKey = await uploadFile(file, 'palletMark');
      // 将文件key保存到数据库
      confirmMarkFile(fileKey);
    });
  };

  const confirmMarkFile = async (fileKey: string) => {
    await erpApi
      .luteosErpPackageConfirmPalletFile({
        key: fileKey,
        recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
      })
      .finally(() => {
        markLoading.value = false;
      });
    ElMessage.success('操作成功');
    canNextStep.value = true;
    emit('handleMaxIndex', 3);
  };
  /**
   * 下载托唛文件
   */
  const downloadPalletMarkFile = async () => {
    const res = await erpApi.luteosErpPackageDownloadPalletMarkFile({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
    urlDownload(res as string);
  };
  /**
   * 跳转到BOL提单
   */
  const skipBol = () => {
    console.log('跳转到BOL提单');
    emit('handleStepClick', 3);
  };
</script>

<style scoped lang="scss">
  .area {
    display: flex;
    .table-wrapper {
      margin-top: 20px;
    }
    .order-table {
      flex: 1;
      width: 0;
    }
    .pallet-mark {
      flex: none;
      width: 386px;
      height: 740px;
    }
  }
</style>
