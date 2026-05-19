<template>
  <el-dialog title="上传Excel表格装箱" :model-value="visible" @close="handleClose" width="80%">
    <el-button @click="exportBoxingTemplate" style="margin-left: -21px" type="primary" text>
      导出装箱模板
    </el-button>
    <el-button @click="uploadVisible = true" type="primary" text>上传文件并验证</el-button>
    <OrderTable ref="orderTable" :orderList="orderList" />
    <BatchImportModal
      v-if="uploadVisible"
      :visible="uploadVisible"
      importScene="logistics_config_import"
      title="导入"
      :isCustomTemplate="true"
      :isCustomUpload="true"
      :needCustomUpload="false"
      @close="batchUpdate"
      @custom-upload="customUpload"
    />
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button :disabled="btnDisabled" type="primary" @click="surePacking()">确定</el-button>
      <el-button :disabled="btnDisabled" type="primary" @click="surePacking('toBox')">
        确认并制作箱唛
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { useCache } from '@/hooks/web/useCache';
  import { urlDownload } from '@/utils/download';
  import OrderTable, {
    NewSourceOrderBeanType,
  } from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/OrderTable/index.vue';
  import { queryCombinePackPackageMark } from '@/views/productTools/logisticsTools/boxSupportTools/utils';
  import { ElMessage, ElMessageBox } from 'element-plus';

  const route = useRoute();
  const orderList = ref<NewSourceOrderBeanType[] | undefined>([]);
  const orderTable = ref<typeof OrderTable>();
  const { wsCache } = useCache('localStorage');
  const uploadVisible = ref(false);
  const btnDisabled = ref(true);
  const totalBox = ref<number | undefined>();
  const props = defineProps<{
    visible: boolean;
  }>();
  const batchUpdate = () => {
    uploadVisible.value = false;
  };
  const customUpload = async (fileList: any[]) => {
    const res = await erpApi.luteosErpPackageUploadPackageOrder({
      fileName: fileList[0].name,
      ossKey: fileList[0].ossKey,
      packageType: route.query.packageType ?? wsCache.get('packageType') ?? 1,
      recordCode: (route.query.recordCode as string) ?? wsCache.get('recordCode') ?? '',
    });
    if (res) {
      ElMessage.info(
        `成功${res.succeededCount}条，失败${res.failedCount ?? 0}条${
          (res.failedCount ?? 0) > 0 ? '，请到上传日志查看' : ''
        }`
      );
      if (res?.businessData) {
        orderList.value = await queryCombinePackPackageMark(
          res.businessData as unknown as string,
          orderTable?.value
        );
        btnDisabled.value = false;
      }
      uploadVisible.value = false;
    }
  };
  const handleClose = () => {
    emit('close');
  };
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'getRecordCode', recordCode: string, toBox?: string): void;
  }>();
  const getTableList = async () => {
    if (route.query.id) {
      const ids = route.query.id as string;
      const res = await erpApi.luteosErpPackageQueryChooseOrderList({
        orderIdList: ids.split(',').map((item) => Number(item)),
      });
      const extraData = [
        {
          referenceCodeL: '',
          orderCode: '',
          customerName: '',
          warehouseDesc: '',
          sku: '',
          skuShowDesc: '',
          qty: '毛重(Kg)',
          isExtraData: true,
        },
        {
          referenceCodeL: '',
          orderCode: '',
          customerName: '',
          warehouseDesc: '',
          sku: '',
          skuShowDesc: '',
          qty: '长(cm)',
          isExtraData: true,
        },
        {
          referenceCodeL: '',
          orderCode: '',
          customerName: '',
          warehouseDesc: '',
          sku: '',
          skuShowDesc: '',
          qty: '宽(cm)',
          isExtraData: true,
        },
        {
          referenceCodeL: '',
          orderCode: '',
          customerName: '',
          warehouseDesc: '',
          sku: '',
          skuShowDesc: '',
          qty: '高(cm)',
          isExtraData: true,
        },
      ];
      if (res.orderList) {
        res.orderList.map((i) => {
          i.skuDescList?.map((v: any) => {
            v.referenceCode = i.referenceCode;
            v.orderCode = i.orderCode;
            v.customerName = i.customerName;
            v.warehouseDesc = i.warehouseDesc;
            orderList.value?.push(v);
            return v;
          });
          return i;
        });
        if (orderList.value) {
          orderList.value.push(...extraData);
        }
      }
      if (orderTable.value) {
        orderTable.value.tableColumnList = orderTable.value.initTableColumnList;
      }
    }
  };
  const surePacking = async (toBox?: string) => {
    const packageDetailList: any[] = [{}]; // 入参
    const obj: any = {
      boxWeightList: [],
      boxLengthList: [],
      boxWidthList: [],
      boxHeightList: [],
      itemList: [],
    };
    orderList.value?.forEach((i: any, index: number) => {
      Object.keys(i).forEach((key: string) => {
        if (i.qty === '毛重(Kg)') {
          if (key.includes('boxNumber')) {
            const boxNumber = key.replace('boxNumber', '');
            obj.boxWeightList.push({
              boxNumber,
              grossWeight: i[key],
            });
          }
          return;
        }
        if (i.qty === '长(cm)') {
          if (key.includes('boxNumber')) {
            const boxNumber = key.replace('boxNumber', '');
            obj.boxLengthList.push({
              boxNumber,
              length: i[key],
            });
          }
          return;
        }
        if (i.qty === '宽(cm)') {
          if (key.includes('boxNumber')) {
            const boxNumber = key.replace('boxNumber', '');
            obj.boxWidthList.push({
              boxNumber,
              width: i[key],
            });
          }
          return;
        }
        if (i.qty === '高(cm)') {
          if (key.includes('boxNumber')) {
            const boxNumber = key.replace('boxNumber', '');
            obj.boxHeightList.push({
              boxNumber,
              height: i[key],
            });
          }
          return;
        }
        // 箱号
        if (key.includes('boxNumber')) {
          if (!obj.itemList[index]) {
            obj.itemList[index] = {
              recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
              referenceCode: i.referenceCode,
              orderCode: i.orderCode,
              customerName: i.customerName,
              totalBox: totalBox.value,
              qty: i.qty,
              sku: i.sku,
              quantity: i.qty,
              boxItemList: [],
            };
          }
          const boxNumber = key.replace('boxNumber', '');
          obj.itemList[index].boxItemList.push({
            boxNumber,
            boxPackageQty: i[key],
          });
        }
      });
      orderList.value?.map((v: any) => {
        return v;
      });
      obj.itemList = obj.itemList.filter((k) => k.sku);
      if (obj.itemList.length) {
        packageDetailList.push(obj);
      }
      return i;
    });
    const res = await erpApi.luteosErpPackageConfirmPackageOrder({
      packageDetailList: [obj],
      recordCode: (route.query.recordCode as string | undefined) ?? wsCache.get('recordCode') ?? '',
      packageType: route.query.packageType ?? wsCache.get('packageType') ?? 1,
    });
    if (res) {
      wsCache.set('recordCode', res);
      if (toBox) {
        emit('getRecordCode', res as string, toBox);
      } else {
        emit('getRecordCode', res as string, '');
      }
    }
  };
  const exportBoxingTemplate = () => {
    return ExportBoxingTemplate();
  };
  const ExportBoxingTemplate = async () => {
    if (orderList?.value?.length) {
      const list = orderList.value.filter((item: any) => item.sku);
      const res = await erpApi.luteosErpPackageDownPackageTemplate({
        orderCodeList: list.map((item) => item.orderCode) as string[],
        referenceCodeList: list.map((item) => item.orderCode) as string[],
        packageType: route.query.packageType ?? wsCache.get('packageType') ?? 1,
      });
      urlDownload(res as string);
    }
  };
  const getDetail = async () => {
    const res = await queryCombinePackPackageMark(
      (route.query.recordCode as string) ?? wsCache.get('recordCode') ?? '',
      orderTable?.value,
      true
    );
    orderList.value = res;
  };
  watch(
    () => props.visible,
    (val) => {
      if (val) {
        if (route.query.recordCode || wsCache.get('recordCode')) {
          nextTick(() => {
            getDetail();
          });
        } else {
          getTableList();
        }
      }
    }
  );
</script>

<style lang="scss" scoped></style>
