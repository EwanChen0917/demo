<template>
  <div>
    <el-space>
      <span style="font-size: 14px; font-weight: 700">
        操作步骤：1、选择文件方式——2、箱唛模板——3、点击生成箱唛按钮——4、编辑/确认箱唛文件——5、下载箱唛文件
      </span>
      <el-button @click="downloadShippingMarkFile" type="primary" text>下载箱唛文件</el-button>
      <el-button
        v-if="route?.query?.viewType !== 'view'"
        @click="makeBookingNote"
        type="primary"
        text
      >
        制作打托单&托唛
      </el-button>
    </el-space>
    <div>
      <el-space :size="50">
        <div style="display: flex; align-items: center">
          <span>文件方式：</span>
          <el-radio-group size="small" v-model="sendData.fileType">
            <el-radio :label="1">全部订单生成一份箱唛文件</el-radio>
            <el-radio :label="2">根据订单号生成箱唛文件</el-radio>
          </el-radio-group>
        </div>
        <div>
          <span>箱唛模板：</span>
          <el-select v-model="sendData.packageModuleType" placeholder="请选择" style="width: 240px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-button
          v-if="route?.query?.viewType !== 'view'"
          @click="makeBoxMark"
          type="primary"
          text
        >
          生成箱唛
        </el-button>
      </el-space>
      <div class="area">
        <!-- 装箱数据 -->
        <div class="order-table">
          <OrderTable
            ref="orderTable"
            :need-box-number="true"
            :can-change-box-number="false"
            :orderList="orderList"
          />
        </div>
        <!-- 箱唛展示区域 -->
        <div class="box-mark" v-loading="markLoading">
          <BoxMarkArea
            v-if="canShow"
            @clear-box-mark="clearBoxMark"
            ref="boxMarkArea"
            :billCodeList="billCodeList"
            :fileType="sendData.fileType"
            @sure-mark="sureMark"
          />
        </div>
      </div>
    </div>
    <!-- 箱唛pdf区域 -->
    <div :style="{ height: 0, width: '386px', overflow: 'hidden' }">
      <div :id="`pdf-area-${idx}`" :key="idx" v-for="(info, idx) in allList" :style="{}">
        <div v-for="(item, index) in info" :key="item.bilCode" class="box-mark-area-item">
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
  import OrderTable from '@/views/productTools/logisticsTools/boxSupportTools/selectOrderPacking/components/OrderTable/index.vue';
  import { queryPackageMark } from '@/views/productTools/logisticsTools/boxSupportTools/utils';
  import BoxMarkArea from '@/views/productTools/logisticsTools/boxSupportTools/selectOrderPacking/components/PackingListAndBoxMark/components/BoxMark/components/BoxMarkArea/index.vue';
  import { PackageMarkData, PackageMarkDataResp } from '@/api/erp/data-contracts';
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
  const allList = ref<PackageMarkData[][]>([]);
  const markLoading = ref(false);
  const sureMark = async () => {
    markLoading.value = true;
    // 获取所有箱唛数据
    const res = (await erpApi.luteosErpPackageQueryMarkData({
      billCodeList: billCodeList.value,
    })) as unknown as PackageMarkDataResp;
    if (sendData.value.fileType === 1) {
      allList.value = [res.respList || []];
      nextTick(async () => {
        const file: Blob | null = await exportToPDF('#pdf-area-0');
        if (!file) return;
        // 将文件上传到文件服务器
        const fileKey = await uploadFile(file);
        // 将文件key保存到数据库
        confirmMarkFile([{ fileKey, orderCode: allList.value[0].orderCode }]);
      });
    } else if (sendData.value.fileType === 2) {
      // 根据订单号生成箱唛文件
      const orderObj = res.respList.reduce((r, i) => {
        if (r[i.orderCode]) {
          r[i.orderCode].push(i);
        } else {
          r[i.orderCode] = [i];
        }
        return r;
      }, {});
      allList.value = Object.values(orderObj);
      await nextTick();
      const fileKeyList = await getFileKeyList(Object.values(orderObj));
      confirmMarkFile(fileKeyList);
    }
  };
  const getFileKeyList = async (dataList) => {
    const fileKeyList = await Promise.all(
      dataList.map(async (item, index) => {
        const file: Blob | null = await exportToPDF(`#pdf-area-${index}`);
        if (!file) return null;
        // 将文件上传到文件服务器
        const fileKey = await uploadFile(file);
        // 将文件key保存到数据库
        return {
          orderCode: item[0].orderCode,
          fileKey,
        };
      })
    );
    return fileKeyList.filter(Boolean);
  };
  const confirmMarkFile = (fileKeyList) => {
    erpApi
      .luteosErpPackageConfirmPackageMarkV2({
        fileType: sendData.value.fileType,
        fileKeyList,
        recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
      })
      .finally(() => {
        markLoading.value = false;
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
  const queryPackageMarkFn = async () => {
    recordCode.value = route.query.recordCode ?? wsCache.get('recordCode') ?? '';
    if (recordCode.value) {
      orderList.value = await queryPackageMark(recordCode.value, orderTable?.value);
      if (orderList.value) {
        billCodeList.value = orderList.value.map((item) => item.billCode);
      }
      queryMarkData();
    }
  };
  const queryMarkData = async () => {
    const res = await erpApi.luteosErpPackageQueryMarkData({
      billCodeList: billCodeList.value,
    });
    if ((res as any).isGenerateMark) {
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
        queryPackageMarkFn();
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
      width: 386px;
      height: 740px;
    }
  }
</style>
