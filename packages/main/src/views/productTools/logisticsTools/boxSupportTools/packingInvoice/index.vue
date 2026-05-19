<template>
  <div>
    <header>
      <el-space>
        <el-button type="primary" text @click="download">下载运营装箱单&发票</el-button>
        <div>操作步骤：1、编辑/确认运营装箱单&发票 —— 2、下载运营装箱单&发票。</div>
      </el-space>
      <el-button
        :disabled="!isGenerateOperateFile"
        type="primary"
        text
        @click="emit('handleStepClick', 5)"
      >
        制作入库单
      </el-button>
    </header>
    <main class="main-content">
      <div :style="{ flex: 'none' }">
        <div :style="{ textAlign: 'center', fontWeight: 700 }">运营装箱单</div>
        <!-- 运营装箱单 -->
        <PackingTable ref="packingTableRef" :operationPackageOrder="operationPackageOrder" />
      </div>
      <div :style="{ flex: 'none' }">
        <div :style="{ textAlign: 'center', fontWeight: 700 }">客户发票</div>
        <!-- 客户发票 -->
        <InvoiceTable
          ref="invoiceTableRef"
          :operationPackageOrderInvoice="operationPackageOrderInvoice"
        />
      </div>
    </main>
    <div v-if="route?.query?.viewType !== 'view'" class="footer">
      <!-- <el-button
        @click="
          operationPackageOrder = {
            skuDetailList: [{}],
          }
        "
      >
        清除运营装箱单
      </el-button>
      <el-button
        @click="
          operationPackageOrderInvoice = {
            invoiceDetailList: [{}],
          }
        "
      >
        清除客户发票内容
      </el-button> -->
      <el-button type="primary" @click="confirm">确定并生成新文件</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import type {
    OperationPackageOrderV2Bean,
    OperationPackageOrderInvoiceBean,
    OperationPackageOrderResp,
  } from '@/api/erp/data-contracts';
  import { useCache } from '@/hooks/web/useCache';
  import { uploadFile } from '@/utils/boxMark';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import ExcelJS from 'exceljs';
  import PackingTable from './template/packingTable.vue';
  import InvoiceTable from './template/invoiceTable.vue';

  const emit = defineEmits<{
    (event: 'handleMaxIndex', data: number): void;
    (event: 'handleStepClick', data: number): void;
  }>();

  const { wsCache } = useCache('localStorage');
  const route = useRoute();
  /**
   * @description: 初始化
   */
  const initOperationPackageOrder = async () => {
    await erpApi.luteosErpPackageInitOperationPackageOrder({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
  };
  /**
   * * @description: 查询运营装箱单和发票
   */
  const isGenerateOperateFile = ref(false); // 是否已经生成
  const queryPackageOrder = async () => {
    const res = (await erpApi.luteosErpPackageQueryOperationPackageOrder({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    })) as OperationPackageOrderResp;
    isGenerateOperateFile.value = !!res.isGenerateOperateFile;
    if (isGenerateOperateFile.value) {
      emit('handleMaxIndex', 5);
    }
    return res as unknown as OperationPackageOrderResp;
  };
  const operationPackageOrder = ref<OperationPackageOrderV2Bean>({
    shipFromAddressBean: {},
    skuDetailList: [{}],
    shipToAddressBean: {},
  });
  const operationPackageOrderInvoice = ref<OperationPackageOrderInvoiceBean>({
    invoiceDetailList: [{}],
  });
  async function init() {
    await initOperationPackageOrder(); // 初始化
    const { operationPackageOrderBean, operationPackageOrderInvoiceBean } =
      await queryPackageOrder();
    operationPackageOrder.value = operationPackageOrderBean || {
      shipFromAddressBean: {},
      shipToAddressBean: {},
    };
    operationPackageOrderInvoice.value = operationPackageOrderInvoiceBean || {
      invoiceDetailList: [{}],
    };
  }
  init();
  /**
   * @description: 下载
   */
  const download = async () => {
    const res = await erpApi.luteosErpPackageDownloadOperationOrderFile({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
    // 如果返回的不是字符串，说明没有生成文件
    if (!res || typeof res !== 'string') {
      ElMessage.error('请先确认并生成文件');
      return;
    }
    urlDownload(res as unknown as string);
  };
  /**
   * @description: 确认并生成新文件
   */
  const confirm = async () => {
    // 合并数据同步更新
    const firstRowCode = operationPackageOrderInvoice.value.invoiceDetailList![0].code;
    operationPackageOrderInvoice.value.invoiceDetailList!.forEach((item) => {
      item.code = firstRowCode;
    });

    // 更新数据
    await erpApi.luteosErpPackageUpdateOperationData({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
      operationPackageOrderBean: operationPackageOrder.value,
      operationPackageOrderInvoiceBean: operationPackageOrderInvoice.value,
    });
    // 导出excel表
    const file: Blob = await exportExcel();
    // 上传文件
    const fileKey = await uploadFile(file, 'operationPackageOrder');
    // 将文件key保存到数据库
    await erpApi.luteosErpPackageUpdateOperationFile({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
      key: fileKey,
    });
    isGenerateOperateFile.value = true;
    emit('handleMaxIndex', 5);
    ElMessage.success('操作成功');
  };
  const packingTableRef = ref<InstanceType<typeof PackingTable>>();
  const invoiceTableRef = ref<InstanceType<typeof InvoiceTable>>();
  const exportExcel = async () => {
    // 创建工作簿
    const workbook = new ExcelJS.Workbook();
    packingTableRef.value?.exportExcel(workbook);
    invoiceTableRef.value?.exportExcel(workbook);
    const excelBuffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    return blob;
  };
</script>

<style lang="scss" scoped>
  .main-content {
    display: flex;
    gap: 8px;
    overflow-y: auto;
  }
  .footer {
    padding: 20px;
    display: flex;
    justify-content: end;
  }
</style>
