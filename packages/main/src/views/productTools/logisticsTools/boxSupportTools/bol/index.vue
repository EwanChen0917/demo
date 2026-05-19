<template>
  <header>
    <el-space>
      <el-button type="primary" text @click="downloadFile">下载BOL提单文件</el-button>
      <span>操作步骤：1、编辑/确认BOL提单——2、下载BOL提单</span>
    </el-space>
    <el-button
      :disabled="!isGenerateBolFile"
      v-if="packageType === 2"
      @click="emit('handleStepClick', 4)"
      type="primary"
      text
    >
      制作运营装箱单
    </el-button>
  </header>
  <section id="pdf-area">
    <div class="page">
      <BolTemplate :ladingBillBean="ladingBillBean" :startPdf="false" ref="bolTemplateRef" />
    </div>
    <div class="page">
      <DetailTemplate
        :bolLadingBillItemBean="bolLadingBillItemBean"
        :startPdf="false"
        ref="bolTemplateRef"
      />
    </div>
  </section>
  <div class="footer">
    <!-- <el-button v-if="route?.query?.viewType !== 'view'" @click="clear">清除提单内容</el-button> -->
    <el-button
      v-if="route?.query?.viewType !== 'view'"
      :loading="markLoading"
      type="primary"
      @click="confirm"
    >
      确认并生成新的BOL提单
    </el-button>
  </div>
  <!-- pdf打印区域，页面隐藏 -->
  <section :style="{ height: 0, overflow: 'hidden' }">
    <div id="pdf-view">
      <div class="pdf-page">
        <BolTemplate :ladingBillBean="ladingBillBean" :startPdf="true" />
      </div>
      <div>
        <DetailTemplate
          :bolLadingBillItemBean="bolLadingBillItemBean"
          :startPdf="true"
          ref="bolTemplateRef"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { download } from '@/utils/download';
  import html2pdf from 'html2pdf.js';
  import { useCache } from '@/hooks/web/useCache';
  import { ElMessage } from 'element-plus';
  import { erpApi, platformApi } from '@/api';
  import axios from 'axios';
  import type {
    BolLadingBillBean,
    BolLadingBillItemBean,
    LadingBillResp,
  } from '@/api/erp/data-contracts';
  import BolTemplate from './template/index.vue';
  import DetailTemplate from './detail.vue';

  const emit = defineEmits<{
    (event: 'handleMaxIndex', index: number): void;
    (event: 'handleStepClick', data: number): void;
  }>();
  const route = useRoute();
  const { wsCache } = useCache('localStorage');
  const packageType = ref<number>();
  // 主提单数据
  const ladingBillBean = ref<BolLadingBillBean>({
    shippingAddress: '',
    shipToAddress: '',
    isToFob: 0,
    orderInfoList: [], // 订单信息
    carrierInfoList: [], // 承运商信息
  });

  const bolLadingBillItemBean = ref<BolLadingBillItemBean>({}); // 子提单数据
  /**
   * @description: 查询BOL提单数据
   */
  const isGenerateBolFile = ref(false); // 是否生成BOL提单文件
  const queryBolData = async () => {
    const res = (await erpApi.luteosErpPackageQueryBolData({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    })) as unknown as LadingBillResp;
    // 使用Object.assign()方法，防止res.ladingBillBean为null时，页面获取数据报错
    Object.assign(ladingBillBean.value, res.ladingBillBean);
    Object.assign(bolLadingBillItemBean.value, res.bolLadingBillItemBean);
    packageType.value = res.packageType;
    isGenerateBolFile.value = !!res.isGenerateBolFile;
    // 如果是生成BOL提单文件，且是运营装箱单，则允许跳转到运营装箱单页面
    if (isGenerateBolFile.value && packageType.value === 2) {
      emit('handleMaxIndex', 4);
    }
  };
  /**
   * 初始化BOL提单
   */
  const initBol = async () => {
    await erpApi.luteosErpPackageInitBolData({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
    queryBolData();
  };
  // 初始化
  (function init() {
    initBol();
  })();

  /**
   * * @description: 下载BOL提单文件
   */
  const downloadFile = async () => {
    const res = await erpApi.luteosErpPackageDownloadBolFile({
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
    if (!res || typeof res !== 'string') {
      ElMessage.error('请先确认并生成文件');
      return;
    }
    download(res as unknown as string, 'BOL.pdf');
  };

  const markLoading = ref(false);
  /**
   * * @description: 确认并生成新的BOL提单
   */
  const confirm = async () => {
    // 求和
    ladingBillBean.value.totalBoxCount = ladingBillBean.value.orderInfoList?.reduce(
      (pre, cur) => pre + (cur.totalBoxCount || 0),
      0
    );
    ladingBillBean.value.totalOrderWeight = ladingBillBean.value.orderInfoList?.reduce(
      (pre, cur) => pre + (cur.totalWeight || 0),
      0
    );
    ladingBillBean.value.totalPalletNumber = ladingBillBean.value.carrierInfoList?.reduce(
      (pre, cur) => pre + (cur.palletCount || 0),
      0
    );
    ladingBillBean.value.totalPackages = ladingBillBean.value.carrierInfoList?.reduce(
      (pre, cur) => pre + (cur.packageCount || 0),
      0
    );
    ladingBillBean.value.totalPalletWeight = ladingBillBean.value.carrierInfoList?.reduce(
      (pre, cur) => pre + (cur.weight || 0),
      0
    );
    if (!bolLadingBillItemBean.value.bolDetailCarrierInfoList) {
      bolLadingBillItemBean.value.bolDetailCarrierInfoList = [];
    }
    bolLadingBillItemBean.value.bolDetailCarrierInfoList[0].totalQty =
      bolLadingBillItemBean.value.detailList?.reduce(
        (pre, cur) => pre + (cur.totalPackageCount || 0),
        0
      );
    bolLadingBillItemBean.value.bolDetailCarrierInfoList[0].totalWeight =
      bolLadingBillItemBean.value.detailList?.reduce((pre, cur) => pre + (cur.totalWeight || 0), 0);
    bolLadingBillItemBean.value.bolDetailCarrierInfoList[0].palletQty = Math.round(
      bolLadingBillItemBean.value.detailList?.reduce((pre, cur) => pre + (cur.volume || 0), 0) || 0
    );
    markLoading.value = true;
    await nextTick();
    // 保存数据
    saveData();
    try {
      const file: Blob | null = await exportPDF('#pdf-view');
      if (!file) return;
      // 将文件上传到文件服务器
      const fileKey = await uploadFile(file);
      // 将文件key保存到数据库
      await uploadBolFile(fileKey);
    } finally {
      markLoading.value = false;
    }
  };
  const bolTemplateRef = ref<InstanceType<typeof BolTemplate> | null>(null);
  /**
   * * @description: 保存BOL提单数据
   */
  const saveData = () => {
    erpApi.luteosErpPackageUpdateBolData({
      ladingBillBean: ladingBillBean.value,
      bolLadingBillItemBean: bolLadingBillItemBean.value,
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
  };
  /**
   * @description: 将DOM转为pdf二进制流
   * @param id 选择器id
   */
  const exportPDF = async (id: string) => {
    const recordCode = route.query.recordCode ?? wsCache.get('recordCode') ?? '';
    const element = document.querySelector(id);
    const fileName = `BOL${recordCode}${Date.now()}.pdf`; // pdf文件名字
    const options = {
      margin: 0, // 内边距
      filename: fileName, // pdf文件名字
      image: { type: 'jpeg', quality: 0.98 }, // 生成图片的类型以及清晰度
      pagebreak: { mode: 'avoid-all', after: '.pdf-page' }, // 处理是否元素分割
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    try {
      const pdf = html2pdf().set(options).from(element, 'element');
      const pdfInstance = pdf.toPdf();
      const blob = await pdfInstance.output('blob');
      return blob;
    } catch (error) {
      ElMessage.error(`生成失败`);
      return null;
    }
  };
  /**
   * 将文件上传到文件临时桶中
   * @param file 上传的文件二进制流
   */
  const uploadFile = async (file: Blob) => {
    const fileName = `BOL${Date.now()}.pdf`;
    const res: any = await platformApi.platformOssQueryOssTempPolicy({
      directory: 'BOL',
      filename: fileName,
    });
    const instance = axios.create({
      baseURL: res.host,
    });
    const formDataObj = new FormData();
    formDataObj.append('key', res.key);
    formDataObj.append('ossAccessKeyId', res.ossAccessKeyId);
    formDataObj.append('policy', res.policy);
    formDataObj.append('signature', res.signature);
    formDataObj.append('provider', res.provider);
    formDataObj.append('bucket', res.bucket);
    formDataObj.append('success_action_status', res.success_action_status);
    formDataObj.append('file', file, fileName);
    // 使用这个实例来发起请求
    await instance.post('/', formDataObj);
    return res.key;
  };
  /**
   * @description: 将BOL提单文件保存到数据库
   */
  const uploadBolFile = async (key: string) => {
    await erpApi.luteosErpPackageUpdateBolFile({
      key,
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
    ElMessage.success('操作成功');
    isGenerateBolFile.value = true;
    emit('handleMaxIndex', 4);
  };
  /**
   * @description: 清除提单内容
   */
  const clear = async () => {
    ladingBillBean.value = {
      shippingAddress: '',
      shipToAddress: '',
      isToFob: 0,
      orderInfoList: [],
      carrierInfoList: [],
    };
    bolLadingBillItemBean.value = {
      bolDetailCarrierInfoList: [{}],
      detailList: [{}],
    };
  };
</script>

<style lang="scss" scoped>
  #pdf-area {
    display: flex;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 20px 0;
  }
  #pdf-view {
    width: 800px;
    overflow: hidden;
  }
  .footer {
    display: flex;
    justify-content: end;
    padding: 20px 0;
  }
</style>
