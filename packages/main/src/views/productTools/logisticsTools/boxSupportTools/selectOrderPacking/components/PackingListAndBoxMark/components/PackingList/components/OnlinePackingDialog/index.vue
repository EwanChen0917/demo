<template>
  <el-dialog title="在线编辑装箱清单" :model-value="visible" @close="handleClose" width="80%">
    <OrderTable ref="orderTable" :needBoxNumber="true" :orderList="orderList" />
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button :loading="sureLoading" type="primary" @click="surePacking('')">确定</el-button>
      <el-button :loading="sureLoading" type="primary" @click="surePacking('toBox')">
        确认并制作箱唛
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { useCache } from '@/hooks/web/useCache';
  import OrderTable, {
    NewSourceOrderBeanType,
  } from '@/views/productTools/logisticsTools/boxSupportTools/selectOrderPacking/components/OrderTable/index.vue';
  import { queryPackageMark } from '@/views/productTools/logisticsTools/boxSupportTools/utils';
  import { ElMessage } from 'element-plus';

  const route = useRoute();
  const orderList = ref<NewSourceOrderBeanType[] | undefined | null>([]);
  const orderTable = ref<typeof OrderTable>();
  const { wsCache } = useCache('localStorage');
  const props = defineProps<{
    visible: boolean;
  }>();
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
          sku: '',
          skuShowDesc: '',
          qty: '毛重(Kg)',
          isExtraData: true,
        },
        {
          sku: '',
          skuShowDesc: '',
          qty: '长(cm)',
          isExtraData: true,
        },
        {
          sku: '',
          skuShowDesc: '',
          qty: '宽(cm)',
          isExtraData: true,
        },
        {
          sku: '',
          skuShowDesc: '',
          qty: '高(cm)',
          isExtraData: true,
        },
      ];
      orderList.value = res.orderList;
      orderList.value?.map((i, index) => {
        if (orderTable.value) {
          orderTable.value.tableColumnListArray[index] = orderTable.value.initTableColumnList;
        }
        i.skuDescList = [...(i.skuDescList || []), ...extraData] as any;
        return i;
      });
    }
  };
  const extractNumberWithExec = (str: string) => {
    const regex = /boxNumber(\d+)-/;
    const match = regex.exec(str);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };
  const extractNumberWithReplace = (str: string) => {
    const regex = /-(?<number>\d+)/;
    const match = str.match(regex);
    if (match && match.groups && match.groups.number) {
      return match.groups.number;
    }
    return null;
  };
  const sureLoading = ref(false);
  const surePacking = async (toBox?: string) => {
    if (sureLoading.value) return;
    sureLoading.value = true;
    const flag = orderList.value?.some((i) => {
      if (!i.totalBox) {
        return true;
      }
      return false;
    });
    if (flag) {
      ElMessage.error('请输入各个订单总箱数');
      return;
    }
    const packageDetailList: any[] = [];
    orderList.value?.map((i, index) => {
      const obj: any = {
        itemList: [],
        boxWeightList: [],
        boxLengthList: [],
        boxWidthList: [],
        boxHeightList: [],
        billCode: i.billCode,
      };
      obj.titleProperty = {
        referenceCode: i.referenceCode,
        orderCode: i.orderCode,
        customerName: i.customerName,
        totalBox: i.totalBox,
      };
      i.skuDescList?.map((j) => {
        const item: any = {};
        item.sku = j.sku;
        item.recordCode = route.query.recordCode ?? wsCache.get('recordCode') ?? '';
        item.skuShowDesc = j.skuShowDesc;
        item.qty = j.qty;
        item.quantity = j.qty;
        item.referenceCode = i.referenceCode;
        item.orderCode = i.orderCode;
        item.customerName = i.customerName;
        item.boxItemList = [];
        obj.itemList.push(item);
        Object.keys(j).map((key: string) => {
          const indexSuffix = extractNumberWithReplace(key);
          if (key.includes(`boxNumber`) && Number(indexSuffix) === index) {
            const boxNumber = extractNumberWithExec(key);
            item.boxItemList.push({
              boxNumber,
              boxPackageQty: j[key],
            });
          }
          return key;
        });
        return item;
      });

      obj.itemList.map((v) => {
        if (v.qty === '毛重(Kg)') {
          v.boxItemList.map((k) => {
            obj.boxWeightList.push({
              boxNumber: k.boxNumber,
              grossWeight: k.boxPackageQty ?? 0,
            });
            return k;
          });
        } else if (v.qty === '长(cm)') {
          v.boxItemList.map((k) => {
            obj.boxLengthList.push({
              boxNumber: k.boxNumber,
              length: k.boxPackageQty ?? 0,
            });
            return k;
          });
        } else if (v.qty === '宽(cm)') {
          v.boxItemList.map((k) => {
            obj.boxWidthList.push({
              boxNumber: k.boxNumber,
              width: k.boxPackageQty ?? 0,
            });
            return k;
          });
        } else if (v.qty === '高(cm)') {
          v.boxItemList.map((k) => {
            obj.boxHeightList.push({
              boxNumber: k.boxNumber,
              height: k.boxPackageQty ?? 0,
            });
            return k;
          });
        }
        return v;
      });
      obj.itemList = obj.itemList.filter((k) => k.sku);
      packageDetailList.push(obj);
      return i;
    });
    const res = await erpApi
      .luteosErpPackageConfirmPackageOrder({
        recordCode:
          (route.query.recordCode as string | undefined) ?? wsCache.get('recordCode') ?? '',
        packageDetailList,
        packageType: route.query.packageType ?? wsCache.get('packageType') ?? 1,
      })
      .finally(() => {
        sureLoading.value = false;
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
  const getDetail = async () => {
    const list = await queryPackageMark(
      (route.query.recordCode as string) ?? wsCache.get('recordCode') ?? '',
      orderTable?.value,
      true
    );
    orderList.value = list;
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
