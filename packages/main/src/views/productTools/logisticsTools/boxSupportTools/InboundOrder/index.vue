<template>
  <div class="inbound-order">
    <header>
      <el-space>
        <el-button type="primary" text @click="download">下载入库单</el-button>
        <div>操作步骤：1、编辑/确认入库单——2、下载入库单。</div>
      </el-space>
    </header>
    <vxe-table
      :data="inboundOrder"
      v-loading="loading"
      show-overflow
      show-header-overflow
      show-footer-overflow
      height="600"
      :column-config="{ resizable: true }"
      :scroll-y="{ enabled: true, gt: 0 }"
      :scroll-x="{ enabled: true, gt: 0 }"
    >
      <vxe-table-column type="seq" title="序号" width="50" />
      <vxe-table-column field="shipmentNo" title="货件号">
        <template #default="{ row }">
          <el-input v-model="row.shipmentNo" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="sku" title="SKU">
        <template #default="{ row }">
          <el-input v-model="row.sku" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="productName" title="品名">
        <template #default="{ row }">
          <el-input v-model="row.productName" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="applyQty" title="申报数量">
        <template #default="{ row }">
          <el-input v-model="row.applyQty" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="piece" title="件数">
        <template #default="{ row }">
          <el-input v-model="row.piece" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="destination" title="目的地">
        <template #default="{ row }">
          <el-input v-model="row.destination" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="logisticsProvider" title="物流商">
        <template #default="{ row }">
          <el-input v-model="row.logisticsProvider" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="logisticChannel" title="物流渠道">
        <template #default="{ row }">
          <el-input v-model="row.logisticChannel" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="weight" title="重量">
        <template #default="{ row }">
          <el-input v-model="row.weight" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="length" title="长">
        <template #default="{ row }">
          <el-input v-model="row.length" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="width" title="宽">
        <template #default="{ row }">
          <el-input v-model="row.width" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="height" title="高">
        <template #default="{ row }">
          <el-input v-model="row.height" />
        </template>
      </vxe-table-column>
    </vxe-table>

    <!--    <el-table :data="inboundOrder" v-loading="loading">
      <el-table-column type="index" label="序号" width="70px"/>
      <el-table-column label="货件号" prop="shipmentNo">
        <template #default="{ row }">
          <el-input v-model="row.shipmentNo" />
        </template>
      </el-table-column>
      <el-table-column label="SKU" prop="sku">
        <template #default="{ row }">
          <el-input v-model="row.sku" />
        </template>
      </el-table-column>
      <el-table-column label="品名" prop="productName">
        <template #default="{ row }">
          <el-input v-model="row.productName" />
        </template>
      </el-table-column>
      <el-table-column label="申报数量" prop="applyQty">
        <template #default="{ row }">
          <el-input v-model="row.applyQty" />
        </template>
      </el-table-column>
      <el-table-column label="件数" prop="piece">
        <template #default="{ row }">
          <el-input v-model="row.piece" />
        </template>
      </el-table-column>
      <el-table-column label="目的地" prop="destination">
        <template #default="{ row }">
          <el-input v-model="row.destination" />
        </template>
      </el-table-column>
      <el-table-column label="物流商" prop="logisticsProvider">
        <template #default="{ row }">
          <el-input v-model="row.logisticsProvider" />
        </template>
      </el-table-column>
      <el-table-column label="物流渠道" prop="logisticChannel">
        <template #default="{ row }">
          <el-input v-model="row.logisticChannel" />
        </template>
      </el-table-column>
      <el-table-column label="重量" prop="weight">
        <template #default="{ row }">
          <el-input v-model="row.weight" />
        </template>
      </el-table-column>
      <el-table-column label="长" prop="length">
        <template #default="{ row }">
          <el-input v-model="row.length" />
        </template>
      </el-table-column>
      <el-table-column label="宽" prop="width">
        <template #default="{ row }">
          <el-input v-model="row.width" />
        </template>
      </el-table-column>
      <el-table-column label="高" prop="height">
        <template #default="{ row }">
          <el-input v-model="row.height" />
        </template>
      </el-table-column>
    </el-table>-->
  </div>
  <div v-if="route?.query?.viewType !== 'view'" class="footer">
    <!-- <el-button @click="inboundOrder = []">清除内容</el-button> -->
    <el-button type="primary" :loading="confirmLoading" @click="confirm">
      确定并生成新文件
    </el-button>
  </div>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import { PalletInboundBean, PalletInboundResp } from '@/api/erp/data-contracts';
  import { useCache } from '@/hooks/web/useCache';
  import { ElMessage } from 'element-plus';
  import ExcelJS from 'exceljs';
  import { uploadFile } from '@/utils/boxMark';
  import { urlDownload } from '@/utils/download';

  const { wsCache } = useCache('localStorage');
  const route = useRoute();
  /**
   * * @description: 查询入库单
   */
  const loading = ref(false);
  const queryInBoundOrder = async () => {
    const res = await erpApi.luteosErpPackageQueryInboundOrder({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
    return res as unknown as PalletInboundResp;
  };
  const inboundOrder = ref<PalletInboundBean[]>();
  async function init() {
    try {
      loading.value = true;
      await erpApi.luteosErpPackageInitInboundOrder({
        recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
      });
      const res = await queryInBoundOrder();
      inboundOrder.value = res.inboundList;
    } finally {
      loading.value = false;
    }
  }
  init();

  /**
   * @description: 下载
   */
  const download = async () => {
    const res = await erpApi.luteosErpPackageDownloadInboundFile({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
    if (!res || typeof res !== 'string') {
      ElMessage.error('请先确认并生成文件');
      return;
    }
    urlDownload(res as unknown as string);
  };

  const confirmLoading = ref(false);
  const confirm = async () => {
    confirmLoading.value = true;
    try {
      saveData();
      const file: Blob = await exportExcel();
      // 上传文件
      const fileKey = await uploadFile(file, 'inboundOrder');
      // 将文件key保存到数据库
      await erpApi.luteosErpPackageUpdateInboundFile({
        recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
        key: fileKey,
      });
      ElMessage.success('操作成功');
    } finally {
      confirmLoading.value = false;
    }
  };
  const saveData = async () => {
    await erpApi.luteosErpPackageUpdateInboundData({
      inboundList: inboundOrder.value,
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
  };
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('INBOUND', {
      pageSetup: {
        margins: {
          left: 0.52,
          right: 0.52,
          top: 0.52,
          bottom: 0.52,
          header: 0.51,
          footer: 0.51,
        },
        fitToPage: false,
        scale: 100,
        paperSize: 9,
        firstPageNumber: 1,
        horizontalCentered: true,
      },
    });
    worksheet.columns = [
      { header: '货件号', key: 'shipmentNo' },
      { header: 'SKU', key: 'sku' },
      { header: '品名', key: 'productName' },
      { header: '申报数量', key: 'applyQty' },
      { header: '件数', key: 'piece' },
      { header: '目的地', key: 'destination' },
      { header: '物流商', key: 'logisticsProvider' },
      { header: '物流渠道', key: 'logisticChannel' },
      { header: '重量', key: 'weight' },
      { header: '长', key: 'length' },
      { header: '宽', key: 'width' },
      { header: '高', key: 'height' },
    ];
    worksheet.addRows(inboundOrder.value || []);
    const excelBuffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    return blob;
  };
</script>

<style lang="scss" scoped>
  .inbound-order {
    :deep(.el-input__wrapper) {
      --el-input-bg-color: #e3fafa;
    }
  }
  .footer {
    padding: 20px;
    display: flex;
    justify-content: end;
  }
</style>
