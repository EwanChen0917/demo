<!-- 合并装箱-箱唛 -->
<template>
  <div>
    <el-space>
      <span style="font-size: 14px; font-weight: 700">
        操作步骤：1、箱唛模板——2、点击生成箱唛按钮——3、编辑/确认箱唛文件——4、下载箱唛文件
      </span>
      <el-button
        v-if="route?.query?.viewType !== 'view'"
        @click="makeBookingNote"
        type="primary"
        text
        :disabled="!(isGenerateMark || canShow)"
      >
        制作打托单&托唛
      </el-button>
    </el-space>
    <div>
      <el-space :size="50">
        <span>箱唛模板：</span>
        <el-select v-model="sendData.packageModuleType" placeholder="请选择" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          v-if="route?.query?.viewType !== 'view'"
          :loading="markBoxMarkLoading"
          @click="makeBoxMark"
          type="primary"
          text
        >
          生成箱唛
        </el-button>
        <el-button @click="downloadShippingMarkFile" type="primary" text>下载箱唛文件</el-button>
      </el-space>
      <div class="area">
        <div class="order-table">
          <OrderTable
            ref="orderTable"
            :need-box-number="true"
            :can-change-box-number="false"
            :orderList="orderList"
            :loading="listLoading"
          />
        </div>
        <div class="box-mark" v-loading="markLoading">
          <BoxMarkArea
            v-if="canShow"
            @clear-box-mark="clearBoxMark"
            ref="boxMarkArea"
            :billCodeList="billCodeList"
            @sure-mark="sureMark"
          />
        </div>
      </div>
    </div>
    <!-- 合并装箱-箱唛pdf区域 -->
    <div :style="{ height: 0, width: '386px', overflow: 'hidden' }">
      <div id="pdf-area">
        <div v-for="(item, index) in allList" :key="item.bilCode" class="box-mark-area-item">
          <CommonTemplate ref="boxMarkPdfRef" :item="item" :index="index" :startPdf="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import { useCache } from '@/hooks/web/useCache';
  import OrderTable from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/OrderTable/index.vue';
  import { queryCombinePackPackageMark } from '@/views/productTools/logisticsTools/boxSupportTools/utils';
  import BoxMarkArea from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/PackingListAndBoxMark/components/BoxMark/components/BoxMarkArea/index.vue';
  import type { PackageMarkData, PackageMarkDataResp } from '@/api/erp/data-contracts';
  import { urlDownload } from '@/utils/download';
  import { exportToPDF, uploadFile } from '@/utils/boxMark';
  import { ElMessage } from 'element-plus';
  import CommonTemplate from '@/views/productTools/logisticsTools/boxSupportTools/Template/common.vue';

  const emit = defineEmits<{
    (event: 'handleMaxIndex', data: number): void;
    (event: 'handleStepClick', data: number): void;
  }>();

  const { wsCache } = useCache('localStorage');
  const route = useRoute();
  const orderTable = ref<typeof OrderTable>();
  const orderList = ref<any[]>();
  const recordCode = ref<string | undefined>(undefined);
  const boxMarkArea = ref<typeof BoxMarkArea>();
  const sendData = ref<{
    fileType: 1 | 2;
    packageModuleType: string;
  }>({
    fileType: 1,
    packageModuleType: '通用箱唛模板',
  });

  const canShow = ref(false);
  const props = defineProps<{
    activeName: string;
  }>();
  const options = reactive([
    {
      value: '通用箱唛模板',
      label: '通用箱唛模板',
    },
  ]);
  const billCodeList = ref<string[]>([]);

  const markBoxMarkLoading = ref(false);
  const makeBoxMark = async () => {
    try {
      markBoxMarkLoading.value = true;
      await erpApi.luteosErpPackageInitMarkData({
        billCodeList: billCodeList.value,
      });
      canShow.value = true;
      await nextTick();
      if (boxMarkArea.value) {
        boxMarkArea.value.makeBoxMark();
      }
    } finally {
      markBoxMarkLoading.value = false;
    }
  };
  const clearBoxMark = () => {
    canShow.value = false;
  };
  const allList = ref<PackageMarkData[]>([]);
  const markLoading = ref(false);
  const sureMark = async () => {
    // 获取所有箱唛数据
    const res = (await erpApi.luteosErpPackageQueryMarkData({
      billCodeList: billCodeList.value,
    })) as unknown as PackageMarkDataResp;
    allList.value = res.respList || [];
    markLoading.value = true;
    nextTick(async () => {
      try {
        // erpApi.luteosErpPackageGeneratePackageMarkFile({
        //   recordCode: `${document.querySelector('#pdf-area')?.innerHTML}`,
        //   fileType: sendData.value.fileType,
        // });
        // return;
        const file: Blob | null = await exportToPDF();
        if (!file) return;
        // 将文件key上传到文件服务器
        const fileKey = await uploadFile(file);
        // 将文件key保存到数据库
        confirmMarkFile(fileKey);
      } finally {
        markLoading.value = false;
      }
    });
  };
  const confirmMarkFile = (fileKey: string) => {
    erpApi.luteosErpPackageConfirmPackageMarkV2({
      fileType: sendData.value.fileType,
      fileKeyList: [
        {
          fileKey,
          orderCode: allList.value[0].orderCode,
        },
      ],
      recordCode: allList.value[0].recordCode,
    });
    ElMessage.success('操作成功');
    emit('handleMaxIndex', 2);
  };
  const downloadShippingMarkFile = async () => {
    const res = await erpApi.luteosErpPackageDownLoadPackageMakFile({
      recordCode: recordCode.value,
    });
    urlDownload(res as string);
  };

  const listLoading = ref(false);
  const queryCombinePackPackageMarkFn = async () => {
    recordCode.value = route.query.recordCode ?? wsCache.get('recordCode') ?? '';
    if (recordCode.value) {
      try {
        listLoading.value = true;
        orderList.value = await queryCombinePackPackageMark(recordCode.value, orderTable?.value);
        if (orderList.value) {
          billCodeList.value = orderList.value
            .filter((item) => item.billCode)
            .map((item) => item.billCode);
        }
        queryMarkData();
      } finally {
        listLoading.value = false;
      }
    }
  };
  const isGenerateMark = ref(false);
  const queryMarkData = async () => {
    const res = (await erpApi.luteosErpPackageQueryMarkData({
      billCodeList: billCodeList.value,
    })) as unknown as PackageMarkDataResp;
    isGenerateMark.value = !!res.isGenerateMark;
    if (res.isGenerateMark) {
      emit('handleMaxIndex', 2);
      canShow.value = true;
      await nextTick();
      if (boxMarkArea.value) {
        boxMarkArea.value.makeBoxMark();
      }
    }
  };
  watch(
    () => props.activeName,
    async (newVal) => {
      if (newVal === 'boxMark') {
        queryCombinePackPackageMarkFn();
      }
    }
  );
  const makeBookingNote = () => {
    emit('handleStepClick', 2);
  };
</script>

<style scoped lang="scss">
  .area {
    display: flex;
    .order-table {
      flex: 1;
      width: 0;
    }
    .box-mark {
      flex: none;
      width: 450px;
    }
  }
</style>
